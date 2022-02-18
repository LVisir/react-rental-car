import {useEffect, useState} from 'react';
import CustomerService from '../../service/Customer/CustomerService';
import AddUpdateCustomer from "../addUpdate/AddUpdateCustomer";
import { Route, Routes } from 'react-router-dom';
import Error from "../errors/Error";
import CustomersTable from "../table/CustomersTable";

const Customers = ({ logout, links, homePath }) => {

    const { field, fieldHeader, customersLength, filter, customersPath, advancedGetCustomers } = CustomerService()

    /**
     * The tableConfig has all the settings where the table must adapt to:
     * - dbFields: the name of the property of the customer object
     * - tableHeaders: the name of the header of the table
     * - dataSize: the total number of element; it is used to manage the total number of pages
     * - searchableFields: contains the fields that can be searched
     * - list: the list of objects
     * - reset buttons: to manage the reset buttons
     * - fieldObjects: a list that contains all the setting for each field like the sort and the sort type
     */
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
        role: 'CUSTOMER',
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
            },
            {
                field: field[5],
                header: fieldHeader[5],
                sortable: true,
                sortType: '',
            }
        ]
    });

    const [customers, setCustomers] = useState(tableConfig.list);

    return (
        <>
            <Routes>
                <Route path={'/'} element={<CustomersTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links} customers={customers} setCustomers={setCustomers} getData={advancedGetCustomers} /> } />
                <Route path={'AddCustomer'} element={<AddUpdateCustomer showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} customers={customers} setCustomers={setCustomers} getData={advancedGetCustomers} />} />
                <Route path={'ModifyCustomer/:id'} element={<AddUpdateCustomer showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} setCustomers={setCustomers} customers={customers} getData={advancedGetCustomers} />} />
                <Route path={'*'} element={ <Error homePath={homePath} /> } />
            </Routes>
        </>
    );
};

export default Customers;