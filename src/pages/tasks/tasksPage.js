import {useState} from 'react';
import {Context} from '../../context.js';
import {TaskList} from '../../components';

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


    const findDuplicateEditTask = (tasksStoreCopy, taskEdit) => {
       
        if (tasksStoreCopy.unimportant.concat(tasksStoreCopy.important, tasksStoreCopy.urgent).filter(item => item.name === taskEdit.name.trim()).length > 1) {
           
            console.log('error')
            return false

        } else {
            
            console.log('rule')
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
        console.log('start edit')
       
        if(!task.checked) {
            const tasksStoreCopy = {...tasksStore};
           
            if(task.name === taskEdit) return true;

            else {

                tasksStoreCopy[priority].splice(i, 1, taskEdit);
                setTasksStore(tasksStoreCopy);
                         
                if (findDuplicateEditTask(tasksStoreCopy,taskEdit)) {
                     
                    return true;
                   
                } else {
                    console.log('dublicat');

                    highlightDublicateEdit(priority);
                    return false;  
                }
                
            }      

        } else return true

    }

 
 
    const hideShowTasks = (event) => {

        const tasksStoreCopy = {...tasksStore};
        console.log(event, tasksStoreCopy);

    }

    

    return(
        <Context.Provider value = {{deleteTask, editTask, checkTask, resetDuplicateEdit, highlightDublicateEdit}}>
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
                                  createDuplicateEdit = {duplicateEdit.unimportant}
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
                                  createDuplicateEdit = {duplicateEdit.important}
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