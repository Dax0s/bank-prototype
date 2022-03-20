import { Routes, Route } from 'react-router-dom';

import TransactionsIndex from './TransactionsIndex';
import Create from './Create';
import Sent from './Sent';

const Transactions = () => {
    return (
        <Routes>
            <Route path='/' element={<TransactionsIndex />} />
            <Route path='/create' element={<Create />} />
        </Routes>
    );
}

export default Transactions