import React, { useEffect, useState } from 'react';
import Task from './Task';

function TaskController(props) {
    const [tasksArray, setTasksArray] = useState([]);

    useEffect(() => {
        setTasksArray(props.tasksArray)
    }, [props.tasksArray])
    //passing the updated object from task cotroller finally to app object contains status,rootindex,currentrootIndex(main states index)priority
    function editTask(popupUpdateTaskHookObj, currentIndex) {
        props.mainEditTask(popupUpdateTaskHookObj, currentIndex)
    }
    //called by task along passing index of note to deleted as well as root index sendin it to app
    function deletetasksArray(deletetasksArrayIndex) {
        tasksArray.splice(deletetasksArrayIndex, 1)
        props.mainDeleteTask(tasksArray, props.rootIndex);
    }

    return (
        <div>
            {
                tasksArray.map((task, index) => (
                    <Task key={index} index={index} task={task} deletetasksArray={deletetasksArray} editTask={editTask} currentRootIndex={props.rootIndex} />
                ))
            }

        </div>
    )
}

export default TaskController;
