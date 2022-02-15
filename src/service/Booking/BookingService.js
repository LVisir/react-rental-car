import UsefulFunctions from "../../functions/UsefulFunctions";

const BookingService = () => {

    // fetch delle prenotazioni dal server dato un certo cf
    const fetchReservationsByCustomerId = async (path, cf) => {
        const response = await fetch(path.concat(`?customer=${cf}`))
        const prenotazioni = await response.json()
        return prenotazioni
    }

    // fetch of the list of Booking from server
    const fetchReservations = async (path) => {
        const response = await fetch(path)
        const prenotazioni = await response.json()

        return prenotazioni
    }
// -------------------------------------------------------------------------------- da qui sotto usa queste funzioni da ora in poi

    const { getData, updateObject, deleteObject } = UsefulFunctions()

    // fetch of the list of Prenotazione objects
    const getBookings = async () => {
        const response = await fetch(bookingsPath)
        const bookings = await response.json()

        return bookings
    }

    // custom the queries to apply pagination, sorting, filtering ecc
    const customQueryBookings = async (path) => {
        const response = await fetch(bookingsPath.concat(path))
        const bookings = await response.json()
        return bookings
    }

    const getBookingById = async (id) => {
        const response = await fetch(bookingsPath+`/${id}`)
        return await response.json()
    }

    const advancedGetBookings = async (sortPath, orderPath, tableConfig, startPath, signal) => {
        const data = await getData(sortPath, orderPath, tableConfig, startPath, signal)

        let disable

        data.map(
            (x) => {
                if(sessionStorage.getItem('superuser') !== null){
                    disable = x.approval === 1
                    x.actions = [
                        {
                            actionName: 'Approves',
                            onClick() {
                                return updateObject({...x, approval: 1}, bookingsPath+`/${x.id}`)
                            },
                            disable: disable,
                            color: 'MediumSlateBlue'
                        },
                        {
                            actionName: 'Delete',
                            onClick() {
                                deleteObject(x.id, bookingsPath)
                            },
                            disable: false,
                            color: 'MediumSlateBlue'
                        }
                    ]
                }
                if(sessionStorage.getItem('customer') !== null){
                    x.actions = [
                        {
                            actionName: 'Delete',
                            onClick() {
                                deleteObject(x.id, bookingsPath)
                            },
                            disable: false,
                            color: 'MediumSlateBlue'
                        },
                        {
                            actionName: 'Edit',
                            onClick() {
                                return `/Bookings/ModifyBooking/${x.id}`
                            },
                            disable: false,
                            color: 'MediumSlateBlue'
                        }
                    ]
                }
            }
        )

        return data
    }

    // path to fetch the list of Prenotazione from the server
    let bookingsPath = 'http://localhost:5001/bookings'

    // length of: (all the Prenotazione objects/10) (normally get from BE)
    const bookingsLength = 4

    const field = ['code','start','end','customer', 'vehicle', 'approval']
    const fieldHeader = ['Code', 'Start date', 'End date', 'Customer Id', 'Licence number', 'Approval']
    const filter = ['code','start','end','customer', 'vehicle']

    return {fetchReservations, fetchReservationsByCustomerId, bookingsPath, field, fieldHeader, bookingsLength, customQueryBookings, getBookings, filter, getBookingById, advancedGetBookings}
};

export default BookingService;