import UsefulFunctions from "../../functions/UsefulFunctions";

const VehiclesService = () => {

    const { getData, updateObject, deleteObject } = UsefulFunctions()

    // path to fetch the list of Vehicles from server
    const vehiclesPath = 'http://localhost:5001/vehicles'

    // this length came from server; upperBound[listVehicles.length/data per page]
    const vehiclesLength = 10

    // function to fetch the list of Vehicles
    const getVehicles = async () => {
        const response = await fetch(vehiclesPath)
        const vehicles = await response.json()
        return vehicles
    }

    const getVehicleById = async (id) => {
        const response = await fetch(vehiclesPath+`/${id}`)
        const vehicles = await response.json()
        return vehicles
    }

    const field = ['licensePlate','model','typology','manufacturer', 'registrYear']
    const fieldHeader = ['License plate', 'Model', 'Typology', 'Manufacturer', 'Registration year']
    const filter = ['licensePlate','model','typology','manufacturer', 'registrYear']

    const advancedGetVehicles = async (sortPath, orderPath, tableConfig, startPath, signal) => {
        const data = await getData(sortPath, orderPath, tableConfig, startPath, signal)

        data.map(
            (x) => {
                if(sessionStorage.getItem('superuser') !== null) {
                    x.actions = [
                        {
                            actionName: 'Edit',
                            onClick() {
                                return `/Vehicles/ModifyVehicle/${x.id}`
                            },
                            disable: false,
                            color: 'MediumSlateBlue',
                            actionType: 'navigate'
                        },
                        {
                            actionName: 'Delete',
                            onClick() {
                                return deleteObject(x.id, vehiclesPath)
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
                                return `/Bookings/AddBooking/${x.licensePlate}`
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

    return { vehiclesPath, getVehicles, vehiclesLength, field, fieldHeader, filter, getVehicleById, advancedGetVehicles };
};

export default VehiclesService;