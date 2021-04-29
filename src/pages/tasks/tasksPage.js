import {useState} from 'react';
import {Context} from '../../context.js';
import TaskList from '../../components/taskList/taskList.js';

import './tasksPage.scss';

export const TaskPage = () => {

    const [tasksStore, setTasksStore] = useState({unimportant: [], important: [], urgent: []});
    const commonArr = tasksStore.unimportant.concat(tasksStore.important, tasksStore.urgent);
    const [duplicateCreation, setDuplicateCreation] = useState({unimportant: false}, {important: false}, {urgent: false})
    const [duplicateEdit, setDuplicateEdit] = useState({unimportant: false}, {important: false}, {urgent: false})

    const addTask = (type, name) => {
        
        const tasksStoreCopy = {...tasksStore};
             
        if (findDuplicateTask(name)) {

            tasksStoreCopy[type].push({name: name.trim(), checked: false});
            setTasksStore(tasksStoreCopy);
            return true

        } else {

            highlightDublicateCreation(type);
            return false;

        }
        
    }  


    const findDuplicateTask = (name) => {
          
        if (commonArr.findIndex(item => item.name === name.trim()) === -1) {
            return true

        } else return false

    }


    const findDuplicateEditTask = (taskEdit, commonArr) => { 
       
        if (commonArr.filter(item => item.name === taskEdit.name.trim()).length > 1) {
          
            return false

       } else {
            
            return true;  
        }  
    }


    const highlightDublicateCreation = (type) => {

        const duplicateCreationCopy = {...duplicateCreation};
        duplicateCreationCopy[type] = true;
        setDuplicateCreation(duplicateCreationCopy);

    }


    const resetDuplicateCreation = (type) => {

        const duplicateCreationCopy = {...duplicateCreation};
        duplicateCreationCopy[type] = false;
        setDuplicateCreation(duplicateCreationCopy);

    }
    
    
    
    const highlightDublicateEdit = (type) => {

        const duplicateEditCopy = {...duplicateEdit};
        duplicateEditCopy[type] = true;
        setDuplicateEdit(duplicateEditCopy);

    }


    const resetDuplicateEdit = (type) => {

        const duplicateEditCopy = {...duplicateEdit};
        duplicateEditCopy[type] = false;
        setDuplicateEdit(duplicateEditCopy);

    }
    


    const checkTask = (i, priority) => {

        const tasksStoreCopy = {...tasksStore};
        tasksStoreCopy[priority][i].checked = !tasksStore[priority][i].checked;
        setTasksStore(tasksStoreCopy);

    }


    const deleteTask = (i, priority) => {

        const tasksStoreCopy = {...tasksStore};
        tasksStoreCopy[priority].splice(i, 1);
        setTasksStore(tasksStoreCopy);
        
    }



    const editTask = (task, i, priority, taskEdit) => {
       
        if(!task.checked) {
            const tasksStoreCopy = {...tasksStore};
           
            if(task.name === taskEdit.name) return true;

            else {                        
                tasksStoreCopy[priority].splice(i, 1, taskEdit);
                setTasksStore(tasksStoreCopy); 
            }      

        } else return 

    }

 
 
    const hideShowTasks = (event) => {

        const tasksStoreCopy = {...tasksStore};
        console.log(event, tasksStoreCopy);

    }

    

    return(
        <Context.Provider value = {{deleteTask, editTask, checkTask, resetDuplicateEdit, highlightDublicateEdit, findDuplicateEditTask, commonArr}}>
            <div className="page">
                <h1> Your ToDo List</h1>

                <div className='page-main'>

                    <div className="page-main-col">
                        <div className="page-main-col-unimportant" onClick ={hideShowTasks}>
                            Unimportant tasks:
                        </div>    
                        <TaskList taskType = 'unimportant'
                                  findDuplicateTask = {findDuplicateTask}
                                  resetDuplicate = {resetDuplicateCreation}
                                  createDuplicateEdit = {duplicateEdit.unimportant}
                        />
                    </div> 
                
                    <div className="page-main-col">
                        <div className="page-main-col-important" onClick ={hideShowTasks}>
                            Important tasks:
                        </div>
                        <TaskList taskType = 'important'
                                  findDuplicateTask = {findDuplicateTask}
                                  resetDuplicate = {resetDuplicateCreation}
                                  createDuplicateEdit = {duplicateEdit.important}
                        />
                    </div>

                    <div className="page-main-col">
                        <div className="page-main-col-urgent" onClick ={hideShowTasks}>
                            Very important tasks:
                        </div>
                        <TaskList taskType = 'urgent'
                                  findDuplicateTask = {findDuplicateTask}
                                  resetDuplicate = {resetDuplicateCreation}
                                  createDuplicateEdit = {duplicateEdit.urgent}
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