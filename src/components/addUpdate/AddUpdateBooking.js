import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../Header";
import {Button, Container, Form} from "react-bootstrap";
import CustomAlert from "../alerts/CustomAlert";
import BookingService from "../../service/Booking/BookingService";
import VehiclesService from "../../service/Vehicles/VehiclesService";

const AddUpdateBooking = ({ logout, links, tableConfig, setTableConfig, showSearchButton, getData }) => {

    const [loading, setLoading] = useState(true);
    const { getBookingById, updateBooking, insertBooking } = BookingService()
    const { getVehicleById, getLastBookingDates } = VehiclesService()

    const { id, vehicleLicencePlate } = useParams()

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {

        const getBooking = async () => {
            return await getBookingById(id)
        }

        const getVehicle = async () => {
            return await getVehicleById(vehicleLicencePlate);
        }

        const getLastBooking = async () => {
            return await getLastBookingDates(vehicleLicencePlate);
        }

        // it means an update request was made to update a customer object
        if(id !== undefined ) {

            // check if the id param is a number
            if(!isNaN(+id)) {

                getBooking().then(r => {

                    if(r !== null){

                        // check if the id passed as a param is valid so check if the object length is higher than 0 otherwise it means no object was returned and
                        // check if this request is made by the actual logged customer
                        if (r['user'].idUser.toString() === sessionStorage.getItem('customer').toString()) {
                            setStartDate(r['start'])
                            setEndDate(r['end'])
                            setIdBooking(r['idBooking'])
                            setCustomer(r['user'])
                            setApproval(r['approval'])
                            setVehicle(r['vehicle'])
                            setLoading(false)
                        } else {
                            // navigate through the error page because the id in the url params doesn't correspond to any customer
                            navigate('*', {replace: true})
                        }
                    } else {
                        // navigate through the error page because the id in the url params doesn't correspond to any customer
                        navigate('*', {replace: true})
                    }


                }).catch(() => {
                    navigate('*', {replace: true})
                })
            }
        }
        else if(vehicleLicencePlate !== undefined){
            // check if the vehicleLicencePlate param is a number
            if(!isNaN(+vehicleLicencePlate)) {

                getVehicle().then(r => {

                    if(r !== null){

                        getLastBooking().then(innerResponse => {

                            console.log(innerResponse['startDate'])

                            setStartDate(innerResponse['startDate'])
                            setEndDate(innerResponse['endDate'])
                            setIdBooking(r['idBooking'])
                            setCustomer(r['user'])
                            setApproval(r['approval'])
                            setVehicle(r['vehicle'])
                            setLoading(false)

                        })

                    }else {
                        // navigate through the error page because the vehicleLincensePlate in the url params doesn't correspond to any customer
                        navigate('*', {replace: true})
                    }

                }).catch( () =>navigate('*', {replace: true}) )

            }else {
                // navigate through the error page because the vehicleLincensePlate in the url params doesn't correspond to any customer
                navigate('*', {replace: true})
            }
        }
        else{
            setLoading(false)
        }

    }, []);

    // form fields useState
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [idBooking, setIdBooking] = useState('');
    const [customer, setCustomer] = useState('');
    const [approval, setApproval] = useState('');
    const [vehicle, setVehicle] = useState('');

    // alert form fields useState
    const [startDateAlert, setStartDateAlert] = useState(false);
    const [endDateAlert, setEndDateAlert] = useState(false);

    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault()

        setError(prevState => {
            return prevState && false
        })

        // field blank control
        if (!startDate || !endDate) {
            !startDate ? setStartDateAlert(true) : setStartDateAlert(false)
            !endDate ? setEndDateAlert(true) : setEndDateAlert(false)
            return
        }

        let updtBooking = null

        if (id !== undefined) {

            updtBooking = {
                idBooking: idBooking,
                end: endDate,
                start: startDate,
                user: customer,
                approval: approval,
                vehicle: vehicle
            }

            updateBooking({...updtBooking}, id)
                .then(resultInfo => {

                    if (resultInfo.error) {

                        console.log('dioooooo')

                        setErrorMessage(resultInfo.message)

                        setError(true)

                    } else {

                        const updatedList = tableConfig.list

                        for (const y in updatedList) {

                            if (updatedList[y].idBooking.toString() === id.toString()) {

                                updatedList.splice(y, y, {

                                    ...updatedList[y],

                                    ...resultInfo.booking

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

                        navigate('/Bookings')

                    }
                }).catch(e => {
                console.log(e)
            })
        } else {

            await insertBooking({
                end: endDate,
                start: startDate,
                user: {idUser: sessionStorage.getItem('customer')},
                approval: 0,
                vehicle: {idVehicle: vehicleLicencePlate}
            })
                .then(resultInfo => {

                    if (resultInfo.error) {

                        setErrorMessage(resultInfo.message)

                        setError(true)

                    } else {

                        const updateList = tableConfig.list

                        updateList.push(resultInfo.booking)

                        setTableConfig(prevTableConfig => {
                            return {
                                ...prevTableConfig,
                                list: updateList,
                            }
                        })

                        navigate('/Bookings')

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
                <h3>Edit booking</h3><br/>
                { error && <CustomAlert text={errorMessage} /> }
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formStartDate">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
                    </Form.Group>
                    { startDateAlert && <CustomAlert text={'Date not valid'} /> }
                    <Form.Group className="mb-3" controlId="formEndDate">
                        <Form.Label>End date</Form.Label>
                        <Form.Control type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
                    </Form.Group>
                    { endDateAlert && <CustomAlert text={'Date not valid'} /> }
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Container>
        </>
    )
};

export default AddUpdateBooking;