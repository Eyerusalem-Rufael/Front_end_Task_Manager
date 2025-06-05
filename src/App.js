import React , { useEffect, useState } from 'react';
import confetti from "canvas-confetti";

import './App.css';
function App(){
  const [tasks, setTasks] = useState([
    { id: 1, title: "Buy groceries", completed: false },
    { id: 2, title: "Read books", completed: true },
    { id: 3, title: "watching TV", completed: false },
    { id: 4, title: "PLayin a gitar", completed: false },
  ]);

  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    const completedTasks = tasks.filter(task => task.completed).length;
    if (completedTasks === tasks.length && tasks.length > 0) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() === "") 
      return;
    const newItem = {
      id: tasks.length + 1,
      title: newTask,
      completed: false,
    };
    setTasks([...tasks, newItem]);
    setNewTask("");
  };

  const toggleTask = (id)=>{
    setTasks(
      tasks.map((task)=>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id)=>{
    setTasks(tasks.filter((task)=> task.id !== id));
  };
    return(
      <div className='App'>
        <h1>Task Manager</h1>
        <div className='input-section'>
          <input
           type='text'
           placeholder='Add a task'
           value={newTask}
           onChange  = {(e) => setNewTask(e.target.value)}/>
           <button onClick={addTask}>ADD</button>

        </div>

        <ul className='task-list'>
          {tasks.map((task)=>(<li key={task.id} className={task.completed?'completed':''}>
          <span onClick={() => toggleTask(task.id)}>{task.title}</span>
          <button className='delete-btn' onClick={()=>deleteTask(task.id)}>
            <span role="img" aria-label="delete">🗑️</span>
          </button>
         </li>))}
        </ul>
      </div>
    );

}

export default App;