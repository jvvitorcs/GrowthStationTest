Cypress.Commands.add('fillUserLogin', (userEmail, userPw) => {        
        cy.get('input[placeholder="E-mail"]').type(userEmail, { delay: 0 })
        cy.get('input[placeholder="Senha"]').type(userPw, { delay: 0 })
        cy.get('.items-start button:nth-child(2)').click()
})

declare namespace Cypress{
        interface Chainable {
                fillUserLogin(userEmail, userPW: string): Chainable<void>
        }
}