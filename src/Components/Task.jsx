import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import EditTaskPopup from "./EditTaskPopup";
import { SettingsEthernet } from "@material-ui/icons";

function Task(props) {
    const [editTaskPopupHook, setEditTaskPopupHook] = useState(false)

    //passing index of task that is going to be deleted to task controller which is a middle ware between app and task component
    function handleDeleteTask() {
        props.deletetasksArray(props.index)
    }
    //this function receives the updated unit Task object  from EditTaskPopup component object have rootIndex status and priority
    //sending the obect to the task controller
    function editTask(popupEditTaskHookObj) {
        //delay so that instant mapping is avoided this is done because modal clossing animation disappear
        setTimeout(() => {
            props.editTask(popupEditTaskHookObj, props.index);
        }, 500)

    }
    function editTaskPopupOn() {
        //this is done so that rendering problem arives when task are updated should be solve need to have a gap between switvhesx
        setTimeout(() => {
            setEditTaskPopupHook(false);
        }, 50)

        setTimeout(() => {
            setEditTaskPopupHook(true);
        }, 100)

    }
    function editTaskPopupOff() {
        setEditTaskPopupHook(false);
    }
    return (
        <div>{editTaskPopupHook ? <EditTaskPopup flag={editTaskPopupHook} editTaskPopupOff={editTaskPopupOff} editTaskPopupOn={editTaskPopupOn} editTask={editTask} task={props.task} currentRootIndex={props.currentRootIndex} /> : null}
            <div>
                <Card style={{ textAlign: "justify", marginBottom: "6px", background: "#F3F1F2" }}>
                    <Card.Body>
                        <div className='flexTaskController'> {/* Use a <div> instead of <h6> for Task 1 */}
                            <h6>{props.task.title}</h6>
                            <button style={{ position: "relative", left: "115px", fontSize: "10px", height: "20px" }}>{props.task.priority}</button>
                        </div>

                        <p style={{ fontSize: "10px" }}>
                            {props.task.discription}
                        </p>
                        <div className="flexTaskController"> {/* Use a <div> instead of <h6> for @Pravin */}
                            <h6>{props.task.assignees}</h6>


                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p style={{ margin: "0", marginRight: "10px" }}>{props.task.status}</p>
                            {/*<button style={{ fontSize: "10px", height: "20px" }}>men</button>*/}
                            <DropdownButton
                                as={ButtonGroup}
                                drop="down-centered'"
                                variant="secondary"
                                title=""
                                size="sm"
                                style={{
                                    marginLeft: "5%"
                                }}
                            ><div style={{ fontSize: "14px" }}>
                                    <Dropdown.Item as="button" onClick={editTaskPopupOn} >edit</Dropdown.Item>
                                    <Dropdown.Item as="button" onClick={handleDeleteTask} >delete</Dropdown.Item>
                                </div>
                            </DropdownButton>
                        </div>
                    </Card.Body>
                </Card>

            </div>
        </div >
    )
}
export default Task;