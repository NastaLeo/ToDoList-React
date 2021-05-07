import {Link} from 'react-router-dom';

import './loginPage.scss'



export const LoginPage = () => {

    return (

        <div className="login">
            <div className="login-wrapper">
                <h2>Log in</h2>


                <form action='#' className="login-form">
                    <label htmlFor="login">Login</label>
                    <input id='login' type='text'/>

                    <label htmlFor="password">Password</label>
                    <input id='password' type='password'/>

                    <input type='submit' value='Submit'/>
                </form>

                <span>
                    <Link to='/registration'>Sign up</Link>
                </span>
            </div>
        </div>

    )

}