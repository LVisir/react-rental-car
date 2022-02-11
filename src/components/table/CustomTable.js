import {Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Pagination from "./Pagination";
import {BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsFillLightningChargeFill} from "react-icons/bs";
import Button from "../graphic/Button";
import UsefulFunctions from "../../functions/UsefulFunctions";
import DeleteDialog from "../confirmDialog/DeleteDialog";
import { useNavigate } from "react-router-dom";

const CustomTable = ({ tableConfig, setTableConfig, objectList, setObjectList }) => {

    const { buildOrderFieldPath, getData, deleteObject } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const navigate = useNavigate()

    const [sortButton, setSortButton] = useState(false);
    const [confirmDeleteButton, setConfirmDeleteButton] = useState(false);

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
            if(sortPath !== '') {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetTableButton: false,
                })
            }
            else{
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetTableButton: true,
                })
            }
            setObjectList(r)
        })

        return () => {
            // when this useEffect is thrown, first abort the previous fetch if it is still in calling
            controller.abort()
        }


    }, [sortButton, confirmDeleteButton]);

    /**
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

    // actions of the superuser based on the type of table
    const superuserActions = (tableName, id) => {
        switch (tableName){
            case 'CUSTOMERS':
                return (
                    <td>
                        <Button color={'MediumSlateBlue'} text={'Edit'} onClickDo={() => {
                            navigate(`/Customers/ModifyCustomer/${id}`)
                        }}/>
                        <Button color={'MediumSlateBlue'} text={'Delete'} onClickDo={() => {
                            setIdObject(id)
                            setDeleteDialog(true)
                        }} />
                    </td>
                )
            case 'BOOKINGS':
                return (
                    <td>
                        <Button color={'MediumSlateBlue'} text={'Delete'} onClickDo={() => {
                            setIdObject(id)
                            setDeleteDialog(true)
                        }}/>
                    </td>
                )
            case 'VEHICLES':
                return (
                    <td>
                        <Button color={'MediumSlateBlue'} text={'Edit'} onClickDo={() => {
                            navigate(`/Vehicles/ModifyVehicle/${id}`)
                        }}/>
                        <Button color={'MediumSlateBlue'} text={'Delete'} onClickDo={() => {
                            setIdObject(id)
                            setDeleteDialog(true)
                        }} />
                    </td>
                )
        }
    }

    // function that gives the appropriate button for the bookings approvals
    const acceptDeniedBookingButton = (val) => {
        return val === 1 ? (
            <Button text={'Approved'} disable={true} />
        ) : (
            <Button text={'Approves'} color={'green'} disable={false} />
        )
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
                    {/* Superuser header layout */}
                    {
                        sessionStorage.getItem('superuser')!=null  &&
                        (tableConfig.tableName === 'CUSTOMERS' || tableConfig.tableName === 'BOOKINGS' || tableConfig.tableName === 'VEHICLES') &&
                        <th>Azioni</th>
                    }
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
                                            /* which column can be sorted */
                                            if(tableConfig.tableName !== 'BOOKINGS') {
                                                return (
                                                <td key={innerIndex} colSpan={`${innerEl.sortable ? 2 : 1}`}>
                                                    {el[innerEl.field]}
                                                </td>)
                                            }
                                            else if(tableConfig.tableName === 'BOOKINGS'){
                                                /* in the bookings table the approvals must be a button active/disable */
                                                return innerEl.field === 'approval' ? (
                                                    <td key={innerIndex}>
                                                        {acceptDeniedBookingButton(el[innerEl.field])}
                                                    </td>
                                                ) : (
                                                    <td key={innerIndex} colSpan={`${innerEl.sortable ? 2 : 1}`}>
                                                        {el[innerEl.field]}
                                                    </td>
                                                )
                                            }
                                        }
                                    )
                                }
                                {/* Super user actions layout */}
                                {
                                    sessionStorage.getItem('superuser')!==null &&
                                    (tableConfig.tableName === 'CUSTOMERS' || tableConfig.tableName === 'BOOKINGS' || tableConfig.tableName === 'VEHICLES') &&
                                    superuserActions(tableConfig.tableName, el['id'])
                                }
                            </tr>
                    )
                }
                </tbody>
            </Table>
            {/* Confirm message when the user try to delete */}
            {
                deleteDialog &&
                <DeleteDialog bool={deleteDialog} setBool={setDeleteDialog} deleteObject={deleteObject}
                              id={idObject} setId={setIdObject} path={tableConfig.startPath}
                              objectList={objectList} setObjectList={setObjectList}
                              updateTable={confirmDeleteButton} setUpdateTable={setConfirmDeleteButton}
                />
            }
            <Pagination tableConfig={tableConfig} setTableConfig={setTableConfig} setObjectList={setObjectList} />
        </>
    );
};

export default CustomTable;