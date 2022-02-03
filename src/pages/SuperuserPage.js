import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Error from '../components/Error';
import Customers from '../components/Customers';
import CustomerService from '../service/Customer/CustomerService';
import AddCustomer from "../components/AddCustomer";
import Reservations from "../components/Reservations";
import BookingService from "../service/Booking/BookingService";
import Vehicles from "../components/Vehicles";

/**
 * It wraps the Customers and the Error components to show the homepage of a Superuser
 * @param logout
 * @returns {JSX.Element}
 * @constructor
 */
const SuperuserPage = ({logout}) => {

    const { customersPath } = CustomerService()
    const { bookingsPath } = BookingService()

    const links = [{
        name: 'Prenotazioni',
        path: '/Bookings',
    }, {
        name: 'Customers',
        path: '/'
    }, {
        name: 'Vehicles',
        path: '/Vehicles'
    }]

    return (
        <Router>

                <Routes>
                    <Route path="*" element={<Error />} />
                    <Route path={'/'} element={<Customers customersPath={customersPath} logout={logout} links={links}/>} />
                    {/*<Route path={'/AddCustomer'} element={<AddCustomer logout={logout} />} />*/}
                    <Route path={'/Bookings'} element={<Reservations bookingsPath={bookingsPath} logout={logout} links={links}/>} />
                    <Route path={'/Vehicles'} element={<Vehicles links={links} logout={logout}/>} />
                </Routes>

        </Router>
    );
};

export default SuperuserPage;