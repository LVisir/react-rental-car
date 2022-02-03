import {Container, Form, FormControl, Nav, Navbar, NavDropdown, Button} from "react-bootstrap";
import Logout from "./Logout";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";

const Header = ({logout, links, filters}) => {

    const navigate = useNavigate()
    const [filterTitle, setFilterTitle] = useState('Search by: '+filters.filter((element) => element.orderBy())[0].field);

/*    useEffect(() => {

    }, [filterTitle]);*/


    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container fluid className={'my-10'}>
                <Navbar.Brand >RentalCar</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        {links.map((element) => <Nav.Link key={element.name} onClick={() => navigate(element.path)}>{element.name}</Nav.Link>)}
                        <Nav.Link href="#" disabled>
                            Link
                        </Nav.Link>
                    </Nav>
                    <Nav
                        className={'ms-auto my-2 my-lg-0'}
                        style={{ maxHeight: '100px '}}
                        navbarScroll
                    >
                        <Logout logout={logout} />
                        <NavDropdown title={filterTitle} id="navbarScrollingDropdown">
                            {filters.filter((element) => element.orderBy())
                                .map((element) =>
                                    <NavDropdown.Item key={element.field} onClick={() => setFilterTitle('Search by: '+element.field)}>
                                        {element.field}
                                    </NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;