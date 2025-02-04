const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://mock.compliance.h2.opah.com.br/',
    specPattern: 'cypress/e2e/JS/**/*.spec.js',
    supportFile: false, // Se você não usa um arquivo de suporte (ex: commands.js)
    
    // Configuração dos plugins (Mochawesome + Allure)
    setupNodeEvents(on, config) {
      // Plugin do Mochawesome
      require("cypress-mochawesome-reporter/plugin")(on);
      
      // Plugin do Allure
      allureWriter(on, config);
      
      return config;
    },
    
    // Configuração do Reporter Mochawesome
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
    },
    
    // Variáveis de ambiente do Allure
    env: {
      allure: true,
      allureAddVideoOnPass: true,
    },
  },
});