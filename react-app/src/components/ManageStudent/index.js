import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {FiUserPlus, FiCornerDownLeft} from 'react-icons/fi';
import './styles.css';

export default function ManageStudent() {
    const {id} = useParams();
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
                <form>
                    <input type='text' placeholder='Name' />
                    <input type='email' placeholder='Email' />
                    <input type='tel' placeholder='Phone Number' />
                    <input type='number' placeholder='Age' />
                    <button className='button' type='submit'>{id === '0' ? "Add Student" : "Update Student"}</button>
                </form>
            </div>
        </div>
    );
}