import type { UID } from "@strapi/strapi"

export const relevantContentTypes: UID.ContentType[] = [
  "api::activity-type.activity-type",
  "api::card.card",
  "api::class.class",
  "api::card-answer.card-answer",
  "api::card-deck.card-deck",
  "api::student.student",
  "api::subject.subject",
  "api::topic.topic",
  "plugin::users-permissions.user",
] as const

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
