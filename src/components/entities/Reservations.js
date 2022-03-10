import { useState } from "react";
import BookingService from "../../service/Booking/BookingService";
import {Route, Routes} from "react-router-dom";
import BookingsTable from "../table/BookingsTable";
import Error from "../errors/Error";
import AddUpdateBooking from "../addUpdate/AddUpdateBooking";

const Reservations = ({ logout, links, homePath }) => {

    const { field, fieldHeader, filter, bookingsPath, getBookings } = BookingService()

    const [customAlert, setCustomAlert] = useState(false);
    const [textCustomAlert, setTextCustomAlert] = useState('');

    /**
     * The tableConfig has all the settings where the table must adapt to:
     * - dbFields: the name of the property of the booking object
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

    return (
        <>
            <Routes>

                <Route path={'/'} element={<BookingsTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links}
                                                          setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} customAlert={customAlert} textCustomAlert={textCustomAlert} /> } />

                { sessionStorage.getItem('customer') !== null &&

                    <Route path={'ModifyBooking/:id'} element={

                        <AddUpdateBooking showSearchButton={false} links={links} logout={logout}
                                          setTableConfig={setTableConfig}
                                          tableConfig={tableConfig} getData={getBookings}
                        />}

                    />
                }

                { sessionStorage.getItem('customer') !== null &&

                    <Route path={'AddBooking/:vehicleLicencePlate'} element={

                        <AddUpdateBooking showSearchButton={false} links={links} logout={logout}
                                          setTableConfig={setTableConfig}
                                          tableConfig={tableConfig} getData={getBookings}
                        />}

                    />
                }

                }

                <Route path={'*'} element={ <Error homePath={homePath} /> } />

            </Routes>
        </>
    );
};

export default Reservations;