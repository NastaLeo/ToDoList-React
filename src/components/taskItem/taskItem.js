import axios from 'axios';
import PropTypes from 'prop-types';
import {useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import { useHistory } from 'react-router-dom';

import {checkTaskCompletion, deleteTask, editTask} from '../../redux/actions/taskActions.js';

import pencil from './pencil.svg'
import cross from './cross.svg';
import './taskItem.scss';


export const TaskItem = ({ task, number, priority, tasks, userId}) => {
  
  const history = useHistory()
 
  const [taskEdit, setTaskEdit] = useState({name: '', checked: false});
  const [duplicateEdit, setDuplicateEdit] = useState({duplicate: false});

  const input = useRef(null);
  const section = useRef(null);
  
  const dispatch = useDispatch();



  const checkCompletedTasks = () => {
    axios.put(`http://localhost:8080/tasks/${userId}`, {name: task.name, type: priority, checked: !task.checked, id: number, userId}, {
      headers: { 'token': localStorage.getItem('token')}
    })
    .then(response => {
      if(response.status === 204){
        dispatch(checkTaskCompletion({type: 'CHECK_TASK', payload: {priority, number}}))
         if(task.checked) {
           section.current.className = 'check'
          }
      }
    })
    .catch(error => {
      console.log(error)
       if(error.response.status === 401){
        history.push('/login')
      }
    })
    

  }


  const deleteTask = () => {
    axios.delete(`http://localhost:8080/tasks/${userId}/${task._id}`, {
      headers: { 'token': localStorage.getItem('token') }
    })
    .then(response => {
      if(response.status === 204) {
        console.log(priority, number, response)
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
    
    const taskEditCopy = { ...taskEdit}
    taskEditCopy.name = event.target.value.trim();
    setTaskEdit(taskEditCopy);
   
    dispatch(editTask({type: 'EDIT_TASK', payload: {task, number, priority, taskEditCopy}}));
    
    if (findDuplicateEditTask(tasks, taskEdit)) {
      resetDuplicateEdit();
    }

  }
 
  
  const saveEditTask = (event) => {

    if(event.keyCode === 13){     

      if (findDuplicateEditTask(tasks, taskEdit)){
        input.current.readOnly = true;
        input.current.blur() 
        setTaskEdit({name: '', checked: false})
        
      } else {

        highlightDublicateEdit();

      }

    } 

  }


  const findDuplicateEditTask = (tasks, taskEdit) => { 

    const { unimportant, important, urgent} = tasks;
       
    if (unimportant.concat(important, urgent).filter(item => item.name === taskEdit.name.trim()).length > 1) {

        return false

   } else { 

        return true;  
    }  
  }


  const highlightDublicateEdit = () => {

    const duplicateEditCopy = {...duplicateEdit};
    duplicateEditCopy.duplicate = true;
    setDuplicateEdit(duplicateEditCopy);

  }


  const resetDuplicateEdit = () => {

    const duplicateEditCopy = {...duplicateEdit};
    duplicateEditCopy.duplicate = false;
    setDuplicateEdit(duplicateEditCopy);

  }
  
  
  return (

    <section ref={section}>

      <div id={number} className={priority === 'urgent' ? 'red' : priority === 'important' ? 'orange' : 'green'}>

        <div>
            <input className={taskEdit.name !== '' ? 'unvisible' : ''}
                 type='checkbox' 
                 checked={task.checked} 
                 onChange={checkCompletedTasks}/>
        </div>
        
        <input ref={input} 
              value={task.name} 
              onChange={handleInput} 
              onKeyDown={saveEditTask}
              disabled={!JSON.parse(localStorage.getItem('isAdmin'))}
              readOnly/>

        <div className='item-icons'>

          {(!task.checked && taskEdit.name === '') &&
          <img className='item-icons-edit' src={pencil} alt='edit'
              onClick={() => {input.current.readOnly = false;
                              input.current.focus()}}/>
          }

          {task.checked && JSON.parse(localStorage.getItem('isAdmin')) &&
          <img className='item-icons-delete' src={cross} alt='delete'
              onClick={deleteTask} />
          }

        </div>

      </div>

      { duplicateEdit.duplicate &&
            <span className="item-error">You have yet the same task</span>}
      
    </section>
 
  );
}


TaskItem.propTypes = {
  task: PropTypes.object,
  priority: PropTypes.string,
  userId: PropTypes.string
}