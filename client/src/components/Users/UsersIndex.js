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

            setUser((await res.json()).user);
        }

        fetchUser();
    }, [navigate]);

    async function logout() {
        await fetch('/api/user/logout', {
            method: 'POST'
        });

        navigate('/user/login');
    }

    return (
        <div className='container'>
            {
                user
                ? <div><p>Welcome {user.email}</p><p>Balance: ${Math.round((user.balance) * 100) / 100}€</p></div>
                : 'Loading...'
            }

            <div>
                <Button className={'no-left-margin'} color='crimson' onClick={logout} text='Logout' />
            </div>
        </div>
    );
}

export default UsersIndex