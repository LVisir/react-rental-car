import {Table} from 'react-bootstrap'
import Button from "./Button";
import React, {useEffect} from 'react';

import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import Pagination from "./Pagination";

/**
 * Tabella che si adatta in base ad un lista data in input ed ai suoi campi di riferimento
 * @param campi
 * @param lista
 * @returns {JSX.Element}
 * @constructor
 */
const CustomTable = ({campi, lista, tableConfigurations, changeOrder }) => {

    useEffect(() => {
        console.log(tableConfigurations.sortableFields[2].orderBy['dataNascita'])
    }, [tableConfigurations.sortableFields[2].orderBy]);


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

    const testFunction = (param) => {
        if(param.field==='nome'){
            param.setState()
        }
    }

    /**
     * Ragionamento:
     * - creo tabella con <th> uguale a 'campi' dato in input
     * - per ogni elemento della lista creo una nuova riga e per ogni riga:
     *  - creo x colonne in base al numero di campi (map dentro un map)
     *
     *  Clarifications:
     *  - React.Fragment is for empty tag that need a key;
     *  - In 'tableConfigurations.sortableFields.filter((el) => el.field === nomeCampo).length > 0' I'm checking if in the configuration for the table that field name is sortable or not
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
                                    <th key={nomeCampo}>
                                        {nomeCampo}
                                    </th>
                                    {tableConfigurations.sortableFields.filter((el) => el.field === nomeCampo).length > 0 &&
                                        <th key={index}>
                                            {
                                                tableConfigurations.sortableFields[index].orderBy[nomeCampo] ? (
                                                    <BsFillArrowDownCircleFill style={{cursor: 'pointer'}} onClick={() => changeOrder(tableConfigurations.sortableFields, index)} />
                                                    ) : (
                                                        <BsFillArrowUpCircleFill style={{cursor: 'pointer'}} onClick={() => changeOrder(tableConfigurations.sortableFields, index)} />
                                                )
                                            }
                                        </th>
                                    }
                                </React.Fragment>

                        )}
                        {sessionStorage.getItem('superuser')!=null && <th>Azioni</th>}
                    </tr>
                </thead>
                <tbody>
                {lista.map(
                    (el, index) =>
                        <tr key={index} style={{textAlign: 'center'}}>
                            <td key={index}>{index}</td>
                            {campi.map(
                                (innerEl, innerIndex) =>
                                    <td colSpan={`${tableConfigurations.sortableFields.filter((el) => el.field === innerEl).length > 0 ? 2 : 1}`} key={innerIndex}>{el[innerEl]}</td>
                            )}
                            {sessionStorage.getItem('superuser')!=null && superuserActions()}
                        </tr>
                )}
                </tbody>
            </Table>
            <Pagination />
        </>
    );
};

export default CustomTable;