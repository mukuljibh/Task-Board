import Card from 'react-bootstrap/Card';
import react, { useState } from 'react';
import TaskController from "./Components/TaskController";
import AddTaskPopup from "./Components/AddTaskPopup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


function App() {
  const arr = ["Pending", "In Progress", "Completed", "Deployed", "Deferred"];
  const headerColors = ['bg-secondary', 'bg-warning', 'bg-success', 'bg-info', 'bg-danger'];
  const boarderColors = ['secondary', 'warning', 'success', 'info', 'danger'];
  const [addTaskPopupHook, setaddTaskPopupHook] = useState(false)
  const [filterButtonToggleHook, setFilterButtonToggleHook] = useState(true);
  const [inputErrorHook, setInputErrorHook] = useState({ assignees: null, priority: null });
  const [mainFilterTaskHandlerHook, setMainFilterTaskHandlerHook] = useState({ assignees: "", priority: "" });
  const [currentTaskStates, setCurrentTaskStates] = useState([[], [], [], [], []]);
  const [taskStates, setTaskStates] = useState([[], [], [], [], []]);

  //link with addtask popup component;
  function addTaskPopupOn() {
    //this need to be done due to rendering problem arives when states are immediatly changes need to have gap(changes) between them so that 
    //conditional rendering wake up
    setaddTaskPopupHook(true);
  }
  //always call by AddTaskPopup component 
  function addTaskPopupOff() {
    //introducing delay so that addTaskPopup component  does not immediatly off the addTaskPopupHook.
    setTimeout(() => {
      setaddTaskPopupHook(false);
    }, 500)

  }
  //final main delete call by AddTaskPopup component
  function mainAddTask(popupAddTaskHookObj) {
    let pendingStateIndex = 0;
    setTaskStates((prev) => {
      prev[pendingStateIndex].push(popupAddTaskHookObj);
      return [...prev]
    })
  }
  //helper function to mainFilterTask
  function mainFilterTaskHandler(value, type) {
    //this rendring makesures that filter button is in operable if assignee name and priority is not entered it block the functioning of mainFilterTask
    //mainFilterTask links with setFilterButtonToggleHook 
    type === "assignees" && value.target.value.trim().length === 0 ? setInputErrorHook((prev) => { setFilterButtonToggleHook(false); return { ...prev, assignee: true, priority: true } }) :
      setInputErrorHook((prev) => { setFilterButtonToggleHook(true); return { ...prev, assignees: false, priority: false } })

    const val = type === "assignees" ? value.target.value : value;
    setMainFilterTaskHandlerHook((prev) => {
      return { ...prev, [type]: val }
    })
  }
  function mainResetFilterTask() {
    setTaskStates([...currentTaskStates])
  }
  function mainSaveStateTask() {
    setCurrentTaskStates([...taskStates]);
  }
  function mainFilterTask() {
    //object contain criteria on whick filteration of task perfrom
    let filterObj = mainFilterTaskHandlerHook;
    //avoiding direct using of hook main state
    let state = [...taskStates]
    let arr1 = state.map((val) => {
      //this way it handle if one of assigny or priorty key  value missing and if both value are missing then this function will not exceute it is 
      //handled above in helper function mainFilterTaskHandler
      return val.filter((vali) => {
        const assigneeCheck = !filterObj.assignees || filterObj.assignees === vali.assignees;
        console.log("valii", vali)
        console.log("filterobj", filterObj)
        const priorityCheck = !filterObj.priority || filterObj.priority === vali.priority;
        console.log("valii", vali)
        console.log("valii", filterObj)

        return assigneeCheck && priorityCheck
      })
    })

    setTaskStates([...arr1])
  }


  //final main delete call by task controller
  function mainDeleteTask(updatedTasksArrayHook, rootIndex) {
    taskStates[rootIndex] = updatedTasksArrayHook//contains the array of states after deleting the task from it
    setTaskStates((prev) => {
      return [...prev]
    })
  }

  function mainEditTask(popupEditTaskHookObj, currentIndex) {
    //introducing delay so that instant mapping is avoided beacuse it is causing problem in closing animation of dialogs.
    setTimeout(() => {
      setTaskStates((prev) => {
        //splice return array
        const obj = prev[popupEditTaskHookObj.currentRootIndex].splice(currentIndex, 1)
        const updatedTaskObj = { ...obj[0], priority: popupEditTaskHookObj.priority, status: popupEditTaskHookObj.status }
        prev[popupEditTaskHookObj.rootIndex].push(updatedTaskObj);
        return [...prev]
      });
    }, 200)
  }
  function mainSortTask(event) {
    //shallow copy of state hook
    let state = [...taskStates];
    let c = state.map((val) => {
      return val.sort((a, b) => {
        return a.priority.localeCompare(b.priority)
      })
    })
    setTaskStates([...state])

  }
  //<div className="col-sm-7 col-7 TaskBoard ">
  return (
    /*parent  div starts*/
    <div>
      {addTaskPopupHook ? <AddTaskPopup flag={true} addTaskPopupOff={addTaskPopupOff} mainAddTask={mainAddTask} /> : null}

      <div className="container-fluid border border-secondary  parrent" style={{ height: "100vh" }}>
        <div className="row ">
          <div className="col-xxl-12 col-sm-7 col-7 TaskBoard ">
            <h3>Task Board</h3>
          </div>
        </div>
        {/*child div starts*/}
        <div className="container  child mt-4" style={{ paddingLeft: "20px", marginleft: "50px", overflow: "auto" }}  >
          <div className="row pb-2 mt-3">
            <div className="col-xxl-1 col-sm-3 col-12" >
              <h4 >Filter By:</h4>
            </div >
            <div className="col-xxl-1 col-sm-2 col " style={{ marginRight: "5%" }} >
              {/* borderColor: "red", borderWidth: "2px"*/}
              <Form.Control className={inputErrorHook.assignees === true ? "errorinputbox" : null} onChange={(event) => mainFilterTaskHandler(event, "assignees")} style={{ width: "120px", height: "30px", fontSize: "15px" }} size="sm" type="text" placeholder="Assignee Name" />
            </div>
            <div className="col-xxl-1 col-sm-2 col-" >
              <DropdownButton
                className={inputErrorHook.priority === true ? "errorinputbox" : null}
                as={ButtonGroup}

                drop="down-centered'"
                variant="light"
                title="Priority"
                size="sm"
                style={{
                  width: "120px", height: "30px"
                }}
              >
                <div style={{ fontSize: "14px" }}>
                  <Dropdown.Item onClick={() => mainFilterTaskHandler("P0", "priority")} eventKey={"P0"}>P0</Dropdown.Item>
                  <Dropdown.Item onClick={() => mainFilterTaskHandler("P1", "priority")} eventKey={"P1"} >P1 </Dropdown.Item>
                  <Dropdown.Item onClick={() => mainFilterTaskHandler("P2", "priority")} eventKey={"P2"}>P2</Dropdown.Item>
                </div>
              </DropdownButton>
            </div>
            <div className="col-xxl-3 col-sm-2 col d-flex justify-content-center " >
              <Button onClick={filterButtonToggleHook ? mainFilterTask : null} style={{ height: "30px", width: "60px" }} variant="dark" size="sm">
                Filter
              </Button>

              <Button onClick={mainResetFilterTask} style={{ height: "30px", width: "60px", marginLeft: "2%" }} variant="danger" size="sm">
                reset
              </Button>
              <Button onClick={mainSaveStateTask} style={{ height: "30px", width: "60px", marginLeft: "2%" }} variant="success" size="sm">
                Save
              </Button>
            </div>


            <div className="col-xxl col-sm-3 col d-flex justify-content-end "  >
              <Button style={{ marginRight: "10px", width: "180px" }} onClick={addTaskPopupOn} size="sm">
                Add New Task
              </Button>

            </div>
          </div >

          <div className="row ">
            <div className="col-xxl-1 col-sm-3 ">
              <h4 >Sort by:</h4>
            </div>
            <div className="col-xxl col-sm-9 ">
              <DropdownButton
                as={ButtonGroup}
                onSelect={mainSortTask}
                drop="down-centered'"
                variant="light"
                title="Criteria"
                size="sm"
                style={{
                  width: "120px",
                  height: "30px"
                }}
              >
                <div style={{ fontSize: "14px" }}>
                  <Dropdown.Item eventKey={"P0"}>Priority</Dropdown.Item>

                </div>
              </DropdownButton>
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

