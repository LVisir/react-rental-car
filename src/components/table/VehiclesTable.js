import React, {useEffect, useState} from 'react';
import UsefulFunctions from "../../functions/UsefulFunctions";
import {useNavigate} from "react-router-dom";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";

const VehiclesTable = ({ logout, links, tableConfig, setTableConfig, vehicles, setVehicles, getData }) => {

    const { buildOrderFieldPath } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const navigate = useNavigate()

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const fetchVehicles = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
        }

        fetchVehicles().then(r => {
            setTableConfig({
                ...tableConfig,
                list: r,
            })
            setVehicles(r)
        })
    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} objectList={vehicles} setObjectList={setVehicles} getData={getData} />
            <Container className={'my-2'}>
                <h3>
                    Vehicles
                    <Button className={'btn btn-primary'} color={'green'} text={'Add'} onClickDo={() => {navigate('/Vehicles/AddVehicle')}}/>
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} objectList={vehicles} setObjectList={setVehicles} getData={getData} />
            </Container>
        </>
    );
};

export default VehiclesTable;