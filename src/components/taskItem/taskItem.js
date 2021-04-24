import './taskItem.scss';

import pencil from './pencil.svg'
import cross from './cross.svg';

import PropTypes from 'prop-types';
import {useContext, useRef, useState} from 'react';
import {Context} from '../../context.js';


export const TaskItem = ({ task, number, priority }) => {
  
  const { deleteTask, editTask, checkTask } = useContext(Context);
  const [taskEditName, setTaskEditName] = useState();

  const input = useRef(null);

  const printEditTask = (event) => {
    task.name += event.target.value;
    setTaskEditName(event.target.value); 
    console.log(task.name, event.target.value, task.name, taskEditName)
    
  }
  
  
  return (

    <section  className='item' id={number} >

      <div className='item-check'>
        <input type='checkbox' checked={task.checked} 
               onChange={() => checkTask(number, priority)}/>
      </div>
      
      <input ref={input} value={task.name} onChange = {printEditTask}/>

      <div className='item-icons'>

        {!task.checked && 
        <img className='item-icons-edit' src={pencil} alt='edit'
             onClick={() => editTask(task, number, priority, input, taskEditName)}/>
        }

        {task.checked && 
        <img className='item-icons-delete' src={cross} alt='delete'
             onClick={() => deleteTask(task, number, priority)} />
        }

      </div>
      
    </section>
 
  );
}


TaskItem.propTypes = {
  task: PropTypes.object,
  number: PropTypes.number,
  priority: PropTypes.string,
}