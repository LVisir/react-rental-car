import './App.css';
import { useState, useEffect } from "react";
import Customers from "./components/Customers";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from "./components/Login";
import Reservations from "./components/Reservations";
import Header from "./components/Header";
import {Container} from "react-bootstrap";
import AddCustomer from "./components/AddCustomer";
import {CustomersProvider} from "./service/Customer/CustomerContext";
import {BookingsProvider} from "./service/Booking/BookingContext";

const App = () => {
  // UI customers
  const [customers, setCustomers] = useState([]);

  // UI superuser
  const [superusers, setSuperusers] = useState([]);

    /**
     * token che serve per capire se qualcuno si è autenticato
     * nel caso in sessione ci stessa o un Superuser o un Customer allora
     * token settato su true; false altrimenti
     */
  const [token, setToken] = useState((sessionStorage.getItem('customer') !== null || sessionStorage.getItem('superuser') !== null));

  // al caricamento della pagina fetcho i dati dei Customer e dei Superuser
  useEffect(() => {

    // carico i Customer dal server all'UI
    const getCustomers = async () => {
      const customersFromServer = await fetchCustomers();
      setCustomers(customersFromServer)
    }

    // carico i Superuser dal server all'UI
    const getSuperusers = async () => {
      const superusersFromServer = await fetchSuperusers();
      setSuperusers(superusersFromServer)
    }

    getSuperusers()
    getCustomers()
      //console.log(customers)
    }, []);

  // fetch dei Customer dal server
    const fetchCustomers = async () => {
        const response = await fetch('http://localhost:5001/customer')
        const customers = await response.json()

        return customers
    }
    
    // add Customer
    const addCustomer = async (customer) => {
        const response = await fetch(
            'http://localhost:5001/customer',
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(customer),
            }
        )

        // converto in un oggetto json
        // l'id lo mette in automatico
        const data = await response.json()

        // aggiorno tasks aggiungendo il nuovo task
        setCustomers([...customers, data])

    }

  // fetch delle prenotazioni dal server dato un certo cf
  const fetchReservations = async (cf) => {
    const response = await fetch(`http://localhost:5001/prenotazione?customer=${cf}`)
    const prenotazioni = await response.json()

    return prenotazioni
  }

    // logout
    const logout = () => {
        //sessionStorage.removeItem('page')
        sessionStorage.removeItem('superuser')
        sessionStorage.removeItem('customer')

        // aggiorno il token che dichiara se qualcuno si è autenticato
        setToken(false)
    }

    // fetch dei Superuser dal server
    const fetchSuperusers = async () => {
        const response = await fetch('http://localhost:5001/superuser')
        const superusers = await response.json()

        return superusers
    }

    /**
     * Se nessuno si è loggato carica il componente Login
     */
  if(!token){
      return (
          <>
              <CustomersProvider>
                  <BookingsProvider>
                      <Router>
                          <Container>
                              <Routes>
                                  {['/','/:customerCf','/AddCustomer'].map(
                                      (path) =>
                                          <Route
                                              key={path}
                                              path={path}
                                              element={
                                                  <Login customers={customers} superusers={superusers} setToken={setToken}/>
                                              }
                                          />
                                  )}
                              </Routes>
                          </Container>
                      </Router>
                  </BookingsProvider>
              </CustomersProvider>
          </>


      )
  }
  /**
   * Se si è autenticato il Superuser mostra la sua pagina
   */
  else if(sessionStorage.getItem('superuser')!==null){
      return (
          <CustomersProvider>
              <Router>
                  <Header logout={logout}/>
                  <Container className={'my-2'}>
                      <Routes>
                          <Route
                              path={'/'}
                              element={
                                  <Customers
                                      customers={customers}
                                      superusers={superusers}
                                      logout={logout}
                                  />
                              }
                          />
                          <Route
                              path={'/AddCustomer'}
                              element={
                                  <AddCustomer
                                      addCustomer={addCustomer}
                                      customers={customers}
                                  />
                              }
                          />
                      </Routes>
                  </Container>
              </Router>
          </CustomersProvider>
      )
  }
  /**
   * Se si è autenticato il Customer mostra la sua pagina
   * Modificare questo frammento di codice in quanto il path '/:customerCf'
   * lo richiama il Superuser quando vuole controllare le prenotazioni
   * di un certo Customer
   */
  else if(sessionStorage.getItem('customer')!==null){
      return (
          <CustomersProvider>
              <BookingsProvider>
                  <Router>
                      <Header logout={logout}/>
                      <Container  className={'my-2'}>
                          <Routes>
                              {['/','/:customerCf'].map(
                                  (path) =>
                                      <Route
                                          path={path}
                                          key={path}
                                          element={
                                              <Reservations />
                                          }
                                      />
                              )}
                          </Routes>
                      </Container>
                  </Router>
              </BookingsProvider>
          </CustomersProvider>
      )
  }
}

export default App;
