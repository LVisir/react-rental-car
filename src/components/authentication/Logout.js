import { useNavigate } from "react-router-dom";
import Button from "../graphic/Button";

/**
 * Componente Logout che serve appunto per effettuare il logout
 * Al suo interno c'è il componente Button.js
 * @param logout
 * @returns {JSX.Element}
 * @constructor
 */
const Logout = ({logout}) => {
    const navigate = useNavigate()

    const goToHomepage = () => {
        logout()
        navigate('/')
    }

    return (
        <>
            <Button text={'Logout'} color={'Brown'} onClickDo={() => goToHomepage()}/>
        </>
    );
};

export default Logout;