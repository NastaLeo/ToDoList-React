import axios from 'axios';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import './usersPage.scss'

export const UsersPage = () => {

    const history = useHistory();

    const [users, setUsers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8080/users', {headers: { 'token': localStorage.getItem('token')}})
            .then(response => {
                setUsers(response.data)
            })
            .catch(error =>{
                if(error.response.status === 401){
                    history.push('/login')
                }
            })

    }, [])

    return (

        <div className="users">

            <div className="users-wrapper">

            <h2>Active users</h2>

            <input placeholder="Search"/>

            {users.length > 0 && users.map((user, index) => {
                return(
                    <div className="user"
                         onClick={() => history.push(`/tasks/${user._id}`)}
                         key={index}>Name : {user.name}, login : {user.login}</div>
                )
            })}

            </div>

        </div>
        
    )

}