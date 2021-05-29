import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';

import './registrationPage.scss'

export const RegistrationPage = () => {

    const history = useHistory();

    const [selectedAdmin, setSelectedAdmin] = useState(false);
    const [adminList, setAdminList] = useState([]);
    const [registrationForm, setRegistrationForm] = useState({name: '', login: '', password: '', role: 'admin', adminId: ''});
    const [checkPasswordValue, setCheckPasswordValue] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [loginExists, setLoginExists] = useState(false);
    const [formValid, setFormValid] = useState(true);
    const [successfulRegistration, setSuccessfulRegistration] = useState(false);
    

    useEffect(() => {
        axios.get('http://localhost:8080/admins')
        .then(response => {
            if(response.status === 200) {
                setAdminList(response.data);
            }
        })
        .catch(error => console.error(error))
    }, [])


   //update registration form value
    const changeRegistrationFormValue = (value, fieldName) => {  
        const registrationFormCopy = {...registrationForm};
        registrationFormCopy[fieldName] = value;       

        if(fieldName === 'login') {
            setLoginExists(false);
        }
  
        if(fieldName === 'role') {
            if(value === 'admin') {
                registrationFormCopy['adminId'] = '';
                setSelectedAdmin(false);                
            } else {
                setSelectedAdmin(true);
                registrationFormCopy['adminId'] = adminList[0]['_id'];
            }
        }  
        setRegistrationForm(registrationFormCopy);
    }



    const checkPasswordMath = (value) => {
        setCheckPasswordValue(value);
    }



    const checkFormValidation = () => {

        if(passwordError || loginExists) {
            setFormValid(false);
            return false;
        }

        const registrationFormValues = Object.values(registrationForm);

        if (registrationForm['role'] === 'admin') {
            registrationFormValues.pop();
            console.log(registrationFormValues)
        }

        setFormValid(registrationFormValues.every(el => el !== ''));
        return registrationFormValues.every(el => el !== '');

    }


    const registratePerson = (event) => {
       event.preventDefault();
       if(checkFormValidation()) {
            registrateRequest(`http://localhost:8080/registration/${registrationForm.role}`)
       }
    }
    

    const registrateRequest = (url) => {
        const registrationFormCopy = {...registrationForm};

        if(registrationForm.role === 'admin') {
            delete registrationFormCopy.adminId;
        }

        delete registrationFormCopy.role;

        axios.post(url, registrationFormCopy)
        .then(response => {
            if(response.status === 201) {

                setSuccessfulRegistration(true);
                setTimeout(() => {
                    history.push('/login');
                }, 2000)
                
            } 
        })
        .catch(error => {
            console.error(error);
            if(error.response.status === 409) {
                setLoginExists(true);
            }
        })

    }


    return (

        <div className="registration">

            <div className="registration-wrapper">

                <span className="registration-back">
                    <Link to='/login'>Back to login page</Link>
                </span>

                <h2>Registration</h2>

                <form className="registration-form" onSubmit={registratePerson}>
                
                    <span>Name</span>
                    <input type='text' 
                           value={registrationForm.name}
                           onChange={(event) => changeRegistrationFormValue(event.target.value.trim(), 'name')}/>

                    <span>Login</span>
                    <input type='text' 
                           value={registrationForm.login}
                           onChange={(event) => changeRegistrationFormValue(event.target.value.trim(), 'login')}/>

                    {loginExists && <span style={{color:'red', marginBottom:'10px'}}>The same login already exists</span>}

                    <span>Password</span>
                    <input type='password' 
                           value={registrationForm.password}
                           onChange={(event) => changeRegistrationFormValue(event.target.value.trim(), 'password')}/>

                    <span>Password confirmation</span>
                    <input type='password' 
                           disabled={!registrationForm.password}
                           value= {checkPasswordValue}
                           onChange={(event) => checkPasswordMath(event.target.value.trim())}
                           onBlur={() => setPasswordError(checkPasswordValue !== registrationForm['password'])}/>

                    {passwordError && <span style={{color:'red', marginBottom:'10px'}}>No matches</span>}

                    
                    <span>Select your status</span>
                    <select value={registrationForm.role}
                            onChange={(event) => changeRegistrationFormValue(event.target.value, 'role')}>
                        <option value='admin'>Admin</option>
                        {adminList.length > 0 && <option value='user'>User</option>}
                    </select>
        

                    {selectedAdmin && adminList.length > 0 &&
                    <>
                    <span>Select your admin</span>
                    <select value={adminList['admin._id']} onChange={(event) => changeRegistrationFormValue(event.target.value._id, 'adminId')}>
                        {adminList.map(admin => 
                            <option key={admin.login} value={admin._id}>{admin.login}</option>
                        )}
                        
                    </select>
                    </>}

                    {!formValid && <span style={{color:'red', marginBottom:'10px'}}>Your form isn't valid. Please, check all fields</span>}
                    {successfulRegistration && <span style={{color:'blue'}}>Yoy have been successfully registered</span>}
                    <input type='submit' value='Submit'/>

                </form>

            </div>
        </div>
        
    )

}