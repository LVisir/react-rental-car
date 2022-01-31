import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import Reservation from './Reservation';
import Logout from './Logout';
import CustomTable from "./CustomTable";
import { useBookings, useUpdateBookings } from '../service/Booking/BookingContext';
import BookingService from "../service/Booking/BookingService";
import Header from "./Header";
import {Container} from "react-bootstrap";
/*import { fetchReservationsByCustomerId } from '../service/Booking/BookingService';*/

/**
 * Component that show all the Bookings of a given Customer
 * retrieve the Bookings from the Context and use the CustomTable to show its
 * @param fetchReservations
 * @param logout
 * @param superusers
 * @param customers
 * @returns {JSX.Element}
 * @constructor
 */
const Reservations = ({bookingsPath, logout}) => {

    // retrieve the list of bookings from the BookingsContext
    let bookings = useBookings()

    // hook to update the bookings in the BookingsContext
    const updateBookings = useUpdateBookings()

    const campi = ['inizio','fine','codice','customer','veicolo']

    const {fetchReservationsByCustomerId } = BookingService()

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    /**
     * The goal of this useEffect is to check if the list of Bookings in the Context are not empty
     * if not it means maybe that the page was reloaded so the Context lose their data, so we have to fetch them again
     * and update the Context with this fetched data;
     * otherwise use the data in the Context;
     */
    useEffect(async () => {
        if(bookings.length === 0){
            bookings = await fetchReservationsByCustomerId(bookingsPath, sessionStorage.getItem('customer'))
            updateBookings(bookings)
        }

        setLoading(true)

    }, []);

    return loading ? (
        <>
            <Header logout={logout} />
            <Container className={'my-2'}>
                <h3>Prenotazioni</h3>
                <CustomTable campi={campi} lista={bookings}/>
            </Container>
        </>
    ) : (
        <h1>Loading...</h1>
    )
};

export default Reservations;