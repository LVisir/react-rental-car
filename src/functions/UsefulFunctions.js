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
        let sortPath = []
        let s = ''

        fieldObjects.filter(element => element.sortType !=='').map(otherElement => {
            if(otherElement.sortType === 'desc') s = '-'+otherElement.field
            else if(otherElement.sortType === 'asc') s = otherElement.field
            sortPath.push(s)
        })

        return { sortPath }
    }

    const currentPages = (size) => {

        let pages = [1,2,3]

        if(size > 0){

            let nPages = Math.floor(size/10)

            if(nPages<3){

                if(nPages<2){

                    pages = [1]

                }
                else pages = [2]

            }

        }
        else {

            pages = []

        }

        return pages

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
     * @param page
     * @param searchText
     * @param filterSearchText
     * @returns {Promise<*>}
     */
    const getData = async (sortPath, orderPath, tableConfig, startPath, page, searchText, filterSearchText) => {

        let data
        let url = buildPath(sortPath, orderPath, startPath, tableConfig, page, searchText, filterSearchText)
        if(searchText==='' && filterSearchText===''){

            console.log(url)
            const response = await fetch(url)
            data = await response.json()
        }
        else{

            console.log(url)
            const response = await fetch(url)
            data = await response.json()
        }


        return data

    }

    const buildPath = (sortPath, orderPath, startPath, tableConfig, page, searchText = '', filterSearchText = '') => {

        let url

        if(sessionStorage.getItem('customer') !== null && tableConfig.tableName === 'BOOKINGS'){
            url = startPath + '?user=' + sessionStorage.getItem('customer') + `&_page=${page === 0 ? tableConfig.currentPage : page}`
        }

        else url = startPath + `?_page=${page === 0 ? tableConfig.currentPage : page}`

        if(sortPath){
            url = url + `&_sort=${sortPath}`
        }
        if(orderPath){
            url = url + `&_order=${orderPath}`
        }
        if(filterSearchText && searchText){
            url = url + `&${filterSearchText}=${searchText}`
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

    /**
     * Format the date rom YYYY-MM-DD to DD-MM-YYYY
     * @param date
     * @returns {string}
     */
    const dateFormat = (date) => {
        let x = Array.from(date)
        return x.slice(8, 10).join('') + '-' + x.slice(5, 8).join('') + x.slice(0, 4).join('')
    }

    const dateFormatReverse = (date) => {
        let x = Array.from(date)
        return x.slice(6,10).join('') + '-' + x.slice(3,6).join('') + x.slice(0,2).join('')
    }

    return { logout, token, setToken, buildOrderFieldPath, getData, addObject, deleteObject, resetTableConfig, updateObject, usePrevious, dateFormat, dateFormatReverse, currentPages }

};

export default UsefulFunctions;