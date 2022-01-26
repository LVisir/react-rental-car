import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import Reservation from './Reservation';
import Logout from './Logout';
import CustomTable from "./CustomTable";
import { useBookings } from '../service/Booking/BookingContext';

/**
 * Componente che rappresenta tutte le prenotazioni di un Customer fornito in props
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
            {/*{loading ? (
                prenotazioni.map(
                        (prenotazione) =>
                            <Reservation key={prenotazione.codice} prenotazione={prenotazione}/>
                    )
            ) : (
                <h1>Loading...</h1>
                )}*/}
            <CustomTable campi={campi} lista={bookings}/>
        </>
    )
};

export default Reservations;