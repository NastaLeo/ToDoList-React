import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom';

import {addTasks} from '../../redux/actions/taskActions'
import {TaskList} from '../../components/taskList/taskList.js';

import './tasksPage.scss';


export const TasksPage = () => {

    const history = useHistory();
    const [userId, setUserId] = useState('');
    
    const tasks = useSelector(state => state.taskReducer);
    const dispatch = useDispatch();


    
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('isAdmin'))) {
        axios.get('http://localhost:8080/users/userId', {headers: { 'token': localStorage.getItem('token')}})
            .then(response => {
                if(response.status === 200) {
                    console.log(response.data)
                    setUserId(response.data);
                    getTasksRequest(response.data)
                }
            })
            .catch(error => {
                console.log(error)
                if(error.response.status === 401) {
                    history.push('/login')
                }
            })
        } else {
            const id = history.location.pathname.split('/')[2];
            setUserId(id);
            getTasksRequest(id);
        }
    }, [])



    const getTasksRequest = (userId) => {
        axios.get(`http://localhost:8080/tasks/${userId}`, {headers: { 'token': localStorage.getItem('token')}})
            .then(response => {
                dispatch(addTasks({type: 'ADD_TASKS', payload: {data: response.data}}));
            })
            .catch(error => {
                if(error.response.status === 401){
                    history.push('/login')
                }
            })
    }


  

    const hideShow = (event) => {
        if(event.target.className !== 'hidden') {
            event.target.className = 'hidden';
            Array.from(event.target.parentElement.nextElementSibling.children).forEach( el => {
                if(el.className === 'check') {
                    el.classList.add('hide') 
                }
            })
        } else {
            event.target.className = '';
            Array.from(event.target.parentElement.nextElementSibling.children).forEach( el => el.classList.remove('hide'))
        }
        
    } 


        
    return(
            <div className="page">
                <h1>Tasks to be done</h1>

                <div className='page-main'>

                    <div className="page-main-col">
                        <div className="page-main-col-unimportant">
                            <span onClick={hideShow}>Unimportant tasks:</span>
                        </div>    
                        <TaskList taskType = 'unimportant' userId={userId} tasks={tasks}/>
                    </div> 
                
                    <div className="page-main-col">
                        <div className="page-main-col-important">
                            <span onClick={hideShow}>Important tasks:</span>
                        </div>
                        <TaskList taskType = 'important' userId={userId} tasks={tasks}/>
                    </div>

                    <div className="page-main-col">
                        <div className="page-main-col-urgent">
                            <span onClick={hideShow}>Very important tasks:</span>
                        </div>
                        <TaskList taskType = 'urgent' userId={userId} tasks={tasks}/>
                    </div>
                
                </div>               
                
            </div>
    )
}