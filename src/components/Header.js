import { useState } from "react";
import {Button, Container, Form, FormControl, Nav, Navbar, NavDropdown} from "react-bootstrap";
import Logout from "./authentication/Logout";
import {default as MyButton} from './graphic/Button'
import UsefulFunctions from "../functions/UsefulFunctions";
import {useNavigate} from "react-router-dom";
import PropTypes from 'prop-types'

const Header = ({ logout, links, tableConfig, setTableConfig, showSearchButton, getData }) => {

    const navigate = useNavigate()

    const { buildOrderFieldPath } = UsefulFunctions()

    // state that manage the searching filter
    const [filter, setFilter] = useState(tableConfig.dbFields[0]);

    // state that manage the text input in the search button
    const [searchText, setSearchText] = useState('');

    // function that reset all the 'tableConfig' settings and trigger the useEffect of the useResetFetch(...)
    const reset = async () => {
        setSearchText('')

        let tmpFieldObjects = tableConfig.fieldObjects.map((a) => {
            let returnValue = { ...a }
            if(a.sortType !== '') returnValue.sortType = ''
            return returnValue
        })

        const { sortPath, orderPath } = buildOrderFieldPath(tmpFieldObjects)

        const data = await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, 1, '', '')

        setTableConfig(prevTableConfig => {
            return {
                ...prevTableConfig,
                fieldObjects: tmpFieldObjects,
                disableResetPaginationButton: true,
                disableResetHeaderButton: true,
                disableResetTableButton: true,
                currentPages: [1,2,3],
                filterSearchText: '',
                currentPage: 1,
                searchText: '',
                list: data
            }
        })

        setFilter(tableConfig.dbFields[0])
        setSearchText('')

    }

    /**
     * Fill the tableConfig with the appropriate data to fetch what the user entered the search input text box
     */
    const search = async () => {

        const { sortPath, orderPath } = buildOrderFieldPath(tableConfig.fieldObjects)

        const data = await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, 1, searchText, filter)

        setTableConfig(prevTableConfig => {
            return {
                ...prevTableConfig,
                filterSearchText: filter,
                searchText: searchText,
                disableResetHeaderButton: false,
                currentPages: [1,2,3],
                currentPage: 1,
                list: data
            }
        })

        setSearchText('')
    }

    /**
     * Function that control if the reset button should be disabled or not. He has to be active when the user did a search,
     * change the order settings or change the page. We have three variables that manage this states. Based on them the button
     * are/aren't disabled.
     * @returns {boolean}
     */
    const disablingResetButton = () => {
        if(searchText === ''){
            if(!tableConfig.disableResetTableButton) {
                return false
            }
            else if(!tableConfig.disableResetHeaderButton) {
                return false
            }
            else if(!tableConfig.disableResetPaginationButton) {
                return false
            }
            return true
        }
        else {
            return false
        }
    }

/*

    // triggered when the useState searchButton has been pressed
    useEffect(() => {

        // variables useful to manage different simultaneously fetch
        const controller = new AbortController()
        const signal = controller.signal

        const getListObjects = async () => {
            return await getData(sortPath, orderPath, tableConfig, tableConfig.startPath, signal)
        }

        if(showSearchButton) {
            // fetch + make available the reset button
            getListObjects().then(r => {
                setTableConfig({
                    ...tableConfig,
                    list: r,
                    disableResetHeaderButton: false,
                })
                showSearchButton && setObjectList(r)
            })
        }
        setSearchText('')

        return () => {
            // when this useEffect is thrown, first abort the previous fetch if it is still in calling
            controller.abort()
        }

    }, [searchButton]);*/

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
                        {links.map((element) => <Nav.Link key={element.name} onClick={() => navigate(element.path)} >{element.name}</Nav.Link>)}
                    </Nav>
                    <Nav
                        className={'ms-auto my-2 my-lg-0'}
                        style={{ maxHeight: '100px '}}
                        navbarScroll
                    >
                        <Logout logout={logout} />
                        { showSearchButton &&
                            <MyButton
                                text={'Reset'}
                                disable={disablingResetButton()}
                                onClickDo={() => reset()}
                            />
                        }

                        { showSearchButton &&
                            /* Filter for searching settings*/
                            <NavDropdown title={filter} id="navbarScrollingDropdown">
                                {tableConfig.searchableFields
                                    .map((element) => <NavDropdown.Item key={element} onClick={() => setFilter(element)}>{element}</NavDropdown.Item>)}
                            </NavDropdown>
                        }
                    </Nav>
                    { showSearchButton &&
                        /* Search text input */
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
                        </Form>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

Header.propTypes = {
    setObjectList: PropTypes.func,
    objectList: PropTypes.array
}

Header.defaultProps = {
    setObjectList: () => {},
    objectList: []
}

export default Header;