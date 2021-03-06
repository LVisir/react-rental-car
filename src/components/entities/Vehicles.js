import  { useState } from "react";
import VehiclesService from "../../service/Vehicles/VehiclesService";
import { Route, Routes } from "react-router-dom";
import Error from "../errors/Error";
import VehiclesTable from "../table/VehiclesTable";
import AddUpdateVehicle from "../addUpdate/AddUpdateVehicle";

const Vehicles = ({ logout, links, homePath }) => {

    const { field, fieldHeader, filter, vehiclesPath, getVehicles } = VehiclesService()

    const [customAlert, setCustomAlert] = useState(false);
    const [textCustomAlert, setTextCustomAlert] = useState('');

    /**
     * The tableConfig has all the settings where the table must adapt to:
     * - dbFields: the name of the property of the vehicle object
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
        startPath: vehiclesPath,
        tableName: 'VEHICLES',
        role: '',
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

    return (
        <>
            <Routes>

                <Route path={'/'} element={<VehiclesTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links}
                                                          setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} customAlert={customAlert} textCustomAlert={textCustomAlert}/> } />

                { sessionStorage.getItem('superuser') !== null && <Route path={'AddVehicle'} element={
                    <AddUpdateVehicle showSearchButton={false} links={links} logout={logout}
                                      setTableConfig={setTableConfig}
                                      tableConfig={tableConfig} getData={getVehicles}
                    />}
                /> }

                { sessionStorage.getItem('superuser') !== null && <Route path={'ModifyVehicle/:id'} element={
                    <AddUpdateVehicle showSearchButton={false} links={links} logout={logout}
                                      setTableConfig={setTableConfig}
                                      tableConfig={tableConfig} getData={getVehicles}
                    />}
                /> }

                <Route path={'*'} element={ <Error homePath={homePath} /> } />

            </Routes>
        </>
    );
};

export default Vehicles;