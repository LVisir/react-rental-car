// function to fetch the list of Customers
export const getCustomers = async (path) => {
    const response = await fetch(path)
    const customers = await response.json()
    return customers
}