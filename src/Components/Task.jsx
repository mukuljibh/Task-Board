import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import EditTaskPopup from "./EditTaskPopup";
import DeleteTaskPopup from './DeleteTaskPopup';
//call by TaskController
function Task(props) {
    const [editTaskPopupHook, setEditTaskPopupHook] = useState(false);
    const [deleteTaskPopupHook, SetDeleteTaskPopupHook] = useState(false);

    //passing index of task that is going to be deleted to task controller which is a middle ware between app and task component
    function handleDeleteTask(message) {
        // sending message along this
        props.deletetasksArray(props.index, message)
    }
    //this function receives the updated unit Task object  from EditTaskPopup component object have rootIndex status and priority
    //sending the obect to the task controller
    function editTask(ShCpypopUpUpdateTaskHookObj, message) {

        props.editTask(ShCpypopUpUpdateTaskHookObj, props.index, message);


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

    function deleteTaskPopupOn() {
        SetDeleteTaskPopupHook(true);
    }
    function deleteTaskPopupOff() {
        setTimeout(() => {
            SetDeleteTaskPopupHook(false)
        }, 500)
    }

    return (
        <div>{editTaskPopupHook ? <EditTaskPopup flag={editTaskPopupHook} editTask={editTask} editTaskPopupOff={editTaskPopupOff} task={props.task} currentRootIndex={props.currentRootIndex} /> : null}
            {deleteTaskPopupHook ? <DeleteTaskPopup flag={deleteTaskPopupHook} deleteTaskPopupOff={deleteTaskPopupOff} task={props.task} handleDeleteTask={handleDeleteTask} /> : null}
            <div>
                <Card style={{ textAlign: "justify", marginBottom: "6px", background: "#F3F1F2" }}>
                    <Card.Body>
                        <div className='flexTaskController'>
                            <h6>{props.task.title}</h6>
                            <button style={{ fontSize: "10px", height: "20px", background: "#007bff", color: "#fff", borderColor: "#007bff" }}>{props.task.priority}</button>
                        </div>

                        <p style={{ fontSize: "10px" }}>
                            {props.task.description}
                        </p>
                        <div className="flexTaskController">
                            <h6 >{props.task.assignees}</h6>


                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <p style={{ margin: "0", marginRight: "10px", paddingLeft: "20px", paddingRight: "20px", background: "#007bff", color: "#fff", fontSize: "15px", border: "1px solid #007bff", borderRadius: "2px" }}>{props.task.status}</p>
                            {/*<button style={{ fontSize: "10px", height: "20px" }}>men</button>*/}
                            <DropdownButton
                                as={ButtonGroup}
                                variant="primary"
                                title=""
                                size="sm"
                                style={{
                                    marginLeft: "5%",

                                }}


                            ><div style={{ fontSize: "14px" }}>
                                    <Dropdown.Item as="button" onClick={editTaskPopupOn} >edit</Dropdown.Item>
                                    {/*handleDeleteTask itergrated with this buton*/}
                                    <Dropdown.Item as="button" onClick={deleteTaskPopupOn} >delete</Dropdown.Item>
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