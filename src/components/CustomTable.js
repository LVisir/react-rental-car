import {Table} from "react-bootstrap";
import React, {useEffect} from "react";

import Pagination from "./Pagination";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsFillLightningChargeFill} from "react-icons/bs";
import Button from "./Button";
import UsefulFunctions from "../functions/UsefulFunctions";

const CustomTable = ({ tableConfig, setTableConfig }) => {

    const { buildOrderFieldPath, getData } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)

    useEffect(() => {
        const getListObjects = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath)
        }

        getListObjects().then(r => setTableConfig({
            ...tableConfig,
            list: r,
        }))
        if(tableConfig.fieldObjects.filter(x => x.sortType !== '').length > 0){
            setTableConfig({
                ...tableConfig,
                resetButtonDisable: false,
            })
            console.log(tableConfig.resetButtonDisable)
        }

        console.log(tableConfig)
    }, [tableConfig.fieldObjects]);

    const shiftOrderStyle = (fieldObject) => {
        let tmpFieldObjects
        switch (fieldObject.sortType){
            case '':
                tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
                    let returnValue = { ...a }
                    if (a.field === fieldObject.field) returnValue.sortType = 'asc'
                    return returnValue
                })
                setTableConfig({
                    ...tableConfig,
                    fieldObjects: tmpFieldObjects
                })
                break
            case 'asc':
                tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
                    let returnValue = { ...a }
                    if (a.field === fieldObject.field) returnValue.sortType = 'desc'
                    return returnValue
                })
                setTableConfig({
                    ...tableConfig,
                    fieldObjects: tmpFieldObjects
                })
                break
            case 'desc':
                tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
                    let returnValue = { ...a }
                    if (a.field === fieldObject.field) returnValue.sortType = ''
                    return returnValue
                })
                setTableConfig({
                    ...tableConfig,
                    fieldObjects: tmpFieldObjects
                })
                break
        }
    }

    const sortStyle = (fieldObject) => {
        switch (fieldObject.sortType){
            case '':
                return <BsFillLightningChargeFill style={{cursor: 'pointer'}} onClick={() => shiftOrderStyle(fieldObject)} />
            case 'asc':
                return <BsFillArrowDownCircleFill style={{cursor: 'pointer'}} onClick={() => shiftOrderStyle(fieldObject)} />
            case 'desc':
                return <BsFillArrowUpCircleFill style={{cursor: 'pointer'}} onClick={() => shiftOrderStyle(fieldObject)}  />
            default:
                return <BsFillArrowUpCircleFill style={{cursor: 'pointer'}} onClick={() => shiftOrderStyle(fieldObject)}  />
        }
    }

    const superuserActions = () => {
        return (
            <td>
                <Button text={'Modifica'}/>
                <Button text={'Cancella'}/>
                <Button text={'Prenotazioni'}/>
            </td>
        )
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                <tr style={{textAlign: 'center'}} >
                    <th>#</th>
                    {tableConfig.fieldObjects.map((element, index) =>
                        <React.Fragment key={index} >
                            <th>
                                {element.header}
                            </th>
                            {
                                element.sortable &&
                                <th>
                                    {
                                        sortStyle(element)
                                    }
                                </th>
                            }
                        </React.Fragment>
                    )}
                    {sessionStorage.getItem('superuser')!=null  && tableConfig.tableName === 'CUSTOMER' && <th>Azioni</th>}
                </tr>
                </thead>
                <tbody>
                {
                    tableConfig.list.map(
                        (el, index) =>
                            <tr key={index} style={{textAlign: 'center'}}>
                                <td key={index}>{index}</td>
                                {
                                    tableConfig.fieldObjects.map(
                                        (innerEl, innerIndex) =>
                                            <td key={innerIndex} colSpan={`${innerEl.sortable ? 2 : 1}`}>{el[innerEl.field]}</td>
                                    )
                                }
                                {sessionStorage.getItem('superuser')!=null && tableConfig.tableName === 'CUSTOMER' && superuserActions()}
                            </tr>
                    )
                }
                </tbody>
            </Table>
            <Pagination tableConfig={tableConfig} setTableConfig={setTableConfig}/>
        </>
    );
};

export default CustomTable;