import {useEffect, useState} from 'react';
import CustomerService from '../../service/Customer/CustomerService';
import AddUpdateCustomer from "../addUpdate/AddUpdateCustomer";
import { Route, Routes } from 'react-router-dom';
import Error from "../errors/Error";
import CustomersTable from "../table/CustomersTable";

const Customers = ({ logout, links, homePath }) => {

    const { field, fieldHeader, filter, customersPath, getCustomers  } = CustomerService()

    const [customAlert, setCustomAlert] = useState(false);
    const [textCustomAlert, setTextCustomAlert] = useState('');

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
    const [tableConfig, setTableConfig] = useState(() => {
        return {
            dbFields: field,
            tableHeaders: fieldHeader,
            dataSize: 0,
            currentPage: 1,
            currentPages: [],
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
        }
    });

    return (
        <>
            <Routes>

                <Route path={'/'} element={<CustomersTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links}
                                                           setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} customAlert={customAlert} textCustomAlert={textCustomAlert} /> } />

                <Route path={'AddCustomer'} element={<AddUpdateCustomer showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} getData={getCustomers} />} />
                <Route path={'ModifyCustomer/:id'} element={<AddUpdateCustomer showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} getData={getCustomers} />} />
                <Route path={'*'} element={ <Error homePath={homePath} /> } />
            </Routes>
        </>
    );
};

export default Customers;