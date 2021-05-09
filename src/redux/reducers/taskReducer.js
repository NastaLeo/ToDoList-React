const initialState = {
    unimportant: [], 
    important: [], 
    urgent: [], 
};


const taskReducer = (state = initialState, action) => {
  
    switch(action.type) {

        case 'CREATE_TASK':
            console.log(action.payload)
            const stateCopyCreate = addNewTask({...state}, action.payload.taskName, action.payload.taskType);
            return stateCopyCreate;

        case 'CHECK_TASK':    
            const stateCopyCheck = checkTaskCompletion ({...state}, action.payload.priority, action.payload.number)
            return stateCopyCheck; 

        case 'DELETE_TASK':
            const stateCopyDelete = deleteTask ({...state}, action.payload.priority, action.payload.number)
            return stateCopyDelete;  

        case 'EDIT_TASK':
            const stateCopyEdit = editTask ({...state}, action.payload.priority, action.payload.number, action.payload.task, action.payload.taskEditCopy)
            return stateCopyEdit; 

    
        default:
            return {...state};     
    }

}


const addNewTask = (state, name, type) => {

    state[type].push({name: name.trim(), checked: false});
    return state;

}


const checkTaskCompletion = (state,type, number) => {
    state[type][number].checked = !state[type][number].checked;
    return state;
}


const deleteTask = (state, type, number) => {
    state[type].splice(number, 1);
    return state;
}



const editTask = (state, type, number, task, taskEdit) => {
  
    if(!task.checked) {
        
        if(task.name === taskEdit.name) return;

        else {                        
            state[type].splice(number, 1, taskEdit);
            return state
        }      

    } else return 
  
}


export default taskReducer;