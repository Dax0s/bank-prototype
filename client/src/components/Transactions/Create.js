import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');
    const [user, setUser] = useState();

    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (res.status === 401) return navigate('/user');

            setUser((await res.json()).user);
        }

        fetchUser();
    }, [navigate]);

    async function onSubmit(e) {
        e.preventDefault();
        
        if ((amount - 0) === 0) {
            return console.log('Enter a value bigger than 0');
        }
        
        const res = await fetch('/api/transaction/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, amount })
        });

        if (res.status === 400) console.log((await res.json()).errors);
        if (res.status === 403) console.log((await res.json()).errors);
        if (res.status === 200) return navigate('/transaction');
    }

    return (
        <div className='container'>
            <h1>New transaction</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='email'>To: </label>
                    <input type='text' value={email} placeholder='example@email.com' name='email' onChange={e => setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='amount'>Amount: </label>
                    <input type='number' value={amount} placeholder='100.00' name='amount' min='0' step='0.01' onChange={e => setAmount(e.target.value)}></input>
                </div>

                <div>
                    <input type='submit' value='Send' className='btn no-left-margin' style={{ backgroundColor: 'steelblue' }} />
                </div>
            </form>
        </div>
    );
}

export default Create