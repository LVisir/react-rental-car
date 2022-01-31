import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import Error from "../components/Error";
import Login from "../components/Login";
import ErrorLogin from "../components/ErrorLogin";

const LoginPage = ({setToken}) => {
    return (
            <Router>
                <Container>
                    <Routes>
                        <Route path='*' element={<ErrorLogin />} />
                        <Route path={'/'} element={<Login setToken={setToken}/>}/>
                        {/* Quando farai questo Route dentro :customerCf ci può finire qualsiasi cosa
                                perciò fai un controllo se il cf messo è valido altrimenti porta ad una pagina di errore*/}
                        {/*<Route path={'/:customerCf'} element={<Login setToken={setToken}/>}/>*/}
                        {/*<Route path={'/AddCustomer'} element={<Login setToken={setToken}/>}/>*/}
                    </Routes>
                </Container>
            </Router>
    );
};

export default LoginPage;