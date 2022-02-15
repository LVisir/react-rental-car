import UsefulFunctions from "../../functions/UsefulFunctions";
import {useEffect, useState} from "react";

const Pagination = ({ tableConfig, setTableConfig, setObjectList, getData }) => {

    const { buildOrderFieldPath } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)

    const [currentPage, setCurrentPage] = useState(tableConfig.currentPage);

    // triggered when the useState currentPage attached to the current page of the table has been changed
    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const getListObjects = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
        }


        // fetch + manage the reset button if it has to be available or not
        getListObjects().then(r => {
            if (tableConfig.currentPage !== 1) {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetPaginationButton: false,
                })
            } else {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetPaginationButton: true,
                })
            }
            setObjectList(r)
        })

        return () => {
            // when this useEffect is thrown, first abort the previous fetch if it is still in calling
            controller.abort()
        }

    }, [currentPage]);

    // change the page forward
    const forward = (k) => {
        k+=1

        // establishes when the pages must shift forward
        if(tableConfig.currentPages.at(-1) <= tableConfig.currentPage){
            let tmpCurrentPages = tableConfig.currentPages
            tmpCurrentPages.forEach((value, index) => tmpCurrentPages[index] = value + 1)
            setTableConfig({
                ...tableConfig,
                currentPages: tmpCurrentPages
            })
        }
        setTableConfig({
            ...tableConfig,
            currentPage: k
        })
        setCurrentPage(k)
    }

    // change the page backward
    const backward = (k) => {
        k-=1

        // establishes when the pages must shift backward
        if(tableConfig.currentPages[0] >= tableConfig.currentPage){
            let tmpCurrentPages = tableConfig.currentPages
            tmpCurrentPages.forEach((value, index) => tmpCurrentPages[index] = value - 1)
            setTableConfig({
                ...tableConfig,
                currentPages: tmpCurrentPages
            })
        }
        setTableConfig({
            ...tableConfig,
            currentPage: k
        })
        setCurrentPage(k)
    }

    return (
        <div>
            <nav aria-label='Page navigation example'>
                <ul className='pagination justify-content-end'>
                    <li
                        className={`page-item ${tableConfig.currentPages[0]===1 && 'disabled'}`}
                        style={{cursor: `${tableConfig.currentPages[0]===1 ? 'default' : 'pointer'}`}}>
                        <button className='page-link' onClick={() => backward(tableConfig.currentPage)}>Previous</button>
                    </li>
                    {tableConfig.currentPages.map((page, index) =>
                        <li key={index} className={`page-item ${tableConfig.currentPage === page && 'active'}`}>
                            <button className='page-link' style={{cursor: 'pointer'}} onClick={() => {
                                setTableConfig({
                                    ...tableConfig,
                                    currentPage: page,
                                })
                                setCurrentPage(page)
                            }}>{page}</button>
                        </li>)}
                    <li
                        className={`page-item ${tableConfig.currentPages[2] === tableConfig.dataSize && 'disabled'}`}
                        style={{cursor: `${tableConfig.currentPages[2] === tableConfig.dataSize ? 'default' : 'pointer'}`}}
                    >
                        <button className='page-link' style={{cursor: 'pointer'}} onClick={() => forward(tableConfig.currentPage)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;