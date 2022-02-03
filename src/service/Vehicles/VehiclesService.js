
const VehiclesService = () => {

    // path to fetch the list of Vehicles from server
    const vehiclesPath = 'http://localhost:5001/veicolo'

    // this length came from server; upperBound[listVehicles.length/data per page]
    const vehiclesLength = 10

    // function to fetch the list of Vehicles
    const getVehicles = async () => {
        const response = await fetch(vehiclesPath)
        const vehicles = await response.json()
        return vehicles
    }

    const field = ['targa','modello','tipologia','casaCostruttrice', 'annoImmatricolazione']
    const fieldHeader = ['Targa', 'Modello', 'Tipologia', 'Casa costruttrice', 'Anno Immatr.']

    return {vehiclesPath, getVehicles, vehiclesLength, field, fieldHeader};
};

export default VehiclesService;