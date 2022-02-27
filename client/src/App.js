import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Users from './components/pages/Users/Users';
import Button from './components/Button';

function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' />
                <Route path='/users/*' element={<Users />} />
            </Routes>
        </Router>
    );
}

export default App;
