import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Button from './components/Button';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path='/' />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
