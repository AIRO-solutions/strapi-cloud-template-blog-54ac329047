import type { UID } from "@strapi/strapi"

export const relevantContentTypes: UID.ContentType[] = [
  "api::card.card",
  "api::class.class",
  "api::card-deck.card-deck",
  "api::card-response.card-response",
  "api::student.student",
  "api::subject.subject",
  "api::topic.topic",
  "plugin::users-permissions.user",
] as const

/**
 * To handle school multi-tenancy we need to assign the school to the created document
 * Easiest way to do this is to use the school the current user is assigned to
 * @param strapi
 */
export const registerAssignSchoolOnCreationMiddleware = ({ strapi }) => {
  strapi.documents.use(async (context, next) => {
    if (
      context.action !== "create" ||
      relevantContentTypes.includes(context.uid) === false
    ) {
      return next()
    }

    const userSchool = await strapi.documents("api::school.school").findFirst({
      filters: {
        administrators: { id: context.params.data.createdBy },
      },
    })

    if (userSchool == null) {
      return next()
    }

    context.params.data.school = userSchool.id

    return next()
  })
}
