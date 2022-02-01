import {useEffect, useState} from 'react';
import CustomerService from "../service/Customer/CustomerService";

const Pagination = ({tableConfigurations}) => {

    const { customQueryCustomers } = CustomerService()

    // take from the tableConfigurations the fields to sort by and their order type (asc|desc)
    const buildPath = (sortableFields) => {
        let sort = []
        let order = []
        sortableFields.map((element, index) => {
            if((Object.entries(element.orderBy)[0][1]) && element.hasOwnProperty('orderBy') && (Object.entries(element.state)[0][1])!==0){
                sort.push(element.field)
                order.push(Object.entries(element['orderType'])[0][1])
                /*console.log(element.field+' '+(Object.entries(element.state)[0][1]))
                console.log(Object.entries(element.orderBy)[0][1])*/
            }
        })

        let sortPath = ''
        let orderPath = ''

        sort.map((element, index) => {
            if(index !== sort.length-1){
                sortPath = sortPath + element + ','
            }
            else sortPath = sortPath + element
        })

        order.map((element, index) => {
            if(index !== order.length-1){
                orderPath = orderPath + element + ','
            }
            else orderPath = orderPath + element
        })

        return {sortPath, orderPath}
    }

    const { sortPath, orderPath } = buildPath(tableConfigurations.sortableFields)

    const sortAndOrderInfo = [tableConfigurations.sortableFields[0]['orderBy']['nome'], tableConfigurations.sortableFields[1]['orderBy']['cognome']]

    const useEffectDependencies = [tableConfigurations.currentPage.currentPage,
        tableConfigurations.sortableFields[0]['state']['buttonNameState'],
        tableConfigurations.sortableFields[1]['state']['buttonSurnameState'],
        tableConfigurations.sortableFields[2]['state']['buttonDateState'],
        tableConfigurations.sortableFields[3]['state']['buttonCfState'],
        tableConfigurations.sortableFields[4]['state']['buttonEmailState']]


    /*tableConfigurations.sortableFields.map((element, index) =>{
        sortAndOrderInfo.push(element.field+' '+tableConfigurations.sortableFields[index]['orderBy'][element.field])
    })*/

    /**
     * If the currentPage changed, send the request by sending some info from the tableConfigurations
     */
    useEffect(() => {
        const getCustomers = async () => {
            let data
            if(sortPath!=='' && orderPath!==''){
                console.log(`?_page=${tableConfigurations.currentPage.currentPage}&_limit=10&_sort=${sortPath}&_order=${orderPath}`)
                data = await customQueryCustomers(`?_page=${tableConfigurations.currentPage.currentPage}&_limit=10&_sort=${sortPath}&_order=${orderPath}`)
            }
            else{
                data = await customQueryCustomers(`?_page=${tableConfigurations.currentPage.currentPage}&_limit=10`)
            }
            return data
        }

        getCustomers().then(r => tableConfigurations.setList(r))

    }, useEffectDependencies);


    const forward = (k) => {
        if(tableConfigurations.pageList.pagesArray.at(-1) < tableConfigurations.currentPage.currentPage){
            let x = []
            tableConfigurations.pageList.pagesArray.map((y) => x.push(y+=1))
            tableConfigurations.setPage(x)
        }
        tableConfigurations.changeCurrentPage(k)
    }

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
                        <a className='page-link' onClick={() => backward(tableConfigurations.currentPage.currentPage-=1)}>Previous</a>
                    </li>
                    {tableConfigurations.pageList.pagesArray.map((page) =>
                        <li key={page} className={`page-item ${tableConfigurations.currentPage.currentPage === page && 'active'}`}>
                            <a className='page-link' style={{cursor: 'pointer'}} onClick={() => tableConfigurations.changeCurrentPage(page)}>{page}</a>
                        </li>)}
                    <li
                        className={`page-item ${tableConfigurations.pageList.pagesArray[2]===tableConfigurations.pages.customersLength && 'disabled'}`}
                        style={{cursor: `${tableConfigurations.pageList.pagesArray[2]===tableConfigurations.pages.customersLength ? 'default' : 'pointer'}`}}
                    >
                        <a className='page-link' style={{cursor: 'pointer'}} onClick={() => forward(tableConfigurations.currentPage.currentPage+=1)}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;