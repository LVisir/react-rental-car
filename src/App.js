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
/*import { customersPath } from "./service/Customer/CustomerService";*/
/*import { bookingsPath } from "./service/Booking/BookingService";*/
import UsefulFunctions from "./functions/UsefulFunctions";
import BookingService from "./service/Booking/BookingService";
import CustomerService from "./service/Customer/CustomerService";
import SuperuserPage from "./pages/SuperuserPage";
import CustomerPage from "./pages/CustomerPage";

const App = () => {

  // UI customers
  const [customers, setCustomers] = useState([]);

  const { bookingsPath } = BookingService()

    // variables to handle the login
    const {logout, token, setToken} = UsefulFunctions()

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
              <SuperuserPage logout={logout} />
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
                  <CustomerPage logout={logout} />
              </BookingsProvider>
          </CustomersProvider>
      )
  }
}

export default App;
