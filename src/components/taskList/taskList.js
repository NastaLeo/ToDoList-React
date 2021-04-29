import PropTypes from 'prop-types';
import {useState, useRef} from 'react';
import {connect} from 'react-redux';

import {createTask, checkDuplicate} from '../../redux/actions/taskActions.js';
import {TaskItem} from '../taskItem/taskItem.js';
import './taskList.scss';

const TaskList = ({tasks, taskType, resetDuplicate, createDuplicateEdit, createTask, checkDuplicate}) => {

    const [taskName, setTaskName] = useState('');
    const input = useRef(null);
    

    const printTask = (event) => {

        setTaskName(event.target.value); 
               
        // if(createDuplicate) {
        //   resetDuplicate(taskType);
        // }

    }

    

    const saveTask = (event) => {   

        if(event.keyCode === 13){
           
           checkDuplicate({taskType, taskName});
        
            console.log('tasks', tasks)
                createTask({taskType, taskName})
                input.current.blur() 
                setTaskName(''); 

           
        } 
    }

    console.log('redux', tasks)

      
    return(
                
        <div className="task-list">
            {tasks[taskType].length > 0 && tasks[taskType].map((task, index) => {
                return (
                    <TaskItem key={index} 
                              task={task} 
                              number={index} 
                              priority={taskType} 
                              checked={task.checked}
                              createDuplicateEdit = {createDuplicateEdit}
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

           {(((taskType === 'unimportant' && tasks.unimportantDuplicate) || 
              (taskType === 'important' && tasks.importantDuplicate) || 
              (taskType === 'urgent' && tasks.urgentDuplicate)) || 
              createDuplicateEdit) &&
            <span className="task-list-error">You have yet the same task</span>}

        </div>
        
    ) 

}


TaskList.propTypes = {
    tasks: PropTypes.object,
    taskType: PropTypes.string, 
    resetDuplicate: PropTypes.func,
    createDuplicateEdit: PropTypes.bool
}


const mapStateToProps = (state) => {
    return {tasks: state.taskReducer}
}


export default connect(
    mapStateToProps, 
    {createTask, checkDuplicate}
)(TaskList)
