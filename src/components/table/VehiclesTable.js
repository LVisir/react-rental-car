import React, {useEffect, useState} from 'react';
import UsefulFunctions from "../../functions/UsefulFunctions";
import {useNavigate} from "react-router-dom";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";

const VehiclesTable = ({ logout, links, tableConfig, setTableConfig, getData }) => {

    const { buildOrderFieldPath } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const navigate = useNavigate()

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const fetchVehicles = async () => {
            const data = await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)

            setTableConfig(prevTableConfig => {
                return {
                    ...prevTableConfig,
                    list: data,
                }
            })
        }

        fetchVehicles()
    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} getData={getData} />
            <Container className={'my-2'}>
                <h3>
                    Vehicles
                    { sessionStorage.getItem('superuser') && <Button className={'btn btn-primary'} color={'green'} text={'Add'} onClickDo={() => {
                        navigate('/Vehicles/AddVehicle')
                    }}/> }
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} getData={getData} />
            </Container>
        </>
    );
};

export default VehiclesTable;