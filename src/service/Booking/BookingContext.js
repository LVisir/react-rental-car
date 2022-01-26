import React, {useContext, useState} from "react";

// create the Context to load the list of Bookings
const BookingsContext = React.createContext()

// create the Context to load the setState to modify the list of Bookings
const UpdateBookingsContext = React.createContext()

// custom hook to carry inside the appropriate components where the list of Bookings are fetched
export function useBookings() {
    return useContext(BookingsContext)
}

// custom hook to carry inside components where the list of Bookings are modified
export function useUpdateBookings() {
    return useContext(UpdateBookingsContext)
}

// Component that share the list of Bookings to all component's children
export function BookingsProvider({ children }) {
    const [bookings, setBookings] = useState([]);

    const update = (b) => {
        setBookings(b)
    }

    return (
        <BookingsContext.Provider value={bookings}>
            <UpdateBookingsContext.Provider value={update}>
                {children}
            </UpdateBookingsContext.Provider>
        </BookingsContext.Provider>
    )
}