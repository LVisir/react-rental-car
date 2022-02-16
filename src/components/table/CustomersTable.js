import React, {useEffect, useState} from "react";
import UsefulFunctions from "../../functions/UsefulFunctions";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";
import {useNavigate} from "react-router-dom";

const CustomersTable = ({ logout, links, tableConfig, setTableConfig, customers, setCustomers, getData }) => {

    const { buildOrderFieldPath } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const navigate = useNavigate()

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const fetchCustomers = async () => {
            const data = await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
            setCustomers(data)
            setTableConfig({
                ...tableConfig,
                list: data,
            })
        }

        /*fetchCustomers().then(r => {
            setTableConfig({
                ...tableConfig,
                list: r,
            })
            setCustomers(r)
        })*/

        fetchCustomers()

    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} objectList={customers} setObjectList={setCustomers} getData={getData} />
            <Container className={'my-2'}>
                <h3>
                    Customers
                    <Button className={'btn btn-primary'} color={'green'} text={'Add'} onClickDo={() => {navigate('/Customers/AddCustomer')}}/>
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} objectList={customers} setObjectList={setCustomers} getData={getData} />
            </Container>
        </>
    );
};

export default CustomersTable;