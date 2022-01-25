import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom'
import Reservation from './Reservation';
import Logout from './Logout';
import CustomTable from "./CustomTable";

/**
 * Componente che rappresenta tutte le prenotazioni di un Customer fornito in props
 * @param fetchReservations
 * @param logout
 * @param superusers
 * @param customers
 * @returns {JSX.Element}
 * @constructor
 */
const Reservations = ({fetchReservations, logout, superusers, customers}) => {

    // legge dei parametri nel chiesto la richiesta l'abbia fatta il Superuser per un certo Customer
    const params = useParams()
    const navigate = useNavigate()

    const campi = ['inizio','fine','codice','customer','veicolo']

    // salvo le prenotazioni che dovrò mostrare in UI
    const [prenotazioni, setPrenotazioni] = useState([]);

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        /**
         * Ricavo le prenotazioni in base al cf del Customer in sessione se esso si è autenticato
         * altrimenti in base al cf di un Customer richiesto dal Superuser
         * @returns {Promise<void>}
         */
        const getReservations = async () => {
            const prenotazioniDelCustomerDalServer = await fetchReservations(
                params.customerCf===undefined ? sessionStorage.getItem('customer') : params.customerCf
            )
            setPrenotazioni(prenotazioniDelCustomerDalServer)
        }
        getReservations()
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
            <CustomTable campi={campi} lista={prenotazioni}/>
        </>
    )
};

export default Reservations;