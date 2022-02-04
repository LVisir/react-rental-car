import {Container, Form, FormControl, Nav, Navbar, NavDropdown, Button} from "react-bootstrap";
import Logout from "./Logout";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import UsefulFunctions from "../functions/UsefulFunctions";
import {default as MyButton} from './Button'

const Header = ({logout, links, tableConfigurations}) => {

    const navigate = useNavigate()
    const [filterTitle, setFilterTitle] = useState(tableConfigurations.sortableFields.filter((element) => element.hasOwnProperty('orderBy'))[0].field);

    const [search, setSearch] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);

    const { resetSortAndOrderType, usePrevious } = UsefulFunctions()

    const [resetButton, setResetButton] = useState(true);

    const prevSearchButton = usePrevious(tableConfigurations.getSearchButtonState())

    const searchData = () => {
        tableConfigurations.setSearchInfoText(search)
        tableConfigurations.setSearchInfoField(filterTitle)
        tableConfigurations.currentPage() === 1 ? tableConfigurations.searchButtonClicked() : tableConfigurations.changeCurrentPage(1)
        tableConfigurations.changeResetButton()
        setSearch('')
    }

    const reset = () => {
        tableConfigurations.setSearchInfoText('')
        tableConfigurations.currentPage() === 1 ? tableConfigurations.searchButtonClicked() : tableConfigurations.changeCurrentPage(1)
        tableConfigurations.sortableFields.map((element) => element.orderBy() && element.resetState())
        setSearch('')
        setResetButton(true)
        if(!tableConfigurations.getResetButton()){
            tableConfigurations.changeResetButton()
        }
    }

    useEffect(() => {
        tableConfigurations.sortableFields.map((element) => element.orderBy() && element.state() !== 0 && setResetButton(false))
        if(!tableConfigurations.getResetButton()) setResetButton(false)
    }, tableConfigurations.useEffectDependencies);


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
                        <MyButton text={'Reset'} disable={resetButton} onClickDo={() => reset()}/>
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
                        <Button disabled={search===''} onClick={() => searchData()} variant="outline-success" >Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;