import type { Core } from "@strapi/strapi"

import { registerPopulatePageMiddleware } from "./documentMiddlewares/page"
import { registerAdminUserSubscriber } from "./lifeCycles/adminUser"
import { registerUserSubscriber } from "./lifeCycles/user"
import { registerRbacConditions } from "./rbac/conditions"

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    registerAdminUserSubscriber({ strapi })
    registerUserSubscriber({ strapi })

    registerPopulatePageMiddleware({ strapi })

    await registerRbacConditions({ strapi })
  },
}
