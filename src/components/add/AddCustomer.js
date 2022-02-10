import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import Header from "../Header";
import CustomAlert from "../alerts/CustomAlert";
import UsefulFunctions from "../../functions/UsefulFunctions";

// prende la lista dei customers per poter controllare se può aggiungere un Customer col cf inserito
const AddCustomer = ({ logout, links, tableConfig, setTableConfig, showSearchButton }) => {

    const { addObject } = UsefulFunctions()

    // form fields useState
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [cf, setCf] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');

    // alert form fields useState
    const [nameAlert, setNameAlert] = useState(false);
    const [surnameAlert, setSurnameAlert] = useState(false);
    const [cfAlert, setCfAlert] = useState(false);
    const [emailAlert, setEmailAlert] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [birthDateAlert, setBirthDateAlert] = useState(false);

    // alert if the user tried to insert an existing Customer
    const [custAlreadyExists, setCustAlreadyExists] = useState(false);

    // customer role
    const role = 'CUSTOMER'

    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        // field blank control
        if(!name || !surname || !cf || !email || !password || !birthDate){
            !name ? setNameAlert(true) : setNameAlert(false)
            !surname ? setSurnameAlert(true) : setSurnameAlert(false)
            !cf ? setCfAlert(true) : setCfAlert(false)
            !email ? setEmailAlert(true) : setEmailAlert(false)
            !password ? setPasswordAlert(true) : setPasswordAlert(false)
            !birthDate ? setBirthDateAlert(true) : setBirthDateAlert(false)
            return
        }

        const data = addObject({name, surname, email, birthDate, role, password, cf}, tableConfig.startPath)

        // conditions that manage when the user tried to add an existing Customer
        if(data === null){
            setCustAlreadyExists(true)
            return
        }

        setCustAlreadyExists(false)

        setName('')
        setSurname('')
        setBirthDate('')
        setCf('')
        setEmail('')
        setPassword('')
        setNameAlert(false)
        setSurnameAlert(false)
        setBirthDateAlert(false)
        setCfAlert(false)
        setEmailAlert(false)
        setPasswordAlert(false)

        navigate('/Customers')

        return
        /*// se i campi sono stati riempiti
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

        navigate('/')*/

    }

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={showSearchButton} throwResetFetch={false}/>
            <Container className={'my-2'}>
                <h3>Insert Customer</h3><br/>
                {custAlreadyExists && <CustomAlert text={'Customer already exists'} /> }
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Insert name" />
                    </Form.Group>
                    {nameAlert && <CustomAlert text={'Name not valid'} />}
                    <Form.Group className="mb-3" controlId="formSurname">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSurname(e.target.value)} placeholder="Insert surname" />
                    </Form.Group>
                    {surnameAlert && <CustomAlert text={'Surname not valid'}/>}
                    <Form.Group className="mb-3" controlId="formBirthDate">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date" onChange={(e) => setBirthDate(e.target.value)} />
                    </Form.Group>
                    {birthDateAlert && <CustomAlert text={'Date of birth not valid'} />}
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Insert email" />
                    </Form.Group>
                    {emailAlert && <CustomAlert text={'Email not valid'} />}
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Insert password" />
                    </Form.Group>
                    {passwordAlert && <CustomAlert text={'Password not valid'} />}
                    <Form.Group className="mb-3" controlId="formCf">
                        <Form.Label>Fiscal code</Form.Label>
                        <Form.Control type="text" onChange={(e) => setCf(e.target.value)} placeholder="Insert fiscal code" />
                    </Form.Group>
                    {cfAlert && <CustomAlert text={'Fiscal code not valid'} />}
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default AddCustomer;