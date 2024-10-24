// ***********************************************************
// Todos os casos de testes estão no arquivo Excell Growth_Station_TestCase
// A única ação necessário para executar a automação é executar o comando 'npm run cypress' no terminal
// Os testes foram feitos para cobrir casos de sucesso e erro no Login, tanto quanto registro, edição, busca e exclusão de modelos no banco de atividades em diferentes abordagens
// O processo de Login está sendo executado no arquivo commands.ts
// ***********************************************************

describe('template spec', function() {
    beforeEach(function() {
      cy.visit('https://growth-station-client-git-junk-teste-qa-growthmachine.vercel.app/login')
  })
  
    it('Check Title', function() {
      cy.title().should('be.equal', 'Login - Growth Station')
    })
    it('Login user', function() {        
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
    })
    it('Error wrong login user', function() {        
        cy.fillUserLogin('testEmail@growthmachine.com.br', 'senha321')
        cy.get('.text-left').should('be.visible').should('contain', '*E-mail ou senha inválidos')
    })
    it('Error empty password', function() {        
        cy.fillUserLogin('testEmail@growthmachine.com.br', '{backspace}')
        cy.get('.text-left').should('be.visible').should('contain', '*E-mail ou senha inválidos')
    })
    it('Error wrong email', function() {        
        cy.fillUserLogin('testEmail.growthmachine.com.br', 'senha123')
        cy.get('.text-left').should('be.visible').should('contain', '*E-mail ou senha inválidos')
    })
    it('Create a research activity template', function() {     
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.get('[data-testid="create-task-btn"]').click()
        cy.get('[data-testid="task-type-select"]').click()
        cy.contains('div[role="menuitem"]', 'Pesquisa').click()
        cy.get('input[id="title"]').type('Pesquisa de Empresa de Jogos')
        cy.get('[data-testid="task-description-editor"]').type('Procuro empresas que tenham experiência com jogos de Aventura e Ação')
        cy.get('[data-testid="task-save-button"]').click()
        cy.get('[data-testid="task-list-item"]').eq(0).should('contain', 'Pesquisa • Pesquisa de Empresa de Jogos'); 
    })
    it('Duplicate a research activity template', function() { 
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.contains('p', 'Pesquisa • Pesquisa de Empresa de Jogos').parents('[data-testid="task-list-item"]').should('exist')
        cy.get('div.flex.flex-col.gap-4.w-full > div:nth-child(1) [data-testid="task-list-item-dropdown-trigger"]').click()
        cy.get('[data-testid="task-list-item-dropdown-content"]').should('be.visible')
        cy.get('[data-testid="task-list-item-dropdown-duplicate"]').click()
        cy.get('[data-testid="task-list-item"]').eq(0).should('contain', 'Pesquisa • Pesquisa de Empresa de Jogos (Cópia)')   
    })
    it('Edit a research activity template', function() {     
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.contains('p', 'Pesquisa • Pesquisa de Empresa de Jogos (Cópia)').parents('[data-testid="task-list-item"]').should('exist')
        cy.get('div.flex.flex-col.gap-4.w-full > div:nth-child(1) [data-testid="task-list-item-dropdown-trigger"]').click()
        cy.get('[data-testid="task-list-item-dropdown-content"]').should('be.visible')
        cy.get('[data-testid="task-list-item-dropdown-edit"]').click()
        cy.get('input[id="title"]').clear()
        cy.get('input[id="title"]').type('Pesquisa de Empresa de Marketing')
        cy.get('[data-testid="task-description-editor"]').clear()
        cy.get('[data-testid="task-description-editor"]').type('Procuro empresas que tenha portfólio em Redes Sociais')
        cy.get('[data-testid="task-save-button"]').click()
        cy.get('[data-testid="task-list-item"]').eq(0).should('contain', 'Pesquisa • Pesquisa de Empresa de Marketing')  
    })
    it('Research activity template: No title error', function() {  
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.get('[data-testid="create-task-btn"]').click()
        cy.get('[data-testid="task-type-select"]').click()
        cy.contains('div[role="menuitem"]', 'Pesquisa').click()        
        cy.get('[data-testid="task-save-button"]').click()
        cy.get('form.flex.flex-col.gap-6.w-full').find('div:nth-child(3) div.flex.items-center.gap-2.h-8.p-2.transition').should('exist').should('not.have.class', 'border-neutral-300').and('have.class', 'border-red-500')        
    })  
    it('Research activity linkedin: No message error', function() {  
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.get('[data-testid="create-task-btn"]').click()
        cy.get('[data-testid="task-type-select"]').click()
        cy.contains('div[role="menuitem"]', 'LinkedIn').click()
        cy.get('input[id="title"]').type('Empresas de tecnologia avançada')        
        cy.get('button[type="submit"]').click({ force: true })
        cy.get('[data-testid="task-social-message-error"]').should('be.visible').should('contain', '*O campo não pode ficar vazio')
    })
    it('Filter Linkedin templates', function() {
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.get('[data-testid="create-task-btn"]').click()
        cy.get('[data-testid="task-type-select"]').click()
        cy.contains('div[role="menuitem"]', 'LinkedIn').click()
        cy.get('input[id="title"]').type('Empresas de tecnologia avançada')
        cy.get('[data-testid="task-social-message-input"]').type('Olá, tudo bem? Vamos falar sobre sua empresa.')    
        cy.get('button[type="submit"]').click({ force: true })
        cy.get('[data-testid="task-type-filter"]').click() 
        cy.contains('div[role="menuitem"]', 'LinkedIn').click()
        cy.get('div[data-testid="task-list-item"]').each(($item) => {
            cy.wrap($item).find('[data-testid="task-list-item-title"]').should('contain.text', 'LinkedIn')
        })
    })
    it('Search "Games" templates', function() {
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.get('[data-testid="task-search-input"]').type('Jogos')
        cy.get('div[data-testid="task-list-item"]').each(($item) => {
            cy.wrap($item).find('[data-testid="task-list-item-title"]').invoke('text').then((text) => {
              expect(text).to.match(/Jogos/i)
            })        
        })
    })
    it('Delete all templates', function() {
        cy.fillUserLogin('alan_nichols_717@growthmachine.com.br', 'senha123')
        cy.get('main.flex').find('h1').contains('Banco de Atividades').should('be.visible')
        cy.get('[data-testid="task-type-filter"]').click() 
        cy.contains('div[role="menuitem"]', 'Todos').click()
        cy.get('div[data-testid="task-list-item"]').each(($item) => {
            cy.wrap($item).get('div.flex.flex-col.gap-4.w-full > div:nth-child(1) [data-testid="task-list-item-dropdown-trigger"]').click()
                .get('[data-testid="task-list-item-dropdown-content"]').should('be.visible')
                .get('[data-testid="task-list-item-dropdown-delete"]').click()
            cy.wait(500);
        })
        cy.get('[data-testid="no-filtered-tasks-message"]').should('contain.text', 'Não há registro de Atividades com os filtros selecionados.') 
    })
})