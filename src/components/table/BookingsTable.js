import UsefulFunctions from "../../functions/UsefulFunctions";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";

const BookingsTable = ({ logout, links, tableConfig, setTableConfig, getData }) => {

    const { buildOrderFieldPath } = UsefulFunctions()

    useEffect(() => {
        const fetchBookings = async () => {
            const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
            const data = await getData(sortPath, orderPath, tableConfig, tableConfig.startPath)
            setTableConfig(prevTableConfigList => {
                return { ...prevTableConfigList, list: data}
            })
        }

        fetchBookings()

    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} getData={getData} />
            <Container className={'my-2'}>
                <h3>
                    Bookings
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} getData={getData} />
            </Container>
        </>
    );
};

export default BookingsTable;