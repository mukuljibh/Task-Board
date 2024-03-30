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

  //final main delete call by task controller
  function mainDeleteTask(tasksArray, rootIndex) {
    taskStates[rootIndex] = tasksArray//contains the array of states after deleting the task from it
    setTaskStates([...taskStates])
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
              <Form.Control style={{ width: "120px", height: "30px", fontSize: "15px" }} size="sm" type="text" placeholder="Assignee Name" />
            </div>
            <div className="col-xxl-1 col-sm-2 col-" >
              <DropdownButton
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
                  <Dropdown.Item as="button">P0</Dropdown.Item>
                  <Dropdown.Item as="button">P1</Dropdown.Item>
                  <Dropdown.Item as="button">P2</Dropdown.Item>
                </div>
              </DropdownButton>
            </div>
            <div className="col-xxl-3 col-sm-2 col d-flex justify-content-center " >
              <Button style={{ height: "30px", width: "60px" }} variant="dark" size="sm">
                Filter
              </Button>

              <Button style={{ height: "30px", width: "60px", marginLeft: "2%" }} variant="danger" size="sm">
                reset
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
                drop="down-centered'"
                variant="light"
                title="Priority"
                size="sm"
                style={{
                  width: "120px",
                  height: "30px"
                }}
              >
                <div style={{ fontSize: "14px" }}>
                  <Dropdown.Item as="button">P0</Dropdown.Item>
                  <Dropdown.Item as="button">P1</Dropdown.Item>
                  <Dropdown.Item as="button">P2</Dropdown.Item>
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

