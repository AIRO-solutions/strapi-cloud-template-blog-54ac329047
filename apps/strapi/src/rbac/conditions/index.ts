import type { Core } from "@strapi/strapi"

import { createSchoolAccessCondition } from "./school"

const rbacConditionFactories = [createSchoolAccessCondition] as const

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
