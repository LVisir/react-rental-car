import Customer from "./Customer";
import Button from "./Button";
import Search from "./Search";
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Logout from "./Logout";
import CustomTable from "./CustomTable";
import { useCustomers } from "../service/Customer/CustomerContext";

/**
 * Page of Superuser
 * Component that uses the list Customer in the Context and use the CustomeTable component to show it
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

    // fetch the list of Customers from the CustomerContext
    const ris = useCustomers()

    const [custs, setCusts] = useState([]);

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    useEffect(async () => {

        // set customers from the CustomerContext so useCustomers()
        //setCusts(await ris)
        setLoading(true)
    }, []);

    const move = () => {
      navigate('/AddCustomer')
    }

    // wait for the customers loading
    return loading ? (
        <>
            <h3>
                Customers
                <Button color={'green'} text={'Aggiungi'} onClickDo={move}/>
            </h3>
            <CustomTable lista={ris} campi={campi2}/>
        </>
    ) : (
        <h1>Loading...</h1>
    )
};

export default Customers;