import React, {useContext, useState} from "react";

// create the Context to load the list of Customers
const CustomersContext = React.createContext()

// create the Context to load the setState to modify the list of Customers
const UpdateCustomersContext = React.createContext()

// custom hook to carry inside the appropriate components where the list of Customers are fetched
export function useCustomers() {
    return useContext(CustomersContext)
}

// custom hook to carry inside components where the list of Customers are modified
export function useUpdateCustomers() {
    return useContext(UpdateCustomersContext)
}

// Component that share the list of Customers to all component's children
export function CustomersProvider({ children }) {
    const [customers, setCustomers] = useState([]);

    const update = (c) => {
      setCustomers(c)
    }

    return (
        <CustomersContext.Provider value={customers}>
            <UpdateCustomersContext.Provider value={update}>
                {children}
            </UpdateCustomersContext.Provider>
        </CustomersContext.Provider>
    )
}