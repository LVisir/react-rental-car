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
import Error from "./components/Error";
import LoginPage from "./pages/LoginPage";
import { customersPath } from "./service/Customer/CustomerService";
import { bookingsPath } from "./service/Booking/BookingService";
import UsefulFunctions from "./functions/UsefulFunctions";

const App = () => {
  // UI customers
  const [customers, setCustomers] = useState([]);

  const {logout, token, setToken} = UsefulFunctions()

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

/*    // logout
    const logout = () => {
        //sessionStorage.removeItem('page')
        sessionStorage.removeItem('superuser')
        sessionStorage.removeItem('customer')

        // aggiorno il token che dichiara se qualcuno si è autenticato
        setToken(false)
    }*/

    /**
     * Se nessuno si è loggato carica il componente Login
     */
  if(!token){
      return (
          <>
              <CustomersProvider>
                  <BookingsProvider>
                     <LoginPage setToken={setToken} />
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
                  <Header logout={logout} />
                  <Container className={'my-2'}>
                      <Routes>
                          <Route path="*" element={<Error />} />
                          <Route path={'/'} element={<Customers customersPath={customersPath}/>}/>
                          <Route path={'/AddCustomer'} element={<AddCustomer addCustomer={addCustomer}customers={customers}/>}/>{/* attento qui che customers non esiste più in App.js */}
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
                      <Header logout={logout} />
                      <Container  className={'my-2'}>
                          <Routes>
                              <Route path='*' element={<Error />} />
                              <Route path={'/'} element={<Reservations bookingsPath={bookingsPath} />}/>
                              {/* Quando farai questo Route dentro :customerCf ci può finire qualsiasi cosa
                              perciò fai un controllo se il cf messo è valido altrimenti porta ad una pagina di errore*/}
                              {/*<Route path={'/:customerCf'} element={<Reservations bookingsPath={bookingsPath} />}/>*/}
                          </Routes>
                      </Container>
                  </Router>
              </BookingsProvider>
          </CustomersProvider>
      )
  }
}

export default App;
