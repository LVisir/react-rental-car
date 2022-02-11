import {useEffect, useRef, useState} from "react";

const UsefulFunctions = () => {

    // token that indicate if a user is authenticated
    const [token, setToken] = useState((sessionStorage.getItem('customer') !== null || sessionStorage.getItem('superuser') !== null));

    // logout
    const logout = () => {

        sessionStorage.removeItem('superuser')
        sessionStorage.removeItem('customer')

        // aggiorno il token che dichiara se qualcuno si è autenticato
        setToken(false)
    }

   /* // functions that return the order type based on a certain input
    const flipOrderType = (type) => {
        switch (type){
            case 0:
                return 'asc'
            case 1:
                return 'desc'
            case 2:
                return ''
        }
    }

    // change the order type: {0,1,2} -> {inactive, asc, desc}
    const shiftState = (state) => {
        let y = state + 1
        return y%3
    }*/

    /*// take from the tableConfigurations the fields to sort by and their order type (asc|desc)
    const buildPath = (sortableFields) => {
        let sort = []
        let order = []
        sortableFields.map((element, index) => {
            if(element.orderBy() && element.hasOwnProperty('orderBy') && element.state()!==0){
                sort.push(element.field)
                order.push(element.orderType())
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
    }*/

    // usePrevious hook
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value; //assign the value of ref to the argument
        }, [value]); //this code will run when the value of 'value' changes
        return ref.current; //in the end, return the current ref value.
    }

    /**
     * this function fetch the data from the server based on the data given in input
     * @param sortPath
     * @param orderPath
     * @param tableConfigurations
     * @param customQuery
     * @param startPath
     * @returns {Promise<*>}
     */
    /*const askServer = async (sortPath, orderPath, tableConfigurations, customQuery, startPath) => {
        let data
        if(tableConfigurations.searchInfoText() === ''){
            console.log(`?_page=${tableConfigurations.currentPage()}&_limit=10&_sort=${sortPath}&_order=${orderPath}`)
            const response = await fetch(startPath.concat(`?_page=${tableConfigurations.currentPage()}&_limit=10&_sort=${sortPath}&_order=${orderPath}`))
            data = await response.json()
        }
        else{
            console.log(tableConfigurations.searchInfoText())
            console.log(`?_page=${tableConfigurations.currentPage()}&_limit=10&_sort=${sortPath}&_order=${orderPath}&${tableConfigurations.searchInfoField()}=${tableConfigurations.searchInfoText()}`)
            const response = await fetch(startPath.concat(`?_page=${tableConfigurations.currentPage()}&_limit=10&_sort=${sortPath}&_order=${orderPath}&${tableConfigurations.searchInfoField()}=${tableConfigurations.searchInfoText()}`))
            data = await response.json()
        }

        return data
    }

    // custom the queries to apply pagination, sorting, filtering ecc
    const customQuery = async (startPath, endPath) => {
        console.log(startPath.concat(endPath))
        const response = await fetch(startPath+endPath)
        const customers = await response.json()
        return customers
    }*/



    /**
     * This function is for changing the orderType and the buttonState settings in the table configuration
     * it takes a tableConfigurations and update some of his values
     * @param param
     * @param index
     */
/*    const changeOrder = (sortableField) => {
        sortableField.changeOrderType()
        sortableField.changeState()
    }*/

    /* ----------------------------------- funzioni aggiornate ------------------------------------*/
    const buildOrderFieldPath = (fieldObjects) => {
        let sortPath = ''
        let orderPath = ''

        fieldObjects.filter(element => element.sortType !=='').map(otherElement => {
            sortPath = sortPath + otherElement.field + ','
            orderPath = orderPath + otherElement.sortType + ','
        })
        if(sortPath !== '') sortPath = sortPath.slice(0,-1)
        if(orderPath !== '') orderPath = orderPath.slice(0,-1)

        return { sortPath, orderPath }
    }

    /**
     * The fetch function that is triggered anytime the table page change, the table sort methods change and the search action thrown.
     * It concatenates the 'startPath' which indicate the path of a specific element from the server, and the 'tableConfig' settings
     * to fetch the data asked from the user.
     * The 'signal' is a variable that indicates if this fetch must be thrown or not. Meanwhile a fetch is thrown, if another fetch
     * is asked, the previous one must be aborted so the 'signal' notify that. If we fall in this case the error thrown is DOMException.
     * @param sortPath
     * @param orderPath
     * @param tableConfig
     * @param startPath
     * @param signal
     * @returns {Promise<*>}
     */
    const getData = async (sortPath, orderPath, tableConfig, startPath, signal) => {
        let data
        if(tableConfig.searchText==='' && tableConfig.filterSearchText===''){
            console.log(startPath.concat(`?_page=${tableConfig.currentPage}&_limit=10&_sort=${sortPath}&_order=${orderPath}`))
            const response = await fetch(startPath.concat(`?_page=${tableConfig.currentPage}&_limit=10&_sort=${sortPath}&_order=${orderPath}`), { signal: signal })
            data = await response.json()
        }
        else{
            console.log(startPath.concat(`?_page=${tableConfig.currentPage}&_limit=10&${tableConfig.filterSearchText}=${tableConfig.searchText}&_sort=${sortPath}&_order=${orderPath}`))
            const response = await fetch(startPath.concat(`?_page=${tableConfig.currentPage}&_limit=10&${tableConfig.filterSearchText}=${tableConfig.searchText}&_sort=${sortPath}&_order=${orderPath}`), { signal: signal })
            data = await response.json()
        }


        return data

    }

    /**
     * Add an object to the path given in input
     * @param object
     * @param path
     * @returns {Promise<any>}
     */
    const addObject = async (object, path) => {

        const response = await fetch(
            path,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(object),
            }
        )

        const data = await response.json()

        return data
    }

    const updateObject = async (object, path) => {
        const response = await fetch(
            path,
            {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(object),
            }
        )

        const data = await response.json()

        return data
    }

    const deleteObject = async (id, path) => {
        await fetch(
            path+`/${id}`,
            {method: 'DELETE'}
        )

    }

    const resetTableConfig = (tableConfig, setTableConfig) => {
        let tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
            let returnValue = { ...a }
            if(a.sortType !== '') returnValue.sortType = ''
            return returnValue
        })
        setTableConfig({
            ...tableConfig,
            fieldObjects: tmpFieldObjects,
            currentPage: 1,
            disableResetPaginationButton: true,
            disableResetHeaderButton: true,
            disableResetTableButton: true,
            currentPages: [1,2,3],
            filterSearchText: '',
            searchText: '',
        })
    }

    return { logout, token, setToken, buildOrderFieldPath, getData, addObject, deleteObject, resetTableConfig, updateObject }

};

export default UsefulFunctions;