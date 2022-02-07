import {useEffect, useState} from "react";
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Logout from "./Logout";
import {default as MyButton} from '../components/Button'
import UsefulFunctions from "../functions/UsefulFunctions";

const Header = ({ logout, links, tableConfig, setTableConfig }) => {

    const { buildOrderFieldPath, getData } = UsefulFunctions()
    const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)

    const [filter, setFilter] = useState(tableConfig.dbFields[0]);

    // state that manage the text input in the search button
    const [searchText, setSearchText] = useState('');

    const [searchButton, setSearchButton] = useState(false);

    const reset = () => {
        setSearchText('')
        let tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
            let returnValue = { ...a }
            if(a.sortType !== '') returnValue.sortType = ''
            return returnValue
        })
        setTableConfig({
            ...tableConfig,
            fieldObjects: tmpFieldObjects,
        })
        //setSearchButton(!searchButton)
    }

    const search = () => {
        setTableConfig({
            ...tableConfig,
            filterSearchText: filter,
            searchText: searchText,
        })
        setSearchButton(!searchButton)
    }

    useEffect(() => {

        const getListObjects = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath)
        }

        getListObjects().then(r => setTableConfig({
            ...tableConfig,
            list: r
        }))
        setSearchText('')

    }, [searchButton]);

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
                        {links.map((element) => <Nav.Link key={element.name} >{element.name}</Nav.Link>)}
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
                        <MyButton text={'Reset'} disable={tableConfig.resetButtonDisable} onClickDo={() => reset()} />

                        {/* Filter for searching settings*/}
                        <NavDropdown title={filter} id="navbarScrollingDropdown">
                            {tableConfig.searchableFields
                                .map((element) =>
                                    <NavDropdown.Item key={element} onClick={() => setFilter(element)}>
                                        {element}
                                    </NavDropdown.Item>
                                )}
                        </NavDropdown>
                    </Nav>
                    {/* Search text input */}
                    <Form className="d-flex" >
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <Button disabled={searchText===''} variant="outline-success" onClick={() => search()}>Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;