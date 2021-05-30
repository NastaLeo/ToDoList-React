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
            const stateCopyDelete = deleteTask({...state}, action.payload.type, action.payload.name)
            return stateCopyDelete; 
            
        case 'EDIT_TASK':
            const stateCopyEdit = editTask({...state}, action.payload)
            return stateCopyEdit; 

    
        default:
            return {...state};     
    }

}


const addTasks = (state, data) => { 
    state = {
        unimportant: [], 
        important: [], 
        urgent: [], 
    };
    
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
    state[type].splice(index, 1);
    return state;
}


const editTask = (state, payload) => {
    const {taskEdit, name, priority } = payload;
    const index = state[priority].findIndex(task => task.name === name); 
    state[priority][index].name = taskEdit;
    return state
}

export default taskReducer;