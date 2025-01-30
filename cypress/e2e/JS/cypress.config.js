const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://mock.compliance.h2.opah.com.br/',
    specPattern: 'cypress/e2e/JS/**/*.spec.js',
    supportFile: false,
    setupNodeEvents(on, config) {
      // Registra o plugin do mochawesome
      require("cypress-mochawesome-reporter/plugin")(on);
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    },
  },
});
