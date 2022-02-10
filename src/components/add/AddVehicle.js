import {useState} from "react";
import Header from "../Header";
import {Button, Container, Form} from "react-bootstrap";

const AddVehicle = ({ logout, links, tableConfig, setTableConfig, showSearchButton }) => {

    const [form, setForm] = useState({
        licensePlate: '',
        licensePlateAlert: false,
        model: '',
        modelAlert: false,
        typology: '',
        typologyAlert: false,
        manufacturer: '',
        manufacturerAlert: false,
        registrYear: '',
        registrYearAlert: false,
    });

    const onSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <>
            <Header logout={logout} links={links} tableConfig={tableConfig} setTableConfig={setTableConfig} showSearchButton={showSearchButton} throwResetFetch={false}/>
            <Container className={'my-2'}>
                <h3>Insert Vehicle</h3><br/>
                <Form onSubmit={onSubmit}>
                    <Form.Group className="mb-3" controlId="formLicensePlate">
                        <Form.Label>License plate</Form.Label>
                        <Form.Control type="text" onChange={(e) => setForm({
                            ...form,
                            licensePlate: e.target.value,
                        })} placeholder="Insert license plate" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formModel">
                        <Form.Label>Model</Form.Label>
                        <Form.Control type="text" onChange={(e) => setForm({
                            ...form,
                            model: e.target.value,
                        })} placeholder="Insert model" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formTypology">
                        <Form.Label>Typology</Form.Label>
                        <Form.Control type="text" onChange={(e) => setForm({
                            ...form,
                            typology: e.target.value,
                        })} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formManufacturer">
                        <Form.Label>Manufacturer</Form.Label>
                        <Form.Control type="text" onChange={(e) => setForm({
                            ...form,
                            manufacturer: e.target.value,
                        })} placeholder="Insert manufacturer name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formRegistrYear">
                        <Form.Label>Year of registration</Form.Label>
                        <Form.Control type='date' onChange={(e) => setForm({
                            ...form,
                            registrYear: e.target.value,
                        })} placeholder="Insert the year of registration" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default AddVehicle;