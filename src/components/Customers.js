import Button from './Button';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from './CustomTable';
import { useCustomers, useUpdateCustomers } from '../service/Customer/CustomerContext';
import CustomerService from '../service/Customer/CustomerService';
import Header from './Header';
import {Container} from 'react-bootstrap';

/**
 * Page of Superuser
 * Component that uses the list Customer in the Context and use the CustomeTable component to show it
 * @param customers
 * @param logout
 * @returns {false|JSX.Element}
 * @constructor
 */
const Customers = ({logout}) => {

    // header of the table
    const campi = ['nome','cognome','dataNascita','cf', 'email']

    const [customers, setCustomers] = useState([]);

    const [nome, setNome] = useState(false);
    const [cognome, setCognome] = useState(false);
    const [dataNascita, setDataNascita] = useState(false);
    const [cf, setCf] = useState(false);
    const [email, setEmail] = useState(false);

    // usato per gestire il logout
    const navigate = useNavigate()

    // fetch list of Customers
    const { getCustomers, customQueryCustomers } = CustomerService()

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    // configuration for the table where the data will be showed
    const tableConfigurations =
        {
            fieldNameDb: ['nome','cognome','dataNascita','cf', 'email'],
            fieldNameTableHeader: ['Nome', 'Cognome', 'Data nascita', 'Cod. fiscale', 'Email'],
            sortableFields: [{
                field: 'nome',
                orderBy: {nome},
                setState() {
                    setNome(!nome)
                }
            }, {
                field: 'cognome',
                orderBy: {cognome},
                setState() {
                    setCognome(!cognome)
                }
            }, {
                field: 'dataNascita',
                orderBy: {dataNascita},
                setState() {
                    setDataNascita(!dataNascita)
                }
            }, {
                field: 'cf',
                orderBy: {cf},
                setState() {
                    setCf(!cf)
                }
            }, {
                field: 'email',
                orderBy: {email},
                setState() {
                    setEmail(!email)
                }
            }]
        }

    /**
     * This function is for changing the order settings in the table configuration
     * @param param
     * @param index
     */
    const changeOrder = (param, index) => {
        switch (param[index].field) {
            case 'nome':
                param.filter((x) => x.field !== 'nome' && x.orderBy[x.field] && x.setState())
                param[index].setState()
                break
            case 'cognome':
                param.filter((x) => x.field !== 'cognome' && x.orderBy[x.field] && x.setState())
                param[index].setState()
                console.log('cognome')
                break
            case 'dataNascita':
                param.filter((x) => x.field !== 'dataNascita' && x.orderBy[x.field] && x.setState())
                param[index].setState()
                console.log(index)
                break
            case 'cf':
                param.filter((x) => x.field !== 'cf' && x.orderBy[x.field] && x.setState())
                param[index].setState()
                break
            case 'email':
                param.filter((x) => x.field !== 'email' && x.orderBy[x.field] && x.setState())
                param[index].setState()
                break
        }
    }

    /**
     * The goal of this useEffect is to check if the list of Customers in the Context are not empty
     * if not it means maybe that the page was reloaded so the Context lose their data, so we have to fetch them again
     * and update the Context with this fetched data;
     * otherwise use the data in the Context;
     */
    useEffect( () => {
        const fetchCustomers = async () => {
            const data = await customQueryCustomers('?_limit=20')

            return data
        }

        fetchCustomers().then(r => setCustomers(r))

        setLoading(true)
    }, []);

    const move = () => {
      navigate('/AddCustomer')
    }

    // wait for the customers loading
    return loading ? (
        <>
            <Header logout={logout} />
            <Container className={'my-2'}>
                <h3>
                    Customers
                    <Button color={'green'} text={'Aggiungi'} onClickDo={move}/>
                </h3>
                <CustomTable lista={customers} campi={campi} tableConfigurations={tableConfigurations} changeOrder={changeOrder} />
            </Container>
        </>
    ) : (
        <h1>Loading...</h1>
    )
};

export default Customers;