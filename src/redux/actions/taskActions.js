
export const createTask = (data) => {
    return {
        type: 'CREATE_TASK', 
        payload: data
    }
}



export const checkTaskCompletion = (data) => {
    return {
        type: 'CHECK_TASK', 
        payload: data
    }
}


export const deleteTask = (data) => {
    return {
        type: 'DELETE_TASK', 
        payload: data
    }
}


export const editTask = (data) => {
    return {
        type: 'EDIT_TASK', 
        payload: data
    }
}
