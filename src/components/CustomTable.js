import {Table} from 'react-bootstrap'
import Button from "./Button";

/**
 * Tabella che si adatta in base ad un lista data in input ed ai suoi campi di riferimento
 * @param campi
 * @param lista
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTable = ({campi, lista}) => {

    /**
     * Nel caso il Superuser si fosse autenticato allora fornisce tali azioni
     * @returns {JSX.Element}
     */
    const superuserActions = () => {
        return (
            <td>
                <Button text={'Modifica'}/>
                <Button text={'Cancella'}/>
                <Button text={'Prenotazioni'}/>
            </td>
        )
    }

    /**
     * Ragionamento:
     * - creo tabella con <th> uguale a 'campi' dato in input
     * - per ogni elemento della lista creo una nuova riga e per ogni riga:
     *  - creo x colonne in base al numero di campi (map dentro un map)
     */
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr style={{textAlign: 'center'}}>
                        <th>#</th>
                        {campi.map(
                            (nomeCampo) =>
                                <th key={nomeCampo}>{nomeCampo}</th>
                        )}
                        {sessionStorage.getItem('superuser')!=null && <th>Azioni</th>}
                    </tr>
                </thead>
                <tbody>
                {lista.map(
                    (el, index) =>
                        <tr key={index} style={{textAlign: 'center'}}>
                            <td key={index}>{index}</td>
                            {campi.map(
                                (innerEl, innerIndex) =>
                                    <td key={innerIndex}>{el[innerEl]}</td>
                            )}
                            {sessionStorage.getItem('superuser')!=null && superuserActions()}
                        </tr>
                )}
                </tbody>
            </Table>
        </>
    );
};

export default CustomTable;