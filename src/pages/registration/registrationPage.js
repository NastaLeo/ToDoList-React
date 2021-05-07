import {Link} from 'react-router-dom';
import {useRef} from 'react';


import './registrationPage.scss'

export const RegistrationPage = () => {

    const selectAdmin = useRef("");
   
    
    const handleSelect = () =>  {
       
    }

    return (

        <div className="registration">

            <div className="registration-wrapper">

                <span className="registration-back">
                    <Link to='/'>Back to login page</Link>
                </span>

                <h2>Registration</h2>

                <form action='#' className="registration-form">
                
                    <label htmlFor='name'>Name</label>
                    <input id='name' type='text'/>

                    <label html='surname'>Surname</label>
                    <input id='surname' type='text'/>

                    <select value='' ref={selectAdmin} onChange={handleSelect}>
                        <option value='admin'>Admin</option>
                        <option value='user'>User</option>   
                    </select>

                    {selectAdmin.current.value === 'user' && 
                    <select value=''>
                        <option>Select admin</option>
                    </select>}

                    <input type='submit' value='Submit'/>

                </form>

            </div>
        </div>
        
    )

}