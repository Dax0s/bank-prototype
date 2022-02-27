import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [ firstName, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        const res = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        if (res.status === 201) {
            navigate('/users');
        }
    }

    return (
        <div className='container'>
            <h1>Registration</h1>
            <form method='POST' action='/api/users/register' onSubmit={onSubmit}>
                <div>
                    <label htmlFor='firstName'>Name: </label>
                    <input type='text' value={firstName} placeholder='Name' name='firstName' onChange={e => setName(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='lastName'>Surname: </label>
                    <input type='text' value={lastName} placeholder='Surname' name='lastName' onChange={e => setLastName(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='email'>Email: </label>
                    <input type='text' value={email} placeholder='example@email.com' name='email' onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='password'>Password: </label>
                    <input type='password' value={password} placeholder='********' name='password' onChange={e => setPassword(e.target.value)}></input>
                </div>

                <input type='submit' value='Register' className='btn no-left-margin' style={{ backgroundColor: 'steelblue' }} />
            </form>
        </div>
    );
}

export default Register