import {useSelector, useDispatch} from 'react-redux';

import PropTypes from 'prop-types';
import {useState, useRef} from 'react';


import {createTask} from '../../redux/actions/taskActions.js';
import {TaskItem} from '../taskItem/taskItem.js';
import './taskList.scss';



export const TaskList = ({taskType}) => {

    const [taskName, setTaskName] = useState('');
    const [duplicateCreation, setDuplicateCreation] = useState({duplicate: false});
    const input = useRef(null);
    

    const dispatch = useDispatch();
    const tasks = useSelector(state => state.taskReducer);
  
    
    const printTask = (event) => {

        setTaskName(event.target.value); 
               
        if(!highlightDublicateCreation()) {
          resetDuplicateCreation();
        }

    }


    const findDuplicateTask = (tasks, name) => {

        const { unimportant, important, urgent} = tasks;
          
        if (unimportant.concat(important, urgent).findIndex(item => item.name === name.trim()) === -1) {  
            return true

        } else return false

    }

    

    const highlightDublicateCreation = () => {

        const duplicateCreationCopy = {...duplicateCreation};
        duplicateCreationCopy.duplicate = true;
        setDuplicateCreation(duplicateCreationCopy);

    }


    const resetDuplicateCreation = () => {

        const duplicateCreationCopy = {...duplicateCreation};
        duplicateCreationCopy.duplicate = false
        setDuplicateCreation(duplicateCreationCopy);

    }

    

    const saveTask = (event) => {   

        if(event.keyCode === 13){
           
            if (findDuplicateTask(tasks, taskName)) {

                dispatch(createTask({type: 'CREATE_TASK', payload: {taskType, taskName}}))
                input.current.blur() 
                setTaskName(''); 

            } else {

                highlightDublicateCreation();

            }
           
        } 
    }



      
    return (
                
        <div className="task-list">

            {tasks[taskType].length > 0 && tasks[taskType].map((task, index) => {

                return (
                    <TaskItem key={index} 
                              task={task} 
                              number={index} 
                              priority={taskType} 
                              checked={task.checked}                     
                              tasks = {tasks}
                    />
                )}
            )}


            
            <input type ='text'
                   name={taskType} 
                   ref = {input}
                   value = {taskName}
                   placeholder='Add new task' 
                   autoComplete='off' 
                   onChange = {printTask}
                   onKeyDown = {saveTask}
            />

           { duplicateCreation.duplicate &&
            <span className="task-list-error">You have yet the same task</span>}

        </div>
        
    ) 

}


TaskList.propTypes = {  
    taskType: PropTypes.string, 
}

