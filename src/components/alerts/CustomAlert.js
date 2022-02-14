import {Alert} from "react-bootstrap";

const CustomAlert = ({ text }) => {

    return (
            <Alert variant="danger" >
                <Alert.Heading>{text}</Alert.Heading>
            </Alert>
        );
}

export default CustomAlert;