import { useState, useRef } from "react";

function App() {
   const [currentTask, setCurrentTask] = useState("");
   const [tasks, setTasks] = useState([]);
   // const [disable, setDisable] = useState(true);

   const cleanTask = useRef(null);

   const addTask = () => {
      setTasks([...tasks, { task: currentTask, completed: false }]);
      cleanTask.current.value = "";
      setCurrentTask("");
   };

   const deleteTask = (taskToDelete) => {
      setTasks(
         tasks.filter((val) => {
            return val.task !== taskToDelete;
         })
      );
   };

   const markAsDone = (completedTask) => {
      setTasks(
         tasks.map((tsk, idx) => {
            return tsk.task == completedTask
               ? { task: completedTask, completed: true }
               : { task: tsk.task, completed: tsk.completed ? true : false };
         })
      );
   };

   return (
      <>
         <h1>TODO App</h1>
         <input
            type='text'
            placeholder='Add Task...'
            ref={cleanTask}
            onKeyDown={(event) => {
               if (event.keyCode === 13) addTask();
            }}
            onChange={(event) => {
               setCurrentTask(event.target.value);
            }}
         />
         <button onClick={addTask} disabled={!currentTask}>
            ADD
         </button>

         <hr />

         <div className='task-ui'>
            {tasks.map((task, idx) => {
               return (
                  <div className='task-jar'>
                     <h3
                        key={idx}
                        className={
                           task.completed ? "done task-list" : "task-list"
                        }
                     >
                        {task.task}
                     </h3>
                     <button onClick={() => markAsDone(task.task)}>Done</button>
                     <button onClick={() => deleteTask(task.task)}>DEL</button>
                  </div>
               );
            })}
         </div>
      </>
   );
}

export default App;
