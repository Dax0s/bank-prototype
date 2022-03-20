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
        <div className='container'>
            <h1>Transactions</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor='startDate'>Start date: </label>
                    <input type="date" name='startDate' value={startDate ? startDate : currentDate} onChange={e => e.target.value > endDate ? setStartDate(endDate) : setStartDate(e.target.value)} />
                </div>

                <div>
                    <label htmlFor='endDate'>End date: </label>
                    <input type="date" name='endDate' value={endDate ? endDate : currentDate} onChange={e => endDateChange(e.target.value)} />
                </div>

                <div>
                    <input type='submit' value='Set date' className='no-left-margin' />
                </div>
            </form>

            {
                transactions
                ? transactions.map((transaction, index) => (
                    <Transaction key={index} sender={transaction.senderEmail} receiver={transaction.receiverEmail} transactionAmount={transaction.transactionAmount} transactionDate={transaction.transactionDate} />
                ))
                : 'No transactions'
            }
        </div>
    );
}

export default TransactionsIndex