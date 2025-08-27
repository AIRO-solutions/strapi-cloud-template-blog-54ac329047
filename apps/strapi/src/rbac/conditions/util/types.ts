import type { UID } from "@strapi/strapi"

export type RbacRole = {
  id: number
  code: "strapi-admin" | "school-admin"
}

export type RbacConditionUser = {
  id: number
  roles: RbacRole[]
  permission: {
    actionParameters: object
    conditions: string[]
    subject: UID.ContentType
  }
}
