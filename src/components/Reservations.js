import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import Reservation from './Reservation';
import Logout from './Logout';
import CustomTable from "./CustomTable";
import { useBookings, useUpdateBookings } from '../service/Booking/BookingContext';
import BookingService from "../service/Booking/BookingService";
import Header from "./Header";
import {Container} from "react-bootstrap";
import UsefulFunctions from "../functions/UsefulFunctions";
/*import { fetchReservationsByCustomerId } from '../service/Booking/BookingService';*/

const Reservations = ({bookingsPath, logout}) => {

    const [bookings, setBookings] = useState([]);

    const { getBookings, customQueryBookings, bookingsLength, field, fieldHeader } = BookingService()

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    // sortable fields
    const [codice, setCodice] = useState(true);
    const [inizio, setInizio] = useState(true);
    const [fine, setFine] = useState(true);
    const [customer, setCustomer] = useState(true);
    const [veicolo, setVeicolo] = useState(true);
    const [approvazione, setApprovazione] = useState(false);

    // pages shown per page
    const [pagesArray, setPagesArray] = useState([1,2,3]);

    const [currentPage, setCurrentPage] = useState(1);

    // indicates the order of the fields -> {asc|desc}
    const [orderTypeCodice, setOrderTypeCodice] = useState('asc');
    const [orderTypeInizio, setOrderTypeInizio] = useState('asc');
    const [orderTypeFine, setOrderTypeFine] = useState('asc');
    const [orderTypeCustomer, setOrderTypeCustomer] = useState('asc');
    const [orderTypeVeicolo, setOrderTypeVeicolo] = useState('asc');

    // state of the button near the fields
    const [buttonCodiceState, setButtonCodiceState] = useState(0);
    const [buttonInizioState, setButtonInizioState] = useState(0);
    const [buttonFineState, setButtonFineState] = useState(0);
    const [buttonCustomerState, setButtonCustomerState] = useState(0);
    const [buttonVeicoloState, setButtonVeicoloState] = useState(0);

    const { flipOrderType, shiftState } = UsefulFunctions()

    const navigate = useNavigate()

    // configuration for the table where the data will be showed
    const tableConfigurations =
        {
            fieldNameDb: field,
            fieldNameTableHeader: fieldHeader,
            pages() {return bookingsLength},
            pageList() {return pagesArray},
            setPage(newPagesArray) {
                setPagesArray(newPagesArray)
            },
            currentPage() {return currentPage},
            changeCurrentPage(x) {
                setCurrentPage(x)
            },
            list() {return bookings},
            setList(newList) {
                setBookings(newList)
            },
            sortableFields: [{
                field: 'codice',
                orderBy() {return codice},
                setState() {
                    setCodice(!codice)
                },
                orderType() {return orderTypeCodice},
                changeOrderType() {
                    setOrderTypeCodice(flipOrderType(buttonCodiceState))
                },
                state() {return buttonCodiceState},
                changeState() {
                    setButtonCodiceState(shiftState(buttonCodiceState))
                },
            }, {
                field: 'inizio',
                orderBy() {return inizio},
                setState() {
                    setInizio(!inizio)
                },
                orderType() {return orderTypeInizio},
                changeOrderType() {
                    setOrderTypeInizio(flipOrderType(buttonInizioState))
                },
                state() {return buttonInizioState},
                changeState() {
                    setButtonInizioState(shiftState(buttonInizioState))
                },
            }, {
                field: 'fine',
                orderBy() {return fine},
                setState() {
                    setFine(!fine)
                },
                orderType() {return orderTypeFine},
                changeOrderType() {
                    setOrderTypeFine(flipOrderType(buttonFineState))
                },
                state() {return buttonFineState},
                changeState() {
                    setButtonFineState(shiftState(buttonFineState))
                },
            }, {
                field: 'customer',
                orderBy() {return customer},
                setState() {
                    setCustomer(!customer)
                },
                orderType() {return orderTypeCustomer},
                changeOrderType() {
                    setOrderTypeCustomer(flipOrderType(buttonCustomerState))
                },
                state() {return buttonCustomerState},
                changeState() {
                    setButtonCustomerState(shiftState(buttonCustomerState))
                },
            }, {
                field: 'veicolo',
                orderBy() {return veicolo},
                setState() {
                    setVeicolo(!veicolo)
                },
                orderType() {return orderTypeVeicolo},
                changeOrderType() {
                    setOrderTypeVeicolo(flipOrderType(buttonVeicoloState))
                },
                state() {return buttonVeicoloState},
                changeState() {
                    setButtonVeicoloState(shiftState(buttonVeicoloState))
                },
            }, {
                field: 'approvazione',
                orderBy() {return approvazione},
                setState() {
                    setApprovazione(!approvazione)
                },
            }],
            useEffectDependencies: [currentPage, buttonCodiceState, buttonInizioState, buttonFineState, buttonCustomerState, buttonVeicoloState],
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
            <Header logout={logout} />
            <Container className={'my-2'}>
                <h3>Prenotazioni</h3>
                <CustomTable tableConfigurations={tableConfigurations} />
                {/*{console.log(Object.entries(tableConfigurations.sortableFields[5].orderBy)[0][1])}*/}
            </Container>
        </>
    ) : (
        <h1>Loading...</h1>
    )
};

export default Reservations;