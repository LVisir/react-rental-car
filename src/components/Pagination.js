import {useEffect} from 'react';
import CustomerService from '../service/Customer/CustomerService';
import UsefulFunctions from '../functions/UsefulFunctions';

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
        if(tableConfigurations.pageList.pagesArray.at(-1) < tableConfigurations.currentPage.currentPage){
            let x = []
            tableConfigurations.pageList.pagesArray.map((y) => x.push(y+=1))
            tableConfigurations.setPage(x)
        }
        tableConfigurations.changeCurrentPage(k)
    }

    // change the page backward
    const backward = (k) => {
        if(tableConfigurations.pageList.pagesArray[0] > tableConfigurations.currentPage.currentPage){
            let x = []
            tableConfigurations.pageList.pagesArray.map((y) => x.push(y-=1))
            tableConfigurations.setPage(x)
        }
        tableConfigurations.changeCurrentPage(k)
    }

    return (
        <div>
            <nav aria-label='Page navigation example'>
                <ul className='pagination justify-content-end'>
                    <li
                        className={`page-item ${tableConfigurations.pageList.pagesArray[0]===1 && 'disabled'}`}
                        style={{cursor: `${tableConfigurations.pageList.pagesArray[0]===1 ? 'default' : 'pointer'}`}}>
                        <button className='page-link' onClick={() => backward(tableConfigurations.currentPage.currentPage-=1)}>Previous</button>
                    </li>
                    {tableConfigurations.pageList.pagesArray.map((page) =>
                        <li key={page} className={`page-item ${tableConfigurations.currentPage.currentPage === page && 'active'}`}>
                            <button className='page-link' style={{cursor: 'pointer'}} onClick={() => tableConfigurations.changeCurrentPage(page)}>{page}</button>
                        </li>)}
                    <li
                        className={`page-item ${tableConfigurations.pageList.pagesArray[2] === Object.entries(tableConfigurations.pages)[0][1] && 'disabled'}`}
                        style={{cursor: `${tableConfigurations.pageList.pagesArray[2] === Object.entries(tableConfigurations.pages)[0][1] ? 'default' : 'pointer'}`}}
                    >
                        <button className='page-link' style={{cursor: 'pointer'}} onClick={() => forward(tableConfigurations.currentPage.currentPage+=1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;