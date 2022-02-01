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

    const [nome, setNome] = useState(true);
    const [cognome, setCognome] = useState(true);
    const [dataNascita, setDataNascita] = useState(true);
    const [cf, setCf] = useState(true);
    const [email, setEmail] = useState(true);

    const [pagesArray, setPagesArray] = useState([1,2,3]);

    const [currentPage, setCurrentPage] = useState(1);

    const [orderType, setOrderType] = useState('asc');

    const [orderTypeNome, setOrderTypeNome] = useState('asc');
    const [orderTypeCognome, setOrderTypeCognome] = useState('asc');
    const [orderTypeDataNascita, setOrderTypeDataNascita] = useState('asc');
    const [orderTypeCf, setOrderTypeCf] = useState('asc');
    const [orderTypeEmail, setOrderTypeEmail] = useState('asc');

    const [buttonNameState, setButtonNameState] = useState(0);
    const [buttonSurnameState, setButtonSurnameState] = useState(0);
    const [buttonDateState, setButtonDateState] = useState(0);
    const [buttonCfState, setButtonCfState] = useState(0);
    const [buttonEmailState, setButtonEmailState] = useState(0);

    // functions that switch the orderType between 'asc' and 'desc'
    const flipOrderType = (type) => {
        switch (type){
            case 0:
                return 'asc'
            case 1:
                return 'desc'
            case 2:
                return ''
        }
    }

    // change the state: {0,1,2} -> {inactive, asc, desc}
    const shiftState = (state) => {
        let y = state + 1
        return y%3
    }

    // usato per gestire il logout
    const navigate = useNavigate()

    // fetch list of Customers
    const { customersLength, customQueryCustomers } = CustomerService()

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    // configuration for the table where the data will be showed
    const tableConfigurations =
        {
            fieldNameDb: ['nome','cognome','dataNascita','cf', 'email'],
            fieldNameTableHeader: ['Nome', 'Cognome', 'Data nascita', 'Cod. fiscale', 'Email'],
            pages: {customersLength},
            pageList: {pagesArray},
            setPage(newPagesArray) {
                setPagesArray(newPagesArray)
            },
            currentPage: {currentPage},
            changeCurrentPage(x) {
                setCurrentPage(x)
            },
            list: {customers},
            setList(newList) {
                setCustomers(newList)
            },
            sortableFields: [{
                field: 'nome',
                orderBy: {nome},
                setState() {
                    setNome(!nome)
                },
                orderType: {orderTypeNome},
                changeOrderType() {
                    setOrderTypeNome(flipOrderType(buttonNameState))
                },
                state: {buttonNameState},
                changeState() {
                    setButtonNameState(shiftState(buttonNameState))
                },
            }, {
                field: 'cognome',
                orderBy: {cognome},
                setState() {
                    setCognome(!cognome)
                },
                orderType: {orderTypeCognome},
                changeOrderType() {
                    setOrderTypeCognome(flipOrderType(buttonSurnameState))
                },
                state: {buttonSurnameState},
                changeState() {
                    setButtonSurnameState(shiftState(buttonSurnameState))
                },
            }, {
                field: 'dataNascita',
                orderBy: {dataNascita},
                setState() {
                    setDataNascita(!dataNascita)
                },
                orderType: {orderTypeDataNascita},
                changeOrderType() {
                    setOrderTypeDataNascita(flipOrderType(buttonDateState))
                },
                state: {buttonDateState},
                changeState() {
                    setButtonDateState(shiftState(buttonDateState))
                },
            }, {
                field: 'cf',
                orderBy: {cf},
                setState() {
                    setCf(!cf)
                },
                orderType: {orderTypeCf},
                changeOrderType() {
                    setOrderTypeCf(flipOrderType(buttonCfState))
                },
                state: {buttonCfState},
                changeState() {
                    setButtonCfState(shiftState(buttonCfState))
                },
            }, {
                field: 'email',
                orderBy: {email},
                setState() {
                    setEmail(!email)
                },
                orderType: {orderTypeEmail},
                changeOrderType() {
                    setOrderTypeEmail(flipOrderType(buttonEmailState))
                },
                state: {buttonEmailState},
                changeState() {
                    setButtonEmailState(shiftState(buttonEmailState))
                },
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
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                break
            case 'cognome':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                break
            case 'dataNascita':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                //console.log(index)
                break
            case 'cf':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                break
            case 'email':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
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
            const data = await customQueryCustomers('?_limit=10')

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