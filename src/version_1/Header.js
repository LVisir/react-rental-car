import {Container, Form, FormControl, Nav, Navbar, NavDropdown, Button} from "react-bootstrap";
import Logout from "../components/Logout";
import { useNavigate } from 'react-router-dom';
import {useEffect, useState} from "react";
import {default as MyButton} from '../components/Button'

/**
 * Header component that links Vehicles, Reservations, Customers component from the SuperUserPage
 * @param logout
 * @param links
 * @param tableConfigurations
 * @returns {JSX.Element}
 * @constructor
 */
const Header = ({logout, links, tableConfigurations}) => {

    const navigate = useNavigate()

    // state that manage the filter used when the user is searching something
    const [filterTitle, setFilterTitle] = useState(tableConfigurations.sortableFields.filter((element) => element.hasOwnProperty('orderBy'))[0].field);

    // state that manage the text input ni the search button
    const [search, setSearch] = useState('');

    // state that manage the button to reset all the table configurations
    const [resetButton, setResetButton] = useState(true);

    /**
     * Because the fetch is triggered when a page is changing (look Paging.js useEffect)
     * when the user press the button 'Search', the 'tableConfigurations' save the text put and the filter;
     * if we are in the page 1 we should trigger the useEffect, but, because we are not changing page we have to trigger it
     * by changing the state of something else inside the useEffect dependencies: 'tableConfigurations.searchButtonClicked()';
     * else if we are not in the page 1, we can trigger the useEffect just by changing the current page to 1.
     *
     * If we search something, activate the reset button and clean the search input text.
     */
    const searchData = () => {
        tableConfigurations.setSearchInfoText(search)
        tableConfigurations.setSearchInfoField(filterTitle)
        if(tableConfigurations.currentPage() === 1) tableConfigurations.searchButtonClicked()
        else{
            tableConfigurations.changeCurrentPage(1)
            tableConfigurations.setPage([1,2,3])
        }
        tableConfigurations.changeResetButton()
        setSearch('')
    }

    /**
     * Read 'searchData'.
     * We are resetting the settings in the table, cleaning the search input text,
     * activate the reset button;
     * we are changing the reset button state in the 'tableConfigurations' just if it is false
     * because it can be already activate when we trigger it by searching something;
     */
    const reset = () => {
        tableConfigurations.setSearchInfoText('')
        if(tableConfigurations.currentPage() === 1) tableConfigurations.searchButtonClicked()
        else{
            tableConfigurations.changeCurrentPage(1)
            tableConfigurations.setPage([1,2,3])
        }
        tableConfigurations.sortableFields.map((element) => element.orderBy() && element.resetState())
        setSearch('')
        setResetButton(true)
        if(!tableConfigurations.getResetButton()){
            tableConfigurations.changeResetButton()
        }
    }

    /**
     * Whenever the 'tableConfigurations.useEffectDependencies' are changing, check the state of the button for ordering and
     * if neither one button is on 'asc' or 'desc' order state, it means we don't need to reset anything;
     * check also the reset button from 'tableConfigurations' that should correspond to the reset button of this component
     */
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
                        {/* Links to other pages */}
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

                        {/* Filter for searching settings*/}
                        <NavDropdown title={filterTitle} id="navbarScrollingDropdown">
                            {tableConfigurations.sortableFields.filter((element) => element.orderBy())
                                .map((element) =>
                                    <NavDropdown.Item key={element.field} onClick={() => setFilterTitle(element.field)}>
                                        {element.field}
                                    </NavDropdown.Item>)}
                        </NavDropdown>
                    </Nav>
                    {/* Search text input */}
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