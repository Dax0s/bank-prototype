import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Transaction from './Transaction';

const TransactionsIndex = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState();
    
    const currentDate = new Date().toLocaleDateString('zh-Hans-CN', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-');

    let defaultDate = new Date(currentDate);
    defaultDate.setMonth(defaultDate.getMonth() - 1);
    defaultDate.setDate(1);
    defaultDate = defaultDate.toLocaleDateString('zh-Hans-CN', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-');
    
    const [startDate, setStartDate] = useState(defaultDate);
    const [endDate, setEndDate] = useState(currentDate);

    async function fetchTransactions() {
        const res = await fetch('/api/transaction?' + new URLSearchParams({
            startDate: startDate,
            endDate: getInclusiveDate(endDate),
        }), {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (res.status === 401) return navigate('/user');

        const data = (await res.json()).transactions;
        setTransactions(data);
    }

    useEffect(() => {
        fetchTransactions();
    }, []);

    async function onSubmit(e) {
        e.preventDefault();

        fetchTransactions();
    }

    function endDateChange(date) {
        if (date > currentDate) {
            setEndDate(currentDate);
        }
        else {
            setEndDate(date);
        }

        if (startDate > date) {
            setStartDate(date);
        }
    }

    function getInclusiveDate(date) {
        let dateInclusive = new Date(date);
        dateInclusive.setDate(dateInclusive.getDate() + 1);
        dateInclusive = dateInclusive.toLocaleDateString('zh-Hans-CN', {year: "numeric", month: "2-digit", day: "2-digit"}).replaceAll('/', '-');

        return dateInclusive;
    }

    return (
        <div id='wrap' className='input'>
            <header className='input-header'>
                <h1>Transactions</h1>
            </header>
            <section className='input-content'>

                <h2 style={{paddingBottom: '25px'}}>Transaction history</h2>
                
                <form onSubmit={onSubmit}>
                    <div className='date-input'>
                        <label htmlFor='startDate'>Start date</label>
                        <input id='startDate' name='startDate' type='date' value={startDate ? startDate : currentDate} onChange={e => e.target.value > endDate ? setStartDate(endDate) : setStartDate(e.target.value)} required/>
                    </div>

                    <div className='date-input'>
                        <label htmlFor='endDate'>End date</label>
                        <input id='endDate' name='endDate' type='date' value={endDate ? endDate : currentDate} onChange={e => endDateChange(e.target.value)} required/>
                    </div>

                    <div>
                        <input type='submit' style={{padding: '5px', fontSize: '15px', backgroundColor: '#73a1ff'}} value='Set date' className='btn btn-confirm' />
                    </div>
                </form>
                
                {
                    transactions
                    ? transactions.map((transaction, index) => (
                        <Transaction key={index} sender={transaction.senderEmail} receiver={transaction.receiverEmail} transactionAmount={transaction.transactionAmount} transactionDate={transaction.transactionDate} />
                    ))
                    : 'No transactions'
                }
            </section>
        </div>
    );
}

export default TransactionsIndex