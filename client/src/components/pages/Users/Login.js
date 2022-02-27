import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        if (res.status === 200) {
            navigate('/users');
        }
    }

    return (
        <div className='container'>
            <h1>Registration</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' value={email} placeholder='example@email.com' name='email' onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' value={password} placeholder='********' name='password' onChange={e => setPassword(e.target.value)}></input>
                </div>

                <input type='submit' value='Login' className='btn no-left-margin' style={{ backgroundColor: 'steelblue' }} />
            </form>
        </div>
    );
}

export default Login