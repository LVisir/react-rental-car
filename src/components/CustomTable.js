import {Table} from 'react-bootstrap'
import Button from "./Button";
import React, {useEffect} from 'react';

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill, BsFillLightningChargeFill } from 'react-icons/bs';
import Pagination from "./Pagination";
import UsefulFunctions from "../functions/UsefulFunctions";

/**
 * Tabella che si adatta in base ad un lista data in input ed ai suoi campi di riferimento
 * @param campi
 * @param lista
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTable = ({ tableConfigurations }) => {

/*    useEffect(() => {
        //console.log(tableConfigurations.sortableFields[2].orderBy['dataNascita'])
    }, [tableConfigurations.sortableFields[2].orderBy]);*/

    const { changeOrder } = UsefulFunctions()

    /**
     * Nel caso il Superuser si fosse autenticato allora fornisce tali azioni
     * @returns {JSX.Element}
     */
    const superuserActions = () => {
        return (
            <td>
                <Button text={'Modifica'}/>
                <Button text={'Cancella'}/>
                <Button text={'Prenotazioni'}/>
            </td>
        )
    }

    // different style based on the 'tableConfigurations.sortableFields.state' value
    const sortStyle = (sortableField, index) => {
        switch (sortableField.state()){
            case 0:
                return <BsFillLightningChargeFill style={{cursor: 'pointer'}} onClick={() => changeOrder(sortableField)} />
            case 1:
                return <BsFillArrowDownCircleFill style={{cursor: 'pointer'}} onClick={() => changeOrder(sortableField)} />
            case 2:
                return <BsFillArrowUpCircleFill style={{cursor: 'pointer'}} onClick={() => changeOrder(sortableField)}  />
            default:
                return <BsFillArrowUpCircleFill style={{cursor: 'pointer'}} onClick={() => changeOrder(sortableField)}  />
        }
    }

    const test = (index, sortableField) => {
        /*console.log(Object.entries(sortableField.orderBy)[0][1]+' '+Object.entries(sortableField.orderBy)[0][0])*/
        return (
            <th key={index}>
                {
                    sortStyle(sortableField, index)
                }
            </th>
        )
    }

    /**
     * Explanation:
     *   - from 'tableConfiguraitons' I'm iterating through the 'sortableFields' to set headers of the table;
     *   - for each element I'm checking if that object can be sort: if yes I will put some button to interact with the table, otherwise nothing;
     *      - for example in <td colspan .../> I'm checking if this is true so the column shold take 2 columns: 1 for the field name and 1 for the button relate to him
     *
     *  Clarifications:
     *  - React.Fragment is for empty tag that need a key;
     *  - In 'tableConfigurations.sortableFields.filter((el) => el.orderBy)' I'm checking if in the configuration for the table that field name is sortable or not
     */
    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr style={{textAlign: 'center'}} >
                        <th>#</th>
                        {tableConfigurations.fieldNameDb.map(
                            (nomeCampo, index) =>
                                <React.Fragment key={index}>
                                    <th>
                                        {tableConfigurations.fieldNameTableHeader[index]}
                                    </th>
                                    {/*{tableConfigurations.sortableFields.map((el) => {
                                        Object.entries(el.orderBy)[0][1] && sortStyle(el, index)
                                    })}*/}
                                    {
                                        tableConfigurations.sortableFields[index].orderBy() &&
                                        <th key={index}>
                                            {
                                                sortStyle(tableConfigurations.sortableFields[index], index)
                                            }
                                        </th>
                                    }
                                    {/*{tableConfigurations.sortableFields.filter((el) => el.orderBy) &&
                                        <th key={index}>
                                            {
                                                sortStyle(tableConfigurations.sortableFields[index], index)
                                            }
                                        </th>
                                    }*/}
                                </React.Fragment>

                        )}
                        {sessionStorage.getItem('superuser')!=null  && tableConfigurations.tableName === 'CUSTOMER' && <th>Azioni</th>}
                    </tr>
                </thead>
                <tbody>
                {tableConfigurations.list().map(
                    (el, index) =>
                        <tr key={index} style={{textAlign: 'center'}}>
                            <td key={index}>{index}</td>
                            {tableConfigurations.fieldNameDb.map(
                                (innerEl, innerIndex) =>
                                    <td colSpan={`${tableConfigurations.sortableFields.filter((el) => el.field === innerEl).length > 0 ? 2 : 1}`} key={innerIndex}>{el[innerEl]}</td>
                            )}
                            {sessionStorage.getItem('superuser')!=null && tableConfigurations.tableName === 'CUSTOMER' && superuserActions()}
                        </tr>
                )}
                </tbody>
            </Table>
            <Pagination tableConfigurations={tableConfigurations}/>
        </>
    );
};

export default CustomTable;