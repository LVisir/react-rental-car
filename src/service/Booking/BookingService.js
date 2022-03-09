import UsefulFunctions from "../../functions/UsefulFunctions";
import Paths from "../../Paths";

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
    const { basePath } = Paths()

    // path to fetch the list of Prenotazione from the server
    let bookingsPath = basePath+'/bookings'

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

    const advancedGetBookings = async (sortPath, orderPath, tableConfig, startPath, page = 0, searchText = '', filterSearchText = '') => {
        const data = await getData(sortPath, orderPath, tableConfig, startPath, page, searchText, filterSearchText)

        let disable

        data.map(
            (x) => {
                if(sessionStorage.getItem('superuser') !== null){
                    disable = x.approval === 1
                    x.actions = [
                        {
                            actionName: 'Approves',
                            onClick() {
                                return updateObject({idBooking: x.idBooking, end: x.end, start: x.start, user: x.user, approval: 1, vehicle: x.vehicle}, bookingsPath+`/${x.id}`)
                            },
                            disable: disable,
                            color: 'MediumSlateBlue',
                            actionType: 'action'
                        },
                        {
                            actionName: 'Delete',
                            onClick() {
                                return deleteObject(x.idBooking, bookingsPath)
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'action'
                        }
                    ]
                }
                if(sessionStorage.getItem('customer') !== null){
                    x.actions = [
                        {
                            actionName: 'Delete',
                            onClick() {
                                return deleteObject(x.idBooking, bookingsPath)
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'action'
                        },
                        {
                            actionName: 'Edit',
                            onClick() {
                                return `/Bookings/ModifyBooking/${x.idBooking}`
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'navigate'
                        }
                    ]
                }
            }
        )

        return data
    }

    // length of: (all the Prenotazione objects/10) (normally get from BE)
    const bookingsLength = 4

    const field = ['start','end','user', 'vehicle', 'idBooking', 'approval']
    const fieldHeader = ['Start date', 'End date', 'Customer Id', 'Vehicle Id', 'Booking Id', 'Approval']
    const filter = ['start','end','user', 'vehicle', 'idBooking']

    return {fetchReservations, fetchReservationsByCustomerId, bookingsPath, field, fieldHeader, bookingsLength, customQueryBookings, getBookings, filter, getBookingById, advancedGetBookings}
};

export default BookingService;