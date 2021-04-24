import './tasksPage.scss';

import {useState} from 'react';
import {Context} from '../../context.js';
import {TaskList} from '../../components';



export const TaskPage = () => {

    const [tasksStore, setTasksStore] = useState({unimportant: [], important: [], urgent: []});
    const commonArr = tasksStore.unimportant.concat(tasksStore.important, tasksStore.urgent);
    const [duplicateCreation, setDuplicateCreation] = useState({unimportant: false}, {important: false}, {urgent: false})


    const addTask = (type, name) => {
        
        const tasksStoreCopy = {...tasksStore};
             
        if (!findDuplicateTask(name)) {

            tasksStoreCopy[type].push({name: name.trim(), checked: false});
            setTasksStore(tasksStoreCopy);
            return true

        } else {
        
            const duplicateCreationCopy = {...duplicateCreation};
            duplicateCreationCopy[type] = true;
            setDuplicateCreation(duplicateCreationCopy);
            return false;

        }
        
    }  


    const findDuplicateTask = (name) => {
          
        if (commonArr.findIndex(item => item.name === name.trim()) === -1) {
            return false
        } else return true

    }


    const resetDuplicateCreation = (type) => {

        const duplicateCreationCopy = {...duplicateCreation};
        duplicateCreationCopy[type] = false;
        setDuplicateCreation(duplicateCreationCopy);

    }


    const checkTask = (i, priority) => {

        const tasksStoreCopy = {...tasksStore};
        tasksStoreCopy[priority][i].checked = !tasksStore[priority][i].checked;
        setTasksStore(tasksStoreCopy);

    }


    const deleteTask = (task, i, priority) => {

        if(task.checked){   
            const tasksStoreCopy = {...tasksStore};
            tasksStoreCopy[priority].splice(i, 1);
            setTasksStore(tasksStoreCopy);
        }

    }



    const editTask = (task, i, priority, input, taskEditName) => {

         if (!task.checked) { 
            const tasksStoreCopy = {...tasksStore};
            input.current.focus();
            
                   
            console.log(task.name, taskEditName)
          
            // const editedTask = tasksStoreCopy[priority].splice(i, 1);
            // console.log(editedTask)
            // tasksStoreCopy[priority].slice(i, {name: name.trim(), checked: false});
            // findDuplicateTask(task.name)
            setTasksStore(tasksStoreCopy);
            console.log(tasksStoreCopy);

        } else return 

    }

 
    const hideShowTasks = (event) => {
        const tasksStoreCopy = {...tasksStore};
        console.log(event, tasksStoreCopy);
    }

    

    return(
        <Context.Provider value = {{deleteTask, editTask, checkTask}}>
            <div className="page">
                <h1> Your ToDo List</h1>

                <div className='page-main'>

                    <div className="page-main-col">
                        <div className="page-main-col-unimportant" onClick ={hideShowTasks}>
                            Unimportant tasks:
                        </div>    
                        <TaskList tasks = { tasksStore.unimportant }
                                  taskType = 'unimportant'
                                  addTask = {addTask}
                                  findDuplicateTask = {findDuplicateTask}
                                  createDuplicate = {duplicateCreation.unimportant}
                                  resetDuplicate = {resetDuplicateCreation}
                        />
                    </div> 
                
                    <div className="page-main-col">
                        <div className="page-main-col-important" onClick ={hideShowTasks}>
                            Important tasks:
                        </div>
                        <TaskList tasks = { tasksStore.important }
                                  taskType = 'important'
                                  addTask = {addTask}    
                                  findDuplicateTask = {findDuplicateTask}
                                  createDuplicate = {duplicateCreation.important}
                                  resetDuplicate = {resetDuplicateCreation}

                        />
                    </div>

                    <div className="page-main-col">
                        <div className="page-main-col-urgent" onClick ={hideShowTasks}>
                            Very important tasks:
                        </div>
                        <TaskList tasks = { tasksStore.urgent }
                                  taskType = 'urgent'
                                  addTask = {addTask}   
                                  findDuplicateTask = {findDuplicateTask}
                                  createDuplicate = {duplicateCreation.urgent}
                                  resetDuplicate = {resetDuplicateCreation}

                        />
                    </div>
                
                </div>

                <div className="page-statistics">

                    {commonArr.length > 0 && 
                    <div>Your statistics: you have {commonArr.filter(el => el.checked === false).length}  not completed tasks</div>
                    }
                
                </div>
                
            </div>
        </Context.Provider>
    )
}