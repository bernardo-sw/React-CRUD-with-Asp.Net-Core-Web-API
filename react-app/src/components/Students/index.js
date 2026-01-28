import React, { useState, useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

import { FiEdit, FiUserX, FiXCircle } from 'react-icons/fi';
import logoRegister from '../../assets/register.png';

export default function Students() {

    const [name, setName] = useState('');
    const [students, setStudents] = useState([]);
    const navigation = useNavigate();
    
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    };

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await api.get('api/students', authorization);
                setStudents(response.data); 
            }
            catch (err) {
                alert('Error fetching students: ' + err.message);
            }
        }
        fetchStudents();
    }, [authorization]);

    async function logout() {
        try {
            //await api.post('api/auth/logout', {}, authorization);
            localStorage.clear();
            localStorage.setItem('token', '');
            authorization.headers = { Authorization: '' };
            navigation('/');
        } catch (err) {
            alert('Error logging out: ' + err.message);
        }
    }

  return (
    <div className="student-container">
        <header>
            <img src={logoRegister} alt="Register" />
            <span>Welcome, <strong>{email}</strong>!</span>
            <Link className="button-link" to="/student/manage/0">Add New Student</Link>
            <button type="button" onClick={logout} className="button">
                <FiXCircle size={35} color="#17202a" />
            </button>
        </header>
        <form>
            <input type="text" placeholder="Search student by name" />
            <button type="button" className="button">Filter student by name (or part of the name)</button>
        </form>
        <h1>List of students</h1>
        <ul>
            {students.map(student => (
                <li key={student.id}>
                    <b>Name:</b> {student.name}<br /><br />
                    <b>Email:</b> {student.email}<br /><br />
                    <b>Phone Number:</b> {student.phoneNumber}<br /><br />
                    <b>Age:</b> {student.age}<br /><br />
                    <hr />
                    <div class="button-container">
                        <button type="button"><FiEdit size={25} color="#17202a" /></button>
                        <button type="button"><FiUserX size={25} color="#17202a" /></button>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );
}