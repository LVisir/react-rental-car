import React, {useEffect, useState} from "react";
import UsefulFunctions from "../../functions/UsefulFunctions";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";
import {useNavigate} from "react-router-dom";

const CustomersTable = ({ logout, links, tableConfig, setTableConfig, getData }) => {

    const { buildOrderFieldPath } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const navigate = useNavigate()

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const fetchCustomers = async () => {
            const data = await getData(sortPath, orderPath, tableConfig, tableConfig.startPath)

            setTableConfig(prevTableConfig => {
                return {
                    ...prevTableConfig,
                    list: data,
                }
            })

        }

        fetchCustomers()

    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} getData={getData} />
            <Container className={'my-2'}>
                <h3>
                    Customers
                    <Button className={'btn btn-primary'} color={'green'} text={'Add'} onClickDo={() => {navigate('/Customers/AddCustomer')}}/>
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} getData={getData} />
            </Container>
        </>
    );
};

export default CustomersTable;