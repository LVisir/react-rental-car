import {useEffect, useState} from 'react';
import CustomerService from '../service/Customer/CustomerService';
import UsefulFunctions from "../functions/UsefulFunctions";
import Button from "./Button";
import {Container} from "react-bootstrap";
import CustomTable from "./CustomTable";
import {useNavigate} from 'react-router-dom';
import Header from "./Header";

const Customers = ({ logout, links }) => {

    const { field, fieldHeader, customersLength, filter, customersPath } = CustomerService()

    const { customQuery } = UsefulFunctions()

    const navigate = useNavigate()

    const [tableConfig, setTableConfig] = useState({
        dbFields: field,
        tableHeaders: fieldHeader,
        dataSize: customersLength,
        currentPage: 1,
        currentPages: [1,2,3],
        searchableFields: filter,
        searchText: '',
        filterSearchText: '',
        list: [],
        searchButtonClicked: false,
        disableResetHeaderButton: true,
        disableResetPaginationButton: true,
        disableResetTableButton: true,
        startPath: customersPath,
        tableName: 'CUSTOMERS',
        fieldObjects: [
            {
                field: field[0],
                header: fieldHeader[0],
                sortable: true,
                sortType: '',
            },
            {
                field: field[1],
                header: fieldHeader[1],
                sortable: true,
                sortType: '',
            },
            {
                field: field[2],
                header: fieldHeader[2],
                sortable: true,
                sortType: '',
            },
            {
                field: field[3],
                header: fieldHeader[3],
                sortable: true,
                sortType: '',
            },
            {
                field: field[4],
                header: fieldHeader[4],
                sortable: true,
                sortType: '',
            }
        ]
    });

    useEffect(() => {
        const fetchCustomers = async () => {
            return await customQuery(tableConfig.startPath, '?_limit=10')
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