describe('login superuser and after customer', () => {
    it('superuser poi customer loggato', () => {
        // visito l'url dell'app
        cy.visit('http://localhost:3000/')

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /username/i}).type('Edoardo')

        // aggiungo password
        cy.findByLabelText(/password/i).type('AAAB')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

        // faccio il logout per ri-loggarmi come Customer
        cy.findByText(/logout/i).click()

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /username/i}).type('Kenneth')

        // aggiungo password
        cy.findByLabelText(/password/i).type('KNT')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

    })
})