describe('Login no Sistema', () => {
  const validEmail = 'samuel.sousa@opah.com.br';
  const validPassword = 'Opah1234@';

  beforeEach(() => {
    // Limpa cookies e storage antes de cada teste
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('https://backoffice.staging.complianceservice.app/sign-in');
  });

  it('Deve exibir mensagem de erro para senha incorreta', () => {
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type('SenhaIncorreta123');
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro aparece
    cy.contains('Credenciais inválidas').should('be.visible');
  });

  it('Deve exibir mensagem de erro para credenciais inválidas', () => {
    cy.get('input[name="email"]').type('usuario.invalido@teste.com');
    cy.get('input[name="password"]').type('Senha1234');
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro aparece
    cy.contains('Credenciais inválidas').should('be.visible');
  });

  it('Deve exibir mensagem de erro para campos em branco', () => {
    cy.get('button[type="submit"]').click();

    // Verifica se a mensagem de erro aparece
    cy.contains('Por favor, preencha todos os campos').should('be.visible');
  });

  it('Deve realizar login com credenciais válidas', () => {
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    // Verifica o redirecionamento para a página de 2FA
    cy.url().should('include', '/2fa');
  });
});
