// cypress/e2e/exemplo.cy.js
describe('Teste de Login', () => {
  it('Deve fazer login com sucesso', () => {
    // Define metadados (opcional)
    cy.allure()
      .severity('critical')
      .tag('login')
      .story('User-Authentication');

    // Passos do teste
    cy.allure().step('Acessar a página de login');
    cy.visit('https://meuapp.com/login');

    cy.allure().step('Preencher credenciais');
    cy.get('#email').type('usuario@exemplo.com');
    cy.get('#senha').type('senha123');

    cy.allure().step('Clicar no botão de login');
    cy.get('button[type="submit"]').click();

    cy.allure().step('Verificar mensagem de sucesso');
    cy.get('.mensagem-sucesso').should('contain', 'Bem-vindo!');
  });
});