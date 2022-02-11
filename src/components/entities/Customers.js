import { useState } from 'react';
import CustomerService from '../../service/Customer/CustomerService';
import AddUpdateCustomer from "../addUpdate/AddUpdateCustomer";
import { Route, Routes } from 'react-router-dom';
import Error from "../errors/Error";
import CustomersTable from "../table/CustomersTable";

const Customers = ({ logout, links }) => {

    const { field, fieldHeader, customersLength, filter, customersPath } = CustomerService()

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

    const [customers, setCustomers] = useState(tableConfig.list);

    return (
        <>
            <Routes>
                <Route path={'/'} element={<CustomersTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links} customers={customers} setCustomers={setCustomers} /> } />
                <Route path={'AddCustomer'} element={<AddUpdateCustomer showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} />} />
                <Route path={'ModifyCustomer/:id'} element={<AddUpdateCustomer showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} />} />
                <Route path={'*'} element={<Error />} />
            </Routes>
        </>
    );
};

export default Customers;