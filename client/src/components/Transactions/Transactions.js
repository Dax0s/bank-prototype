import { Routes, Route } from 'react-router-dom';

import TransactionsIndex from './TransactionsIndex';
import Create from './Create';
import Sent from './Sent';

const Transactions = () => {
    return (
        <Routes>
            <Route path='/' element={<TransactionsIndex />} />
            <Route path='/create' element={<Create />} />
            <Route path='/sent' element={<Sent />} />
        </Routes>
    );
}

export default Transactions