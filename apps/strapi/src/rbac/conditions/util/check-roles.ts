import { RbacRole } from "./types"

const adminRoleCodes = ["strapi-admin"] as const

export const isUserAdmin = (userRoles: RbacRole[]) =>
  userRoles.some((role) => adminRoleCodes.includes(role.code))
