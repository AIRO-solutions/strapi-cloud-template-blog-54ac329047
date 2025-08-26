import type { Core } from "@strapi/strapi"

import { createSchoolAccessCondition } from "./school"
import { RbacConditionUser } from "./types"

describe("createSchoolAccessCondition", () => {
  describe("handler", () => {
    let condition: ReturnType<typeof createSchoolAccessCondition>

    beforeEach(() => {
      condition = createSchoolAccessCondition({} as Core.Strapi)
    })

    it("handler returns true if subject is not school", () => {
      const user: RbacConditionUser = {
        permission: {
          actionParameters: {},
          conditions: [],
          subject: "api::card.card",
        },
      }

      expect(() => condition.handler(user)).toThrow()
    })

    it("handler returns correct query object for user that should have access", () => {
      const user: RbacConditionUser = {
        permission: {
          actionParameters: {},
          conditions: [],
          subject: "api::school.school",
        },
      }

      expect(condition.handler(user)).toStrictEqual({ id: { $gt: 0 } })
    })
  })
})
