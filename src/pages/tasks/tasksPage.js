import {useState, useReducer} from 'react';
import {Context} from '../../context.js';
import {TaskList} from '../../components';

import './tasksPage.scss';

const state = {

                tasksState: {
                    unimportant: [], 
                    important: [], 
                    urgent: []
                },

                duplicateCreationState: { 
                    unimportant: false,
                    important: false, 
                    urgent: false 
                }

};



const taskReducer = (state, action) => {

    switch(action.type) {

        case "CREATE_TASK_UNIMPORTANT":
            const newUnimportantList = state.tasksState.unimportant.concat({name: action.payload.name, checked: false})
            return {...state, tasksState: {...state.tasksState, unimportant: newUnimportantList}};

        case "CREATE_TASK_IMPORTANT":
            console.log('12', action)
            const newImportantList = state.tasksState.important.concat({name: action.payload.name, checked: false})
            return {...state, tasksState: {...state.tasksState, important: newImportantList}};
        
        case "CREATE_TASK_URGENT":
            const newUrgentList = state.tasksState.urgent.concat({name: action.payload.name, checked: false})
            return {...state, tasksState: {...state.tasksState, urgent: newUrgentList}};

        case "CHECK_DUPLICATE_UNIMPORTANT":
            return {...state, duplicateCreationState: {...state.duplicateCreationState, unimportant: action.payload}};

        case "CHECK_DUPLICATE_IMPORTANT":
            return {...state, duplicateCreationState: {...state.duplicateCreationState, important: action.payload}};

        case "CHECK_DUPLICATE_URGENT":
            return {...state, duplicateCreationState: {...state.duplicateCreationState, urgent: action.payload}};  
            
        case "CHECK_URGENT":    
        console.log('12', action)       
           const checkedUrgentTask = state.tasksState.urgent[action.payload.i];
           return {...state, tasksState: {...state.tasksState, urgent: {...state.tasksState.urgent, checkedUrgentTask: {checked: !checkedUrgentTask.checked}}}};  

            
        default: 
           return {...state};
    }
}


console.log()


export const TaskPage = () => {

    const [tasksStore, dispatch] = useReducer(taskReducer, state);

    const commonArr = tasksStore.tasksState.unimportant.concat(tasksStore.tasksState.important, tasksStore.tasksState.urgent);
    const [duplicateEdit, setDuplicateEdit] = useState({unimportant: false}, {important: false}, {urgent: false})

    const addTask = (type, name) => {
                      
        if (findDuplicateTask(name)) {

            dispatch({type: `CREATE_TASK_${type.toUpperCase()}`, payload: {name, type}})
            return true

        } else {

            dispatch({type: `CHECK_DUPLICATE_${type.toUpperCase()}`, payload: true})
            return false;

        }
        
    }  
  

    const findDuplicateTask = (name) => {
        
        const {unimportant, important, urgent} = tasksStore.tasksState
          
        if (unimportant.concat(important, urgent).findIndex(item => item.name === name.trim()) === -1) {
            return true

        } else return false

    }



    const resetDuplicateCreation = (type) => {

        dispatch({type: `CHECK_DUPLICATE_${type.toUpperCase()}`, payload: false})

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
        // tasksStoreCopy[i].checked = !tasksStoreCopy[i].checked;
        //setTasksStore(tasksStoreCopy);

        console.log('before', tasksStore.tasksState.urgent)
        dispatch({priority: `CHECK_${priority.toUpperCase()}`, payload: i})
        console.log('after', tasksStore.tasksState.urgent)
        
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
                        <TaskList tasks = { tasksStore.tasksState.unimportant }
                                  taskType = 'unimportant'
                                  addTask = {addTask}
                                  findDuplicateTask = {findDuplicateTask}
                                  createDuplicate = {tasksStore.duplicateCreationState.unimportant}
                                  resetDuplicate = {resetDuplicateCreation}
                                  createDuplicateEdit = {duplicateEdit.unimportant}
                        />
                    </div> 
                
                    <div className="page-main-col">
                        <div className="page-main-col-important" >
                            Important tasks:
                        </div>
                        <TaskList tasks = { tasksStore.tasksState.important }
                                  taskType = 'important'
                                  addTask = {addTask}    
                                  findDuplicateTask = {findDuplicateTask}
                                  createDuplicate = {tasksStore.duplicateCreationState.important}
                                  resetDuplicate = {resetDuplicateCreation}
                                  createDuplicateEdit = {duplicateEdit.important}
                        />
                    </div>

                    <div className="page-main-col">
                        <div className="page-main-col-urgent" >
                            Very important tasks:
                        </div>
                        <TaskList tasks = { tasksStore.tasksState.urgent }
                                  taskType = 'urgent'
                                  addTask = {addTask}   
                                  findDuplicateTask = {findDuplicateTask}
                                  createDuplicate = {tasksStore.duplicateCreationState.urgent}
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