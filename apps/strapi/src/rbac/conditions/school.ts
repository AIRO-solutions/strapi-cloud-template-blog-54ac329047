import type { Core } from "@strapi/strapi"

import { RbacConditionUser } from "./util/types"

export const createSchoolAccessCondition = (strapi: Core.Strapi) => ({
  displayName: "Can access school",
  name: "can-access-school",
  plugin: "admin",
  handler(user: RbacConditionUser) {
    if (user.permission.subject !== "api::school.school") {
      throw new Error("Can access school condition added to incorrect type")
    }

    return { "administrators.id": user.id }
  },
})
