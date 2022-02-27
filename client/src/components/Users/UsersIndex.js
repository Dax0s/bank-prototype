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
                return navigate('/user/register');
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

            <div><Button color='crimson' onClick={logout} text='Logout' /></div>
        </div>
    );
}

export default UsersIndex