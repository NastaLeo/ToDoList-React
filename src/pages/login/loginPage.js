import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

import './loginPage.scss'



export const LoginPage = () => {

    const history = useHistory();

    const [loginForm, setLoginForm] = useState({login: '', password: ''});
    const [formValid, setFormValid] = useState(true);


    const changeLoginFormValue = (value, fieldName) => {
        const loginFormCopy = {...loginForm};
        loginFormCopy[fieldName] = value;
        setLoginForm(loginFormCopy);
    }



    const checkFormValidation = () => {
        const loginFormValues = Object.values(loginForm);
        setFormValid(loginFormValues.every(el => el !== ''));
        return loginFormValues.every(el => el !== '');
    }



    const loginPerson = (event) => {
        event.preventDefault();
        if (checkFormValidation()) {
            console.log(loginForm)
            loginRequest()
        }
    }



    const loginRequest = () => {
        axios.post('http://localhost:8080/login', loginForm)
        .then(response => {
            if(response.status === 200) {
                const {token, isAdmin} = response.data;
                localStorage.setItem('token', token);
                localStorage.setItem('isAdmin', isAdmin);
                isAdmin ? history.push('/users') : history.push('/tasks');
            }
        })
        .catch(error => {
            if(error.response.status === 401) {
                setFormValid(false);
            }
        })


    }

    return (

        <div className="login">

            <div className="login-wrapper">
                <h2>Log in</h2>


                <form className="login-form" onSubmit={loginPerson}>
                    <span>Login</span>
                    <input type='text'
                           value={loginForm.login}
                           onChange={(event) => changeLoginFormValue(event.target.value.trim(), 'login')}/>

                    <span>Password</span>
                    <input type='password'
                           value={loginForm.password}
                           onChange={(event) => changeLoginFormValue(event.target.value.trim(), 'password')}/>

                    {!formValid && <span style={{color:'red', marginBottom:'10px'}}>Login or password are invalid</span>}
                    

                    <input type='submit' value='Submit'/>
                </form>

                <span className="redirect">
                    <Link to='/registration'>Sign up</Link>
                </span>
            </div>
        </div>

    )

}