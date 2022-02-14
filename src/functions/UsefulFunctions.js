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

    // usePrevious hook
    function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value; //assign the value of ref to the argument
        }, [value]); //this code will run when the value of 'value' changes
        return ref.current; //in the end, return the current ref value.
    }

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
        let url = buildPath(sortPath, orderPath, startPath, tableConfig)
        if(tableConfig.searchText==='' && tableConfig.filterSearchText===''){
            //console.log(startPath.concat(`?_page=${tableConfig.currentPage}&_limit=10&_sort=${sortPath}&_order=${orderPath}`))
            console.log(url)
            const response = await fetch(url, { signal: signal })
            data = await response.json()
        }
        else{
            //console.log(startPath.concat(`?_page=${tableConfig.currentPage}&_limit=10&${tableConfig.filterSearchText}=${tableConfig.searchText}&_sort=${sortPath}&_order=${orderPath}`))
            console.log(url)
            const response = await fetch(url, { signal: signal })
            data = await response.json()
        }


        return data

    }

    const buildPath = (sortPath, orderPath, startPath, tableConfig) => {
        let url = startPath + `?_page=${tableConfig.currentPage}&_limit=10`

        if(sortPath){
            url = url + `&_sort=${sortPath}`
        }
        if(orderPath){
            url = url + `&_order=${orderPath}`
        }
        if(tableConfig.filterSearchText && tableConfig.searchText){
            url = url + `&${tableConfig.filterSearchText}=${tableConfig.searchText}`
        }
        if(tableConfig.role){
            url = url + `&role=${tableConfig.role}`
        }

        return url
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

    return { logout, token, setToken, buildOrderFieldPath, getData, addObject, deleteObject, resetTableConfig, updateObject, usePrevious }

};

export default UsefulFunctions;