const initialState = {
    unimportant: [], 
    important: [], 
    urgent: [], 
    unimportantDuplicate: false, 
    importantDuplicate: false, 
    urgentDuplicate: false,
};


const taskReducer = (state = initialState, action) => {

    switch(action.type) {

        case 'CREATE_TASK':
            const stateCopyCreate = addNewTask({...state}, action.payload.taskName, action.payload.taskType);
            return stateCopyCreate;

        case 'CHECK_DUPLICATE': 
        console.log('CHECK_DUPLICATE')
            const stateCopyDuplicate = checkDuplicate ({...state}, action.payload.taskName, action.payload.taskType)
            return stateCopyDuplicate; 

        default:
            return {...state};     
    }

}


const addNewTask = (state, name, type) => {
    state[type].push({name: name.trim(), checked: false});
    return state;

}


const checkDuplicate = (state, name, type) => {
    const { unimportant, important, urgent} = state;
    const index = unimportant.concat(important, urgent).findIndex(el => el.name === name.trim());
    console.log('index', index)
    if (index !== -1) {
        type === "unimportant" ? state.unimportantDuplicate = true : 
        type === "important" ? state.importantDuplicate = true : 
        state.urgent = true;
    }

    return state
}

export default taskReducer;