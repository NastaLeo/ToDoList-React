import {useDispatch} from 'react-redux';
import axios from 'axios';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useState, useRef} from 'react';


import {createTask} from '../../redux/actions/taskActions.js';
import {TaskItem} from '../taskItem/taskItem.js';
import './taskList.scss';



export const TaskList = ({taskType, userId, tasks}) => {
   
    const history = useHistory()

    const [taskName, setTaskName] = useState('');
    const [duplicateCreation, setDuplicateCreation] = useState({duplicate: false});
    const input = useRef(null);
  
    const dispatch = useDispatch();

    
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

        if(event.keyCode === 13 && event.target.value.trim() !== ''){
           
            if (findDuplicateTask(tasks, taskName)) {
                
                axios.post(`http://localhost:8080/tasks/${userId}`, {name: taskName, type: taskType,  checked: false}, {headers: { 'token': localStorage.getItem('token')}} )
                    .then(response => {
                        if(response.status === 200) {
                            dispatch(createTask({type: 'CREATE_TASK', payload: {_id: response.data._id, taskType, taskName}}))
                            input.current.blur() 
                            setTaskName(''); 
                        }
                    })
                    .catch(error => {
                        if(error.response.status === 401) {
                            history.push('/login');
                        }
                    })

            } else {

                highlightDublicateCreation();

            }
           
        } 
    }



      
    return (
                
        <div className="task-list">

            { tasks && tasks[taskType].length > 0 && tasks[taskType].map((task, index) => {

                return (
                    <TaskItem key={index} 
                              task={task} 
                              number={task._id} 
                              priority={taskType} 
                              checked={task.checked}                     
                              tasks = {tasks}
                              userId={userId}
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
    userId: PropTypes.string
}

