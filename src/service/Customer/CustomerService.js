import { useCustomers, useUpdateCustomers } from './CustomerContext';

const CustomerService = () => {

    let customers = useCustomers()

    let updateCustomers = useUpdateCustomers()

    // path to fetch the list of Customer from the server
    const customersPath = 'http://localhost:5001/customer'

    // normally this length came from the BE
    const customersLength = 10

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

    /**
     * This function is for changing the orderType and the buttonState settings in the table configuration
     * it takes a tableConfigurations and update some of his values
     * @param param
     * @param index
     */
    const changeOrder = (param, index) => {
        switch (param[index].field) {
            case 'nome':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                break
            case 'cognome':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                break
            case 'dataNascita':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                //console.log(index)
                break
            case 'cf':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                break
            case 'email':
                /*param[index].setState()*/
                param[index].changeOrderType()
                param[index].changeState()
                break
        }
    }

    const fieldNameDb = ['nome','cognome','dataNascita','cf', 'email']
    const fieldNameTableHeader = ['Nome', 'Cognome', 'Data nascita', 'Cod. fiscale', 'Email']


    return {customersPath, getCustomers, addCustomer, customQueryCustomers, customersLength, changeOrder, fieldNameDb, fieldNameTableHeader}
};

export default CustomerService;