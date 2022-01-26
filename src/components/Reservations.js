import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import Reservation from './Reservation';
import Logout from './Logout';
import CustomTable from "./CustomTable";
import { useBookings } from '../service/Booking/BookingContext';

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
const Reservations = () => {

    // retrieve the list of bookings from the BookingsContext
    const bookings = useBookings()

    const campi = ['inizio','fine','codice','customer','veicolo']

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        //console.log(bookings)
        setLoading(true)

    }, []);

    return (
        <>
            <h3>Prenotazioni</h3>
            <CustomTable campi={campi} lista={bookings}/>
        </>
    )
};

export default Reservations;