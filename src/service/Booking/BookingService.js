// fetch delle prenotazioni dal server dato un certo cf
export const fetchReservationsByCustomerId = async (path, cf) => {
    const response = await fetch(path.concat(`?customer=${cf}`))
    const prenotazioni = await response.json()

    return prenotazioni
}

// fetch of the list of Booking from server
export const fetchReservations = async (path) => {
    const response = await fetch(path)
    const prenotazioni = await response.json()

    return prenotazioni
}