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

        let vehicleLicencePlate

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
                            color: 'MediumSlateBlue'
                        },
                        {
                            actionName: 'Delete',
                            onClick() {
                                deleteObject(x.id, vehiclesPath)
                            },
                            disable: false,
                            color: 'MediumSlateBlue'
                        }
                    ]
                }
                else if(sessionStorage.getItem('customer') !== null) {
                    vehicleLicencePlate = x.licensePlate
                    x.actions = [
                        {
                            actionName: 'Rent',
                            onClick() {
                                return `/Bookings/AddBooking/${vehicleLicencePlate}`
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

    return { vehiclesPath, getVehicles, vehiclesLength, field, fieldHeader, filter, getVehicleById, advancedGetVehicles };
};

export default VehiclesService;