import React from 'react';
import Welcome from './Welcome';
// import UserList from './UserList';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UsersList from './UsersList';
import GroupChat from './GroupChat';
import ManageUsers from './ManageUsers';
import ManagemDocument from './ManageDocument';
import Logout from './Logout';
import Login from './Login';
import LandingPage from './LandingPage';
import Register from './Register';

export default class Main extends React.Component {
    render() {
        return <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />}>
                <Route path="/groupChat" element={<GroupChat />} />
                <Route path="/manageUsers" element={<ManageUsers />} />
                <Route path="/manageDocument" element={<ManagemDocument />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<UsersList />} />
                <Route path="/register" element={<Register />} />
                <Route path="/welcome" element={<Welcome />} />
                </Route>
            </Routes>
        </BrowserRouter>
    }
}