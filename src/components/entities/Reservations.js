import UsefulFunctions from "../../functions/UsefulFunctions";
import {useEffect, useState} from "react";
import Header from "../Header";
import {Container} from "react-bootstrap";
import CustomTable from "../table/CustomTable";
import BookingService from "../../service/Booking/BookingService";
import {Route, Routes} from "react-router-dom";
import BookingsTable from "../table/BookingsTable";
import AddUpdateVehicle from "../addUpdate/AddUpdateVehicle";
import Error from "../errors/Error";

const Reservations = ({ logout, links }) => {

    const { field, fieldHeader, bookingsLength, filter, bookingsPath } = BookingService()

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

    const [bookings, setBookings] = useState(tableConfig.list);

    return (
        <>
            <Routes>
                <Route path={'/'} element={<BookingsTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links} bookings={bookings} setBookings={setBookings} /> } />
                <Route path={'*'} element={<Error />} />
            </Routes>
        </>
    );
};

export default Reservations;