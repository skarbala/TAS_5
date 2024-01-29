const { defineConfig } = require("cypress")

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://furbo.sk/waw/",
    retries: {
      openMode: 1,
      runMode: 0,
    },
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
