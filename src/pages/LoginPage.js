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
                        <Route path={'/'} element={<Login setToken={setToken}/>}/>
                        <Route path='*' element={<ErrorLogin />} />
                    </Routes>
                </Container>
            </Router>
    );
};

export default LoginPage;