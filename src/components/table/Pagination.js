const Pagination = ({ tableConfig, setTableConfig }) => {

    const changePage = (currentPage, currentPages) => {

        let disableResetPaginationButton = false

        if(currentPage === 1){
            disableResetPaginationButton = !disableResetPaginationButton
        }

        setTableConfig(prevTableConfigPages => {
            return {...prevTableConfigPages, currentPage: currentPage, currentPages: currentPages, disableResetPaginationButton: disableResetPaginationButton}
        })

    }

    // change the page forward
    const forward = (k) => {
        k+=1

        let tmpCurrentPages = tableConfig.currentPages

        // establishes when the pages must shift forward
        if(tableConfig.currentPages.at(-1) <= tableConfig.currentPage){

            tmpCurrentPages.forEach((value, index) => tmpCurrentPages[index] = value + 1)
        }

        changePage(k, tmpCurrentPages)

    }

    // change the page backward
    const backward = (k) => {
        k-=1

        let tmpCurrentPages =  tableConfig.currentPages

        // establishes when the pages must shift backward
        if(tableConfig.currentPages[0] >= tableConfig.currentPage){

            tmpCurrentPages.forEach((value, index) => tmpCurrentPages[index] = value - 1)

        }

        tmpCurrentPages === [] ? changePage(k) : changePage(k, tmpCurrentPages)
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
                            <button className='page-link' style={{cursor: 'pointer'}} onClick={() => changePage(page, tableConfig.currentPages)}>{page}</button>
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