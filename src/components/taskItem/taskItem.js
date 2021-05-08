import PropTypes from 'prop-types';
import {useRef, useState} from 'react';

import pencil from './pencil.svg'
import cross from './cross.svg';
import './taskItem.scss';


export const TaskItem = ({ task, number, priority, checkTaskCompletion, deleteTask, editTask, tasks}) => {
  
  const [taskEdit, setTaskEdit] = useState({name: '', checked: false});
  const [duplicateEdit, setDuplicateEdit] = useState({duplicate: false});

  const input = useRef(null);


  const handleInput = (event) => {
    
    const taskEditCopy = { ...taskEdit}
    taskEditCopy.name = event.target.value.trim();
    setTaskEdit(taskEditCopy);
   
    editTask({task, number, priority, taskEditCopy});
    
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

    <section id={number} >

      <div className={priority === 'urgent' ? 'red' : priority === 'important' ? 'orange' : 'green'}>

        <div>
          <input type='checkbox' 
                 checked={task.checked} 
                 onChange={() => checkTaskCompletion({priority, number})}/>
        </div>
        
        <input ref={input} 
              value={task.name} 
              onChange={handleInput} 
              onKeyDown={saveEditTask}
              readOnly/>

        <div className='item-icons'>

          {(!task.checked && taskEdit.name === '') &&
          <img className='item-icons-edit' src={pencil} alt='edit'
              onClick={() => {input.current.readOnly = false;
                              input.current.focus()}}/>
          }

          {task.checked && 
          <img className='item-icons-delete' src={cross} alt='delete'
              onClick={() => deleteTask({priority, number})} />
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
  number: PropTypes.number,
  priority: PropTypes.string,
}