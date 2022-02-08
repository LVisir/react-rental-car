import UsefulFunctions from "../functions/UsefulFunctions";
import {useEffect, useState} from "react";
import Header from "./Header";
import {Container} from "react-bootstrap";
import CustomTable from "./CustomTable";
import BookingService from "../service/Booking/BookingService";

const Reservations = ({ logout, links }) => {

    const { field, fieldHeader, bookingsLength, filter, bookingsPath } = BookingService()

    const { customQuery } = UsefulFunctions()

    const [tableConfig, setTableConfig] = useState({
        dbFields: field,
        tableHeaders: fieldHeader,
        dataSize: bookingsLength,
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
        startPath: bookingsPath,
        tableName: 'BOOKINGS',
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
                sortable: false,
                sortType: '',
            }
        ]
    });

    useEffect(() => {
        const fetchBookings = async () => {
            return await customQuery(tableConfig.startPath, '?_limit=10')
        }

        fetchBookings().then(r => setTableConfig({
            ...tableConfig,
            list: r,
        }))
    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} />
            <Container className={'my-2'}>
                <h3>
                    Bookings
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} />
            </Container>
        </>
    );
};

export default Reservations;