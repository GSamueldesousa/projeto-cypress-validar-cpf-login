🧪 Projeto Cypress - Validação de CPF no Login

Este projeto automatiza testes de validação de CPF no login de um site da CAF, voltado para jogos de apostas regulares (18+), utilizando Cypress como framework de testes.

🎯 Objetivo

Garantir que o sistema valide corretamente diferentes tipos de CPF durante o processo de login, respeitando as regras de negócio da plataforma.

📌 Cenários de Testes Automatizados

- ✅ CPF válido: Deve permitir o login
- ❌ CPF inválido: Deve exibir mensagem de erro
- ⚠️ CPF de pessoa falecida: Deve ser rejeitado
- 🚫 CPF de menor de idade: Deve ser bloqueado

🚀 Tecnologias Utilizadas

- Cypress (JavaScript)
- VS Code
- Node.js
- Git/GitHub
- (Em breve: versão com Selenium + Python)

📂 Estrutura do Projeto
📁 cypress
┣ 📂 integration
┃ ┣ validar_cpf_valido.spec.js
┃ ┣ validar_cpf_falecido.spec.js
┃ ┣ validar_cpf_menor_idade.spec.js
┃ ┗ validar_cpf_invalido.spec.js
┣ cypress.json
┣ package.json


▶️ Como Executar os Testes

1. Clone o repositório  
   `git clone https://github.com/GSamueldesousa/projeto-cypress-validar-cpf-login`

2. Instale as dependências  
   `npm install`

3. Execute os testes  
   `npx cypress open`  
   ou, para rodar em modo headless:  
   `npx cypress run`

📈 Melhorias Futuras

- Integração com CI/CD
- Testes com CPF gerado dinamicamente
- Automação com Selenium + Python para comparação de ferramentas

👤 Autor

Samuel Ferreira de Sousa  
[LinkedIn](https://www.linkedin.com/in/samuelferreiradesousa/)  
[GitHub](https://github.com/GSamueldesousa)  
📧 samuel.ferreiradesousa@gmail.com
