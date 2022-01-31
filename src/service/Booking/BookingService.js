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

    // path to fetch the list of Prenotazione from the server
    const bookingsPath = 'http://localhost:5001/prenotazione'

    return {fetchReservations, fetchReservationsByCustomerId, bookingsPath}
};

export default BookingService;