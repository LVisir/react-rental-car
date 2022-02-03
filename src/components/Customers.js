import Button from './Button';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from './CustomTable';
import CustomerService from '../service/Customer/CustomerService';
import Header from './Header';
import {Container} from 'react-bootstrap';
import UsefulFunctions from "../functions/UsefulFunctions";

/**
 * The basic idea is to have an object that reflect all the settings of a table.
 * This table fields are:
 *  - fieldNameDb : the name of the fields of the object where the table should adapt to;
 *  - fieldNameTableHeader : the name of the field in an aesthetic way;
 *  - pages : the total number of pages based on a limit of 10 per page;
 *  - pageList (useState): the starter pages when the table is load;
 *  - setPage() (useState): a function to update the 'pageList' when the user is going to the previous/antecedent page;
 *  - currentPage (useState): the page where the user are;
 *  - changeCurrentPage() (useState): function that change the 'currentPage' backward or forward
 *  - list (useState): the list where the table should adapt to; in this case a list of Customer objects;
 *  - setList() (useState): function that update the 'list'
 *  - sortableFields : array of object that contains:
 *      - field : name of the current field;
 *      - orderBy (useState) : a boolean that indicate if this 'field' is sortable or not
 *      - setState() (useState) : function that update 'orderBy' -> true/false
 *      - orderType (useState) : indicate the type of sort -> asc/desc
 *      - changeOrderType() (useState) : function that change 'orderType' -> from asc to desc and viceversa
 *      - state (useState) : state of the button to change the 'orderType': {0,1,2} -> {no state, asc, desc}
 *      - changeState() (useState) : function that shift the state; in order they are: 0 -> 1 -> 2 -> 0 -> 1 -> ... and so on
 *  - useEffectDependencies : the variable where the useEffect have to check if they changed to be thrown
 * @param logout
 * @returns {JSX.Element}
 * @constructor
 */
const Customers = ({logout, links}) => {

    // list of Customer objects
    const [customers, setCustomers] = useState([]);

    // Read at the beginning of the page: [orderBy, setState()]
    const [nome, setNome] = useState(true);
    const [cognome, setCognome] = useState(true);
    const [dataNascita, setDataNascita] = useState(true);
    const [cf, setCf] = useState(true);
    const [email, setEmail] = useState(true);

    // Read at the beginning of the page: [pageList, setPage()]
    const [pagesArray, setPagesArray] = useState([1,2,3]);

    // Read at the beginning of the page: [currentPage, changeCurrentPage()]
    const [currentPage, setCurrentPage] = useState(1);

    // Read at the beginning of the page: [orderType, changeOrderType()]
    const [orderTypeNome, setOrderTypeNome] = useState('asc');
    const [orderTypeCognome, setOrderTypeCognome] = useState('asc');
    const [orderTypeDataNascita, setOrderTypeDataNascita] = useState('asc');
    const [orderTypeCf, setOrderTypeCf] = useState('asc');
    const [orderTypeEmail, setOrderTypeEmail] = useState('asc');

    // Read at the beginning of the page: [state, changeState()]
    const [buttonNameState, setButtonNameState] = useState(0);
    const [buttonSurnameState, setButtonSurnameState] = useState(0);
    const [buttonDateState, setButtonDateState] = useState(0);
    const [buttonCfState, setButtonCfState] = useState(0);
    const [buttonEmailState, setButtonEmailState] = useState(0);

    const { flipOrderType, shiftState } = UsefulFunctions()

    const navigate = useNavigate()

    // fetch necessary data from CustomerService
    const { customersLength, customQueryCustomers, field, fieldHeader } = CustomerService()

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    const [searchField, setSearchField] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchButton, setSearchButton] = useState(false);

    // configuration for the table where the data will be showed
    const tableConfigurations =
        {
            fieldNameDb: field,
            fieldNameTableHeader: fieldHeader,
            pages() { return customersLength},
            pageList() {return pagesArray},
            setPage(newPagesArray) { setPagesArray(newPagesArray) },
            currentPage() {return currentPage},
            changeCurrentPage(x) { setCurrentPage(x) },
            list() {return customers},
            setList(newList) { setCustomers(newList) },
            searchInfoField() { return searchField },
            setSearchInfoField(x) { setSearchField(x) },
            searchInfoText() { return searchText },
            setSearchInfoText(x) { setSearchText(x) },
            searchButtonClicked() { setSearchButton(!searchButton) },
            sortableFields: [{
                field: 'nome',
                orderBy() {return nome},
                setState() {setNome(!nome)},
                orderType() {return orderTypeNome},
                changeOrderType() {setOrderTypeNome(flipOrderType(buttonNameState))},
                state() {return buttonNameState},
                changeState() {setButtonNameState(shiftState(buttonNameState))},
            }, {
                field: 'cognome',
                orderBy() {return cognome},
                setState() {setCognome(!cognome)},
                orderType() {return orderTypeCognome},
                changeOrderType() {setOrderTypeCognome(flipOrderType(buttonSurnameState))},
                state() {return buttonSurnameState},
                changeState() {setButtonSurnameState(shiftState(buttonSurnameState))},
            }, {
                field: 'dataNascita',
                orderBy() {return dataNascita},
                setState() {setDataNascita(!dataNascita)},
                orderType() {return orderTypeDataNascita},
                changeOrderType() {setOrderTypeDataNascita(flipOrderType(buttonDateState))},
                state() {return buttonDateState},
                changeState() {setButtonDateState(shiftState(buttonDateState))},
            }, {
                field: 'cf',
                orderBy() {return cf},
                setState() {setCf(!cf)},
                orderType() {return orderTypeCf},
                changeOrderType() {setOrderTypeCf(flipOrderType(buttonCfState))},
                state() {return buttonCfState},
                changeState() {setButtonCfState(shiftState(buttonCfState))},
            }, {
                field: 'email',
                orderBy() {return email},
                setState() {setEmail(!email)},
                orderType() {return orderTypeEmail},
                changeOrderType() {setOrderTypeEmail(flipOrderType(buttonEmailState))},
                state() {return buttonEmailState},
                changeState() {setButtonEmailState(shiftState(buttonEmailState))},
            }],
            useEffectDependencies: [searchButton, currentPage, buttonNameState, buttonSurnameState, buttonDateState, buttonCfState, buttonEmailState],
            startPath: `http://localhost:5001/customer`,
            tableName: 'CUSTOMER',
        }

    /**
     * On render fetch the data
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
            <Header logout={logout} links={links} tableConfigurations={tableConfigurations} />
            <Container className={'my-2'}>
                <h3>
                    Customers
                    <Button color={'green'} text={'Aggiungi'} onClickDo={move}/>
                </h3>
                <CustomTable tableConfigurations={tableConfigurations} />
            </Container>
        </>
    ) : (
        <h1>Loading...</h1>
    )
};

export default Customers;