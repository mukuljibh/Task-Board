import react, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Snackbar from '@mui/material/Snackbar';



function AddTaskPopup(props) {
    const [buttonHook, setButtonHook] = useState({ priority: "" })
    const [popupAddTaskHook, setpopupAddTaskHook] = useState(false);

    //pending task by default at assigned stage
    const [popupAddTaskHookObj, setPopupAddTaskHookObj] = useState({ title: "", description: "", team: "", assignees: "", priority: "", status: "Assigned" })
    //Recieve flag from app.js incdicate that button is clicked useeffect will take care of
    useEffect(() => {
        setpopupAddTaskHook(props.flag)
    }, [props.flag])

    //this function create the object of task 
    function taskobj(event) {
        //event.target also have event key value of drop down button
        const { id, value } = event.target || event;
        const type = id || 'priority';
        //this is also handling the button name change after selecting the dropdown menu contnent
        if (type === "priority") {
            setButtonHook({ ...buttonHook, priority: event })
        }

        setPopupAddTaskHookObj((prev) => ({
            ...prev,
            [type]: value || event
        }));
    }

    function sendObj() {

        //  console.log(popupAddTaskHookObj) send message along with it
        //creating shallow copy of popupAddTaskHookObj
        const updatedPopupAddTaskHookObj = { ...popupAddTaskHookObj }
        setpopupAddTaskHook(false);
        props.mainAddTask(updatedPopupAddTaskHookObj, "Task Created")

        //sending alter message of succefull adding task to app

        props.addTaskPopupOff()
    }

    function popupCloseAddTask() {
        setpopupAddTaskHook(false);
        props.addTaskPopupOff()
    };

    return (
        <div>

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
                                id="description"

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
                                title={buttonHook.priority || "Priority"}
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
        </div>
    )

}
export default AddTaskPopup;