import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiUserPlus, FiCornerDownLeft } from 'react-icons/fi';
import api from '../../services/api';
import './styles.css';

export default function ManageStudent() {
    
    const [studentId, setStudentId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [age, setAge] = useState(0);

    const {id} = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const authorization = useMemo(() => ({
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }), [token]);

    useEffect(() => {
        if (id === '0')
            return;

        async function loadStudentData(studentId) {
            try {
                const response = await api.get(`api/students/${studentId}`, authorization);
                setStudentId(response.data.id);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phoneNumber);
                setAge(response.data.age);
            }
            catch(err){
                alert('Error loading student data: ' + err.message);
                navigate('/students');
            }
        }
        loadStudentData(id);
    }, [id, authorization, navigate]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = { 
            name, 
            email, 
            phoneNumber: phone, 
            age 
        }
        try {
            if (id === '0') 
            {
                await api.post('api/students', data, authorization);
            }
            else 
            {
                data.id = studentId;
                await api.put(`api/students/${studentId}`, data, authorization);
            }
            alert('Task completed successfully!');
        }
        catch(err){
            alert('Error submitting student data: ' + err.message);
        }
        navigate('/students');
    }

    return (
        <div className="manage-student-container">
            <div className="content">
                <section className='form'>
                    <h1>{id === '0' ? "Add New Student" : "Edit Student"}</h1>
                    <FiUserPlus size={105} color="#17202a" />
                    <Link className='back-link' to="/students">
                        <FiCornerDownLeft size={25} color="#17202a" />
                        Back to Students
                    </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input type='text' placeholder='Name' 
                        value={name} onChange={e => setName(e.target.value)} />
                    <input type='email' placeholder='Email' 
                        value={email} onChange={e => setEmail(e.target.value)} />
                    <input type='tel' placeholder='Phone Number' 
                        value={phone} onChange={e => setPhone(e.target.value)} />
                    <input type='number' placeholder='Age' 
                        value={age} onChange={e => setAge(e.target.value)} />
                    <button className='button' type='submit'>{id === '0' ? "Add Student" : "Update Student"}</button>
                </form>
            </div>
        </div>
    )
}