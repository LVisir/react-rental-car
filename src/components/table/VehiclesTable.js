import React, {useEffect} from 'react';
import UsefulFunctions from "../../functions/UsefulFunctions";
import {useNavigate} from "react-router-dom";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";
import CustomSort from "../../functions/CustomSort";
import VehiclesService from "../../service/Vehicles/VehiclesService";
import CustomAlert from "../alerts/CustomAlert";

const VehiclesTable = ({ logout, links, tableConfig, setTableConfig, setCustomAlert, setTextCustomAlert, customAlert, textCustomAlert }) => {

    const { getVehicles } = VehiclesService()
    const { buildOrderFieldPath, currentPages } = UsefulFunctions()
    const { dynamicSortMultiple } = CustomSort()

    const navigate = useNavigate()

    useEffect(() => {

        setCustomAlert(prevState => {
            return prevState && false
        })

        const fetchVehicles = async () => {

            const responseInfo = await getVehicles()

            if(responseInfo.error){

                setTextCustomAlert(responseInfo.message)

                setCustomAlert(true)

            }
            else if(responseInfo.list !== []){

                const { sortPath } = buildOrderFieldPath(tableConfig.fieldObjects)

                if(sortPath.length!==0){

                    responseInfo.list.sort(dynamicSortMultiple(...sortPath))

                }

            }

            setTableConfig(prevTableConfig => {
                return {
                    ...prevTableConfig,
                    list: responseInfo.list,
                    dataSize: Math.floor(responseInfo.list.length/10),
                    currentPages: currentPages(responseInfo.list.length)
                }
            })

        }

        fetchVehicles()

    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} getData={getVehicles}
                    setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} />
            <Container className={'my-2'}>
                { customAlert && <CustomAlert text={textCustomAlert} /> }
                {!customAlert &&
                    <>
                        <h3>
                            Vehicles
                            {sessionStorage.getItem('superuser') &&
                                <Button className={'btn btn-primary'} color={'green'} text={'Add'} onClickDo={() => {
                                    navigate('/Vehicles/AddVehicle')
                                }}/>}
                        </h3>
                        <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} getData={getVehicles}
                        setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} />
                    </>
                }
            </Container>
        </>
    );
};

export default VehiclesTable;