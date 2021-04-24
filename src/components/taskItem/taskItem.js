import PropTypes from 'prop-types';
import {useContext, useRef, useState} from 'react';
import {Context} from '../../context.js';

import pencil from './pencil.svg'
import cross from './cross.svg';
import './taskItem.scss';


export const TaskItem = ({ task, number, priority }) => {
  
  const { deleteTask, editTask, checkTask, findDuplicateTask } = useContext(Context);
  const [taskEditName, setTaskEditName] = useState('');


  const input = useRef(null);


  const handleInput = (event) => {

    const taskEditNameCopy = event.target.value;
    setTaskEditName(taskEditNameCopy);
    console.log(taskEditNameCopy)

    if(editTask(task, number, priority, taskEditNameCopy)) {
      console.log('copy')

    } else if (!editTask(task, number, priority, taskEditNameCopy)) {
      console.log('not copy')

    }

    // if (createDuplicate) {
    //   resetDuplicate(taskType);
    // }

    setTaskEditName('')
  }

  
  const saveEditTask = (event) => {

    if(event.keyCode === 13){
      
      // if(!findDuplicateTask(task.name)){}

      input.current.blur();
      setTaskEditName(''); 

    }

  }
  
  
  return (

    <section  className='item' id={number} >

      <div className='item-check'>
        <input type='checkbox' checked={task.checked} 
               onChange={() => checkTask(number, priority)}/>
      </div>
      
      <input ref={input} value={task.name} onChange={handleInput} onKeyDown={saveEditTask}/>

      <div className='item-icons'>

        {!task.checked && 
        <img className='item-icons-edit' src={pencil} alt='edit'
             onClick={() => input.current.focus()}/>
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
}