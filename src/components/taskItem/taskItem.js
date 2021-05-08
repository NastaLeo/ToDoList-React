import PropTypes from 'prop-types';
import {useContext, useRef, useState} from 'react';
import {Context} from '../../context.js';

import pencil from './pencil.svg'
import cross from './cross.svg';
import './taskItem.scss';


export const TaskItem = ({ task, number, priority, createDuplicateEdit }) => {
  
  const { deleteTask, editTask, checkTask, resetDuplicateEdit, highlightDublicateEdit, findDuplicateEditTask, commonArr } = useContext(Context);
  const [taskEdit, setTaskEdit] = useState({name: '', checked: false});


  const input = useRef(null);

  const handleInput = (event) => {
    
    const taskEditCopy = { ...taskEdit}
    taskEditCopy.name = event.target.value.trim();
    setTaskEdit(taskEditCopy);

    editTask(task, number, priority, taskEditCopy);
    
    if (createDuplicateEdit) {
      resetDuplicateEdit(priority);
    }

  }

  
  const saveEditTask = (event) => {

    if(event.keyCode === 13){

      if (findDuplicateEditTask(taskEdit, commonArr)){
        input.current.readOnly = true;
        input.current.blur() 
        setTaskEdit({name: '', checked: false})
        
      } else {

        highlightDublicateEdit(priority);}

    } 

  }
  
  
  return (

    <section  className='item' id={number} >

      <div className='item-check'>
        <input type='checkbox' 
               checked={task.checked} 
               onChange={() => checkTask(number, priority)}/>
      </div>
      
      <input ref={input} 
             value={task.name} 
             onChange={handleInput} 
             onKeyDown={saveEditTask}
             readOnly/>

      <div className='item-icons'>

        {(!task.checked && taskEdit.name === '') &&
        <img className='item-icons-edit' src={pencil} alt='edit'
             onClick={() => {
                input.current.readOnly = false;
                input.current.focus()}}/>
        }

        {task.checked && 
        <img className='item-icons-delete' src={cross} alt='delete'
             onClick={() => deleteTask(number, priority)} />
        }

      </div>
      
    </section>
 
  );
}


TaskItem.propTypes = {
  task: PropTypes.object,
  number: PropTypes.number,
  priority: PropTypes.string,
  createDuplicateEdit: PropTypes.bool
}