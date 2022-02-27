import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UsersIndex = () => {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/users/', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });
    
            if (res.status === 401) {
                return navigate('/users/register');
            }

            setUser((await res.json()).user);
        }

        fetchUser();
    }, [navigate]);

    return (
        <div>
            {user && `Welcome ${user.email}`}
        </div>
    );
}

export default UsersIndex