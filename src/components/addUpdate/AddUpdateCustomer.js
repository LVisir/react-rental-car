import {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Button, Container, Form} from "react-bootstrap";
import Header from "../Header";
import CustomAlert from "../alerts/CustomAlert";
import UsefulFunctions from "../../functions/UsefulFunctions";
import CustomerService from "../../service/Customer/CustomerService";

// prende la lista dei customers per poter controllare se può aggiungere un Customer col cf inserito
const AddUpdateCustomer = ({ logout, links, tableConfig, setTableConfig, showSearchButton }) => {

    const { addObject, resetTableConfig, updateObject } = UsefulFunctions()
    const { getCustomerById } = CustomerService()
    const [loading, setLoading] = useState(true);

    const { id } = useParams()

    useEffect(() => {
        const getCustomer = async () => {
            return await getCustomerById(id)
        }
        if(id !== undefined ) {
            const data = getCustomer()
            Promise.resolve(data).then(r => {
                // check if the id passed as a param is valid so check if the object length is higher than 0 otherwise it means no object was returned
                if(Object.keys(r).length>0){
                    setName(r['name'])
                    setSurname(r['surname'])
                    setEmail(r['email'])
                    setBirthDate(r['birthDate'])
                    setPassword(r['password'])
                    setCf(r['cf'])
                    setLoading(false)
                }
                else{
                    // navigate through the error page because the id in the url params doesn't correspond to any customer
                    navigate('*', {replace: true})
                }
            })
        }
        else{
            setLoading(false)
        }
    }, []);


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

        let data
        // if 'id' is set it means an update action has been thrown
        if(id !== undefined){
            data = updateObject({name, surname, email, birthDate, role, password, cf}, tableConfig.startPath+`/${id}`)
        }
        else {
            data = addObject({name, surname, email, birthDate, role, password, cf}, tableConfig.startPath)
        }

        /**
         * conditions that manage when the user tried to add an existing Customer (it is just an example; after the implementation of the BE u must change here
         * using Promise.resolve(...); see useEffect of this component)
         */
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

        resetTableConfig(tableConfig, setTableConfig)
        navigate('/Customers')

        return
    }

    return loading ? (
        <>
            <h1>Loading...</h1>
        </>
        )
    : (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={showSearchButton} throwResetFetch={false} />
            <Container className={'my-2'}>
                <h3>Insert Customer</h3><br/>
                { custAlreadyExists && <CustomAlert text={'Customer already exists'} /> }
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Insert name" value={name} />
                    </Form.Group>
                    { nameAlert && <CustomAlert text={'Name not valid'} /> }
                    <Form.Group className="mb-3" controlId="formSurname">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control type="text" onChange={(e) => setSurname(e.target.value)} placeholder="Insert surname" value={surname} />
                    </Form.Group>
                    { surnameAlert && <CustomAlert text={'Surname not valid'}/> }
                    <Form.Group className="mb-3" controlId="formBirthDate">
                        <Form.Label>Date of birth</Form.Label>
                        <Form.Control type="date" onChange={(e) => setBirthDate(e.target.value)} value={birthDate} />
                    </Form.Group>
                    { birthDateAlert && <CustomAlert text={'Date of birth not valid'} /> }
                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Insert email" value={email} />
                    </Form.Group>
                    { emailAlert && <CustomAlert text={'Email not valid'} /> }
                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} placeholder="Insert password" value={password} />
                    </Form.Group>
                    { passwordAlert && <CustomAlert text={'Password not valid'} /> }
                    <Form.Group className="mb-3" controlId="formCf">
                        <Form.Label>Fiscal code</Form.Label>
                        <Form.Control type="text" onChange={(e) => setCf(e.target.value)} placeholder="Insert fiscal code" value={cf} />
                    </Form.Group>
                    { cfAlert && <CustomAlert text={'Fiscal code not valid'} /> }
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default AddUpdateCustomer;