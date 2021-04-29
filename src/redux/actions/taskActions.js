

export const createTask = (data) => {

    return {
        type: 'CREATE_TASK', 
        payload: data
    }

}


export const checkDuplicate = (data) => {
    console.log('checkDuplicate')

    return {
        type: 'CHECK_DUPLICATE', 
        payload: data
    }

}
