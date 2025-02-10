describe('Validação de CPFs de falecidos para BETs', () => {
  const bets = ['H2Bet', 'ClaroBet', 'SupremaBet', 'MaximaBet', 'SeuBet', 'XpGames']; // Lista de BETs
  const baseUrl = 'https://mock.compliance.h2.opah.com.br/'; // URL do ambiente de teste

  const falecidos = [
    //{ nome: 'Antonio Piranema M Pedrosa', cpf: '00769266487' },
    //{ nome: 'Antonio de Bulhoes Barbosa', cpf: '11411473434' },
    { nome: 'Alex Vilaca Dos Santos', cpf: '13390147420' },
  ];

  // Usa sessão para evitar visitas repetidas e garantir estado inicial
  before(() => {
    cy.session('staging-session', () => {
      cy.visit(baseUrl);
      cy.get('select[title="Selecione o Ambiente"]', { timeout: 15000 }).select('Staging');
    });
  });

  falecidos.forEach((pessoa) => {
    bets.forEach((bet) => {
      it(`Valida o CPF ${pessoa.cpf} (falecido) na BET ${bet}`, () => {
        cy.visit(baseUrl); // Acessa a página inicial com a sessão já configurada

        // Seleciona o ambiente "Staging"
        cy.get('select[title="Selecione o Ambiente"]', { timeout: 15000 })
          .should('be.visible')
          .select('Staging');

        // Seleciona a BET
        cy.get('select[title="Selecione uma BET"]', { timeout: 15000 })
          .should('be.visible')
          .select(bet)
          .should('have.value', bet);

        // Seleciona o Template
        cy.get('select[title="Selecione o Template"]', { timeout: 15000 })
          .should('be.visible')
          .select('1');

        // Preenche o CPF
        cy.get('input[name="cpf"]', { timeout: 15000 })
          .should('be.visible')
          .clear()
          .type(pessoa.cpf);

        // Intercepta a requisição e espera a resposta
        cy.intercept('POST', '**/session/created/**').as('sessionCreated');
        cy.get('#submit_button', { timeout: 15000 })
          .should('be.visible')
          .click();

        cy.wait('@sessionCreated').then((interception) => {
          if (interception && interception.response) {
            const statusCode = interception.response.statusCode;
            cy.log(`Status da requisição para ${bet} com CPF ${pessoa.cpf}: ${statusCode}`);
            expect(statusCode).to.be.oneOf([400, 500]); // Esperado erro (400 ou 500)
          } else {
            cy.log('A resposta da interceptação não foi recebida corretamente');
          }
        });

        cy.log(`Teste finalizado para CPF ${pessoa.cpf} na BET ${bet}.`);
      });
    });
  });
});
