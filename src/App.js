import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import TaskController from "./Components/TaskController";
import AddTaskPopup from "./Components/AddTaskPopup";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Skeleton from '@mui/material/Skeleton';
import Snackbar from '@mui/material/Snackbar';
import SampleData from './Components/SampleData';
function App() {
  const temp = SampleData;//contain the sample task for showing purpose
  const arr = ["Pending", "In Progress", "Completed", "Deployed", "Deferred"];
  const headerColors = ['bg-secondary', 'bg-warning', 'bg-success', 'bg-info', 'bg-danger'];
  const boarderColors = ['secondary', 'warning', 'success', 'info', 'danger'];
  const [addTaskPopupHook, setaddTaskPopupHook] = useState(false)
  const [filterButtonToggleHook, setFilterButtonToggleHook] = useState(false);
  const [inputErrorHook, setInputErrorHook] = useState({ assignees: null, priority: null });
  const [mainFilterTaskHandlerHook, setMainFilterTaskHandlerHook] = useState({ assignees: "", priority: "" });
  const [currentTaskStates, setCurrentTaskStates] = useState([[], [], [], [], []]);
  const [taskStates, setTaskStates] = useState([[], [], [], [], []]);
  const [buttonHook, setButtonHook] = useState({ filter: "", sort: "" });
  const [open, setOpen] = useState({ flag: false, message: "" });
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
  function load() {
    messageOn("DataSet Loaded")
    messageOff();
    setTaskStates([...temp])
  }
  //final main delete call by AddTaskPopup component
  function mainAddTask(updatedPopupAddTaskHookObj, message) {
    //alert the user success message is displayed through snackbar
    messageOn(message)
    messageOff()
    let pendingStateIndex = 0;
    //creating deep copy so that states does not cause any unexpected issue
    const deepCopyTaskStates = JSON.parse(JSON.stringify(taskStates));
    //as array is passed by reference changes to some part cause reflect changes in entire array
    let updatedState = [...deepCopyTaskStates[0], updatedPopupAddTaskHookObj];
    deepCopyTaskStates[pendingStateIndex].push(updatedPopupAddTaskHookObj)
    setTaskStates([...deepCopyTaskStates])
  }
  //helper function to mainFilterTask
  function mainFilterTaskHandler(value, type) {

    //this is to handle the button of priority when click on button button value shown on button instead replacing the previous one
    if (type === "priority") {
      setButtonHook({ ...buttonHook, filter: value });
    }

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
    messageOn("Reset Successfull")
    messageOff();
    setTaskStates([...currentTaskStates])
  }
  function mainSaveStateTask() {
    messageOn("State Saved Successfull");
    messageOff();
    setCurrentTaskStates([...taskStates]);
  }
  function mainFilterTask() {
    messageOn("Filtered Successfull");
    messageOff();
    //object contain criteria on whick filteration of task perfrom
    let filterObj = mainFilterTaskHandlerHook;
    //avoiding direct using of hook main state
    let state = [...taskStates]
    //deepcopy
    const deepCopyTaskStates = JSON.parse(JSON.stringify(taskStates));
    let updatedTaskState = deepCopyTaskStates.map((val) => {
      //this way it handle if one of assigny or priorty key  value missing and if both value are missing then this function will not exceute it is 
      //handled above in helper function mainFilterTaskHandler
      return val.filter((vali) => {
        const assigneeCheck = !filterObj.assignees || filterObj.assignees === vali.assignees;
        const priorityCheck = !filterObj.priority || filterObj.priority === vali.priority;

        return assigneeCheck && priorityCheck
      })
    })

    setTaskStates([...updatedTaskState])
  }


  //final main delete call by task controller
  function mainDeleteTask(ShcpyupdatedTasksArray, rootIndex, message) {
    setTimeout(() => {
      messageOn(message);
      messageOff();
      const deepCopyTaskStates = JSON.parse(JSON.stringify(taskStates));
      deepCopyTaskStates[rootIndex] = ShcpyupdatedTasksArray//contains the array of states after deleting the task from it
      setTaskStates(() => {
        return [...deepCopyTaskStates]
      })
    }, 200)

  }
  function messageOff() {
    setTimeout(() => {
      setOpen({ ...open, flag: false, message: "" })
    }, 2000)
  }
  function messageOn(message) {
    setOpen({ ...open, flag: true, message: message })
  }
  function mainEditTask(ShCpypopUpUpdateTaskHookObj, currentIndex, message) {
    messageOn(message);
    messageOff();
    //introducing delay so that instant mapping is avoided beacuse it is causing problem in closing animation of dialogs.
    setTimeout(() => {
      setTaskStates((prev) => {
        //splice return array
        const obj = prev[ShCpypopUpUpdateTaskHookObj.currentRootIndex].splice(currentIndex, 1)
        const updatedTaskObj = { ...obj[0], priority: ShCpypopUpUpdateTaskHookObj.priority, status: ShCpypopUpUpdateTaskHookObj.status }
        prev[ShCpypopUpUpdateTaskHookObj.rootIndex].push(updatedTaskObj);
        return [...prev]
      });
    }, 200)
  }
  function mainSortTask(event) {
    //this handle the button name to change when click on dropdown menu button
    setButtonHook({ ...buttonHook, sort: event })
    //deep copy of state hook
    const deepCopyTaskStates = JSON.parse(JSON.stringify(taskStates));

    deepCopyTaskStates.map((val) => {
      return val.sort((a, b) => {
        return a.priority.localeCompare(b.priority)
      })
    })
    setTaskStates([...deepCopyTaskStates])

  }

  function AddTaskPopupHandleMessage(message) {
    setOpen({ ...open, flag: true, message: message });
    messageOff()
  }
  //<div className="col-sm-7 col-7 TaskBoard ">
  return (
    /*parent  div starts*/
    <div>
      <Snackbar
        open={open.flag}
        message={open.message}
      />
      {addTaskPopupHook ? <AddTaskPopup AddTaskPopupHandleMessage={AddTaskPopupHandleMessage} flag={addTaskPopupHook} addTaskPopupOff={addTaskPopupOff} mainAddTask={mainAddTask} /> : null}

      <div className="container-fluid border border-secondary  parrent" style={{ height: "100vh", overflowY: "auto" }}>
        <div className="row ">
          <div className="col-xxl-12 col-md-12 col-sm-7 col-xl col-lg col-6 TaskBoard ">
            <h3>Task Board</h3>
          </div>
        </div>
        {/*child div starts*/}


        <div className="container  child mt-4" style={{ paddingLeft: "20px", marginleft: "50px" }}  >

          <div className="row pb-2 mt-3">
            <div className="col-xxl-1  col-md-2 col-sm-2 col-2 " >
              <h4 className='smdevice' >Filter By:</h4>
            </div >
            <div className="col-xxl-1 col-md-2  col-sm-3 col-4 " style={{ marginRight: "5%" }} >
              {/* borderColor: "red", borderWidth: "2px"*/}
              <Form.Control onChange={(event) => mainFilterTaskHandler(event, "assignees")} style={{ width: "120px", height: "30px", fontSize: "15px" }} size="sm" type="text" placeholder="Assignee Name" />
            </div>
            <div className="col-xxl-1 col-md col-sm-6 col-1 " >
              <DropdownButton
                className={inputErrorHook.priority === true ? "errorinputbox" : null}
                as={ButtonGroup}
                variant="light"
                title={buttonHook.filter || "Priority"}
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
            <div className="col-xxl-3 col-md-4 col-sm-11 col-6 d-flex justify-content-center " >
              <Button onClick={filterButtonToggleHook ? mainFilterTask : null} style={{ height: "30px", width: "60px" }} variant="dark" size="sm">
                Filter
              </Button>

              <Button onClick={mainResetFilterTask} style={{ height: "30px", width: "60px", marginLeft: "2%" }} variant="danger" size="sm">
                reset
              </Button>
              <Button onClick={mainSaveStateTask} style={{ height: "30px", width: "60px", marginLeft: "2%" }} variant="success" size="sm">
                Save
              </Button>
              <Button onClick={load} style={{ height: "30px", width: "60px", marginLeft: "2%" }} variant="info" size="sm">
                load
              </Button>
            </div>


            <div className="col-xxl col-md-8 col-sm-8 col d-flex justify-content-end "  >
              <Button style={{ marginRight: "10px", width: "180px" }} onClick={addTaskPopupOn} size="sm">
                Add New Task
              </Button>
            </div>
          </div >

          <div className="row ">
            <div className="col-xxl-1 col-sm-2 col-2">
              <h4 className="smdevice">Sort by:</h4>
            </div>
            <div className="col-xxl col-sm-9 col-1 ">
              <DropdownButton
                as={ButtonGroup}
                onSelect={mainSortTask}
                drop="down-centered'"
                variant="light"
                title={buttonHook.sort || "Criteria"}
                size="sm"
                style={{
                  width: "120px",
                  height: "30px"
                }}
              >
                <div style={{ fontSize: "14px" }}>
                  <Dropdown.Item eventKey={"Priority"}>Priority</Dropdown.Item>

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
                      {tasksArray.length !== 0 ? <TaskController key={idx} rootIndex={idx} tasksArray={tasksArray} mainDeleteTask={mainDeleteTask} mainEditTask={mainEditTask} /> :
                        <Skeleton variant="rectangular" width={209} height={250} />
                      }
                    </div>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>


        </div>
      </div>
      {/*child div ends*/}

      {/*parent div ends*/}
    </div >
  );
}

export default App;

