const Transaction = ({ sender, receiver, transactionAmount, transactionDate }) => {
    return (
        <div className='transaction'>
            <p><strong>Transaction amount: </strong>{transactionAmount}€</p>
            <p>Sender: {sender}</p>
            <p>receiver: {receiver}</p>
            <p>Date: {transactionDate}</p>
        </div>
    );
}

export default Transaction