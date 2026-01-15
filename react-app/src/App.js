import {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoRegister from './assets/register.png';

function App() {
  
  const baseUrl = "https://localhost:44396/api/Students";

  const [data, setData] = useState([]);
  
  const [modalInsertar, setModalInsertar] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState({
    id: null,
    name: '',
    email: '',
    phoneNumber: '',
    age: ''
  });

  const toggleInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const handleChange = e => {
    const {name, value} = e.target;
    setSelectedStudent(prevState => ({
      ...prevState,
      [name]: value
    }));
    console.log(selectedStudent);
  };

  const requestGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPost = async () => {
    delete selectedStudent.id;
    selectedStudent.age = parseInt(selectedStudent.age);
    await axios.post(baseUrl, selectedStudent)
      .then(response => {
        setData(data.concat(response.data));
        toggleInsertar();
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    requestGet();
  });

  return (
    <div className="student-container">
      <h3>Students registration</h3>
      <header>
        <img src={logoRegister} alt="Register" />
        <button onClick={() => toggleInsertar()} className='btn btn-success'>Register</button>
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
              <td className="action-buttons">
                <button className='btn btn-primary'>Edit</button>
                <button className='btn btn-danger'>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalInsertar}>
        <ModalHeader>Register Student</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>Name:</label>
            <br />
            <input type="text" className='form-control' name='name' onChange={handleChange} />
            <br />
            <label>E-mail:</label>
            <br />
            <input type="text" className='form-control' name='email' onChange={handleChange} />
            <br />
            <label>Phone Number:</label>
            <br />
            <input type="text" className='form-control' name='phoneNumber' onChange={handleChange} />
            <br />
            <label>Age:</label>
            <br />
            <input type="number" className='form-control' name='age' onChange={handleChange} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => requestPost()}>Save</button>
          <button className='btn btn-danger' onClick={() => toggleInsertar()}>Cancel</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default App;
