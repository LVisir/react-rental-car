/*
describe('test rental car', () => {

    /!**
     * Log in Superuser
     *!/
    it('superuser log in', () => {
        // visito l'url dell'app
        cy.visit('http://localhost:3000/')

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /email/i}).type('edoardo.aaab@email.com')

        // aggiungo password
        cy.findByLabelText(/password/i).type('1234')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

    })

    /!**
     * Add Customer
     * 1 - go to /AddUpdateCustomer
     * 2 - fill the form
     * 3 - add
     *!/
    it('add customer', () => {

        cy.findByText(/aggiungi/i).click()

        cy.findByRole('textbox', {  name: /name/i}).type('test3')

        cy.findByRole('textbox', {  name: /cognome/i}).type('test3')

        cy.findByLabelText(/data di nascita/i).type('1999-01-01')

        cy.findByRole('textbox', {  name: /email/i}).type('test3')

        cy.findByLabelText(/password/i).type('test3')

        cy.findByRole('textbox', {  name: /codice fiscale/i}).type('test3')

        cy.findByRole('button', {  name: /aggiungi/i}).click()

    })

    /!**
     * Logout
     *!/
    it.skip('logout', () => {

        // faccio il logout
        cy.findByText(/logout/i).click()

    })

    /!**
     * Log in Customer
     *!/
    it.skip('customer loggato', () => {
        // visito l'url dell'app
        cy.visit('http://localhost:3000/')

        // aggiungo l'username
        cy.findByRole('textbox', {  name: /email/i}).type('kenneth.knt@email.com')

        // aggiungo password
        cy.findByLabelText(/password/i).type('1234')

        // premo tasto login
        cy.findByRole('button', {  name: /login/i}).click()

        // clicco filtri
        cy.findByRole('button', {  name: /filtri/i}).click()

        // clicco filtri
        cy.findByRole('button', {  name: /filtri/i}).click()

        // visito un url non esistente
        cy.visit('http://localhost:3000/undefinedUrl')

        // torno alla home
        cy.findByRole('link', {  name: /go home/i}).click()
    })

    /!**
     * Logout
     *!/
    it.skip('logout', () => {

        // faccio il logout
        cy.findByText(/logout/i).click()

    })
})*/
