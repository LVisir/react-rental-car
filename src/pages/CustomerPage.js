import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Error from "../components/errors/Error";
import BookingService from "../service/Booking/BookingService";
import Reservations from "../components/entities/Reservations";
import React from "react";
import Vehicles from "../components/entities/Vehicles";

const CustomerPage = ({logout}) => {

    const links = [{
        name: 'Bookings',
        path: '/Bookings',
    }, {
        name: 'Vehicles',
        path: '/Vehicles'
    }]

    // path for error page
    const homePath = '/Bookings'

    return (
        <Router>
                <Routes>
                    <Route path={'/Bookings/*'} element={<Reservations logout={logout} links={links} homePath={homePath} />} />
                    <Route path={'/Vehicles/*'} element={<Vehicles links={links} logout={logout}/>} homePath={homePath} />
                </Routes>
        </Router>
    );
};

export default CustomerPage;