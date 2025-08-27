import type { Core } from "@strapi/strapi"

import { createSchoolAccessCondition } from "./school"
import { RbacConditionUser } from "./util/types"

describe("createSchoolAccessCondition", () => {
  describe("handler", () => {
    let condition: ReturnType<typeof createSchoolAccessCondition>

    beforeEach(() => {
      condition = createSchoolAccessCondition({} as Core.Strapi)
    })

    it("handler throws if subject is not school", () => {
      const user = {
        id: 1,
        permission: {
          subject: "api::card.card",
        },
      } as RbacConditionUser

      expect(() => condition.handler(user)).toThrow()
    })

    it("handler returns correct query object", () => {
      const user = {
        id: 123,
        permission: {
          subject: "api::school.school",
        },
      } as RbacConditionUser

      expect(condition.handler(user)).toStrictEqual({
        "administrators.id": 123,
      })
    })
  })
})
