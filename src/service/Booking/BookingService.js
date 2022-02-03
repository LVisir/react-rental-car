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

    // path to fetch the list of Prenotazione from the server
    const bookingsPath = 'http://localhost:5001/prenotazione'

    // length of: (all the Prenotazione objects/10) (normally get from BE)
    const bookingsLength = 4

    const field = ['codice','inizio','fine','customer', 'veicolo', 'approvazione']
    const fieldHeader = ['Codice', 'Data inizio', 'Data fine', 'CF Customer', 'Targa veicolo', 'Approvazione']

    return {fetchReservations, fetchReservationsByCustomerId, bookingsPath, field, fieldHeader, bookingsLength, customQueryBookings, getBookings}
};

export default BookingService;