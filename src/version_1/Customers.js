import Button from '../components/Button';
import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import CustomTable from './CustomTable';
import CustomerService from '../service/Customer/CustomerService';
import Header from './Header';
import {Container} from 'react-bootstrap';
import UsefulFunctions from "../functions/UsefulFunctions";

/**
 * Important component: Customer: Header, CustomTable
 * A component that contains the object 'tableConfigurations';
 * 'tableConfigurations' contains the settings that manage all the actions of the user: sorting, paging, searching ...;
 * most of 'tableConfigurations' settings are made from the hook 'useState';
 * thanks to the useEffect and the useState hook, every change in the 'tableConfigurations' fields re-render the page based on the update values;
 * @param logout
 * @param links
 * @returns {number[]|JSX.Element|*[]|string|number|boolean}
 * @constructor
 */
const Customers = ({logout, links}) => {

    // list of Customer objects
    const [customers, setCustomers] = useState([]);

    // state that indicate if a certain field are sortable or not
    const [nome, setNome] = useState(true);
    const [cognome, setCognome] = useState(true);
    const [dataNascita, setDataNascita] = useState(true);
    const [cf, setCf] = useState(true);
    const [email, setEmail] = useState(true);

    // state that manage the number of pages
    const [pagesArray, setPagesArray] = useState([1,2,3]);

    // state that manage the current page
    const [currentPage, setCurrentPage] = useState(1);

    // state that manage the order type -> {asc|desc}
    const [orderTypeNome, setOrderTypeNome] = useState('asc');
    const [orderTypeCognome, setOrderTypeCognome] = useState('asc');
    const [orderTypeDataNascita, setOrderTypeDataNascita] = useState('asc');
    const [orderTypeCf, setOrderTypeCf] = useState('asc');
    const [orderTypeEmail, setOrderTypeEmail] = useState('asc');

    // state that manage the buttons for sorting -> {0, 1, 2} are respectively {no order, asc order, desc order}
    const [buttonNameState, setButtonNameState] = useState(0);
    const [buttonSurnameState, setButtonSurnameState] = useState(0);
    const [buttonDateState, setButtonDateState] = useState(0);
    const [buttonCfState, setButtonCfState] = useState(0);
    const [buttonEmailState, setButtonEmailState] = useState(0);

    const { flipOrderType, shiftState } = UsefulFunctions()

    const navigate = useNavigate()

    const { customersLength, customQueryCustomers, field, fieldHeader } = CustomerService()

    // state that manage the loading appearance
    const [loading, setLoading] = useState(false);

    // state that manage the searching actions
    const [searchField, setSearchField] = useState('');
    const [searchText, setSearchText] = useState('');
    const [searchButton, setSearchButton] = useState(false);

    // state that manage the reset actions; his goal is to reset all the settings in the 'tableConfigurations'
    const [resetButton, setResetButton] = useState(true);

    /**
     * This table contains all the useState described above and all the functions imported above
     */
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
            getSearchButtonState() { return searchButton },
            getResetButton() { return resetButton },
            changeResetButton() { setResetButton(!resetButton) },
            sortableFields: [{
                field: 'nome',
                orderBy() {return nome},
                setState() {setNome(!nome)},
                orderType() {return orderTypeNome},
                changeOrderType() {setOrderTypeNome(flipOrderType(buttonNameState))},
                state() {return buttonNameState},
                changeState() {setButtonNameState(shiftState(buttonNameState))},
                resetState() { setButtonNameState(0)},
            }, {
                field: 'cognome',
                orderBy() {return cognome},
                setState() {setCognome(!cognome)},
                orderType() {return orderTypeCognome},
                changeOrderType() {setOrderTypeCognome(flipOrderType(buttonSurnameState))},
                state() {return buttonSurnameState},
                changeState() {setButtonSurnameState(shiftState(buttonSurnameState))},
                resetState() { setButtonSurnameState(0)},
            }, {
                field: 'dataNascita',
                orderBy() {return dataNascita},
                setState() {setDataNascita(!dataNascita)},
                orderType() {return orderTypeDataNascita},
                changeOrderType() {setOrderTypeDataNascita(flipOrderType(buttonDateState))},
                state() {return buttonDateState},
                changeState() {setButtonDateState(shiftState(buttonDateState))},
                resetState() { setButtonDateState(0)},
            }, {
                field: 'cf',
                orderBy() {return cf},
                setState() {setCf(!cf)},
                orderType() {return orderTypeCf},
                changeOrderType() {setOrderTypeCf(flipOrderType(buttonCfState))},
                state() {return buttonCfState},
                changeState() {setButtonCfState(shiftState(buttonCfState))},
                resetState() { setButtonCfState(0)},
            }, {
                field: 'email',
                orderBy() {return email},
                setState() {setEmail(!email)},
                orderType() {return orderTypeEmail},
                changeOrderType() {setOrderTypeEmail(flipOrderType(buttonEmailState))},
                state() {return buttonEmailState},
                changeState() {setButtonEmailState(shiftState(buttonEmailState))},
                resetState() { setButtonEmailState(0)},
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