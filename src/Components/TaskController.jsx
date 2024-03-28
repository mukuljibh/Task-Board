import React, { useEffect, useState } from 'react';
import Task from './Task';

function TaskController(props) {
    const [tasksArray, setTasksArray] = useState([]);

    useEffect(() => {
        setTasksArray(props.tasksArray)
    }, [props.tasksArray])

    function handle() {
        console.log(props.tasksArray)
    }
    //called by task along passing index of note to deleted as well as root index
    function deletetasksArray(deletetasksArrayIndex) {
        tasksArray.splice(deletetasksArrayIndex, 1)
        props.mainDeleteTask(tasksArray, props.rootIndex);
    }

    return (
        <div>
            {
                tasksArray.map((task, index) => (
                    <Task key={index} index={index} task={task} deletetasksArray={deletetasksArray} />
                ))
            }

        </div>
    )
}

export default TaskController;
