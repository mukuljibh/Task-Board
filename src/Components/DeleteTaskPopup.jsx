
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DeleteTaskPopup(props) {


    const [popupDeleteTaskHook, setPopupDeleteTaskHook] = useState(false);
    useEffect(() => {
        setPopupDeleteTaskHook(props.flag)
    }, [props.flag])

    function sendUpdatedObj() {
        props.handleDeleteTask("Deleted")
        props.deleteTaskPopupOff()
        setPopupDeleteTaskHook(false)
    }
    function popupCloseDeleteTask() {
        setPopupDeleteTaskHook(false);
        props.deleteTaskPopupOff()
    }

    return (

        <Modal show={popupDeleteTaskHook} onHide={popupCloseDeleteTask} aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">DELETE TASK</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do You Really Want to Delete This Task Title as {props.task.title} ?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={sendUpdatedObj}>
                    Yes
                </Button>
                <Button variant="secondary" onClick={popupCloseDeleteTask}>
                    No
                </Button>
            </Modal.Footer>
        </Modal >

    );

}

export default DeleteTaskPopup;