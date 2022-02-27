import { Routes, Route } from "react-router-dom";

import UsersIndex from "./UsersIndex";
import Register from "./Register";
import Login from "./Login";

const Users = () => {
    return (
        <Routes>
            <Route path='/' element={<UsersIndex />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
}

export default Users