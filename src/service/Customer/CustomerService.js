
import Paths from "../../Paths";
import UsefulFunctions from "../../functions/UsefulFunctions";

const CustomerService = () => {

    const { basePath } = Paths()
    const { manageResponse } = UsefulFunctions()

    // path to fetch the list of Customer from the server
    const customersPath = basePath+'/users/customers'

    // function to fetch the list of Customers
    const getCustomers = async (field = '', value = '') => {

        const infoResponse = {
            list: [],
            error: false,
            message: ''
        }

        let path = customersPath

        if(field && value){
            path = path + `/normalSearch?field=${field}&value=${value}`
        }

        await fetch(path, {
            method: 'GET',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async response => {

            if (response.status === 204) infoResponse.list = []

            else if (response.ok) {

                infoResponse.list = bindActions(await response.json(), deleteCustomer, `/Customers/ModifyCustomer`)

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

    const insertCustomer = async (customer) => {

        let resultInfo = {
            error: false,
            message: '',
            customer: null
        }

        await fetch(customersPath+'/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            },
            body: JSON.stringify(customer)
        }).then(async response => {
            await manageResponse(await response, resultInfo, 'customer')
        }).catch(e => {
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
            await manageResponse(response, resultInfo, 'customer')
        }).catch(e => {
            console.log(e)
        })

        return resultInfo

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
        }).catch(e => {
            resultInfo.error = true
            resultInfo.message = 'Internal Server Error'
            console.log(e)
        })

        return resultInfo

    }

    const bindActions = (data, deleteCustomer, movePath) => {

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


    const field = ['name','surname','birthDate','cf', 'email', 'idUser']
    const fieldHeader = ['Name', 'Surname', 'Date of birth', 'Fiscal Code', 'Email', 'Customer Id']
    const filter = ['name','surname','birthDate','cf', 'email', 'idUser']

    return { customersPath, getCustomers, field,
        fieldHeader, filter, getCustomerById, updateCustomer, insertCustomer, deleteCustomer }
};

export default CustomerService;