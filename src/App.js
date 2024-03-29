import Card from 'react-bootstrap/Card';
import react, { useState } from 'react';
import TaskController from "./Components/TaskController";
import AddTaskPopup from "./Components/AddTaskPopup";
import { CurrencyRuble } from '@mui/icons-material';


function App() {
  const arr = ["Pending", "In Progress", "Completed", "Deployed", "Deferred"];
  const headerColors = ['bg-secondary', 'bg-warning', 'bg-success', 'bg-info', 'bg-danger'];
  const boarderColors = ['secondary', 'warning', 'success', 'info', 'danger'];
  const [addTaskPopupHook, setaddTaskPopupHook] = useState(false)

  const [taskStates, setTaskStates] = useState([[], [], [], [], []]);

  //link with addtask popup component;
  function addTaskPopupOn() {
    //this need to be done due to rendering problem arives when states are immediatly changes need to have gap(changes) between them so that 
    //conditional rendering wake up

    setTimeout(() => {
      setaddTaskPopupHook(false);
    }, 50)

    setTimeout(() => {
      setaddTaskPopupHook(true);
    }, 100)


  }

  function mainAddTask(popupAddTaskHookObj) {

    let pendingStateIndex = 0;
    setTaskStates((prev) => {
      prev[pendingStateIndex].push(popupAddTaskHookObj);
      return [...prev]
    })

  }
  //final main delete call by task controller
  function mainDeleteTask(tasksArray, rootIndex) {
    taskStates[rootIndex] = tasksArray
    setTaskStates([...taskStates])
  }
  function mainEditTask(popupEditTaskHookObj, currentIndex) {

    setTaskStates((prev) => {
      //splice return array
      const obj = prev[popupEditTaskHookObj.currentRootIndex].splice(currentIndex, 1)
      const updatedTaskObj = { ...obj[0], priority: popupEditTaskHookObj.priority, status: popupEditTaskHookObj.status }
      prev[popupEditTaskHookObj.rootIndex].push(updatedTaskObj);
      return [...prev]
    });


  }


  return (
    /*parent  div starts*/
    <div>
      {addTaskPopupHook ? <AddTaskPopup flag={true} mainAddTask={mainAddTask} /> : null}

      <div className="container-fluid border border-secondary  parrent" style={{ height: "100vh" }}>
        <div className="row ">
          <div className="col-sm-7 col-7 TaskBoard ">
            <h3>Task Board</h3>
          </div>
        </div>
        {/*child div starts*/}
        <div className="container  child mt-4" style={{ paddingLeft: "20px", marginleft: "50px", overflow: "auto" }}  >
          <div className="row pb-2 mt-3">
            <div className="col-xxl-2 col-sm-3 col-12" >
              <h4 >Filter By:</h4>
            </div >
            <div className="col-xxl-2 col-sm-2 col">
              <input placehoder='Assignee Name'></input>
            </div>
            <div className="col-xxl-2 col-sm-2 col-">
              <button style={{ marginRight: "30px" }}>Priority</button>
            </div>
            <div className="col-xxl-2 col-sm-2 col">
              <button >calender</button>
            </div>
            <div className="col-xxl-2 col-sm-3 col">
              <button onClick={addTaskPopupOn}>Add New Task</button>

            </div>
          </div >

          <div className="row ">
            <div className="col-xxl-6 col-sm-3 ">
              <h4 >Sort by:</h4>
            </div>
            <div className="col-xxl-6 col-sm-9 ">
              <button >Priority </button>
            </div>
          </div>

          <div className="cards">
            {taskStates.map((tasksArray, idx) => (
              <div className="col" key={idx}>
                {/* Set the height of the Card component */}
                <Card border={`${boarderColors[idx]}`} style={{ height: '490px', width: '245px', borderWidth: "2px" }}>

                  <Card.Header className={`${headerColors[idx]}`}>{arr[idx]}</Card.Header>
                  <Card.Body >
                    {/*for making dv scrollable  it is actually linked with actual height of the card component*/}
                    <div style={{ maxHeight: "400px", overflow: 'auto' }}>
                      <TaskController key={idx} rootIndex={idx} tasksArray={tasksArray} mainDeleteTask={mainDeleteTask} mainEditTask={mainEditTask} />
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>


        </div>
        {/*child div ends*/}
      </div >
      {/*parent div ends*/}
    </div >
  );
}

export default App;

