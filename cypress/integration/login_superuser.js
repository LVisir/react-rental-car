describe('login superuser', () => {
    it('superuser loggato', () => {
        // visito l'url dell'app
        cy.visit('http://localhost:3000/')

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /email/i}).type('edoardo.aaab@email.com')

        // aggiungo password
        cy.findByLabelText(/password/i).type('1234')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

    })
})