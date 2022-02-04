import {useEffect, useState} from 'react';
import UsefulFunctions from '../functions/UsefulFunctions';
import { useNavigate } from 'react-router-dom';
import VehiclesService from "../service/Vehicles/VehiclesService";
import Header from "./Header";
import {Container} from "react-bootstrap";
import Button from "./Button";
import CustomTable from "./CustomTable";

const Vehicles = ({logout, links}) => {

    // list of Vehicles objects
    const [vehicles, setVehicles] = useState([]);
    
    // state that indicate if a field is sortable or not
    const [targa, setTarga] = useState(true);
    const [modello, setModello] = useState(true);
    const [tipologia, setTipologia] = useState(true);
    const [casaCostruttrice, setCasaCostruttrice] = useState(true);
    const [annoImmatricolazione, setAnnoImmatricolazione] = useState(true);

    // number of pages shown
    const [pagesArray, setPagesArray] = useState([1,2,3]);

    // page where the user are at this moment
    const [currentPage, setCurrentPage] = useState(1);
    
    // state that indicate the sorting method
    const [orderTypeTarga, setOrderTypeTarga] = useState('asc');
    const [orderTypeModello, setOrderTypeModello] = useState('asc');
    const [orderTypeTipologia, setOrderTypeTipologia] = useState('asc');
    const [orderTypeCasaCostr, setOrderTypeCasaCostr] = useState('asc');
    const [orderTypeAnnoImm, setOrderTypeAnnoImm] = useState('asc');
    
    // state that indicate which button indicate which sort method
    const [buttonTargaState, setButtonTargaState] = useState(0);
    const [buttonModelloState, setButtonModelloState] = useState(0);
    const [buttonTipologiaState, setButtonTipologiaState] = useState(0);
    const [buttonCasaCostrState, setButtonCasaCostrState] = useState(0);
    const [buttonAnnoImmState, setButtonAnnoImmState] = useState(0);

    const [searchField, setSearchField] = useState('');
    const [searchText, setSearchText] = useState('');

    const { flipOrderType, shiftState, customQuery } = UsefulFunctions()

    const navigate = useNavigate()

    // function to fetch necessary data from Vehicles
    const { vehiclesLength, field, fieldHeader, getVehicles, vehiclesPath } = VehiclesService()

    // state that indicate when the data is load
    const [loading, setLoading] = useState(false);

    const [searchButton, setSearchButton] = useState(false);

    const [resetButton, setResetButton] = useState(true);

    // configuration for the table
    const tableConfigurations = {
        fieldNameDb: field,
        fieldNameTableHeader: fieldHeader,
        pages() { return vehiclesLength },
        pageList() { return pagesArray},
        setPage(newPagesArray) { setPagesArray(newPagesArray) },
        currentPage() {return currentPage},
        changeCurrentPage(x) { setCurrentPage(x) },
        list() {return vehicles},
        setList(newList) { setVehicles(newList) },
        searchInfoField() { return searchField },
        setSearchInfoField(x) { setSearchField(x) },
        searchInfoText() { return searchText },
        setSearchInfoText(x) { setSearchText(x) },
        searchButtonClicked() { setSearchButton(!searchButton) },
        getSearchButtonState() { return searchButton },
        getResetButton() { return resetButton },
        changeResetButton() { setResetButton(!resetButton) },
        sortableFields: [{
            field: 'targa',
            orderBy() { return targa },
            setState() { setTarga(!targa) },
            orderType() { return orderTypeTarga },
            changeOrderType() { return setOrderTypeTarga(flipOrderType(buttonTargaState))},
            state() { return buttonTargaState },
            changeState() { setButtonTargaState(shiftState(buttonTargaState)) },
            reset() { setTarga(false)},
            resetState() { setButtonTargaState(0)},
        }, {
            field: 'modello',
            orderBy() { return modello },
            setState() { setModello(!modello) },
            orderType() { return orderTypeModello },
            changeOrderType() { return setOrderTypeModello(flipOrderType(buttonModelloState))},
            state() { return buttonModelloState },
            changeState() { setButtonModelloState(shiftState(buttonModelloState)) },
            reset() { setModello(false)},
            resetState() { setButtonModelloState(0)},
        }, {
            field: 'tipologia',
            orderBy() { return tipologia },
            setState() { setTipologia(!tipologia) },
            orderType() { return orderTypeTipologia },
            changeOrderType() { return setOrderTypeTipologia(flipOrderType(buttonTipologiaState))},
            state() { return buttonTipologiaState },
            changeState() { setButtonTipologiaState(shiftState(buttonTipologiaState)) },
            reset() { setTipologia(false)},
            resetState() { setButtonTipologiaState(0)},
        }, {
            field: 'casaCostruttrice',
            orderBy() { return casaCostruttrice },
            setState() { setCasaCostruttrice(!casaCostruttrice) },
            orderType() { return orderTypeCasaCostr },
            changeOrderType() { return setOrderTypeCasaCostr(flipOrderType(buttonCasaCostrState))},
            state() { return buttonCasaCostrState },
            changeState() { setButtonCasaCostrState(shiftState(buttonCasaCostrState)) },
            reset() { setCasaCostruttrice(false)},
            resetState() { setButtonCasaCostrState(0)},
        }, {
            field: 'annoImmatricolazione',
            orderBy() { return annoImmatricolazione },
            setState() { setAnnoImmatricolazione(!annoImmatricolazione) },
            orderType() { return orderTypeAnnoImm },
            changeOrderType() { return setOrderTypeAnnoImm(flipOrderType(buttonAnnoImmState)) },
            state() { return buttonAnnoImmState },
            changeState() { setButtonAnnoImmState(shiftState(buttonAnnoImmState))},
            reset() { setAnnoImmatricolazione(false)},
            resetState() { setButtonAnnoImmState(0)},
        }],
        useEffectDependencies: [searchButton, currentPage, buttonTargaState, buttonModelloState, buttonTipologiaState, buttonAnnoImmState, buttonCasaCostrState],
        startPath: `http://localhost:5001/veicolo`,
        tableName: 'VEICOLO',
    }

    useEffect(() => {
        const fetchVehicles = async () => {

            const data = await customQuery(vehiclesPath, '?_limit=10')

            return data
        }

        fetchVehicles().then(r => setVehicles(r))

        setLoading(true)

    }, []);


    return loading ? (
        <>
            <Header logout={logout} links={links} tableConfigurations={tableConfigurations} />
            <Container className={'my-2'}>
                <h3>
                    Vehicles
                </h3>
                <CustomTable tableConfigurations={tableConfigurations} />
            </Container>
        </>
    ) : (
        <h1>Loading...</h1>
    )
};

export default Vehicles;