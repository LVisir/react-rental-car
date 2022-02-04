import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import {useCustomers, useUpdateCustomers} from "../context/CustomerContext";
import CustomerService from "../service/Customer/CustomerService";
import Header from "./Header";

// prende la lista dei customers per poter controllare se può aggiungere un Customer col cf inserito
const AddCustomer = ({logout}) => {

    // fetch customers from Context
    let customers = useCustomers()

    // hook to update the Customers in the Context
    const updateCustomers = useUpdateCustomers()

    const { addCustomer, getCustomers } = CustomerService()

    // settaggi iniziali
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dataNascita, setDataNascita] = useState('');
    const [cf, setCf] = useState('');

    // customer role
    const role = 'CUSTOMER'

    const navigate = useNavigate()

    /**
     * The goal of this useEffect is to check if the list of Customers in the Context are not empty
     * if not it means maybe that the page was reloaded so the Context lose their data, so we have to fetch them again
     * and update the Context with this fetched data;
     * otherwise use the data in the Context;
     */
    useEffect(async () => {
        if (customers.length === 0) {
            customers = await getCustomers()
            updateCustomers(customers)
        }
    }, []);


    const onSubmit = (e) => {
        e.preventDefault()
        //controllo che i campi vengano riempiti
        if(!nome || !cognome || !dataNascita || !cf || !email || !password){
            alert('Riempire tutti i campi')
            return
        }

        // se i campi sono stati riempiti
        // controllo che non esista già un Customer con lo stesso cf
        let nCust = customers.filter((elemento) => elemento.cf==={cf})

        // controllo che non esista già un Customer con la stessa email
        let nEmail = customers.filter((elemento) => elemento.email==={email})

        // se 'nCust' ha almeno un elemento allora un Customer col cf inserito già esiste
        if(nCust.length>0){
            alert('Customer con tale codice fiscale già esistente')
            return
        }
        else if(nEmail.length>0){
            alert('Customer con tale email già esistente')
        }
        else{
            addCustomer({ cf, nome, cognome, dataNascita, role, email, password})
        }

        // dopo che hai aggiunto i dati resetta i valori
        setNome('')
        setCognome('')
        setDataNascita('')
        setEmail('')
        setPassword('')
        setCf('')

        navigate('/')

    }

    return (
        <>
            <Header logout={logout} />
            <Container className={'my-2'}>
                <h3>Inserisci Customer</h3><br/>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setNome(e.target.value)} placeholder="Inserisci name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCognome">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" onChange={(e) => setCognome(e.target.value)} placeholder="Inserisci cognome" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formDataNascita">
                        <Form.Label>Data di Nascita</Form.Label>
                        <Form.Control type="date" onChange={(e) => setDataNascita(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Inserisci email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Inserisci password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formCf">
                        <Form.Label>Codice fiscale</Form.Label>
                        <Form.Control type="text" onChange={(e) => setCf(e.target.value)} placeholder="Inserisci codice fiscale" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Aggiungi
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default AddCustomer;