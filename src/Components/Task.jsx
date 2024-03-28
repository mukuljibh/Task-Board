import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import SplitButton from 'react-bootstrap/SplitButton';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function Task(props) {
    //passing index of task that is going to be deleted to task controller which is a middle ware between app and task component
    function handleDeleteTask() {
        props.deletetasksArray(props.index)
    }
    return (
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
                        <p style={{ margin: "0", marginRight: "10px" }}>Assign</p>
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
                                <Dropdown.Item as="button" >edit</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleDeleteTask} >delete</Dropdown.Item>
                            </div>
                        </DropdownButton>
                    </div>
                </Card.Body>
            </Card>


        </div >
    )
}
export default Task;