import {useEffect, useState} from "react";
import UsefulFunctions from "../../functions/UsefulFunctions";
import {useNavigate, useParams} from "react-router-dom";
import Header from "../Header";
import {Button, Container, Form} from "react-bootstrap";
import CustomAlert from "../alerts/CustomAlert";
import BookingService from "../../service/Booking/BookingService";

const AddUpdateBooking = ({ logout, links, tableConfig, setTableConfig, showSearchButton, setBookings, bookings, getData }) => {

    const [loading, setLoading] = useState(true);

    const { addObject, buildOrderFieldPath, updateObject, dateFormat, dateFormatReverse } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)
    const { getBookingById } = BookingService()

    const { id, vehicleLicencePlate } = useParams()

    useEffect(() => {
        const getBooking = async () => {
            return await getBookingById(id)
        }

        // it means an update request was made to update a customer object
        if(id !== undefined ) {
            const data = getBooking()
            Promise.resolve(data).then(r => {
                // check if the id passed as a param is valid so check if the object length is higher than 0 otherwise it means no object was returned and
                // check if this request is made by the actual logged customer
                if(Object.keys(r).length>0 && r['userId'] === sessionStorage.getItem('customer')){
                    setStartDate(r['start'])
                    setEndDate(r['end'])
                    setIdBooking(r['id'])
                    setCustomer(r['userId'])
                    setApproval(r['approval'])
                    setVehicle(r['vehicleId'])
                    setLoading(false)
                }
                else{
                    // navigate through the error page because the id in the url params doesn't correspond to any customer
                    navigate('*', {replace: true})
                }
            })
        }
        else{
            setLoading(false)
        }

    }, []);

    // form fields useState
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [idBooking, setIdBooking] = useState('');
    const [code, setCode] = useState('');
    const [customer, setCustomer] = useState('');
    const [approval, setApproval] = useState('');
    const [vehicle, setVehicle] = useState('');

    // alert form fields useState
    const [startDateAlert, setStartDateAlert] = useState(false);
    const [endDateAlert, setEndDateAlert] = useState(false);

    const navigate = useNavigate()

    const onSubmit = (e) => {
        e.preventDefault()

        // field blank control
        if(!startDate || !endDate){
            !startDate ? setStartDateAlert(true) : setStartDateAlert(false)
            !endDate ? setEndDateAlert(true) : setEndDateAlert(false)
            return
        }

        let updtBooking = null

        if(id !== undefined){
            updtBooking = {
                id: id,
                end: dateFormat(endDate),
                start: dateFormat(startDate),
                userId: customer,
                approval: approval,
                vehicleId: vehicle
            }
            updateObject({...updtBooking}, tableConfig.startPath+`/${id}`).then(() => getData(sortPath, orderPath, tableConfig, tableConfig.startPath, new AbortController().signal))
                .then((r) => setBookings(r))
        }
        else{

            addObject({
                end: dateFormat(endDate),
                start: dateFormat(startDate),
                userId: sessionStorage.getItem('customer'),
                approval: 0,
                vehicleId: vehicleLicencePlate
            }, tableConfig.startPath).then(() => getData(sortPath, orderPath, tableConfig, tableConfig.startPath, new AbortController().signal))
                .then((r) => setBookings(r))
        }

        setEndDate('')
        setStartDate('')
        setStartDateAlert(false)
        setEndDateAlert(false)

        navigate('/Bookings')

        return

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
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formStartDate">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control type="date" onChange={(e) => setStartDate(e.target.value)} value={dateFormatReverse(startDate)} />
                    </Form.Group>
                    { startDateAlert && <CustomAlert text={'Date not valid'} /> }
                    <Form.Group className="mb-3" controlId="formEndDate">
                        <Form.Label>End date</Form.Label>
                        <Form.Control type="date" onChange={(e) => setEndDate(e.target.value)} value={dateFormatReverse(endDate)} />
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