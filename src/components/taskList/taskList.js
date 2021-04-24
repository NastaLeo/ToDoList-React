import PropTypes from 'prop-types';
import {TaskItem} from '../taskItem/taskItem.js';
import {useState, useRef} from 'react';
import './taskList.scss';

export const TaskList = ({tasks, taskType, addTask, createDuplicate, resetDuplicate}) => {

    const [taskName, setTaskName] = useState('');
    const input = useRef(null);
    

    const printTask = (event) => {
        console.log(event.target.value, taskName)
        setTaskName(event.target.value); 
        
        if (createDuplicate) {
            console.log('clear dublicate')
            resetDuplicate(taskType);
        }

    }

    


    const saveTask = (event) => {   

        if(event.keyCode === 13){

            if (addTask(taskType, taskName)) {
                input.current.blur() 
                setTaskName(''); 
            } 
            
        } 
    }

      
    return(
                
        <div className="task-list">
            {tasks.length > 0 && tasks.map((task, index) => {
                return (
                    <TaskItem key={index} task={task} number={index} priority={taskType} checked={task.checked}/>
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
           {createDuplicate &&
            <span className="task-list-error">You have yet the same task</span>}

        </div>
        
    ) 

}


TaskList.propTypes = {
    tasks: PropTypes.array,
    taskType: PropTypes.string, 
    addTask: PropTypes.func,
    createDuplicate: PropTypes.bool,
    resetDuplicate: PropTypes.func
}


