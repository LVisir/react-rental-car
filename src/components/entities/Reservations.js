import {useEffect, useState} from "react";
import BookingService from "../../service/Booking/BookingService";
import {Route, Routes} from "react-router-dom";
import BookingsTable from "../table/BookingsTable";
import Error from "../errors/Error";
import AddUpdateVehicle from "../addUpdate/AddUpdateVehicle";
import AddUpdateBooking from "../addUpdate/AddUpdateBooking";

const Reservations = ({ logout, links, homePath }) => {

    const { field, fieldHeader, bookingsLength, filter, bookingsPath, advancedGetBookings } = BookingService()

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
                sortable: false,
                sortType: '',
            }
        ]
    });

    const [bookings, setBookings] = useState(tableConfig.list);

    return (
        <>
            <Routes>

                <Route path={'/'} element={<BookingsTable tableConfig={tableConfig} setTableConfig={setTableConfig} logout={logout} links={links} bookings={bookings} setBookings={setBookings} getData={advancedGetBookings} /> } />

                { sessionStorage.getItem('customer') !== null &&

                    <Route path={'ModifyBooking/:id'} element={

                        <AddUpdateBooking showSearchButton={false} links={links} logout={logout}
                                          setTableConfig={setTableConfig}
                                          tableConfig={tableConfig} setBookings={setBookings} bookings={bookings}
                                          getData={advancedGetBookings}
                        />}

                    />
                }

                { sessionStorage.getItem('customer') !== null &&

                    <Route path={'AddBooking/:vehicleLicencePlate'} element={

                        <AddUpdateBooking showSearchButton={false} links={links} logout={logout}
                                          setTableConfig={setTableConfig}
                                          tableConfig={tableConfig} setBookings={setBookings} bookings={bookings}
                                          getData={advancedGetBookings}
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