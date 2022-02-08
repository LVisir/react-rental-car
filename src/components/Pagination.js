import UsefulFunctions from "../functions/UsefulFunctions";
import {useEffect} from "react";

const Pagination = ({ tableConfig, setTableConfig }) => {

    const { buildOrderFieldPath, getData } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)

    useEffect(() => {
        const getListObjects = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath)
        }

        getListObjects().then(r => {
            if(tableConfig.currentPage !== 1) {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetPaginationButton: false,
                })
            }
            else {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetPaginationButton: true,
                })
            }
        })

    }, [tableConfig.currentPage]);

    // change the page forward
    const forward = (k) => {
        k+=1
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
    }

    // change the page backward
    const backward = (k) => {
        k-=1
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
                            <button className='page-link' style={{cursor: 'pointer'}} onClick={() => setTableConfig({
                                ...tableConfig,
                                currentPage: page,
                            })}>{page}</button>
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