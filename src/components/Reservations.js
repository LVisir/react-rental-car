import {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom'
import CustomTable from "../version_1/CustomTable";
import BookingService from "../service/Booking/BookingService";
import Header from "../version_1/Header";
import {Container} from "react-bootstrap";
import UsefulFunctions from "../functions/UsefulFunctions";

/**
 * Important component: Reservations: Header, CustomTable
 * A component that contains the object 'tableConfigurations';
 * 'tableConfigurations' contains the settings that manage all the actions of the user: sorting, paging, searching ...;
 * most of 'tableConfigurations' settings are made from the hook 'useState';
 * thanks to the useEffect and the useState hook, every change in the 'tableConfigurations' fields re-render the page based on the update values;
 * @param logout
 * @param links
 * @returns {number[]|JSX.Element|*[]|string|number|boolean}
 * @constructor
 */
const Reservations = ({bookingsPath, logout, links}) => {

    // state that manage the list of object Prenotazione
    const [bookings, setBookings] = useState([]);

    const { getBookings, customQueryBookings, bookingsLength, field, fieldHeader } = BookingService()

    // state that indicate when the data is load
    const [loading, setLoading] = useState(false);

    // state that indicate if a field is sortable or not
    const [codice, setCodice] = useState(true);
    const [inizio, setInizio] = useState(true);
    const [fine, setFine] = useState(true);
    const [customer, setCustomer] = useState(true);
    const [veicolo, setVeicolo] = useState(true);
    const [approvazione, setApprovazione] = useState(false);

    // pages shown per page
    const [pagesArray, setPagesArray] = useState([1,2,3]);

    // page where the user are at this moment
    const [currentPage, setCurrentPage] = useState(1);

    // indicates the order of the fields -> {asc|desc}
    const [orderTypeCodice, setOrderTypeCodice] = useState('asc');
    const [orderTypeInizio, setOrderTypeInizio] = useState('asc');
    const [orderTypeFine, setOrderTypeFine] = useState('asc');
    const [orderTypeCustomer, setOrderTypeCustomer] = useState('asc');
    const [orderTypeVeicolo, setOrderTypeVeicolo] = useState('asc');

    // state that manage the buttons for sorting -> {0, 1, 2} are respectively {no order, asc order, desc order}
    const [buttonCodiceState, setButtonCodiceState] = useState(0);
    const [buttonInizioState, setButtonInizioState] = useState(0);
    const [buttonFineState, setButtonFineState] = useState(0);
    const [buttonCustomerState, setButtonCustomerState] = useState(0);
    const [buttonVeicoloState, setButtonVeicoloState] = useState(0);

    const { flipOrderType, shiftState } = UsefulFunctions()

    const navigate = useNavigate()

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
            pages() {return bookingsLength},
            pageList() {return pagesArray},
            setPage(newPagesArray) {setPagesArray(newPagesArray)},
            currentPage() {return currentPage},
            changeCurrentPage(x) {setCurrentPage(x)},
            list() {return bookings},
            setList(newList) {setBookings(newList)},
            searchInfoField() { return searchField },
            setSearchInfoField(x) { setSearchField(x) },
            searchInfoText() { return searchText },
            setSearchInfoText(x) { setSearchText(x) },
            searchButtonClicked() { setSearchButton(!searchButton) },
            getSearchButtonState() { return searchButton },
            getResetButton() { return resetButton },
            changeResetButton() { setResetButton(!resetButton) },
            sortableFields: [{
                field: 'codice',
                orderBy() {return codice},
                setState() {setCodice(!codice)},
                orderType() {return orderTypeCodice},
                changeOrderType() {setOrderTypeCodice(flipOrderType(buttonCodiceState))},
                state() {return buttonCodiceState},
                changeState() {setButtonCodiceState(shiftState(buttonCodiceState))},
                resetState() { setButtonCodiceState(0)},
            }, {
                field: 'inizio',
                orderBy() {return inizio},
                setState() {setInizio(!inizio)},
                orderType() {return orderTypeInizio},
                changeOrderType() {setOrderTypeInizio(flipOrderType(buttonInizioState))},
                state() {return buttonInizioState},
                changeState() {setButtonInizioState(shiftState(buttonInizioState))},
                resetState() { setButtonInizioState(0)},
            }, {
                field: 'fine',
                orderBy() {return fine},
                setState() {setFine(!fine)},
                orderType() {return orderTypeFine},
                changeOrderType() {setOrderTypeFine(flipOrderType(buttonFineState))},
                state() {return buttonFineState},
                changeState() {setButtonFineState(shiftState(buttonFineState))},
                resetState() { setButtonFineState(0)},
            }, {
                field: 'customer',
                orderBy() {return customer},
                setState() {setCustomer(!customer)},
                orderType() {return orderTypeCustomer},
                changeOrderType() {setOrderTypeCustomer(flipOrderType(buttonCustomerState))},
                state() {return buttonCustomerState},
                changeState() {setButtonCustomerState(shiftState(buttonCustomerState))},
                resetState() { setButtonCustomerState(0)},
            }, {
                field: 'veicolo',
                orderBy() {return veicolo},
                setState() {setVeicolo(!veicolo)},
                orderType() {return orderTypeVeicolo},
                changeOrderType() {setOrderTypeVeicolo(flipOrderType(buttonVeicoloState))},
                state() {return buttonVeicoloState},
                changeState() {setButtonVeicoloState(shiftState(buttonVeicoloState))},
                resetState() { setButtonVeicoloState(0)},
            }, {
                field: 'approvazione',
                orderBy() {return approvazione},
                setState() {setApprovazione(!approvazione)},
            }],
            useEffectDependencies: [searchButton, currentPage, buttonCodiceState, buttonInizioState, buttonFineState, buttonCustomerState, buttonVeicoloState],
            startPath: 'http://localhost:5001/prenotazione',
            tableName: 'PRENOTAZIONE',
        }

    /**
     * On render fetch the data
     */
    useEffect( () => {
        const fetchBookings = async () => {
            const data = await getBookings('?_limit=10')

            return data
        }

        fetchBookings().then(r => setBookings(r))

        setLoading(true)
    }, []);

    return loading ? (
        <>
            <Header logout={logout} links={links} tableConfigurations={tableConfigurations} />
            <Container className={'my-2'}>
                <h3>Prenotazioni</h3>
                <CustomTable tableConfigurations={tableConfigurations} />
            </Container>
        </>
    ) : (
        <h1>Loading...</h1>
    )
};

export default Reservations;