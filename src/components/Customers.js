import {useEffect, useState} from 'react';
import CustomerService from '../service/Customer/CustomerService';
import UsefulFunctions from "../functions/UsefulFunctions";
import Button from "./Button";
import {Container} from "react-bootstrap";
import CustomTable from "./CustomTable";
import Header from "./Header";

const Customers = ({ logout, links }) => {

    const { field, fieldHeader, customersLength } = CustomerService()

    const { customQuery } = UsefulFunctions()

    const [tableConfig, setTableConfig] = useState({
        dbFields: field,
        tableHeaders: fieldHeader,
        dataSize: customersLength,
        currentPage: 1,
        currentPages: [1,2,3],
        searchableFields: field,
        searchText: '',
        filterSearchText: '',
        list: [],
        searchButtonClicked: false,
        resetButtonDisable: true,
        startPath: `http://localhost:5001/customer`,
        tableName: 'CUSTOMER',
        fieldObjects: [
            {
                field: 'nome',
                header: 'Nome',
                sortable: true,
                sortType: '',
            },
            {
                field: 'cognome',
                header: 'Cognome',
                sortable: true,
                sortType: '',
            },
            {
                field: 'dataNascita',
                header: 'Data di nascita',
                sortable: true,
                sortType: '',
            },
            {
                field: 'cf',
                header: 'Cod. fiscale',
                sortable: true,
                sortType: '',
            },
            {
                field: 'email',
                header: 'Email',
                sortable: true,
                sortType: '',
            }
        ]
    });

    useEffect(() => {
        const fetchCustomers = async () => {
            const data = await customQuery(tableConfig.startPath, '?_limit=10')

            return data
        }

        fetchCustomers().then(r => setTableConfig({
            ...tableConfig,
            list: r,
        }))
    }, []);


    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} />
            <Container className={'my-2'}>
                <h3>
                    Customers
                    <Button color={'green'} text={'Aggiungi'} />
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} />
            </Container>
        </>
    );
};

export default Customers;