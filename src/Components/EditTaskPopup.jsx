import react, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { EventNote } from '@material-ui/icons';


function EditTaskPopup(props) {

    const [popupEditTaskHook, setPopupEditTaskHook] = useState(false);
    const [popupUpdateTaskHookObj, setpopupUpdateTaskHookObj] = useState({ rootIndex: "", currentRootIndex: "", priority: "", status: "" })
    //this hook is used render the already present data inside the boxes of edit task popup 
    const [PrevTaskDetails, setPrevTaskDetails] = useState({});
    const [priorityButtonText, setpriorityButtonText] = useState(false);
    const [statusButtonText, setStatusButtonText] = useState(false);
    //Recieve flag from app.js incdicate that button is clicked useeffect will take care of
    useEffect(() => {
        setPopupEditTaskHook(props.flag)
        setPrevTaskDetails(props.task)
    }, [props.flag, props.task])

    //this function create the object of task contains taskStatus,priority to update 
    //this two below function just used to show the menu selected name on button 
    function priorityButtonTexShow(event) {
        setpopupUpdateTaskHookObj((prev) => {
            return {
                ...prev, priority: event
            }
        })
        setpriorityButtonText(event)
    }
    function StatusButtonTextShow(event) {

        const obj = JSON.parse(event);
        setpopupUpdateTaskHookObj((prev) => {
            return {
                ...prev, ...obj
            }
        })
        setStatusButtonText(obj.status)

    }
    //this function sends the updated Task object to task component
    function sendUpdatedObj() {
        //loading animtion remains in there.
        setTimeout(() => {
            props.editTask(popupUpdateTaskHookObj)
        }, 100)
        setPopupEditTaskHook(false);
    }

    const popupCloseAddTask = () => {

        setPopupEditTaskHook(false);
        //this is reverse calling of  addTaskPopupOff in app.js so that addTaskPopupHook(app.js) should be (false) which helps in  addTaskPopupHook(app.js)
        //should be set as again true when button is clicked  and through conditional render in app.js again call the add task component 
        //and use effect works as expected in AddTask component
        //intoducing delay so that closing animation of addtask  popup should remains good as before
        setTimeout(() => {
            props.editTaskPopupOff(false);
        }, 100)

    };

    return (
        <Modal dialogClassName="addTask" show={popupEditTaskHook} onHide={popupCloseAddTask}>

            <Modal.Header closeButton>
                <Modal.Title>Edit TASK</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3  d-flex align-items-center ">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            id="title"
                            value={PrevTaskDetails.title}
                            readOnly
                            autoFocus

                            style={{ height: '40px', width: "70%", marginLeft: "60px" }}
                        />
                    </Form.Group>
                    <Form.Group
                        className="mb-3  d-flex align-items-center justify-content-start"

                    >
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" rows={4}
                            id="discription"
                            readOnly
                            value={PrevTaskDetails.discription || " "}

                            style={{ height: "10% ", width: "70%", marginLeft: "10px", overflow: "auto" }} />
                    </Form.Group>
                    <Form.Group className="mb-3  d-flex align-items-center" >
                        <Form.Label>Team</Form.Label>
                        <Form.Control
                            id="team"
                            value={PrevTaskDetails.team}
                            readOnly

                            autoFocus
                            style={{ height: '40px', width: "70%", marginLeft: "53px" }}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3  d-flex align-items-center" >
                        <Form.Label>Assignees</Form.Label>
                        <Form.Control
                            id="assignees"
                            value={PrevTaskDetails.assignees}
                            readOnly

                            autoFocus
                            style={{ height: '40px', width: "70%", marginLeft: "20px" }}
                        />
                    </Form.Group>
                    <Form.Group className="me-3 row" >
                        <div className='col-xxl-2'>
                            <Form.Label  >Priority</Form.Label>
                        </div>
                        <div className='col-xxl-4 ' >
                            <DropdownButton
                                as={ButtonGroup}
                                onSelect={priorityButtonTexShow}
                                variant="secondary"
                                title={priorityButtonText ? priorityButtonText : PrevTaskDetails.priority}
                                size="sm"
                                style={{
                                    marginLeft: "5%"
                                }}
                            >
                                <Dropdown.Item eventKey="P0" >P0</Dropdown.Item>
                                <Dropdown.Item eventKey="P1" >P1 </Dropdown.Item>
                                <Dropdown.Item eventKey="P2">P2</Dropdown.Item>
                            </DropdownButton>
                        </div>
                        <div className='col'>
                            <Form.Label className="me-3 " >Status</Form.Label>
                            <DropdownButton
                                as={ButtonGroup}
                                onSelect={StatusButtonTextShow}
                                variant="secondary"
                                title={statusButtonText}
                                size="sm"
                                style={{
                                    marginLeft: "5%",

                                }}
                            >
                                <Dropdown.Item eventKey={JSON.stringify({ rootIndex: 0, status: "pending", currentRootIndex: props.currentRootIndex })} >pending</Dropdown.Item>
                                <Dropdown.Item eventKey={JSON.stringify({ rootIndex: 1, status: "inProgress", currentRootIndex: props.currentRootIndex })} >inProgress </Dropdown.Item>
                                <Dropdown.Item eventKey={JSON.stringify({ rootIndex: 2, status: "complete", currentRootIndex: props.currentRootIndex })}>complete</Dropdown.Item>
                                <Dropdown.Item eventKey={JSON.stringify({ rootIndex: 3, status: "deployed", currentRootIndex: props.currentRootIndex })}>deployed</Dropdown.Item>
                                <Dropdown.Item eventKey={JSON.stringify({ rootIndex: 4, status: "deferred", currentRootIndex: props.currentRootIndex })}>deferred</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={popupCloseAddTask}>
                    Close
                </Button>
                <Button variant="primary" onClick={sendUpdatedObj}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal >
    )

}
export default EditTaskPopup;