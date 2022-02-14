import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import CustomAlert from '../alerts/CustomAlert';
import CustomerService from "../../service/Customer/CustomerService";

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

    const [emptyFieldsAlert, setEmptyFieldsAlert] = useState(false);
    const [wrongEmailAlert, setWrongEmailAlert] = useState(false);
    const [wrongPassAlert, setWrongPassAlert] = useState(false);

    const navigate = useNavigate()

    const { getCustomerByEmail } = CustomerService()

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
            if(!email && !pass){
                setEmptyFieldsAlert(true)
                setWrongPassAlert(false)
                setWrongEmailAlert(false)
            }
            else if(!email){
                setEmptyFieldsAlert(false)
                setWrongPassAlert(false)
                setWrongEmailAlert(true)
                document.getElementById('formBasicPassword').select()
            }
            else if(!pass){
                setEmptyFieldsAlert(false)
                setWrongPassAlert(true)
                setWrongEmailAlert(false)
                document.getElementById('formBasicUsername').select()
            }
            else {
                setEmptyFieldsAlert(true)
                setWrongPassAlert(false)
                setWrongEmailAlert(false)
            }

            return
        }

        const customer = getCustomerByEmail(email)

        // check if the email exists
        Promise.resolve(customer).then(r => {
            if(Object.keys(r).length === 0){
                setEmptyFieldsAlert(false)
                setWrongPassAlert(false)
                setWrongEmailAlert(true)

                document.getElementById('formBasicUsername').select()
                return
            }
            else if(r[0].password !== pass){
                setEmptyFieldsAlert(false)
                setWrongPassAlert(true)
                setWrongEmailAlert(false)

                // select all the password input text
                document.getElementById('formBasicPassword').select()
                return
            }
            else {
                if(r[0].role === 'SUPERUSER') {

                    sessionStorage.setItem('superuser', r[0].cf)
                    navigate('/Customers', {replace: true})
                    // update the token that declare that someone log in
                    setToken(true)
                }
                else {
                    sessionStorage.setItem('customer', customer.cf)

                    /*// fetch of the bookings that it will be the first thing that a Customer will see in his page
                    const bookingsData = await fetchReservationsByCustomerId(bookingsPath,sessionStorage.getItem('customer'))

                    // update the bookings in the BookingContext from [] to what it fetched at the previous operation
                    updateBookings(bookingsData)

                    // update the token to set that a Customer is logged
                    setToken(true)
                    navigate('/')*/
                }
            }
        })

    }

    return (
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
            </Form.Group>
            { wrongEmailAlert && <CustomAlert text={'Email not valid'} /> }
            { emptyFieldsAlert && <CustomAlert text={'Invalid fields'} /> }
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e) => setPass(e.target.value)} placeholder="Password" />
            </Form.Group>
            { wrongPassAlert && <CustomAlert text={'Password not valid'} /> }
            { emptyFieldsAlert && <CustomAlert text={'Invalid fields'} /> }
            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
    )
};

export default Login;