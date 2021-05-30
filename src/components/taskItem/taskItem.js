import axios from 'axios';
import PropTypes from 'prop-types';
import {useRef, useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import {checkTaskCompletion, editTask, deleteTask} from '../../redux/actions/taskActions.js';

import pencil from './pencil.svg'
import cross from './cross.svg';
import './taskItem.scss';


export const TaskItem = ({ task, number, priority, tasks, userId}) => {
  
  const history = useHistory()
 
  const [taskEdit, setTaskEdit] = useState(task.name);
  const [duplicateEdit, setDuplicateEdit] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const input = useRef(null);
  const section = useRef(null);
  
  const dispatch = useDispatch();


  useEffect(() => {
    if(editMode) {
      input.current.focus();
    }
  }, [editMode]);


  const checkCompletedTasks = () => {
    axios.put(`http://localhost:8080/tasks/${userId}`, 
              {name: task.name, type: priority, checked: !task.checked, id: number, userId}, 
              {headers: { 'token': localStorage.getItem('token')}}
    )
    .then(response => {
      if(response.status === 204){
        dispatch(checkTaskCompletion({type: 'CHECK_TASK', payload: {priority, number}}))
        section.current.classList.contains('check') ? section.current.classList.remove('check') : section.current.classList.add('check')  
      }
    })
    .catch(error => {
      console.log(error)
       if(error.response.status === 401){
        history.push('/login')
      }
    })
  }



  const handleDeleteTask = () => {
    axios.delete(`http://localhost:8080/tasks/${userId}/${task._id}`, 
    {headers: { 'token': localStorage.getItem('token')}}
    )
      .then(response => {
        if(response.status === 204) {
          dispatch(deleteTask({type: 'DELETE_TASK', payload: {type: priority, name: task.name}}))
        }
      })
      .catch(error => {
        console.log(error)
        if(error.response.status === 401) {
          history.push('/login');
        }
      })
  }



  const handleInput = (event) => {
    if(duplicateEdit){
      setDuplicateEdit(false);
    }
    setTaskEdit(event.target.value)
  }
 

  
  const saveEditTask = (event) => {
    if(event.keyCode === 13 && event.target.value.trim() !== '') {     
      if(handleEditTask(number, priority, task.name, taskEdit, task.checked)) {
        setEditMode(false);
      } else {
       setDuplicateEdit(true)
      }
    } 
  }



  const handleEditTask = (number, priority, name, taskEdit, checked) => {

    const tasksCopy = {...tasks};
    const {unimportant, important, urgent} = tasksCopy;
    const allTasks = unimportant.concat(important, urgent);
    const taskIndex = allTasks.findIndex(task => task.name === name);
    allTasks.splice(taskIndex, 1);

    if(findDuplicateEditTask(allTasks, taskEdit)) {
        editTaskRequest(number, priority, taskEdit, checked, userId, name);
        return true;
    } else {    
        return false;
    }
  }


  const editTaskRequest = (number, priority, taskEdit, checked, userId, oldName = '') => {
    axios.put(`http://localhost:8080/tasks/${userId}`,  
    { id: number, type: priority, name: taskEdit,  userId, checked}, 
    {headers: { 'token': localStorage.getItem('token') }})
      .then(response => {
          if(response.status === 204){
              dispatch(editTask({type: 'EDIT_TASK', payload: {taskEdit: taskEdit, name: oldName, priority}}));
              setDuplicateEdit(false);
          }
      })
      .catch(error => {
          console.error(error);
          if(error.response.status === 401) {
              history.push('/login');
          }
      })
  }



  const findDuplicateEditTask = (allTasks, taskEdit) => { 
    const index = allTasks.findIndex(task => task.name === taskEdit);
    return index === -1;
  }


  
  
  return (

    <section ref={section}>

      <div id={number} className={priority === 'urgent' ? 'red' : priority === 'important' ? 'orange' : 'green'}>
      {!editMode ?
      <>
        <div>
            <input type='checkbox' 
                   checked={task.checked} 
                   onChange={checkCompletedTasks}/>
        </div>
        <span className='task'>{task.name}</span> 
        
        <div className='item-icons'>

          {!task.checked &&
          <img className='item-icons-edit' src={pencil} alt='edit'
              onClick={() => {setEditMode(true)}}/>
          }

          {task.checked && JSON.parse(localStorage.getItem('isAdmin')) &&
          <img className='item-icons-delete' src={cross} alt='delete'
              onClick={handleDeleteTask} />
          }

        </div>
      </> : 
      
        <div style={{marginTop: '10px', marginRight: '20px'}}>
          <input ref={input}
                className='input-edit'
                value={taskEdit}
                placeholder='Enter new task name'
                onChange={handleInput}
                onKeyDown={saveEditTask} />    
        </div>}
      </div>
      { duplicateEdit &&
              <span className="item-error">You have yet the same task</span>} 

    </section>
 
  );
}


TaskItem.propTypes = {
  task: PropTypes.object,
  priority: PropTypes.string,
  userId: PropTypes.string
}


