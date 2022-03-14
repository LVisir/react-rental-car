import React, {useEffect} from "react";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";
import {useNavigate} from "react-router-dom";
import CustomerService from "../../service/Customer/CustomerService";
import CustomAlert from "../alerts/CustomAlert";
import UsefulFunctions from "../../functions/UsefulFunctions";
import CustomSort from "../../functions/CustomSort";

const CustomersTable = ({ logout, links, tableConfig, setTableConfig, setCustomAlert, setTextCustomAlert, customAlert, textCustomAlert }) => {

    const navigate = useNavigate()

    const { getCustomers } = CustomerService()
    const { buildOrderFieldPath, currentPages } = UsefulFunctions()
    const { dynamicSortMultiple } = CustomSort()

    useEffect(() => {

        setCustomAlert(prevState => {
            return prevState && false
        })

        const fetchCustomers = async () => {

            const responseInfo = await getCustomers()

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

        fetchCustomers()

    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true} getData={getCustomers}
                    setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} />

            <Container className={'my-2'}>
                { customAlert && <CustomAlert text={textCustomAlert} /> }
                { !customAlert &&
                    <>
                        <h3>
                            Customers
                            <Button className={'btn btn-primary'} color={'green'} text={'Add'} onClickDo={() => {navigate('/Customers/AddCustomer')}}/>
                        </h3>
                        <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} getData={getCustomers}
                                     setCustomAlert={setCustomAlert} setTextCustomAlert={setTextCustomAlert} />
                    </>
                }
            </Container>
        </>
    );
};

export default CustomersTable;