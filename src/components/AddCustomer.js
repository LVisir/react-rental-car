import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import CustomForm from "./CustomForm";
import data from "bootstrap/js/src/dom/data";

// prende la lista dei customers per poter controllare se può aggiungere un Customer col cf inserito
const AddCustomer = ({addCustomer, customers}) => {

    // settaggi iniziali
    const [nome, setNome] = useState('');
    const [cognome, setCognome] = useState('');
    const [dataNascita, setDataNascita] = useState('');
    const [cf, setCf] = useState('');

    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()
        //controllo che i campi vengano riempiti
        if(!nome || !cognome || !dataNascita || !cf){
            alert('Riempire tutti i campi')
            return
        }

        // se i campi sono stati riempiti
        // controllo che non esista già un Customer con lo stesso cf
        let nCust = customers.filter((elemento) => elemento.cf==={cf})

        // se 'nCust' ha almeno un elemento allora un Customer col cf inserito già esiste
        if(nCust.length>0){
            alert('Customer già esistente')
            return
        }
        else{
            addCustomer({nome,cognome,dataNascita,cf})
        }

        // dopo che hai aggiunto i dati resetta i valori
        setNome('')
        setCognome('')
        setDataNascita('')
        setCf('')

        navigate('/')

    }

    return (
        <>
            <h3>Inserisci Customer</h3><br/>
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3" controlId="formNome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setNome(e.target.value)} placeholder="Inserisci nome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCognome">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control type="text" onChange={(e) => setCognome(e.target.value)} placeholder="Inserisci cognome" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formDataNascita">
                    <Form.Label>Data di Nascita</Form.Label>
                    <Form.Control type="date" onChange={(e) => setDataNascita(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formCf">
                    <Form.Label>Codice fiscale</Form.Label>
                    <Form.Control type="text" onChange={(e) => setCf(e.target.value)} placeholder="Inserisci codice fiscale" />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Aggiungi
                </Button>
            </Form>
        </>
    );
};

export default AddCustomer;