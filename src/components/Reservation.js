import {useState} from "react";

/**
 * Componente che rappresenta la singola Prenotazione
 * @param prenotazione
 * @returns {JSX.Element}
 * @constructor
 */
const Reservation = ({prenotazione}) => {
    return (
        <div className={'task'} style={{cursor: 'default'}}>
            <h3>Veicolo: {prenotazione.veicolo}</h3>
            <p>{prenotazione.inizio}</p>
            <p>{prenotazione.fine}</p>
        </div>
    );
};

export default Reservation;