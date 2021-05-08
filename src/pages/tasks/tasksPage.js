import {useState, useReducer} from 'react';
import {Context} from '../../context.js';
import {TaskList} from '../../components';

import './tasksPage.scss';

const tasksState = {unimportant: [], important: [], urgent: []};
const duplicateCreationState = { unimportant: false, important: false, urgent: false };

const createTask = (state, action) => {

    switch(action.type) {
        case "CREATE_TASK_UNIMPORTANT":
            return {...state, unimportant: state.unimportant.concat({name: action.payload.name, checked: false})};

        case "CREATE_TASK_IMPORTANT":
            return {...state, important: state.important.concat({name: action.payload.name, checked: false})};

        case "CREATE_TASK_URGENT":
            return {...state, urgent: state.urgent.concat({name: action.payload.name, checked: false})};
        
        default: 
            return {...state};
    }
}

const checkDuplicate = (state, action) => {
    console.log(state, action)

    switch(action.type) {

        case "CHECK_DUPLICATE_UNIMPORTANT":
            return {...state, unimportant: action.payload};

        case "CHECK_DUPLICATE_IMPORTANT":
            return {...state, important: action.payload};

        case "CHECK_DUPLICATE_URGENT":
            return {...state, urgent: action.payload};
        
        default: 
            return {...state};

    }

}



export const TaskPage = () => {

    const [tasksStore, dispatchCreate] = useReducer(createTask, tasksState);
    const [duplicateCreation, dispatchDuplicateCreation] = useReducer(checkDuplicate, duplicateCreationState);

    const commonArr = tasksStore.unimportant.concat(tasksStore.important, tasksStore.urgent);
    const [duplicateEdit, setDuplicateEdit] = useState({unimportant: false}, {important: false}, {urgent: false})

    const addTask = (type, name) => {
                      
        if (findDuplicateTask(name)) {

            dispatchCreate({type: `CREATE_TASK_${type.toUpperCase()}`, payload: {name, type}})

            return true

        } else {

            dispatchDuplicateCreation({type: `CHECK_DUPLICATE_${type.toUpperCase()}`, payload: true})

            return false;

        }
        
    }  


    const findDuplicateTask = (name) => {
        
        const {unimportant, important, urgent} = tasksStore
          
        if (unimportant.concat(important, urgent).findIndex(item => item.name === name.trim()) === -1) {
         
            return true

        } else return false

    }



    const resetDuplicateCreation = (type) => {

        dispatchDuplicateCreation({type: `CHECK_DUPLICATE_${type.toUpperCase()}`, payload: false})

    }



    const findDuplicateEditTask = (taskEdit, commonArr) => { 
       
    //     if (commonArr.filter(item => item.name === taskEdit.name.trim()).length > 1) {
          
    //         return false

    //    } else {
            
    //         return true;  
    //     }  
    }


  
    
    
    
    const highlightDublicateEdit = (type) => {

        // const duplicateEditCopy = {...duplicateEdit};
        // duplicateEditCopy[type] = true;
        // setDuplicateEdit(duplicateEditCopy);

    }


    const resetDuplicateEdit = (type) => {

        // const duplicateEditCopy = {...duplicateEdit};
        // duplicateEditCopy[type] = false;
        // setDuplicateEdit(duplicateEditCopy);

    }
    


    const checkTask = (i, priority) => {

        // const tasksStoreCopy = {...tasksStore};
        // tasksStoreCopy[priority][i].checked = !tasksStore[priority][i].checked;
        // setTasksStore(tasksStoreCopy);

    }


    const deleteTask = (i, priority) => {

        // const tasksStoreCopy = {...tasksStore};
        // tasksStoreCopy[priority].splice(i, 1);
        // setTasksStore(tasksStoreCopy);
        
    }



    const editTask = (task, i, priority, taskEdit) => {
       
        // if(!task.checked) {
        //     const tasksStoreCopy = {...tasksStore};
           
        //     if(task.name === taskEdit.name) return true;

        //     else {                        
        //         tasksStoreCopy[priority].splice(i, 1, taskEdit);
        //         setTasksStore(tasksStoreCopy); 
        //     }      

        // } else return 

    }

 
 
      

    return(
        <Context.Provider value = {{deleteTask, editTask, checkTask, resetDuplicateEdit, highlightDublicateEdit, findDuplicateEditTask, commonArr}}>
            <div className="page">
                <h1> Your ToDo List</h1>

                <div className='page-main'>

                    <div className="page-main-col">
                        <div className="page-main-col-unimportant" >
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
                        <div className="page-main-col-important" >
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
                        <div className="page-main-col-urgent" >
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