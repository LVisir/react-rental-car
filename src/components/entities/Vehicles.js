import  { useState } from "react";
import VehiclesService from "../../service/Vehicles/VehiclesService";
import { Route, Routes } from "react-router-dom";
import Error from "../errors/Error";
import VehiclesTable from "../table/VehiclesTable";
import AddUpdateVehicle from "../addUpdate/AddUpdateVehicle";

const Vehicles = ({ logout, links, homePath }) => {

    const { field, fieldHeader, vehiclesLength, filter, vehiclesPath } = VehiclesService()

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
        dataSize: vehiclesLength,
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
            }
        ]
    });

    const [vehicles, setVehicles] = useState(tableConfig.list);

    return (
        <>
            <Routes>

                <Route path={'/'} element={<VehiclesTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links} vehicles={vehicles} setVehicles={setVehicles} /> } />

                { sessionStorage.getItem('superuser') !== null && <Route path={'AddVehicle'} element={
                    <AddUpdateVehicle showSearchButton={false} links={links} logout={logout}
                                      setTableConfig={setTableConfig}
                                      tableConfig={tableConfig} setVehicles={setVehicles} vehicles={vehicles}
                    />}
                /> }

                { sessionStorage.getItem('superuser') !== null && <Route path={'ModifyVehicle/:id'} element={
                    <AddUpdateVehicle showSearchButton={false} links={links} logout={logout}
                                      setTableConfig={setTableConfig}
                                      tableConfig={tableConfig} setVehicles={setVehicles} vehicles={vehicles}
                    />}
                /> }

                <Route path={'*'} element={ <Error homePath={homePath} /> } />

            </Routes>
        </>
    );
};

export default Vehicles;