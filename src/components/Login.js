import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import {useUpdateCustomers } from '../service/Customer/CustomerContext';
import { getCustomers, customersPath } from '../service/Customer/CustomerService';
import {useUpdateBookings} from '../service/Booking/BookingContext';
import { fetchReservationsByCustomerId, bookingsPath } from '../service/Booking/BookingService';

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
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate()

    // hook to update the customers in the CustomersContext
    const updateCustomers = useUpdateCustomers()

    // hook to update the bookings in the BookingsContext
    const updateBookings = useUpdateBookings()

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
        if (!email || !pass) {
            alert('Inserire i dati')
            return
        }

        // wait for the array from Promise object
        const customersData = await getCustomers(customersPath) // now custs contains a list of Customers

        // ricavo il Customer con username e pass inseriti nella form (username, pass) --> (nome, cf)
        /*let correctUsername = customersData.reduce((a, b) => a = b.email === email ? b.cf : a, 0)
        let correctPass = customersData.reduce((a, b) => a = b.password === pass ? b.cf : a, 0)*/
        let customer = customersData.reduce((a, b) => a = b.email === email ? b : a, 0)

        // controllo se i dati sono corretti ed esistono
        if (customer===0) {
            alert('Username e/o Password non corretti')
            return
        } else {
            if(customer.password!==pass){
                alert('Username e/o Password non corretti')
                return
            }
        }

        //sessionStorage.setItem('page', window.history.length.toString())

        // controllo se è un Superuser o un Customer
        /*let superuser = superusers.reduce((a, b) => a = b.customer === correctPass ? b.customer : a, 0)*/


        // se Superuser salvo in sessione e porto alla sua pagina, viceversa per il Customer
        if (customer.role === 'SUPERUSER') {
            sessionStorage.setItem('superuser', customer.cf)

            // update the customers from the CustomersContext (this function takes a list of Customers and because it is an useState, automatically it will update the customers in the Context)
            updateCustomers(customersData)

            // aggiorno il token che dichiara se qualcuno si è autenticato
            setToken(true)
            navigate('/')
        } else {
            sessionStorage.setItem('customer', customer.cf)

            // fetch of the bookings that it will be the first thing the a Customer will see in his page
            const bookingsData = await fetchReservationsByCustomerId(bookingsPath,sessionStorage.getItem('customer'))

            // update the bookings in the BookingContext from [] to what it fetched at the previous operation
            updateBookings(bookingsData)

            // update the token to set that a Customer is logged
            setToken(true)
            navigate('/')
        }

    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Inserisci email" />
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