import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useUpdateCustomers } from '../service/Customer/CustomerContext';
import {getCustomers} from '../service/Customer/CustomerService';
import {useUpdateBookings} from '../service/Booking/BookingContext';
import { fetchReservationsByCustomerId } from '../service/Booking/BookingService';

/**
 * Pagina di login che si carica tutti i Customer e i Superuser
 * per verificare se gli username e password inseriti sono corretti
 * @param customers
 * @param superusers
 * @returns {JSX.Element}
 * @constructor
 */
const Login = ({superusers, setToken}) => {

    // creo tali useState per poter legare i campi di input a delle variabili che poi controllo
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate()

    // hook to update the customers in the CustomersContext
    const updateCustomers = useUpdateCustomers()

    // hook to update the bookings in the BookingsContext
    const updateBookings = useUpdateBookings()

    // path where to fetch the list of Customers
    const customersPath = 'http://localhost:5001/customer'

    // path where to fetch the list of Bookings
    const bookingsPath = 'http://localhost:5001/prenotazione'

    /**
     * Phases:
     * - Check if the user fill all the fields, otherwise error
     * - fetch all the Customer
     * - check if it exists a Customer with the given data, otherwise error
     * - update in the context the list of Customer
     * - check if this Customer is a Superuser:
     *  - if yes, bring to the Superuser page
     *  - otherwise, update his bookings in the context and bring to the Customer page
     * @param e
     * @returns {Promise<void>}
     */
    const onSubmit = async (e) => {
        e.preventDefault()
        if (!username || !pass) {
            alert('Inserire i dati')
            return
        }

        // wait for the array from Promise object
        const customersData = await getCustomers(customersPath) // now custs contains a list of Customers

        // update the customers from the CustomersContext (this function takes a list of Customers and because it is an useState, automatically it will update the customers in the Context)
        updateCustomers(customersData)

        // ricavo il Customer con username e pass inseriti nella form (username, pass) --> (nome, cf)
        let correctUsername = customersData.reduce((a, b) => a = b.nome === username ? b.cf : a, 0)
        let correctPass = customersData.reduce((a, b) => a = b.cf === pass ? b.cf : a, 0)

        // controllo se i dati sono corretti ed esistono
        if (correctPass !== 0 && correctPass !== 0) {
            if (correctPass !== correctUsername) {
                alert('Username e/o Password non corretti')
                return
            }
        } else {
            alert('Username e/o Password non corretti')
            return
        }

        //sessionStorage.setItem('page', window.history.length.toString())

        // controllo se è un Superuser o un Customer
        let superuser = superusers.reduce((a, b) => a = b.customer === correctPass ? b.customer : a, 0)

        // se Superuser salvo in sessione e porto alla sua pagina, viceversa per il Customer
        if (superuser !== 0) {
            sessionStorage.setItem('superuser', superuser)

            // aggiorno il token che dichiara se qualcuno si è autenticato
            setToken(true)
            navigate('/')
        } else {
            sessionStorage.setItem('customer', correctUsername)

            const bookingsData = await fetchReservationsByCustomerId(bookingsPath,sessionStorage.getItem('customer'))
            updateBookings(bookingsData)

            // aggiorno il token che dichiara se qualcuno si è autenticato
            setToken(true)
            navigate('/')
        }

    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={(e) => setUsername(e.target.value)} placeholder="Inserisci username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
};

export default Login;