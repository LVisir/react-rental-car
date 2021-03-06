import {useEffect, useState} from "react";
import Header from "../Header";
import {Button, Container, Form} from "react-bootstrap";
import CustomAlert from "../alerts/CustomAlert";
import { useNavigate, useParams } from "react-router-dom";
import VehiclesService from "../../service/Vehicles/VehiclesService";

const AddUpdateVehicle = ({ logout, links, tableConfig, setTableConfig, showSearchButton, getData }) => {

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { getVehicleById, updateVehicle, insertVehicle } = VehiclesService()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const { id } = useParams()

    useEffect(() => {

        const getVehicle = async () => {
            return await getVehicleById(id)
        }

        // it means an update request was made to update a vehicle object
        if( id !== undefined) {

            // check if the id param is a number
            if(!isNaN(+id)) {
                getVehicle().then(r => {
                    // check if the id passed as url param is valid so check if the object length is higher than 0 otherwise it means no object was returned
                    if (r !== null) {
                        setLicensePlate(r['licensePlate'])
                        setModel(r['model'])
                        setTypology(r['typology'])
                        setManufacturer(r['manufacturer'])
                        setRegistrYear(r['registrYear'])
                        setLoading(false)
                    } else {
                        // navigate through the error page because the id in the url params doesn't correspond to any vehicle
                        navigate('/Vehicles', {replace: true})
                    }
                })
            }else {
                // navigate through the error page because the id in the url params doesn't correspond to any vehicle
                navigate('/Vehicles', {replace: true})
            }
        }
        else {
            setLoading(false)
        }
    }, []);


    // form fields useState
    const [licensePlate, setLicensePlate] = useState('');
    const [model, setModel] = useState('');
    const [typology, setTypology] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [registrYear, setRegistrYear] = useState('');

    // alert from fields useState
    const [licensePlateAlert, setLicensePlateAlert] = useState(false);
    const [modelAlert, setModelAlert] = useState(false);
    const [typologyAlert, setTypologyAlert] = useState(false);
    const [manufacturerAlert, setManufacturerAlert] = useState(false);
    const [regYearAlert, setRegYearAlert] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()

        // field blank control
        if (!licensePlate || !model || !typology || !manufacturer || !registrYear) {
            !licensePlate ? setLicensePlateAlert(true) : setLicensePlateAlert(false)
            !model ? setModelAlert(true) : setModelAlert(false)
            !typology ? setTypologyAlert(true) : setModelAlert(false)
            !manufacturer ? setManufacturerAlert(true) : setManufacturerAlert(false)
            !registrYear ? setRegYearAlert(true) : setRegYearAlert(false)
            return
        }

        let updtData = null

        // if 'id' is set it means an update action has been thrown
        if (id !== undefined) {
            updtData = {
                idVehicle: id,
                licensePlate: licensePlate,
                model: model,
                typology: typology,
                manufacturer: manufacturer,
                registrYear: registrYear
            }
            updateVehicle({...updtData}, id).then(resultInfo => {

                if (resultInfo.error) {

                    setErrorMessage(resultInfo.message)

                    setError(true)

                } else {

                    const updatedList = tableConfig.list

                    for (const y in updatedList) {

                        if (updatedList[y].idVehicle.toString() === id.toString()) {

                            updatedList.splice(y, y, {

                                ...updatedList[y],

                                ...resultInfo.vehicle

                            })

                            setTableConfig(prevState => {

                                return {
                                    ...prevState,
                                    list: updatedList
                                }

                            })

                            break

                        }
                    }

                    navigate('/Vehicles')

                }
            }).catch(e => {
                console.log(e)
            })
        } else {

            await insertVehicle({
                licensePlate,
                model,
                typology,
                manufacturer,
                registrYear: registrYear
            }).then(resultInfo => {

                if(resultInfo.error){

                    setErrorMessage(resultInfo.message)

                    setError(true)

                }
                else{

                    navigate('/Vehicles')

                }
            }).catch(e => {
                console.log(e)
            })
        }

    }

    return loading ? (
        <>
            <h1>Loading...</h1>
        </>
    ) : (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={showSearchButton} throwResetFetch={false} getData={getData} />
            <Container className={'my-2'}>
                <h3>Insert Vehicle</h3><br/>
                { error && <CustomAlert text={errorMessage} /> }
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formLicensePlate">
                        <Form.Label>License plate</Form.Label>
                        <Form.Control type="text" onChange={(e) => setLicensePlate(e.target.value)} placeholder="Insert license plate" value={licensePlate} />
                    </Form.Group>
                    { licensePlateAlert && <CustomAlert text={'Licence not valid'} /> }
                    <Form.Group className="mb-3" controlId="formModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" onChange={(e) => setModel(e.target.value)} placeholder="Insert model" value={model} />
                    </Form.Group>
                    { modelAlert && <CustomAlert text={'Model name not valid'} /> }
                    <Form.Group className="mb-3" controlId="formTypology">
                        <Form.Label>Typology</Form.Label>
                        <Form.Control type="text" onChange={(e) => setTypology(e.target.value)} value={typology} />
                    </Form.Group>
                    { typologyAlert && <CustomAlert text={'Typology name not valid'} /> }
                    <Form.Group className="mb-3" controlId="formManufacturer">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control type="text" onChange={(e) => setManufacturer(e.target.value)} placeholder="Insert manufacturer name" value={manufacturer} />
                    </Form.Group>
                    { manufacturerAlert && <CustomAlert text={'Manufacturer name not valid'} /> }
                    <Form.Group className="mb-3" controlId="formRegistrYear">
                        <Form.Label>Year of registration</Form.Label>
                        <Form.Control type='date' onChange={(e) => setRegistrYear(e.target.value)} placeholder="Insert the year of registration" value={registrYear} />
                    </Form.Group>
                    { regYearAlert && <CustomAlert text={'Registration year not valid'} />}
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Container>
        </>
    );
};

AddUpdateVehicle.defaultProps = {
    setVehicles: [],
    vehicles: []
}

export default AddUpdateVehicle;