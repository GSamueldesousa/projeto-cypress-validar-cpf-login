describe('Validação de CPFs para BETs sequenciais', () => {
    const bets = ['H2Bet', 'ClaroBet', 'SupremaBet', 'MaximaBet', 'SeuBet', 'XpGames']; // Lista das BETs
    const validCpfs = [
        { name: 'Larissa Lima Nascimento', cpf: '73263052187' },
        { name: 'Eduardo Augusto Gouveia', cpf: '05008776886' },
        { name: 'Samuel Ferreira de Sousa', cpf: '35856495802' },

    ]; // Lista de CPFs válidos

    beforeEach(() => {
        cy.visit('https://mock.compliance.h2.opah.com.br/'); // Visita o site
        cy.get('select[title="Selecione o Ambiente"]')
            .should('be.visible')
            .select('Staging');
        cy.wait(5000); // Espera para carregamento inicial
    });

    it('Deve validar CPFs válidos para cada BET', () => {
        bets.forEach((bet) => {
            cy.log(`Validando CPFs para a BET: ${bet}`);

            // Espera e seleciona a BET
            cy.get('select[title="Selecione uma BET"]', { timeout: 10000 })
                .should('be.visible')
                .select(bet);

            validCpfs.forEach(({ name, cpf }) => {
                cy.log(`Testando CPF de ${name} (${cpf}) na BET: ${bet}`);

                // Espera até o elemento estar disponível antes de interagir
                cy.get('select[title="Selecione o Template"]', { timeout: 8000 })
                    .should('be.visible')
                    .select('1');

                cy.get('input[name="cpf"]')
                    .clear()
                    .type(cpf);

                cy.get('#submit_button').click();

                cy.get('body').then(($body) => {
                    if ($body.find('.error-message').length > 0) {
                        cy.get('.error-message').should('be.visible').then(($msg) => {
                            const messageText = $msg.text();
                            if (messageText.includes('CPF inválido')) {
                                cy.log(`⚠️ CPF inválido (${cpf}) para a BET: ${bet}`);
                            } else {
                                cy.log(`✅ Resposta inesperada: ${messageText}`);
                            }
                        });
                    } else {
                        cy.log(`✅ CPF válido (${cpf}) para a BET: ${bet}`);
                    }
                });

                cy.wait(3000); // Tempo de espera antes do próximo CPF
            });

            // Aguardar antes de passar para a próxima BET
            cy.wait(5000); // Ajuste o tempo conforme necessário
        });
    });
});
