import React, { useEffect, useState } from 'react';
import Task from './Task';

function TaskController(props) {
    const [tasksArrayHook, setTasksArrayHook] = useState([]);

    useEffect(() => {
        setTasksArrayHook(props.tasksArray)
    }, [props.tasksArray])
    //passing the updated object from task cotroller finally to app object contains status,rootindex,currentrootIndex(main states index)priority
    function editTask(popupUpdateTaskHookObj, currentIndex) {
        props.mainEditTask(popupUpdateTaskHookObj, currentIndex)
    }
    //called by task along passing index of note to deleted as well as root index sendin it to app
    function deletetasksArray(deletetasksArrayIndex) {
        //updating direct hook lead to problems so shallow compy is created
        const updatedTasksArray = [...tasksArrayHook];
        updatedTasksArray.splice(deletetasksArrayIndex, 1);
        props.mainDeleteTask(updatedTasksArray, props.rootIndex);
    }

    return (
        <div>
            {
                tasksArrayHook.map((task, index) => (
                    <Task key={index} index={index} task={task} deletetasksArray={deletetasksArray} editTask={editTask} currentRootIndex={props.rootIndex} />
                ))
            }

        </div>
    )
}

export default TaskController;
