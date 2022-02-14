import {useState} from "react";
import {Button, Modal} from "react-bootstrap";
import PropTypes from 'prop-types'

/**
 * Dialog when a delete operation has been asked
 * @param bool
 * @param setBool
 * @param deleteObject
 * @param id
 * @param setId
 * @param path
 * @param objectList
 * @param setObjectList
 * @param updateTable
 * @param setUpdateTable
 * @returns {JSX.Element}
 * @constructor
 */
const DeleteDialog = ({ bool, setBool, deleteObject, id, setId, path, objectList, setObjectList, updateTable, setUpdateTable }) => {
    const [show, setShow] = useState(bool);

    /**
     * After the confirmation update the values and hide the dialog
     */
    const handleConfirm = () => {

        const doDelete = async () => {
            deleteObject(id, path)
        }

        doDelete().then(() => {
            setUpdateTable(!updateTable)
            //setObjectList(objectList.filter((entity) => entity.id !== id))
        })
        setShow(false)
        setBool(false)
    };

    /**
     * After the cancellation hide the dialog
     */
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