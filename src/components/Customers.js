import Customer from "./Customer";
import Button from "./Button";
import Search from "./Search";
import {useEffect, useState} from "react";
import {Link, useNavigate} from 'react-router-dom';
import Logout from "./Logout";
import CustomTable from "./CustomTable";
import { useCustomers, useUpdateCustomers } from "../service/Customer/CustomerContext";
import {getCustomers} from '../service/Customer/CustomerService';

/**
 * Page of Superuser
 * Component that uses the list Customer in the Context and use the CustomeTable component to show it
 * @param customers
 * @param logout
 * @returns {false|JSX.Element}
 * @constructor
 */
const Customers = ({logout, superusers, customersPath }) => {
    // filtri per fare le ricerche in base ad un certo campo Customer
    const campi = ['NOME','COGNOME','DATA NASCITA','COD FISCALE']

    const campi2 = ['nome','cognome','dataNascita','cf']

    // usato per gestire il logout
    const navigate = useNavigate()

    // fetch the list of Customers from the CustomerContext
    let ris = useCustomers()

    // setState of Customers taken from Context that update the lis of Customers in the Context
    const updateCustomer = useUpdateCustomers()

    // dettaglio grafico che mostra 'Loading...' se la pagina non è ancora caricata del tutto
    const [loading, setLoading] = useState(false);

    /**
     * The goal of this useEffect is to check if the list of Customers in the Context are not empty
     * if not it means maybe that the page was reloaded so the Context lose their data, so we have to fetch them again
     * and update the Context with this fetched data;
     * otherwise use the data in the Context;
     */
    useEffect(async () => {
        if (ris.length === 0) {
            ris = await getCustomers(customersPath)
            updateCustomer(ris)
        }
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