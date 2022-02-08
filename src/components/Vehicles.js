import UsefulFunctions from "../functions/UsefulFunctions";
import {useEffect, useState} from "react";
import VehiclesService from "../service/Vehicles/VehiclesService";
import Header from "./Header";
import Button from "./Button";
import {Container} from "react-bootstrap";
import CustomTable from "./CustomTable";

const Vehicles = ({ logout, links }) => {

    const { field, fieldHeader, vehiclesLength, filter, vehiclesPath } = VehiclesService()

    const { customQuery } = UsefulFunctions()

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

    useEffect(() => {
        const fetchVehicles = async () => {
            return await customQuery(tableConfig.startPath, '?_limit=10')
        }

        fetchVehicles().then(r => setTableConfig({
            ...tableConfig,
            list: r,
        }))
    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} />
            <Container className={'my-2'}>
                <h3>
                    Vehicles
                    <Button color={'green'} text={'Aggiungi'} />
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} />
            </Container>
        </>
    );
};

export default Vehicles;