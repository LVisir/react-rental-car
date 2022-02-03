import {useState} from "react";

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

    // functions that return the order type based on a certain input
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
    }

    const test = (x) => {
        const a=x
        const b=x

        return {a,b}
    }

    const resetSortAndOrderType = (sortableFields) => {
        sortableFields.map((element) => {
            element.reset()
        })
    }

    // take from the tableConfigurations the fields to sort by and their order type (asc|desc)
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
    }

    const askServer = async (sortPath, orderPath, tableConfigurations, customQuery, startPath) => {
        let data
        if(tableConfigurations.searchInfoText() === ''){
            console.log('dio')
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
    }

    /**
     * This function is for changing the orderType and the buttonState settings in the table configuration
     * it takes a tableConfigurations and update some of his values
     * @param param
     * @param index
     */
    const changeOrder = (sortableField) => {
        sortableField.changeOrderType()
        sortableField.changeState()
    }

    return {logout, token, setToken, flipOrderType, shiftState, test, buildPath, askServer, customQuery, changeOrder, resetSortAndOrderType}

};

export default UsefulFunctions;