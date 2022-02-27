import { useState, useEffect } from 'react';

import Transaction from './Transaction';

const TransactionsIndex = () => {
    const [transactions, setTransactions]= useState();

    useEffect(() => {
        async function fetchTransactions() {
            const res = await fetch('/api/transaction', {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                }
            });

            const data = (await res.json()).transactions;
            setTransactions(data);
        }

        fetchTransactions();
    }, []);

    return (
        <div className='container'>
            <h1>Transactions</h1>
            {
                transactions
                ? transactions.map((transaction) => (
                    <Transaction key={transaction.id} sender={transaction.senderEmail} receiver={transaction.receiverEmail} transactionAmount={transaction.transactionAmount} />
                ))
                : 'No transactions'
            }
        </div>
    );
}

export default TransactionsIndex