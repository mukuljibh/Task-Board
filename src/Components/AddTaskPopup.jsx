import react, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';


function AddTaskPopup(props) {

    const [popupAddTaskHook, setpopupAddTaskHook] = useState(false);
    const [popupAddTaskHookObj, setPopupAddTaskHookObj] = useState({ title: "", discription: "", team: "", assignees: "", priority: "" })
    //Recieve flag from app.js incdicate that button is clicked useeffect will take care of
    useEffect(() => {
        setpopupAddTaskHook(props.flag)
    }, [props.flag])

    //this function create the object of task 
    function taskobj(event) {
        const { id, value } = event.target || event;
        const type = id || 'priority';

        setPopupAddTaskHookObj((prev) => ({
            ...prev,
            [type]: value || event
        }));
    }

    function sendObj() {
        //  console.log(popupAddTaskHookObj)
        props.mainAddTask(popupAddTaskHookObj)
        setpopupAddTaskHook(false);
        props.addTaskPopupOff()
    }

    function popupCloseAddTask() {
        setpopupAddTaskHook(false);
        props.addTaskPopupOff()
    };
    return (
        <Modal dialogClassName="addTask" show={popupAddTaskHook} onHide={popupCloseAddTask}>

            <Modal.Header closeButton>
                <Modal.Title>CREATE A TASK</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3  d-flex align-items-center ">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            id="title"
                            placeholder="name@example.com"
                            autoFocus
                            onChange={taskobj}
                            style={{ height: '40px', width: "70%", marginLeft: "60px" }}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3  d-flex align-items-center justify-content-start"

                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4}
                            id="discription"

                            onChange={taskobj}
                            style={{ height: "10% ", width: "70%", marginLeft: "10px", overflow: "auto" }} />
                    </Form.Group>
                    <Form.Group className="mb-3  d-flex align-items-center" >
                        <Form.Label>Team</Form.Label>
                        <Form.Control
                            id="team"
                            placeholder="name@example.com"
                            onChange={taskobj}
                            autoFocus
                            style={{ height: '40px', width: "70%", marginLeft: "53px" }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3  d-flex align-items-center" >
                        <Form.Label>Assignees</Form.Label>
                        <Form.Control
                            id="assignees"
                            placeholder="name@example.com"
                            onChange={taskobj}
                            autoFocus
                            style={{ height: '40px', width: "70%", marginLeft: "20px" }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3  d-flex align-items-center" >
                        <Form.Label className="me-3 ">Priority</Form.Label>

                        <DropdownButton
                            as={ButtonGroup}
                            onSelect={taskobj}
                            variant="secondary"
                            title="variant"
                            size="sm"
                            style={{
                                marginLeft: "5%"
                            }}
                        >
                            <Dropdown.Item eventKey="P0" >P0</Dropdown.Item>
                            <Dropdown.Item eventKey="P1" >P1 </Dropdown.Item>
                            <Dropdown.Item eventKey="P2">P2</Dropdown.Item>
                        </DropdownButton>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={popupCloseAddTask}>
                    Close
                </Button>
                <Button variant="primary" onClick={sendObj}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal >
    )

}
export default AddTaskPopup;