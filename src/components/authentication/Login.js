import {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import CustomAlert from '../alerts/CustomAlert';
import CustomerService from "../../service/Customer/CustomerService";
import Paths from "../../Paths";
import jwt_decode from "jwt-decode";

/**
 * Pagina di login che si carica tutti i Customer e i Superuser
 * per verificare se gli username e password inseriti sono corretti
 * @param customers
 * @param superusers
 * @returns {JSX.Element}
 * @constructor
 */
const Login = ({setToken}) => {

    // creo tali useState per poter legare i campi di input a delle variabili che poi controllo
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [customAlert, setCustomAlert] = useState(false);
    const [textCustomAlert, setTextCustomAlert] = useState('');

    const navigate = useNavigate()

    const { basePath } = Paths()

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

        setCustomAlert(prevState => {
            return prevState && false
        })

        if (!email || !pass) {

            setTextCustomAlert('The field mustn\'t be empty')
            setCustomAlert(true)

            return
        }

        const user = {
            email: email,
            password: pass
        }

        // try to log in
        await fetch(
            basePath+'/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded',
                },
                body: `email=${user.email}&password=${user.password}`
            }
        ).then(async r => {
            if (!r.ok) {

                setTextCustomAlert('Some credentials are wrong')

                setCustomAlert(true)

            }
            else {

                let loginResponse = await r.json()

                let decode = jwt_decode(loginResponse.access_token)

                await fetch(
                    basePath+`/users/email/${decode.sub}`,{
                        method: 'GET',
                        headers: {
                            'Authorization': `LoginToken ${loginResponse.access_token}`
                        }
                    }
                ).then(async answer => {
                    if (!answer.ok) {

                        const error = await answer.json()

                        setTextCustomAlert(error.error)

                        setCustomAlert(true)

                    }
                    else{
                        const userAuthenticated = await answer.json()

                        if (decode.roles[0] === 'SUPERUSER'){

                            sessionStorage.setItem('superuser', userAuthenticated.idUser)

                            navigate('/Customers', {replace: true})

                        }
                        else if(decode.roles[0] === 'CUSTOMER'){

                            sessionStorage.setItem('customer', userAuthenticated.idUser)

                            navigate('/Bookings', {replace: true})

                        }

                        sessionStorage.setItem('tokenJWT', loginResponse.access_token)

                        setToken(true)

                    }
                }).catch((e) => {

                    setTextCustomAlert('Internal Server Error')

                    setCustomAlert(true)

                    console.log(e)

                })

            }
        }).catch((e) => {

            setTextCustomAlert('Internal Server Error')

            setCustomAlert(true)

            console.log(e)

        })

    }

    return (
        <Form onSubmit={onSubmit}>
            { customAlert && <CustomAlert text={textCustomAlert} /> }
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
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