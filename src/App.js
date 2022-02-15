import './App.css';
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from "./components/authentication/Login";
import {Container} from "react-bootstrap";
import AddUpdateCustomer from "./components/addUpdate/AddUpdateCustomer";
import {CustomersProvider} from "./context/CustomerContext";
import {BookingsProvider} from "./context/BookingContext";
import Error from "./components/errors/Error";
import LoginPage from "./pages/LoginPage";
/*import { customersPath } from "./service/Customer/CustomerService";*/
/*import { bookingsPath } from "./service/Booking/BookingService";*/
import UsefulFunctions from "./functions/UsefulFunctions";
import BookingService from "./service/Booking/BookingService";
import CustomerService from "./service/Customer/CustomerService";
import SuperuserPage from "./pages/SuperuserPage";
import CustomerPage from "./pages/CustomerPage";

const App = () => {

    // variables to handle the login
    const {logout, token, setToken} = UsefulFunctions()

    /**
     * Se nessuno si è loggato carica il componente Login
     */
      if(!token){
          return (
              <>
                  <LoginPage setToken={setToken} />
              </>
          )
      }
      /**
       * Se si è autenticato il Superuser mostra la sua pagina
       */
      else if(sessionStorage.getItem('superuser')!==null){
          return (
              <>
                  <SuperuserPage logout={logout} />
              </>
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
              <>
                  <CustomerPage logout={logout} />
              </>
          )
      }
    }

    export default App;
