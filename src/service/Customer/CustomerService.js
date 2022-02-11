import { useCustomers, useUpdateCustomers } from '../../context/CustomerContext';
import UsefulFunctions from "../../functions/UsefulFunctions";

const CustomerService = () => {

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

    /**
     * This function is for changing the orderType and the buttonState settings in the table configuration
     * it takes a tableConfigurations and update some of his values
     * @param param
     * @param index
     */


    const field = ['name','surname','birthDate','cf', 'email']
    const fieldHeader = ['Name', 'Surname', 'Date of birth', 'Fiscal Code', 'Email']
    const filter = ['name','surname','birthDate','cf', 'email']

    return { customersPath, getCustomers, customQueryCustomers, customersLength, field, fieldHeader, filter, getCustomerById }
};

export default CustomerService;