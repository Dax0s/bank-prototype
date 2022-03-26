import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Create = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [amount, setAmount] = useState('');

    const [emailError, setEmailError] = useState('');
    const [amountError, setAmountError] = useState('');


    useEffect(() => {
        async function fetchUser() {
            const res = await fetch('/api/user', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });

            if (res.status === 401) return navigate('/user');
        }

        fetchUser();
    }, [navigate]);

    async function onSubmit(e) {
        e.preventDefault();
        
        if ((amount - 0) === 0) {
            return setAmountError('Enter a value bigger than 0');
        } 

        const res = await fetch('/api/transaction/create', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ email, amount })
        });
        
        const data = await res.json();

        try {
            const error = data.error;

            if (error.param === 'balance') {
                setAmountError(error.msg);
            } else {
                setAmountError('');
            }

            if (error.param !== 'balance') {
                setEmailError(error.msg);
            } else {
                setEmailError('');
            }

        } catch (err) {
            setAmountError('');
            setEmailError('');
        }

        if (res.status === 200) return navigate('/transaction');
    }

    return (
        <div id='wrap' className='input'>
            <header className='input-header'>
                <h1>New transaction</h1>
            </header>
            <section className='input-content'>

                <h2>Create a new transaction</h2>
                
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
                        <dt className='inputbox-title'>Amount</dt>
                        <dd className='inputbox-content'>
                            <input id='amount' name='amount' type='number' min='0' step='0.01' value={amount} onChange={e => setAmount(e.target.value)} required/>
                            <label htmlFor='amount'>Amount</label>
                            <span className='underline'></span>
                        </dd>
                        <div className='wrong-input'>{amountError}</div>
                    </dl>

                    <div className='btns'>
                        <input type='submit' value='Send' className='btn btn-confirm no-left-margin' />
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Create