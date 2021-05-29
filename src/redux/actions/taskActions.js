export const addTasks = (data) => { 
    return {
        type: 'ADD_TASKS', 
        payload: data.payload
    }
}

export const createTask = (data) => {
    return {
        type: 'CREATE_TASK', 
        payload: data.payload
    }
}

export const checkTaskCompletion = (data) => {
    return {
        type: 'CHECK_TASK', 
        payload: data.payload
    }
}

export const deleteTask = (data) => {
    console.log(data)
    return {
        type: 'DELETE_TASK', 
        payload: data.payload
    }
}

export const editTask = (data) => {
    return {
        type: 'EDIT_TASK', 
        payload: data.payload
    }
}
