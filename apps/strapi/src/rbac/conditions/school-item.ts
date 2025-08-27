import { Core } from "@strapi/strapi"

import { isUserAdmin } from "./util/check-roles"
import { RbacConditionUser } from "./util/types"

/**
 * Handles access to items with the ` school ` field
 * @param strapi
 */
export const createSchoolItemAccessCondition = (strapi: Core.Strapi) => ({
  displayName: "Can access school item",
  name: "can-access-school-item",
  plugin: "admin",
  async handler(user: RbacConditionUser) {
    const isAdmin = isUserAdmin(user.roles)

    if (isAdmin) {
      return true
    }

    const userSchools = await strapi.documents("api::school.school").findMany({
      filters: {
        administrators: { id: user.id },
      },
    })

    if (userSchools == null || userSchools.length === 0) {
      return false
    }

    const userSchoolIds = userSchools.map((school) => school.id)

    return { "school.id": { $in: userSchoolIds } }
  },
})
