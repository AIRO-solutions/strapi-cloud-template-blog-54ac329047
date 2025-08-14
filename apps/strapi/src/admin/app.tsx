import { setPluginConfig } from "@_sh/strapi-plugin-ckeditor"

import type { StrapiApp } from "@strapi/strapi/admin"

// import "@repo/design-system/styles.css"

import { defaultCkEditorConfig } from "./ckeditor/configs"
import { cs } from "./cs"
import InternalJobsRunActions from "./extensions/InternalJobsRunActions"

export default {
  config: {
    locales: ["en", "cs"],
    translations: {
      cs,
    },
  },
  bootstrap(app: StrapiApp) {
    app.getPlugin("content-manager").injectComponent("listView", "actions", {
      name: "InternalJobsRunAction",
      Component: InternalJobsRunActions,
    })
  },
  register() {
    setPluginConfig({ presets: [defaultCkEditorConfig] })
  },
}
