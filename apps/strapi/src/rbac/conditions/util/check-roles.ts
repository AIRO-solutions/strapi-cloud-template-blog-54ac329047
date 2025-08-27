import { RbacRole } from "./types"

const adminRoleCodes = ["strapi-admin"] as const
export type AdminRoleCode = (typeof adminRoleCodes)[number]

export const isUserAdmin = (userRoles: RbacRole[]) =>
  userRoles.some((role) => adminRoleCodes.includes(role.code as AdminRoleCode))
