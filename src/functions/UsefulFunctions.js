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

    // take from the tableConfigurations the fields to sort by and their order type (asc|desc)
    const buildPath = (sortableFields) => {
        let sort = []
        let order = []
        sortableFields.map((element, index) => {
            if((Object.entries(element.orderBy)[0][1]) && element.hasOwnProperty('orderBy') && (Object.entries(element.state)[0][1])!==0){
                sort.push(element.field)
                order.push(Object.entries(element['orderType'])[0][1])
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

    return {logout, token, setToken, flipOrderType, shiftState, test, buildPath}

};

export default UsefulFunctions;