import React from 'react';
import {BrowserRouter as Router, Outlet, Route, Routes} from 'react-router-dom';
import Error from '../components/errors/Error';
import {default as SecondVersioneCustomers} from '../components/entities/Customers'
import Reservations from "../components/entities/Reservations";
import Vehicles from "../components/entities/Vehicles";
import AddCustomer from "../components/add/AddCustomer";

/**
 * It wraps the Customers and the Error components to show the homepage of a Superuser
 * @param logout
 * @returns {JSX.Element}
 * @constructor
 */
const SuperuserPage = ({logout}) => {

    const links = [{
        name: 'Bookings',
        path: '/Bookings',
    }, {
        name: 'Customers',
        path: '/Customers'
    }, {
        name: 'Vehicles',
        path: '/Vehicles'
    }]

    return (
        <Router>

                <Routes>
                    <Route path="*" element={<Error />} />
                    <Route path={'/Customers/*'} element={<SecondVersioneCustomers logout={logout} links={links} />} />
                    <Route path={'/Bookings/*'} element={<Reservations logout={logout} links={links}/>} />
                    <Route path={'/Vehicles/*'} element={<Vehicles links={links} logout={logout}/>} />
                </Routes>
        </Router>
    );
};

export default SuperuserPage;