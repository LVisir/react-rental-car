describe('login customer', () => {
    it('customer loggato', () => {
        // visito l'url dell'app
        cy.visit('http://localhost:3000/')

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /email/i}).type('kenneth.knt@email.com')

        // aggiungo password
        cy.findByLabelText(/password/i).type('1234')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

        cy.findByRole('button', {  name: /filtri/i}).click()

        cy.findByRole('button', {  name: /filtri/i}).click()

        // visito un url non esistente
        cy.visit('http://localhost:3000/undefinedUrl')

        // torno alla home
        cy.findByRole('link', {  name: /go home/i}).click()
    })
})