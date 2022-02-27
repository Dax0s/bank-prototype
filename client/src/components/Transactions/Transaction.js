const Transaction = ({ sender, receiver, transactionAmount }) => {
    return (
        <div className='transaction'>
            <h4>Sender: {sender}</h4>
            <p>receiver: {receiver}</p>
            <p>Transaction amount: {transactionAmount}</p>
        </div>
    );
}

export default Transaction