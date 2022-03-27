import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [ firstName, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [userExistsError, setUserExistsError] = useState('');

    
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        const data = await res.json();
        
        try {
            const errors = data.errors.errors;

            let emailErrorExists = false;
            let passwordErrorExists = false;

            if (errors) {
                for (const error of errors) {
                    if (error.param === 'email') {
                        emailErrorExists = true;
                        setEmailError(error.msg);
                    }

                    if (error.param === 'password') {
                        passwordErrorExists = true;
                        setPasswordError(error.msg);
                    }
                }
            }

            if (!emailErrorExists) {
                setEmailError('');
            }

            if (!passwordErrorExists) {
                setPasswordError('');
            }

        } catch (err) {
            setEmailError('');
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            return setConfirmPasswordError('Password and confirm password must match')
        } else {
            setConfirmPasswordError('');
        }

        if (res.status === 409) {
            setUserExistsError('Email is already in use');
        } else {
            setUserExistsError('');
        }

        if (res.status === 201) {
            navigate('/user');
        }
    }

    return (
        <div id='wrap' className='input'>
            <header className='input-header'>
                <h1>Welcome!</h1>
            </header>
            <section className='input-content'>

                <h2>Register</h2>
                
                <form className='input-content-wrap'onSubmit={onSubmit} >
                    
                    <dl className='inputbox'>
                        <dt className='inputbox-title'>Name</dt>
                        <dd className='inputbox-content'>
                            <input id='firstName' name='firstName' type='text' value={firstName} onChange={e => setName(e.target.value)} required/>
                            <label htmlFor='firstName'>Name</label>
                            <span className='underline'></span>
                        </dd>
                    </dl>

                    <dl className='inputbox'>
                        <dt className='inputbox-title'>Surname</dt>
                        <dd className='inputbox-content'>
                            <input id='lastName' name='lastName' type='text' value={lastName} onChange={e => setLastName(e.target.value)} required/>
                            <label htmlFor='lastName'>Surname</label>
                            <span className='underline'></span>
                        </dd>
                    </dl>

                    <dl className='inputbox'>
                        <dt className='inputbox-title'>Email</dt>
                        <dd className='inputbox-content'>
                            <input id='email' name='email' type='text' value={email} onChange={e => setEmail(e.target.value)} required/>
                            <label htmlFor='email'>Email</label>
                            <span className='underline'></span>
                        </dd>
                        <div className='wrong-input'>{emailError}</div>
                    </dl>

                    <dl className='inputbox'>
                        <dt className='inputbox-title'>Password</dt>
                        <dd className='inputbox-content'>
                            <input id='password' name='password' type='password' value={password} onChange={e => setPassword(e.target.value)} required/>
                            <label htmlFor='password'>Password</label>
                            <span className='underline'></span>
                        </dd>
                        <div className='wrong-input'>{passwordError}</div>
                    </dl>

                    <dl className='inputbox'>
                        <dt className='inputbox-title'>Confirm Password</dt>
                        <dd className='inputbox-content'>
                            <input id='confirmPassword' name='confirmPassword' type='password' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <span className='underline'></span>
                        </dd>
                        <div className='wrong-input'>{confirmPasswordError}</div>
                    </dl>
                    
                    <div className='btns' style={{paddingTop: '0'}}>
                        <input type='submit' value='Register' className='btn btn-confirm no-left-margin' />
                        <div className='wrong-input'>{userExistsError}</div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Register