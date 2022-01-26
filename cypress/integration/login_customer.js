describe('login customer', () => {
    it('customer loggato', () => {
        // visito l'url dell'app
        cy.visit('http://localhost:3000/')

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /username/i}).type('Kenneth')

        // aggiungo password
        cy.findByLabelText(/password/i).type('KNT')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

    })
})