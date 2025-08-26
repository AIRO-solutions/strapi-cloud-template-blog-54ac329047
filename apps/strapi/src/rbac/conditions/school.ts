import type { Core } from "@strapi/strapi"

import { RbacConditionUser } from "./types"

export const createSchoolAccessCondition = (strapi: Core.Strapi) => ({
  displayName: "Can access school",
  name: "can-access-school",
  plugin: "admin",
  handler(user: RbacConditionUser) {
    if (user.permission.subject !== "api::school.school") {
      return true
    }

    return { id: { $gt: 0 } }
  },
})
