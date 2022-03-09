import './App.css';
import LoginPage from "./pages/LoginPage";
import UsefulFunctions from "./functions/UsefulFunctions";
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
