import  { useState } from "react";
import VehiclesService from "../../service/Vehicles/VehiclesService";
import { Route, Routes } from "react-router-dom";
import Error from "../errors/Error";
import VehiclesTable from "../table/VehiclesTable";
import AddUpdateVehicle from "../addUpdate/AddUpdateVehicle";

const Vehicles = ({ logout, links }) => {

    const { field, fieldHeader, vehiclesLength, filter, vehiclesPath } = VehiclesService()

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
                <Route path={'AddVehicle'} element={<AddUpdateVehicle showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} />} />
                <Route path={'ModifyVehicle/:id'} element={<AddUpdateVehicle showSearchButton={false} links={links} logout={logout} setTableConfig={setTableConfig} tableConfig={tableConfig} setVehicles={setVehicles} />} />
                <Route path={'*'} element={<Error />} />
            </Routes>
        </>
    );
};

export default Vehicles;