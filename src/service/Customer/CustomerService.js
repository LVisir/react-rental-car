import { useCustomers, useUpdateCustomers } from './CustomerContext';

const CustomerService = () => {

    let customers = useCustomers()

    let updateCustomers = useUpdateCustomers()

    // path to fetch the list of Customer from the server
    const customersPath = 'http://localhost:5001/customer'

    // function to fetch the list of Customers
    const getCustomers = async () => {
        const response = await fetch(customersPath)
        const customers = await response.json()
        return customers
    }

    // custom the queries to apply pagination, sorting, filtering ecc
    const customQueryCustomers = async (path) => {
        const response = await fetch(customersPath.concat(path))
        const customers = await response.json()
        return customers
    }

    // add Customer
    const addCustomer = async (customer) => {
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

    }

    return {customersPath, getCustomers, addCustomer, customQueryCustomers}
};

export default CustomerService;