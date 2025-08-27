import { Core } from "@strapi/strapi"

import { isUserAdmin } from "./util/check-roles"
import { RbacConditionUser } from "./util/types"

export const createCardDeckAccessCondition = (strapi: Core.Strapi) => ({
  displayName: "Can access card deck",
  name: "can-access-card-deck",
  plugin: "admin",
  async handler(user: RbacConditionUser) {
    if (user.permission.subject !== "api::card-deck.card-deck") {
      throw new Error("Can access card deck condition added to incorrect type")
    }

    const isAdmin = isUserAdmin(user.roles)

    if (isAdmin) {
      return true
    }

    const userSchool = await strapi.documents("api::school.school").findFirst({
      filters: {
        administrators: { id: user.id },
      },
    })

    if (!userSchool) {
      return false
    }

    return { "school.id": userSchool.id }
  },
})
