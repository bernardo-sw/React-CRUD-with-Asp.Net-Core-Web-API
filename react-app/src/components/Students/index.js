import React from 'react';
import {Link} from 'react-router-dom';
import './styles.css';

import { FiEdit, FiUserX, FiXCircle } from 'react-icons/fi';

import logoRegister from '../../assets/register.png';

export default function Students() {
  return (
    <div className="student-container">
        <header>
            <img src={logoRegister} alt="Register" />
            <span>Welcome, <strong>Bernardo</strong>!</span>
            <Link className="button-link" to="/student/new">Add New Student</Link>
            <button type="button" className="button">
                <FiXCircle size={35} color="#17202a" />
            </button>
        </header>
        <form>
            <input type="text" placeholder="Search student by name" />
            <button type="button" className="button">Filter student by name (or part of the name)</button>
        </form>
        <h1>List of students</h1>
        <ul>
            <li>
                <p>
                    <b>Name:</b> Bernardo<br /><br />
                    <b>Email:</b> bernardo-sw@outlook.com<br /><br />
                    <b>Phone Number:</b> +55 21 96509-5081<br /><br />
                    <b>Age:</b> 45<br /><br />
                    <div class="button-container">
                        <button type="button"><FiEdit size="25" color="#17202a" /></button>
                        <button type="button"><FiUserX size="25" color="#17202a" /></button>
                    </div>
                </p>
            </li>
            <li>
                <p>
                    <b>Name:</b> Bernardo<br /><br />
                    <b>Email:</b> bernardo-sw@outlook.com<br /><br />
                    <b>Phone Number:</b> +55 21 96509-5081<br /><br />
                    <b>Age:</b> 45<br /><br />
                    <div class="button-container">
                        <button type="button"><FiEdit size="25" color="#17202a" /></button>
                        <button type="button"><FiUserX size="25" color="#17202a" /></button>
                    </div>
                </p>
            </li>
        </ul>
    </div>
  );
}