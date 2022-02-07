import {useEffect} from 'react';
import UsefulFunctions from '../functions/UsefulFunctions';

/**
 * Pagination component to manage the pages and the actions on them
 * @param tableConfigurations
 * @returns {JSX.Element}
 * @constructor
 */
const Pagination = ({tableConfigurations}) => {

    const { buildPath, askServer, customQuery } = UsefulFunctions()

    const { sortPath, orderPath } = buildPath(tableConfigurations.sortableFields)

    /**
     * If the currentPage changed, send the request by sending some info from the tableConfigurations
     */
    useEffect(() => {
        const getListObjects = async () => {
            return await askServer(sortPath, orderPath, tableConfigurations, customQuery, tableConfigurations.startPath)
        }


        getListObjects().then(r => tableConfigurations.setList(r))

    }, tableConfigurations.useEffectDependencies);

    // change the page forward
    const forward = (k) => {
        k+=1
        if(tableConfigurations.pageList().at(-1) <= tableConfigurations.currentPage()){
            let x = []
            tableConfigurations.pageList().map((y) => x.push(y+=1))
            tableConfigurations.setPage(x)
        }
        tableConfigurations.changeCurrentPage(k)
    }

    // change the page backward
    const backward = (k) => {
        k-=1
        if(tableConfigurations.pageList()[0] >= tableConfigurations.currentPage()){
            let x = []
            tableConfigurations.pageList().map((y) => x.push(y-=1))
            tableConfigurations.setPage(x)
        }
        tableConfigurations.changeCurrentPage(k)
    }

    /**
     * if a 'tableConfigurations.sortablefields' allow the sorting, the column takes two colspan: one for the field and one for the sorting actions
     */
    return (
        <div>
            <nav aria-label='Page navigation example'>
                <ul className='pagination justify-content-end'>
                    <li
                        className={`page-item ${tableConfigurations.pageList()[0]===1 && 'disabled'}`}
                        style={{cursor: `${tableConfigurations.pageList()[0]===1 ? 'default' : 'pointer'}`}}>
                        <button className='page-link' onClick={() => backward(tableConfigurations.currentPage())}>Previous</button>
                    </li>
                    {tableConfigurations.pageList().map((page) =>
                        <li key={page} className={`page-item ${tableConfigurations.currentPage() === page && 'active'}`}>
                            <button className='page-link' style={{cursor: 'pointer'}} onClick={() => tableConfigurations.changeCurrentPage(page)}>{page}</button>
                        </li>)}
                    <li
                        className={`page-item ${tableConfigurations.pageList()[2] === tableConfigurations.pages() && 'disabled'}`}
                        style={{cursor: `${tableConfigurations.pageList()[2] === tableConfigurations.pages() ? 'default' : 'pointer'}`}}
                    >
                        <button className='page-link' style={{cursor: 'pointer'}} onClick={() => forward(tableConfigurations.currentPage())}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;