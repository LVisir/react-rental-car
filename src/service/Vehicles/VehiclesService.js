
const VehiclesService = () => {

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

    return { vehiclesPath, getVehicles, vehiclesLength, field, fieldHeader, filter, getVehicleById };
};

export default VehiclesService;