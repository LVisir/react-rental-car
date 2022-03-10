import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Pagination from "./Pagination";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsFillLightningChargeFill} from "react-icons/bs";
import Button from "../graphic/Button";
import UsefulFunctions from "../../functions/UsefulFunctions";
import { useNavigate } from "react-router-dom";
import CustomSort from "../../functions/CustomSort";
import CustomAlert from "../alerts/CustomAlert";

const CustomTable = ({ tableConfig, setTableConfig, getData }) => {


    const { buildOrderFieldPath, dateFormat } = UsefulFunctions()

    const { dynamicSortMultiple } = CustomSort()

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate()

    useEffect(() => {

        error && setError(false)

    }, [error]);


    /**
     *
     * @param fieldObjects
     * @returns {Promise<void>}
     */
    const sort = (fieldObjects) => {

        const newFieldObjects = shiftOrderStyle(fieldObjects)

        const { sortPath } = buildOrderFieldPath(newFieldObjects)

        const list = tableConfig.list.sort(dynamicSortMultiple(...sortPath))

        let disableResetTableButton = false

        if (sortPath.length === 0) {
            disableResetTableButton = !disableResetTableButton
        }

        setTableConfig(prevFieldObjects => {
            return {...prevFieldObjects, fieldObjects: newFieldObjects, list: list, disableResetTableButton: disableResetTableButton, dataSize: Math.floor(list.length/10)}
        })

    }

    /**
     * A method that shift the order type base on the actual order type. After, it updates the tableConfig useState.
     * The order are '' -> 'asc' -> 'desc' -> ... (back to the start like a circle)
     * @param fieldObject
     */
    const shiftOrderStyle = (fieldObject) => {
        let tmpFieldObjects
        switch (fieldObject.sortType){
            case '':
                // a process to update via spread operator an array of object inside an object (tableConfig)
                tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
                    let returnValue = { ...a }
                    if (a.field === fieldObject.field) returnValue.sortType = 'asc'
                    return returnValue
                })

                return tmpFieldObjects
            case 'asc':
                tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
                    let returnValue = { ...a }
                    if (a.field === fieldObject.field) returnValue.sortType = 'desc'
                    return returnValue
                })

                return tmpFieldObjects

            case 'desc':
                tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
                    let returnValue = { ...a }
                    if (a.field === fieldObject.field) returnValue.sortType = ''
                    return returnValue
                })

                return tmpFieldObjects

        }
    }

    /**
     *
     * @param fieldObject
     * @returns {JSX.Element}
     */
    const sortStyle = (fieldObject) => {
        switch (fieldObject.sortType){
            case '':
                return <BsFillLightningChargeFill style={{cursor: 'pointer'}} onClick={() => sort(fieldObject)} />
            case 'asc':
                return <BsFillArrowDownCircleFill style={{cursor: 'pointer'}} onClick={() => sort(fieldObject)} />
            case 'desc':
                return <BsFillArrowUpCircleFill style={{cursor: 'pointer'}} onClick={() => sort(fieldObject)}  />
            default:
                return <BsFillArrowUpCircleFill style={{cursor: 'pointer'}} onClick={() => sort(fieldObject)}  />
        }
    }

    /**
     *
     * @param func
     * @param actionType
     * @returns {Promise<void>}
     */
    const executeActions = async (func, actionType) => {
        if(actionType === 'action'){

            const responseInfo = await func()

            if(responseInfo.error){
                setErrorMessage(responseInfo.message)
                setError(true)
            }
            else{
                const responseInfo = await getData()

                if(responseInfo.error){

                    setErrorMessage(responseInfo.message)

                    setError(true)

                }
                else if(responseInfo.list !== []){

                    const { sortPath } = buildOrderFieldPath(tableConfig.fieldObjects)

                    responseInfo.list.sort(dynamicSortMultiple(...sortPath))

                }

                setTableConfig(prevTableConfig => {
                    return {
                        ...prevTableConfig,
                        list: responseInfo.list,
                        dataSize: Math.floor(responseInfo.list.length/10)
                    }
                })
            }

        }
        else if(actionType === 'navigate'){
            navigate(func())
        }
    }

    return (
        <>
            { error && <CustomAlert text={errorMessage} /> }
            <Table striped bordered hover>
                <thead>
                <tr style={{textAlign: 'center'}} >
                    <th>#</th>
                    {/* Header of the table based on the tableConfig settings */}
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

                    <th>Actions</th>

                </tr>
                {/*{tableConfig.list.map(x => console.log(x))}*/}
                </thead>
                <tbody>
                {
                    /* Iterating through the list and creating the corresponding row  */
                    tableConfig.list.slice((tableConfig.currentPage-1)*10, ((tableConfig.currentPage-1)*10)+10).map(
                        (el, index) =>
                            <tr key={index} style={{textAlign: 'center'}}>
                                {/* Insert in the appropriate column the appropriate data */}
                                <td key={index}>{index}</td>
                                {
                                    tableConfig.fieldObjects.map(
                                        (innerEl, innerIndex) => {
                                            return (
                                                <td key={innerIndex} colSpan={`${innerEl.sortable ? 2 : 1}`}>
                                                    {isNaN(Date.parse(el[innerEl.field])) ? el[innerEl.field] : dateFormat(el[innerEl.field]) } {/* check if it is a date; if yes format from yyyy-mm-dd to gg-mm-yyy */}
                                                </td>)
                                        }
                                    )
                                }

                                <td key={index*10+15}>
                                    {
                                        el.actions.map(
                                            (action, innerIndex) => {
                                                return (
                                                    <React.Fragment key={innerIndex}>
                                                        <Button text={action.actionName} onClickDo={() => executeActions(action.onClick, action.actionType)} disable={action.disable} color={action.color} />
                                                    </React.Fragment>
                                                )
                                            })
                                    }
                                </td>

                            </tr>
                    )
                }
                </tbody>
            </Table>
            <Pagination tableConfig={tableConfig} setTableConfig={setTableConfig} />
        </>
    );
};

export default CustomTable;