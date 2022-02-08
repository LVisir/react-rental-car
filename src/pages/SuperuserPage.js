import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Error from '../components/Error';
import Customers from '../version_1/Customers';
import {default as SecondVersioneCustomers} from '../components/Customers'
import Reservations from "../components/Reservations";
import Vehicles from "../components/Vehicles";

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
        path: '/'
    }, {
        name: 'Vehicles',
        path: '/Vehicles'
    }]

    return (
        <Router>

                <Routes>
                    <Route path="*" element={<Error />} />
                    {/*<Route path={'/'} element={<Customers customersPath={customersPath} logout={logout} links={links}/>} />*/}
                    <Route path={'/'} element={<SecondVersioneCustomers logout={logout} links={links} />} />
                    {/*<Route path={'/AddCustomer'} element={<AddCustomer logout={logout} />} />*/}
                    <Route path={'/Bookings'} element={<Reservations logout={logout} links={links}/>} />
                    <Route path={'/Vehicles'} element={<Vehicles links={links} logout={logout}/>} />
                </Routes>

        </Router>
    );
};

export default SuperuserPage;