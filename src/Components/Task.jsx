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
    function editTask(popupUpdateTaskHookObj) {
        //delay so that instant mapping is avoided this need to done because modal clossing animation disappear which look not good

        props.editTask(popupUpdateTaskHookObj, props.index);


    }
    function editTaskPopupOn() {
        //this need to be done due to rendering problem arives when states are immediatly changes need to have gap(changes) between them so that 
        //conditional rendering wake up

        setEditTaskPopupHook(true);
    }
    function editTaskPopupOff() {
        setTimeout(() => {
            setEditTaskPopupHook(false);
        }, 500)
    }

    return (
        <div>{editTaskPopupHook ? <EditTaskPopup flag={editTaskPopupHook} editTask={editTask} editTaskPopupOff={editTaskPopupOff} task={props.task} currentRootIndex={props.currentRootIndex} /> : null}
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