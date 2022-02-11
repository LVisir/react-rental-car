import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Container} from "react-bootstrap";
import Login from "../components/authentication/Login";
import ErrorLogin from "../components/errors/ErrorLogin";

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
                        {/*<Route path={'/AddUpdateCustomer'} element={<Login setToken={setToken}/>}/>*/}
                    </Routes>
                </Container>
            </Router>
    );
};

export default LoginPage;