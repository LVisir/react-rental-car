import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from 'prop-types'

const DeleteDialog = ({ bool, setBool, deleteObject, id, setId, path, objectList, setObjectList, updateTable, setUpdateTable }) => {
    const [show, setShow] = useState(bool);

    const handleConfirm = () => {

        const doDelete = async () => {
            deleteObject(id, path)
        }

        doDelete()
        setUpdateTable(!updateTable)
        setObjectList(objectList.filter((entity) => entity.id !== id))
        setShow(false)
        setBool(false)
    };

    const handleCancel = () => {
        setId(null)
        setShow(false)
        setBool(false)
    }

    return (
        <>
            <Modal show={show} onHide={handleCancel}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm operation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are u sure u want to delete?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

DeleteDialog.propTypes = {
    bool : PropTypes.bool
}

export default DeleteDialog;