import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button";

const UsersIndex = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/user/', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
    
            if (res.status === 401) {
                try {
                    const cookie = document.cookie
                        .split('; ')
                        .find(row => row.startsWith('registered='))
                        .split('=')[1];

                    return navigate('/user/login');
                } catch (err) {
                    return navigate('/user/register');
                }
                
            }

            const data = await res.json();

            setUser(data.user);
            console.log(data.user)
        }

        fetchUser();
    }, [navigate]);

    async function logout() {
        await fetch('/api/user/logout', {
            method: 'POST'
        });

        navigate('/user/login');
    }

    if (!user) {
        return (
            <div></div>
        )
    }

    return (
        <div id='wrap' className='input'>
            <header className='input-header'>
                <h1>User page</h1>
            </header>
            <section className='input-content'>

                <h2>Welcome {user.name}</h2>

                <div>
                    <p>Your balance: {Math.round((user.balance) * 100) / 100}€</p>
                    <p>Email: {user.email}</p>
                </div>

                <Button className='btn btn-confirm no-left-margin' color={'crimson'} onClick={logout} text='Logout' />
            </section>
        </div>
    );
}

export default UsersIndex