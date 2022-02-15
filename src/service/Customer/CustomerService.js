import UsefulFunctions from "../../functions/UsefulFunctions";

const CustomerService = () => {

    const { getData, updateObject, deleteObject } = UsefulFunctions()

    // path to fetch the list of Customer from the server
    const customersPath = 'http://localhost:5001/customers'

    // normally this length came from the BE; is the upperBound[(length of customers)/(data per page)]
    const customersLength = 10

    // function to fetch the list of Customers
    const getCustomers = async () => {
        const response = await fetch(customersPath)
        const customers = await response.json()
        return customers
    }

    const getCustomerById = async (id) => {
        const response = await fetch(customersPath+`/${id}`)
        const customer = await response.json()
        return customer
    }

    const getCustomerByEmail = async (email) => {
        const response = await fetch(customersPath+`?email=${email}`)
        return await response.json()
    }

    // custom the queries to apply pagination, sorting, filtering ecc
    const customQueryCustomers = async (path) => {
        const response = await fetch(customersPath.concat(path))
        const customers = await response.json()
        return customers
    }

    // add Customer
/*    const addCustomer = async (customer) => {
        const response = await fetch(
            customersPath,
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(customer),
            }
        )

        // converto in un oggetto json
        // l'id lo mette in automatico
        const data = await response.json()

        // aggiorno tasks aggiungendo il nuovo task
        updateCustomers([...customers, data])

    }*/

    const advancedGetCustomers = async (sortPath, orderPath, tableConfig, startPath, signal) => {
        const data = await getData(sortPath, orderPath, tableConfig, startPath, signal)

        data.map(
            (x) => {
                x.actions = [
                    {
                        actionName: 'Edit',
                        onClick() {
                            return `/Customers/ModifyCustomer/${x.id}`
                        },
                        disable: false,
                        color: 'MediumSlateBlue'
                    },
                    {
                        actionName: 'Delete',
                        onClick() {
                            deleteObject(x.id, customersPath)
                        },
                        disable: false,
                        color: 'MediumSlateBlue'
                    }
                ]
            }
        )

        return data

    }


    const field = ['name','surname','birthDate','cf', 'email']
    const fieldHeader = ['Name', 'Surname', 'Date of birth', 'Fiscal Code', 'Email']
    const filter = ['name','surname','birthDate','cf', 'email']

    return { customersPath, getCustomers, customQueryCustomers, customersLength, field, fieldHeader, filter, getCustomerById, getCustomerByEmail, advancedGetCustomers }
};

export default CustomerService;