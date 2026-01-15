import React, {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logo from './assets/register.png';

function App() {
  
  const baseUrl = "https://localhost:44396/api/Students";
  const [data, setData] = useState([]);

  async function requestGet() {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  }
  
  useEffect(() => {
    requestGet();
  });

  return (
    <div className="App">
      <br />
      <h3>Student registration</h3>
      <header>
        <img src={logo} alt="Register" />
        <button className='btn btn-success'>Register</button>
      </header>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>E-mail</th>
            <th>Phone Number</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.phoneNumber}</td>
              <td>{student.age}</td>
              <td>
                <button className='btn btn-primary'>Edit</button>
                &nbsp;
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
