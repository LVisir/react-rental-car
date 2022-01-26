describe('login superuser', () => {
    it('superuser loggato', () => {
        // visito l'url dell'app
        cy.visit('http://localhost:3000/')

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /username/i}).type('Edoardo')

        // aggiungo password
        cy.findByLabelText(/password/i).type('AAAB')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

    })
})