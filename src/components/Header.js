import {Container, Form, FormControl, Nav, Navbar, NavDropdown, Button} from "react-bootstrap";
import Logout from "./Logout";

const Header = ({logout}) => {
    return (
        <Navbar bg="light" expand="lg" bg="dark" variant="dark">
            <Container fluid className={'my-10'}>
                <Navbar.Brand href="#">RentalCar</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="#action2">Link</Nav.Link>
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
                        <NavDropdown title="Filtri" id="navbarScrollingDropdown">
                            <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action5">
                                Something else here
                            </NavDropdown.Item>
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