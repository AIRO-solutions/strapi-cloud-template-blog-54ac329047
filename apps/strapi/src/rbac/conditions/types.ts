import type { UID } from "@strapi/strapi"

export type RbacConditionUser = {
  permission: {
    actionParameters: object
    conditions: string[]
    subject: UID.ContentType
  }
}
