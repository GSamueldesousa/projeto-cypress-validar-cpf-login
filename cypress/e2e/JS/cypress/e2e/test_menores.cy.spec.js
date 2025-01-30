describe('Validação de CPFs de menores de 18 anos para BETs', () => {
  const bets = ['H2Bet', 'ClaroBet', 'SupremaBet', 'MaximaBet', 'SeuBet', 'XpGames']; // Lista de BETs
  const baseUrl = 'https://mock.compliance.h2.opah.com.br/'; // URL do ambiente de teste

  const menoresDe18 = [
      { nome: 'Lys da Silva Ferreira', cpf: '09627258202'},
      { nome: 'Mariele Peres de Lima', cpf: '09720927224'},
      { nome: 'Randerson Anaquiri Oliveira', cpf: '07214273241'},
  ];

  // Testes para menores de 18 anos
  menoresDe18.forEach((pessoa) => {
      bets.forEach((bet) => {
          it(`Valida o CPF ${pessoa.cpf} (menor de 18 anos) na BET ${bet}`, () => {
              cy.log(`Testando BET: ${bet}`);
              cy.log(`Pessoa: ${pessoa.nome}, CPF: ${pessoa.cpf}, Nascimento: ${pessoa.nascimento}`);

              // Acesse o site
              cy.visit(baseUrl);

              // Selecionando o ambiente
              cy.get('select[title="Selecione o Ambiente"]', { timeout: 10000 })
                  .should('be.visible')
                  .select('Staging');

              // Selecionando a BET
              cy.get('select[title="Selecione uma BET"]', { timeout: 10000 })
                  .should('be.visible')
                  .select(bet);

              cy.get('select[title="Selecione uma BET"]')
                  .should('have.value', bet);

              // Selecionando o Template
              cy.get('select[title="Selecione o Template"]', { timeout: 10000 })
                  .should('be.visible')
                  .select('1');

              // Preenchendo CPF
              cy.get('input[name="cpf"]', { timeout: 10000 })
                  .clear()
                  .type(pessoa.cpf);

              // Interceptando a requisição para verificar o status
              cy.intercept('POST', '**/session/created/**').as('sessionCreated');

              // Clicando no botão de enviar
              cy.get('#submit_button', { timeout: 10000 })
                  .should('be.visible')
                  .click();

              // Esperando pela resposta da requisição
              cy.wait('@sessionCreated').then((interception) => {
                  const statusCode = interception.response.statusCode;
                  cy.log(`Status da requisição para ${bet} com CPF ${pessoa.cpf}: ${statusCode}`);

                  // Verifica o status da resposta
                  expect(statusCode).to.be.oneOf([400, 500]); // Esperado erro (400 ou 500)
              });

              cy.log(`Teste finalizado para CPF ${pessoa.cpf} na BET ${bet}.`);
          });
      });
  });
});
