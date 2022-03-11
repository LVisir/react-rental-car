import UsefulFunctions from "../../functions/UsefulFunctions";
import Paths from "../../Paths";

const VehiclesService = () => {

    const { manageResponse } = UsefulFunctions()
    const { basePath } = Paths()

    // path to fetch the list of Vehicles from server
    const vehiclesPath = basePath+'/vehicles'

    // fetch of the list of Prenotazione objects
    const getVehicles = async () => {

        const infoResponse = {
            list: [],
            error: false,
            message: ''
        }

        await fetch(vehiclesPath, {
            method: 'GET',
            headers: {
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            }
        }).then(async response => {
            if (response.ok) {

                infoResponse.list = await response.json()

                if(sessionStorage.getItem('superuser') !== null) {
                    bindActions(infoResponse.list, deleteVehicle, updateVehicle, `/Vehicles/ModifyVehicle`)
                }
                else if(sessionStorage.getItem('customer') !== null){
                    bindActions(infoResponse.list, deleteVehicle, updateVehicle, `/Bookings/AddBooking`)
                }

            }
            else{

                const error = response.json()

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

    const bindActions = (data, deleteVehicle, updateVehicle = () => {}, movePath) => {

        data.map(
            (x) => {
                if(sessionStorage.getItem('superuser') !== null) {
                    x.actions = [
                        {
                            actionName: 'Edit',
                            onClick() {
                                return `/Vehicles/ModifyVehicle/${x.idVehicle}`
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'navigate'
                        },
                        {
                            actionName: 'Delete',
                            onClick() {
                                return deleteVehicle(x.idVehicle)
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'action'
                        }
                    ]
                }
                else if(sessionStorage.getItem('customer') !== null) {
                    x.actions = [
                        {
                            actionName: 'Rent',
                            onClick() {
                                return movePath+`/${x.idVehicle}`
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'navigate'
                        }
                    ]
                }
            }
        )

    }

    const getVehicleById = async (id) => {

        let result = null

        await fetch(vehiclesPath+`/${id}`, {
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

    /**
     *
     * @param id: id of a Vehicle
     * @returns {Promise<null>}: The last Booking date of a Vehicle given in input
     */
    const getLastBookingDates = async (id) => {

        let result = null

        await fetch(vehiclesPath+`/lastBooking/${id}`, {
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

    const insertVehicle = async (vehicle) => {

        let resultInfo = {
            error: false,
            message: '',
            vehicle: null
        }

        await fetch(vehicle+'/add', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            },
            body: JSON.stringify(vehicle)
        }).then(async response => {
            await manageResponse(await response, resultInfo, 'vehicle')
        }).catch(e => {
            console.log(e)
        })

        return resultInfo

    }

    const updateVehicle = async (vehicle, id) => {

        let resultInfo = {
            error: false,
            message: '',
            vehicle: null
        }

        await fetch(vehiclesPath+`/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
                'Authorization': `LoginToken ${sessionStorage.getItem('tokenJWT')}`
            },
            body: JSON.stringify(vehicle)
        }).then(async response => {
            await manageResponse(response, resultInfo, 'vehicle')
        }).catch(e => {
            console.log(e)
        })

        return resultInfo

    }

    const deleteVehicle = async (id) => {

        const resultInfo = {
            error: false,
            message: ''
        }

        await fetch(vehiclesPath+`/delete/${id}`, {
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

    const field = ['licensePlate','model','typology','manufacturer', 'registrYear', 'idVehicle']
    const fieldHeader = ['License plate', 'Model', 'Typology', 'Manufacturer', 'Registration year', 'Vehicle Id']
    const filter = ['licensePlate','model','typology','manufacturer', 'registrYear', 'idVehicle']

    return { vehiclesPath, getVehicles, field, fieldHeader, filter, getVehicleById, insertVehicle, deleteVehicle, updateVehicle, getLastBookingDates };
};

export default VehiclesService;