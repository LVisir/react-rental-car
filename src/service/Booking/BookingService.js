import Paths from "../../Paths";
import UsefulFunctions from "../../functions/UsefulFunctions";

const BookingService = () => {

    const { basePath } = Paths()
    const { manageResponse, dateFormatReverse } = UsefulFunctions()

    let bookingsPath = basePath+'/bookings'

    // fetch of the list of Prenotazione objects
    const getBookings = async (field = '', value = '') => {

        const infoResponse = {
            list: [],
            error: false,
            message: ''
        }

        // path to fetch the list of Prenotazione from the server
        let pathBasedOnLoggedUser
        if(sessionStorage.getItem('superuser') !== null){
            pathBasedOnLoggedUser = basePath+'/bookings'
        }
        else if(sessionStorage.getItem('customer') !== null){
            pathBasedOnLoggedUser = basePath+`/bookings/customers/${sessionStorage.getItem('customer')}`
        }
        else{
            pathBasedOnLoggedUser = basePath+'/bookings'
        }

        let path = pathBasedOnLoggedUser

        if(field && value){

            // if it is a date to the form dd-MM-yyyy, reverse it to yyyy-MM-dd
            if(!isNaN(Date.parse(dateFormatReverse(value)))){
                value = dateFormatReverse(value)
            }

            path = path + `/search?field=${field}&value=${value}`

        }

        await fetch(path, {
            method: 'GET',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async response => {
            if (response.ok) {

                infoResponse.list = await response.json()

                infoResponse.list.map(booking => {
                    booking.user = booking.user.idUser
                    booking.vehicle = booking.vehicle.idVehicle
                })

                if(sessionStorage.getItem('superuser') !== null){
                    bindActions(infoResponse.list, deleteBooking, updateBooking, `/Bookings/ModifyBooking`)
                }
                else if(sessionStorage.getItem('customer') !== null){

                    bindActions(infoResponse.list, deleteBooking, updateBooking, `/Bookings/ModifyBooking`)


                }
                else{
                    throw new Error("No User is logged in")
                }

            }
            else{

                const error = await response.json()

                infoResponse.error = true

                infoResponse.message = error.error

            }
        }).catch((e) => {

            infoResponse.error = true

            infoResponse.message = 'Internal Server Error'

            console.log(e)

        })

        return infoResponse

    }

    const bindActions = (data, deleteBooking, updateBooking, movePath) => {

        let disable

        data.map(
            (x) => {
                if(sessionStorage.getItem('superuser') !== null){
                    disable = x.approval
                    x.actions = [
                        {
                            actionName: 'Approves',
                            onClick() {
                                return updateBooking({
                                    idBooking: x.idBooking,
                                    end: x.end,
                                    start: x.start,
                                    user: {idUser: x.user},
                                    approval: 1,
                                    vehicle: {idVehicle: x.vehicle}
                                }, `${x.idBooking}`)
                            },
                            disable: disable,
                            color: 'MediumSlateBlue',
                            actionType: 'action'
                        },
                        {
                            actionName: 'Delete',
                            onClick() {
                                return deleteBooking(x.idBooking)
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
                                return deleteBooking(x.idBooking, bookingsPath)
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'action'
                        },
                        {
                            actionName: 'Edit',
                            onClick() {
                                return movePath+`/${x.idBooking}`
                            },
                            disable: x.approval,
                            color: 'MediumSlateBlue',
                            actionType: 'navigate'
                        }
                    ]
                }
            }
        )

        return data

    }

    const getBookingById = async (id) => {

        let result = null

        await fetch(bookingsPath+`/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async response => {
            if (response.ok) {

                result = await response.json()

            }
            else{

                let error = await response.json()
                console.log(error.error)

            }
        }).catch(e => {

            console.log(e)

        })

        return result

    }

    const insertBooking = async (booking) => {

        let resultInfo = {
            error: false,
            message: '',
            booking: null
        }

        console.log(booking)

        await fetch(bookingsPath+'/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            },
            body: JSON.stringify(booking)
        }).then(async response => {
            await manageResponse(await response, resultInfo, 'booking')
        }).catch(e => {
            console.log(e)
        })

        return resultInfo

    }

    const updateBooking = async (booking, id) => {

        let resultInfo = {
            error: false,
            message: '',
            booking: null
        }

        await fetch(bookingsPath+`/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            },
            body: JSON.stringify(booking)
        }).then(async response => {
            await manageResponse(response, resultInfo, 'booking')
        }).catch(e => {
            console.log(e)
        })

        return resultInfo

    }

    const deleteBooking = async (id) => {

        const resultInfo = {
            error: false,
            message: ''
        }

        await fetch(bookingsPath+`/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async (response) => {
            if(!response.ok){

                resultInfo.error = true

                resultInfo.message = await response.json()

            }
        }).catch(e => {
            resultInfo.error = true
            resultInfo.message = 'Internal Server Error'
            console.log(e)
        })

        return resultInfo

    }

    const field = ['start','end', 'idBooking', 'user', 'vehicle', 'approval']
    const fieldHeader = ['Start date', 'End date', 'Booking Id', 'User Id', 'Vehicle Id', 'Approval']
    const filter = ['start','end', 'idBooking', 'user', 'vehicle']

    return { bookingsPath, field, fieldHeader, getBookings, filter, getBookingById, insertBooking, updateBooking, deleteBooking }
};

export default BookingService;