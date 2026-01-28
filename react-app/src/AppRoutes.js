import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Students from './components/Students';
import ManageStudent from './components/ManageStudent';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/students" element={<Students />} />
                <Route path="/student/manage/:id" element={<ManageStudent />} />
            </Routes>
        </Router>
    );
}