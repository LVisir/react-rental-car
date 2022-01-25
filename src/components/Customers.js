import Customer from "./Customer";
import Button from "./Button";
import Search from "./Search";
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Logout from "./Logout";
import CustomTable from "./CustomTable";

/**
 * Componente che mostra i Customer con i relativi dati e le relative operazioni
 * Al suo interno ha altre componenti: Customer.js, Button.js, Search.js, Logout.js
 * @param customers
 * @param logout
 * @returns {false|JSX.Element}
 * @constructor
 */
const Customers = ({ customers, logout, superusers }) => {
    // filtri per fare le ricerche in base ad un certo campo Customer
    const campi = ['NOME','COGNOME','DATA NASCITA','COD FISCALE']

    const campi2 = ['nome','cognome','dataNascita','cf']

    // usato per gestire il logout
    const navigate = useNavigate()

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true)
    }, []);

    const move = () => {
      navigate('/AddCustomer')
    }

    return (
        <>
            <h3>
                Customers
                <Button color={'green'} text={'Aggiungi'} onClickDo={move}/>
            </h3>
            <CustomTable lista={customers} campi={campi2}/>
        </>
    )
};

export default Customers;