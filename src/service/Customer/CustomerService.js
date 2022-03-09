import UsefulFunctions from "../../functions/UsefulFunctions";
import Paths from "../../Paths";

const CustomerService = () => {

    const { updateObject, deleteObject, getData } = UsefulFunctions()
    const { basePath } = Paths()

    // path to fetch the list of Customer from the server
    const customersPath = basePath+'/users/customers'

    // normally this length came from the BE; is the upperBound[(length of customers)/(data per page)]
    const customersLength = 10

    // function to fetch the list of Customers
    const getCustomers = async () => {

        const infoResponse = {
            list: [],
            error: false,
            message: ''
        }

        await fetch(customersPath, {
            method: 'GET',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async response => {

            if (response.status === 204) infoResponse.list = []

            else if (response.ok) {

                infoResponse.list = bindActions(await response.json(), customersPath, deleteCustomer, `/Customers/ModifyCustomer`)

            }

            else{

                const error = await response.json()

                infoResponse.error = true

                infoResponse.message = error.error

            }
        }).catch((e) => {

            infoResponse.error = true

            infoResponse.message = 'Internal Server Error'

            console.log(e)

        })

        return infoResponse

    }

    const getCustomerById = async (id) => {

        let result = null

        await fetch(customersPath+`/id/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async response => {
            if (response.ok) {

                result = await response.json()

            }
            else{

                let error = await response.json()
                console.log(error.error)

            }
        }).catch(e => {

            console.log(e)

        })

        return result

    }

    const getUserById = async (id) => {
        let result = null

        await fetch(basePath+`/users/${id}`).then(async (response) => {
            result = await response.json()
        })

        return result
    }

    const getUserByEmail = async (email) => {

        let result = null

        await fetch(basePath+`/users/email/${email}`).then(async (response) => {
            if(response.status === 200){
                result = await response.json()
            }
        })

        return result
    }

    const insertCustomer = async (customer) => {

        let resultInfo = {
            error: false,
            message: '',
            customer: null
        }

        console.log(customer)

        await fetch(customersPath+'/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            },
            body: JSON.stringify(customer)
        }).then(async response => {
            await manageResponse(await response, resultInfo)
        }).catch(e => {
            console.log('after error')
            console.log(customer)
            console.log(e)
        })

        return resultInfo

    }

    const updateCustomer = async (customer, id) => {

        let resultInfo = {
            error: false,
            message: '',
            customer: null
        }

        await fetch(customersPath+`/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            },
            body: JSON.stringify(customer)
        }).then(async response => {
            await manageResponse(response, resultInfo)
        }).catch(e => {
            console.log(e)
        })

        return resultInfo

    }

    const manageResponse = async (response, resultInfo) => {

        if (response.ok) {
            resultInfo.customer = await response.json()
        }
        else{

            const error = await response.json()

            console.log(error)

            if(error.error_validation){
                resultInfo.error = true
                Object.keys(error.error_validation).map(x => resultInfo.message = resultInfo.message + '; '+error.error_validation[x])
            }
            else if(error.error){
                resultInfo.error = true
                resultInfo.message = error.error
            }

        }

    }

    const deleteCustomer = async (id) => {

        const resultInfo = {
            error: false,
            message: ''
        }

        await fetch(customersPath+`/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async (response) => {
            if(!response.ok){

                resultInfo.error = true

                resultInfo.message = await response.json()

            }
        }).catch(e => console.log(e))

        return resultInfo

    }

    // custom the queries to apply pagination, sorting, filtering ecc
    const customQueryCustomers = async (path) => {
        const response = await fetch(customersPath.concat(path))
        const customers = await response.json()
        return customers
    }

    const customCustomersFetch = async (sortPath, orderPath, startPath, page, limit, searchText , filterSearchText ) => {

        let url = startPath

        let result = []

        if(sortPath && orderPath && startPath && page && limit && searchText && filterSearchText){

            url = url + `/search/sort?_page=${page}&_limit=${limit}&_sort=${sortPath}&_order=${orderPath}&field=${filterSearchText}&value=${searchText}`

            await fetch(url).then(async (response) => {
                if(response.status !== 200){
                    result = []
                }
                else{
                    result = await response.json()
                    bindActions(result, customersPath, deleteCustomer, `/Customers/ModifyCustomer`)
                }
            })

            return result

        }
        else if(startPath && page && limit && searchText && filterSearchText){

            url = url + `/search?_page=${page}&_limit=${limit}&field=${filterSearchText}&value=${searchText}`

            await fetch(url).then(async (response) => {
                if(response.status !== 200){
                    result = []
                }
                else{
                    result = await response.json()
                    bindActions(result, customersPath, deleteCustomer,`/Customers/ModifyCustomer`)
                }
            })

            return result

        }
        else if(sortPath && orderPath && startPath && page && limit){

            url = url + `/paging/sortBy?_page=${page}&_limit=${limit}&_sort=${sortPath}&_order=${orderPath}`

            await fetch(url).then(async (response) => {
                if(response.status !== 200){
                    result = []
                }
                else{
                    result = await response.json()
                    bindActions(result, customersPath, deleteCustomer,`/Customers/ModifyCustomer`)
                }
            })

            return result

        }
        else if(page && limit){

            url = url + `/paging?_page=${page}&_limit=${limit}`

            await fetch(url).then(async (response) => {
                if(response.status !== 200){
                    result = []
                }
                else{
                    result = await response.json()
                    bindActions(result, customersPath, deleteCustomer,`/Customers/ModifyCustomer`)
                }
            })

            return result

        }

    }

    const bindActions = (data, path, deleteCustomer, movePath) => {

        data.map(
            (x) => {
                x.actions = [
                    {
                        actionName: 'Edit',
                        onClick() {
                            return movePath+`/${x.idUser}`
                        },
                        disable: false,
                        color: 'MediumSlateBlue',
                        actionType: 'navigate'
                    },
                    {
                        actionName: 'Delete',
                        onClick() {
                            return deleteCustomer(x.idUser)
                        },
                        disable: false,
                        color: 'MediumSlateBlue',
                        actionType: 'action'
                    }
                ]
            }
        )

        return data

    }

    const advancedGetCustomers = async (sortPath, orderPath, tableConfig, startPath, page = 0, searchText = '', filterSearchText = '') => {

        const data = await getData(sortPath, orderPath, tableConfig, startPath, page, searchText, filterSearchText)

        data.map(
            (x) => {
                x.actions = [
                    {
                        actionName: 'Edit',
                        onClick() {
                            return `/Customers/ModifyCustomer/${x.idUser}`
                        },
                        disable: false,
                        color: 'MediumSlateBlue',
                        actionType: 'navigate'
                    },
                    {
                        actionName: 'Delete',
                        onClick() {
                            return deleteObject(x.idUser, customersPath)
                        },
                        disable: false,
                        color: 'MediumSlateBlue',
                        actionType: 'action'
                    }
                ]
            }
        )

        return data

    }


    const field = ['name','surname','birthDate','cf', 'email', 'idUser']
    const fieldHeader = ['Name', 'Surname', 'Date of birth', 'Fiscal Code', 'Email', 'Customer Id']
    const filter = ['name','surname','birthDate','cf', 'email', 'idUser']

    return { customersPath, getCustomers, customQueryCustomers, customersLength, field,
        fieldHeader, filter, getCustomerById, getUserByEmail, advancedGetCustomers,
        getUserById, customCustomersFetch, updateCustomer, insertCustomer, deleteCustomer }
};

export default CustomerService;