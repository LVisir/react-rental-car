import Button from "./Button";

/**
 * Componente che rappresenta il singolo Customer
 * @param customer
 * @returns {JSX.Element}
 * @constructor
 */
const Customer = ({ customer }) => {
    return (
        <div className={'task'} style={{cursor:'default'}}>
            <h3>
                {customer.nome} {customer.cognome}
            </h3>
            <p>{customer.cf}</p>
            <Button text={'Modifica'}/>
            <Button text={'Cancella'}/>
            <Button text={'Prenotazioni'}/>
        </div>
    );
};

export default Customer;