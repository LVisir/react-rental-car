import {Form} from "react-bootstrap";

/**
 * Componente form generico
 * @param controlId
 * @param label
 * @param type
 * @param setState
 * @param placeholder
 * @returns {JSX.Element}
 * @constructor
 */
const CustomForm = ({controlId, label, type, setState, placeholder}) => {
    return (
        <Form.Group className='mb-3' controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            {placeholder ? (
                <Form.Control type={type} onChange={(e)=>setState(e.target.value)} placeholder={placeholder}/>
            ) : (
                <Form.Control type={type} onChange={(e)=>setState(e.target.value)}/>
            )}

        </Form.Group>
    );
};

export default CustomForm;