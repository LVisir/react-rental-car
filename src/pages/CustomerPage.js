import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Error from "../components/Error";
import Reservations from "../version_1/Reservations";
import BookingService from "../service/Booking/BookingService";

const CustomerPage = ({logout}) => {

    const { bookingsPath } = BookingService()

    return (
        <Router>
                <Routes>
                    <Route path='*' element={<Error />} />
                    <Route path={'/'} element={<Reservations bookingsPath={bookingsPath} logout={logout} />} />
                    {/* Quando farai questo Route dentro :customerCf ci può finire qualsiasi cosa
                              perciò fai un controllo se il cf messo è valido altrimenti porta ad una pagina di errore*/}
                    {/*<Route path={'/:customerCf'} element={<Reservations bookingsPath={bookingsPath} />}/>*/}
                </Routes>
        </Router>
    );
};

export default CustomerPage;