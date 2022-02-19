import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Pagination from "./Pagination";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsFillLightningChargeFill} from "react-icons/bs";
import Button from "../graphic/Button";
import UsefulFunctions from "../../functions/UsefulFunctions";
import DeleteDialog from "../confirmDialog/DeleteDialog";
import { useNavigate } from "react-router-dom";

const CustomTable = ({ tableConfig, setTableConfig, objectList, setObjectList, getData }) => {


    const { buildOrderFieldPath, deleteObject, updateObject, dateFormat } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const navigate = useNavigate()

    // buttons of the page with their appropriate useEffect
    const [sortButton, setSortButton] = useState(false);
    const [confirmDeleteButton, setConfirmDeleteButton] = useState(false);
    const [actionButton, setActionButton] = useState(false);

    const [deleteDialog, setDeleteDialog] = useState(false);

    const [idObject, setIdObject] = useState(null);

    // triggered when the sort button is pressed
    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const getListObjects = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
        }


        // fetch + manage the reset button if it has to be available or not
        getListObjects().then(r => {
            if (sortPath !== '') {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetTableButton: false,
                })
            } else {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetTableButton: true,
                })
            }
            setObjectList(r)
        }).catch((error) => {
            console.log('Two or more fetch asked together:',error)
        })

        return () => {
            // when this useEffect is thrown, first abort the previous fetch if it is still in calling
            controller.abort()
        }


    }, [sortButton]);

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const getListObjects = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
        }


        getListObjects().then(r => {

            setTableConfig({
                ...tableConfig,
                list: r,
            })

            //setObjectList(objectList.filter((entity) => entity.id !== idObject))
            setObjectList(r)
        })


        return () => {
            // when this useEffect is thrown, first abort the previous fetch if it is still in calling
            controller.abort()
        }
    }, [confirmDeleteButton]);

    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const getListObjects = async () => {
            const data = await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
            setObjectList(data)
            setTableConfig({
                ...tableConfig,
                list: data,
            })
        }


        getListObjects().catch((error) => {
            console.log('Two or more fetch asked together:',error)
        })


        return () => {
            // when this useEffect is thrown, first abort the previous fetch if it is still in calling
            controller.abort()
        }
    }, [actionButton]);

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
                setTableConfig({
                    ...tableConfig,
                    fieldObjects: tmpFieldObjects
                })
                // trigger the useEffect
                setSortButton(!sortButton)
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
                // trigger the useEffect
                setSortButton(!sortButton)
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
                // trigger the useEffect
                setSortButton(!sortButton)
                break
        }
    }

    // based on the sort type return an appropriate button
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

    const executeActions = (func, actionType) => {
        if(actionType === 'action'){
            func().then(() => setActionButton(!actionButton))
        }
        else if(actionType === 'navigate'){
            navigate(func())
        }
    }

    return (
        <>
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
                </thead>
                <tbody>
                {
                    /* Iterating through the list and creating the corresponding row  */
                    objectList.map(
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
            <Pagination tableConfig={tableConfig} setTableConfig={setTableConfig} setObjectList={setObjectList} getData={getData} />
        </>
    );
};

export default CustomTable;