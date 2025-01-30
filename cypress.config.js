const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://h2.opah.com.br', // Define a URL base
    specPattern: 'cypress/e2e/JS/**/*.spec.js', // Padrão para encontrar arquivos de teste
    supportFile: false, // Desativando o arquivo de suporte se não for necessário
    setupNodeEvents(on, config) {
      // Implemente aqui os listeners de eventos do nó, se necessário
    },
    reporter: 'mochawesome', // Adicionando o reporter
    reporterOptions: {
      reportDir: 'cypress/reports', // Diretório onde os relatórios serão salvos
      overwrite: false,
      html: true, // Para gerar relatórios HTML
      json: true, // Para gerar relatórios JSON
    },
  },
});
