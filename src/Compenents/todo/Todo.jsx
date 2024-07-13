import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import './todo.css';
import Img4 from '../../Assets/IMG-20240512-WA0004-removebg-preview.png';
import { IoMdClose, IoIosMore } from 'react-icons/io';
import Img from '../../Assets/icon.png';
import axios from 'axios';
import Img2 from '../../Assets/Screenshot 2024-05-29 143648.png';

const Todo = () => {
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [menuVisibleIndex, setMenuVisibleIndex] = useState(null);
  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/auth/getUser/${email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data.todoList);
      } catch (error) {
        console.error('Error fetching todo list:', error);
      }
    };
    fetchTodo();
  }, [email, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuVisibleIndex(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleModal = () => {
    if (modal) {
      setTitle('');
      setDescription('');
      setIsEditing(false);
    }
    setModal(!modal);
  };

  const handleAddTask = async () => {
    const data = { title, content: description, email };
    

    try {
      const response = await axios.post('http://localhost:8081/todo/Addtodo', data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 201) {
        const newTask = {
          title,
          content: description,
          todoId: response.data.todoId,
          email,
          doneStatus: false // Assuming new tasks are not completed by default
        };
        setTasks((prevTasks) => [...prevTasks, newTask]);
      }
    } catch (error) {
      console.error('Error adding task:', error);
    }
    setTitle('');
    setDescription('');
    toggleModal();
  };

  const handleEditTask = async () => {
    const task = tasks[currentTaskIndex];


    if (!task.todoId) {
      console.error('Task id is null or undefined:', task);
      return;
    }

    const updatedTask = {
      id: task.todoId,
      title,
      content: description,
      email
    };

    try {
      const response = await axios.put('http://localhost:8081/todo/editTodo', updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks((prevTasks) =>
        prevTasks.map((t, index) =>
          index === currentTaskIndex ? { ...t, title: updatedTask.title, content: updatedTask.content } : t
        )
      );
      setIsEditing(false);

    } catch (error) {
      console.error('Error editing task:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }

    setTitle('');
    setDescription('');
    toggleModal();
  };

  const handleDeleteTask = async (index) => {
    const task = tasks[index];
    try {
      await axios.delete(`http://localhost:8081/todo/deleteTodo/${task.todoId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenuVisibleIndex(null);
      setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
      if (currentTaskIndex === index) {
        setCurrentTaskIndex(null);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const initiateEditTask = (index) => {
    setCurrentTaskIndex(index);
    setTitle(tasks[index].title);
    setDescription(tasks[index].content);
    setIsEditing(true);
    setModal(true);
    setMenuVisibleIndex(null);
  };

  const toggleTaskCompletion = async (index) => {
    const task = tasks[index];
    const updatedTask = {
      id: task.todoId, // Ensure this matches the backend expectation
      title: task.title,
      content: task.content,
      doneStatus: !task.doneStatus
    };
  
    try {
      await axios.put(`http://localhost:8081/todo/editTodo`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setTasks((prevTasks) =>
        prevTasks.map((t, i) =>
          i === index ? { ...t, doneStatus: !t.doneStatus } : t
        )
      );
    } catch (error) {
      console.error('Error updating task completion status:', error);
    }
  };
  ;

  const toggleMenuVisibility = (index) => {
    setMenuVisibleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className='todo'>
      <Box height={60} />
      <div className="todo__content">
        <h1 className='todolist__title'>
          Dashboard <i className='fa fa-angle-double-right' aria-hidden='true'></i>
          <span className='todo__subtitle'>Todo</span>
        </h1>
        <div className="todo__content-header">
          <div className="todo__title">
            <div className="todoFirst">
              <h1 className="header-title">Todo
                <img src={Img} alt="logo" className="todo__content-logo" />
              </h1>
              <p className='header-subtitle'>All tasks at a glance</p>
            </div>
          </div>
          <div className="btn-modal" onClick={toggleModal}>
            <p> Add Task</p>
          </div>
        </div>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
            <div className="modal-content">
              <label className='todoAdd-title'>Title</label>
              <input placeholder="Enter a title..." type="text" className='todo-input' value={title} onChange={(e) => setTitle(e.target.value)} />
              <label className='todoAdd-title'>Description</label>
              <textarea placeholder="Enter a description..." rows={7} className='todo-input' value={description} onChange={(e) => setDescription(e.target.value)} />
              <button className="close-modal" onClick={toggleModal}><IoMdClose /></button>
              <button className="Add-modal" onClick={isEditing ? handleEditTask : handleAddTask}>{isEditing ? 'Edit' : 'Add'}</button>
            </div>
          </div>
        )}

        <div className="todo__content-body">
          <div className="todo__picture">
            <img src={Img4} alt="pic" className='todo__pic-inside' />
          </div>
          <div  className={`todo-list ${tasks.length === 1 ? 'single-task' : ''}`}
    style={tasks.length === 1 ? { width: '100%' } : {}}
  >
            {tasks.length > 0 ? tasks.map((task, index) => (
              <div key={task.todoId} className={`todo-list__item ${task.doneStatus ? 'completed' : ''}`}>
                <div className="todo-item-header">
                  <h1>{task.title}</h1>
                  <IoIosMore className='more__icon' onClick={() => toggleMenuVisibility(index)} />
                  {menuVisibleIndex === index && (
                    <div className='option' ref={menuRef}>
                      <ul>
                        <li onClick={() => initiateEditTask(index)}>Edit</li>
                        <li onClick={() => handleDeleteTask(index)}>Delete</li>
                      </ul>
                    </div>
                  )}
                </div>
                <p>{task.content}</p>
                <div className="todo__list-done" onClick={() => toggleTaskCompletion(index)}>
                  {task.doneStatus ? <i className="uil uil-check-circle"></i> : <i className="uil uil-circle"></i>} Done
                </div>
              </div>
            )) : (
              <div className='free__time'>
                <img src={Img2} alt="" className='free__time-img' />
                <h2 className='free__time-title'>Take a break!</h2>
                <h5 className='free__time-subtitle'>No tasks for today. Enjoy your free time! <span className='emoji'>🥳</span></h5>
                <p className='free__time-add' onClick={toggleModal}> Add Task</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
