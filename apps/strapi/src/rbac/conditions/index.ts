import type { Core } from "@strapi/strapi"

import { createSchoolAccessCondition } from "./school"
import { createSchoolItemAccessCondition } from "./school-item"

const rbacConditionFactories = [
  createSchoolAccessCondition,
  createSchoolItemAccessCondition,
] as const

type RegisterConditionsParams = {
  strapi: Core.Strapi
}
export const registerRbacConditions = async ({
  strapi,
}: RegisterConditionsParams) => {
  const conditions = rbacConditionFactories.map((factory) => factory(strapi))

  await strapi.admin.services.permission.conditionProvider.registerMany(
    conditions
  )
}
