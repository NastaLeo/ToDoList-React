import axios from 'axios';
import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import './usersPage.scss'

export const UsersPage = () => {

    const history = useHistory();

    const [users, setUsers] = useState([])
    const [searchUser, setSearchUser] = useState('')

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

    
    const filterUsers = (event) => {
        setSearchUser(event.target.value);
    }



            
    const results = !searchUser ? users : users.filter(user => { 
        if(user.name.toLowerCase().includes(searchUser.toLowerCase()) || user.login.toLowerCase().includes(searchUser.toLowerCase())) {
            return user
        }
    })
    
    
  

    return (

        <div className="users">

            <div className="users-wrapper">

            <h2>Active users</h2>

            <input placeholder="Search"
                   value={searchUser}
                   onChange={filterUsers}/>

            {results.map((user, index) => {
                return(
                    <div className="user"
                         onClick={() => history.push(`/tasks/${user._id}`)}
                         key={index}>Name: <b>{user.name}</b>, Login: <b>{user.login}</b></div>
                )
            })}

            {results.length === 0 && users.length > 0 && <span>You don't have users with such name or login</span>}
            {results.length === 0 && users.length === 0 && <span>You don't have users yet</span>}

            </div>

        </div>
        
    )

}