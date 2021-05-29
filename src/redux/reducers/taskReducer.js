const initialState = {
    unimportant: [], 
    important: [], 
    urgent: [], 
};


const taskReducer = (state = initialState, action) => {
  
    switch(action.type) {

        case 'ADD_TASKS':
            const stateCopyAdd = addTasks({...state}, action.payload.data);
            return stateCopyAdd;

        case 'CREATE_TASK':
            const stateCopyCreate = addNewTask({...state}, action.payload._id, action.payload.taskName, action.payload.taskType);
            return stateCopyCreate;

        case 'CHECK_TASK':  
            const stateCopyCheck = checkTaskCompletion({...state}, action.payload.priority, action.payload.number)
            return stateCopyCheck; 

        case 'DELETE_TASK':
            console.log('del', action.payload)
            const stateCopyDelete = deleteTask({...state}, action.payload.type, action.payload.name)
            return stateCopyDelete; 
            return {...state} 

        case 'EDIT_TASK':
            const stateCopyEdit = editTask({...state}, action.payload.priority, action.payload.number, action.payload.task, action.payload.taskEditCopy)
            return stateCopyEdit; 

    
        default:
            return {...state};     
    }

}


const addTasks = (state, data) => { 
    data.forEach(el => state[el.type].push({name: el.name, checked: el.checked, _id: el._id, userId: el.userId}))
    return state;
}



const addNewTask = (state, id, name, type) => {
    state[type].push({name: name.trim(), checked: false, _id: id});
    return state;

}


const checkTaskCompletion = (state, type, number) => {
    state[type].find(el => el._id === number).checked = !state[type].find(el => el._id === number).checked
    return state;
}


const deleteTask = (state, type, name) => {
    const index = state[type].findIndex(task => task.name === name);

    //const index = state[type].findIndex(el => el._id === number);
    state[type].splice(index, 1);
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