import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import NavbarComp from './components/NavbarComp';
import Users from './components/Users/Users';
import Transactions from './components/Transactions/Transactions';

function App() {
    return (
        <Router>
            <NavbarComp />
            <Routes>
                <Route path='/' element={<Navigate to='/user' />} />
                <Route path='/user/*' element={<Users />} />
                <Route path='/transaction/*' element={<Transactions />} />
            </Routes>
        </Router>
    );
}

export default App;
