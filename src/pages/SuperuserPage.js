import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Error from '../components/Error';
import Customers from '../components/Customers';
import CustomerService from '../service/Customer/CustomerService';
import AddCustomer from "../components/AddCustomer";
import Reservations from "../components/Reservations";
import BookingService from "../service/Booking/BookingService";

/**
 * It wraps the Customers and the Error components to show the homepage of a Superuser
 * @param logout
 * @returns {JSX.Element}
 * @constructor
 */
const SuperuserPage = ({logout}) => {

    const { customersPath } = CustomerService()
    const { bookingsPath } = BookingService()

    return (
        <Router>

                <Routes>
                    <Route path="*" element={<Error />} />
                    <Route path={'/'} element={<Customers customersPath={customersPath} logout={logout}/>} />
                    {/*<Route path={'/AddCustomer'} element={<AddCustomer logout={logout} />} />*/}
                    <Route path={'/Bookings'} element={<Reservations bookingsPath={bookingsPath} logout={logout} />} />
                </Routes>

        </Router>
    );
};

export default SuperuserPage;