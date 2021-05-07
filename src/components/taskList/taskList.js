import PropTypes from 'prop-types';
import {useState, useRef} from 'react';
import {connect} from 'react-redux';

import {createTask, checkTaskCompletion, deleteTask, editTask} from '../../redux/actions/taskActions.js';
import {TaskItem} from '../taskItem/taskItem.js';
import './taskList.scss';



const TaskList = ({tasks, taskType, createTask, checkTaskCompletion, deleteTask, editTask}) => {

    const [taskName, setTaskName] = useState('');
    const [duplicateCreation, setDuplicateCreation] = useState({duplicate: false});
    const input = useRef(null);
    
    
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

                createTask({taskType, taskName})
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
                              checkTaskCompletion ={checkTaskCompletion}
                              deleteTask = {deleteTask}
                              editTask = {editTask}
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


const mapStateToProps = (state) => {
    return {tasks: state.taskReducer}
}


export default connect(
    mapStateToProps, 
    {createTask, checkTaskCompletion, deleteTask, editTask}
)(TaskList)
