import {Container, Form, FormControl, Nav, Navbar, NavDropdown, Button} from "react-bootstrap";
import Logout from "./Logout";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import UsefulFunctions from "../functions/UsefulFunctions";

const Header = ({logout, links, tableConfigurations}) => {

    const navigate = useNavigate()
    const [filterTitle, setFilterTitle] = useState(tableConfigurations.sortableFields.filter((element) => element.hasOwnProperty('orderBy'))[0].field);

    const [search, setSearch] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);

    const { resetSortAndOrderType } = UsefulFunctions()

    const searchData = () => {
        tableConfigurations.setSearchInfoText(search)
        tableConfigurations.setSearchInfoField(filterTitle)
        tableConfigurations.currentPage() === 1 ? tableConfigurations.searchButtonClicked() : tableConfigurations.changeCurrentPage(1)
        setSearch('')
    }

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
                            {tableConfigurations.sortableFields.filter((element) => element.orderBy())
                                .map((element) =>
                                    <NavDropdown.Item key={element.field} onClick={() => setFilterTitle(element.field)}>
                                        {element.field}
                                    </NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                    <Form className="d-flex" >
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={() => searchData()} variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;