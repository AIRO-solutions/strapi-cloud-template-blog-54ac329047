import type { Core } from "@strapi/strapi"

import { createCardDeckAccessCondition } from "./school-item"
import { RbacConditionUser } from "./util/types"

const getMockStrapiObject = (schoolsToReturn) => ({
  documents: () => ({
    findMany: () => schoolsToReturn,
  }),
})

describe("createCardDeckAccessCondition", () => {
  describe("handler", () => {
    let condition: ReturnType<typeof createCardDeckAccessCondition>
    beforeEach(() => {
      condition = createCardDeckAccessCondition({} as Core.Strapi)
    })

    it("handles admin user", async () => {
      const user = {
        id: 1,
        permission: {
          subject: "api::card-deck.card-deck",
        },
        roles: [
          {
            id: 123,
            code: "strapi-admin",
          },
        ],
      } as RbacConditionUser

      expect(await condition.handler(user)).toBe(true)
    })

    it("returns false if user is not admin and school is not found", async () => {
      const condition = createCardDeckAccessCondition(
        getMockStrapiObject(null) as unknown as Core.Strapi
      )

      const user = {
        id: 1,
        permission: {
          subject: "api::card-deck.card-deck",
        },
        roles: [
          {
            id: 123,
            code: "school-admin",
          },
        ],
      } as RbacConditionUser

      await expect(condition.handler(user)).resolves.toBe(false)
    })

    it("returns correct query object", async () => {
      condition = createCardDeckAccessCondition(
        getMockStrapiObject([
          {
            id: 42,
          },
        ]) as unknown as Core.Strapi
      )
      const user = {
        id: 123,
        permission: {
          subject: "api::card-deck.card-deck",
        },
        roles: [
          {
            id: 123,
            code: "school-admin",
          },
        ],
      } as RbacConditionUser

      expect(await condition.handler(user)).toStrictEqual({
        "school.id": { $in: [42] },
      })
    })

    it("returns correct query object for multiple schools", async () => {
      condition = createCardDeckAccessCondition(
        getMockStrapiObject([
          {
            id: 42,
          },
          {
            id: 92,
          },
        ]) as unknown as Core.Strapi
      )
      const user = {
        id: 123,
        permission: {
          subject: "api::card-deck.card-deck",
        },
        roles: [
          {
            id: 123,
            code: "school-admin",
          },
        ],
      } as RbacConditionUser

      expect(await condition.handler(user)).toStrictEqual({
        "school.id": { $in: [42, 92] },
      })
    })
  })
})
