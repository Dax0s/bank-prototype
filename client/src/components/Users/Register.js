import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [ firstName, setName ] = useState('');
    const [ lastName, setLastName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword] = useState('');
    
    const navigate = useNavigate();

    async function onSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return alert('Password and confirm password do not match');
        }

        const res = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });

        if (res.status === 201) {
            navigate('/user');
        }
    }

    return (
        <div className='container'>
            <h1>Registration</h1>
            <form onSubmit={onSubmit}>
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

                <div>
                    <label htmlFor='confirmPassword'>Confirm Password: </label>
                    <input type='password' value={confirmPassword} placeholder='********' name='confirmPassword' onChange={e => setConfirmPassword(e.target.value)}></input>
                </div>

                <input type='submit' value='Register' className='btn no-left-margin' style={{ backgroundColor: 'steelblue' }} />
            </form>
        </div>
    );
}

export default Register