import UsefulFunctions from "../../functions/UsefulFunctions";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";

const BookingsTable = ({ logout, links, tableConfig, setTableConfig }) => {

    const { buildOrderFieldPath, getData } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const fetchBookings = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
        }

        fetchBookings().then(r => setTableConfig({
            ...tableConfig,
            list: r,
        }))
    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true}/>
            <Container className={'my-2'}>
                <h3>
                    Bookings
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} />
            </Container>
        </>
    );
};

export default BookingsTable;