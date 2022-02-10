import React, {useEffect} from "react";
import UsefulFunctions from "../../functions/UsefulFunctions";
import Header from "../Header";
import {Container} from "react-bootstrap";
import Button from "../graphic/Button";
import CustomTable from "./CustomTable";
import {useNavigate} from "react-router-dom";

const CustomersTable = ({ logout, links, tableConfig, setTableConfig }) => {

    const { buildOrderFieldPath, getData } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const navigate = useNavigate()

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const fetchCustomers = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
        }

        fetchCustomers().then(r => setTableConfig({
            ...tableConfig,
            list: r,
        }))
    }, []);

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={true} throwResetFetch={true}/>
            <Container className={'my-2'}>
                <h3>
                    Customers
                    <Button className={'btn btn-primary'} color={'green'} text={'Add'} onClickDo={() => {navigate('/Customers/AddCustomer')}}/>
                </h3>
                <CustomTable tableConfig={tableConfig} setTableConfig={setTableConfig} />
            </Container>
        </>
    );
};

export default CustomersTable;