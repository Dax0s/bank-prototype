import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const [emailError, setEmailError] = useState('');
    const [credentialError, setCredentialError] = useState('');
    
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/user/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await res.json();
        try {
            const errors = data.errors.errors;

            if (errors) {
                for (const error of errors) {
                    if (error.param === 'email') {
                        setEmailError(error.msg);
                    }
                }
            } 
            
        } catch (err) {
            setEmailError('');
        }

        const credentialErrorData = data.credentialError;

        if (credentialErrorData) {
            setCredentialError(credentialErrorData);
        } else {
            setCredentialError('');
        }

        if (res.status === 200) {
            navigate('/user');
        }
    }

    return (
        <div id='wrap' className='input'>
            <header className='input-header'>
                <h1>Welcome back</h1>
            </header>
            <section className='input-content'>

                <h2>Login</h2>
                
                <form className='input-content-wrap'onSubmit={onSubmit} >

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
                    </dl>
                    
                    <div className='btns'>
                        <input type='submit' value='Sign In' className='btn btn-confirm no-left-margin' />
                        <div className='wrong-input'>{credentialError}</div>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login