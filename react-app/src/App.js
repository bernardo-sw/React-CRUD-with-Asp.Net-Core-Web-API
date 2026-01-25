import {useState, useEffect} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import logoRegister from './assets/register.png';

function App() {
  
  const baseUrl = "https://localhost:44396/api/Students";

  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState(true);
  const [modalInclude, setModalInclude] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState({
    id: null,
    name: '',
    email: '',
    phoneNumber: '',
    age: ''
  });

  const selectStudent = (student, action) => {
    setSelectedStudent(student);
    (action === 'Edit') ? toggleEdit() : toggleDelete();
  };

  const toggleInclude = () => {
    setModalInclude(!modalInclude);
  };

  const toggleEdit = () => {
    setModalEdit(!modalEdit);
  };

  const toggleDelete = () => {
    setModalDelete(!modalDelete);
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
        setUpdateData(true);
        toggleInclude();
      }).catch(error => {
        console.log(error);
      });
  }

  const requestPut = async () => {
    selectedStudent.age = parseInt(selectedStudent.age);
    await axios.put(baseUrl + '/' + selectedStudent.id, selectedStudent)
      .then(response => {
        var dataNew = data;
        dataNew.map(student => {
          if (student.id === selectedStudent.id) {
            student.name = selectedStudent.name;
            student.email = selectedStudent.email;
            student.phoneNumber = selectedStudent.phoneNumber;
            student.age = selectedStudent.age;
          }
        });
        setData(dataNew);
        setUpdateData(true);
        toggleEdit();
      }).catch(error => {
        console.log(error);
      });
  }

  const requestDelete = async () => {
    await axios.delete(baseUrl + '/' + selectedStudent.id)
      .then(response => {
        setData(data.filter(student => student.id !== response.data));
        setUpdateData(true);
        toggleDelete();
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (updateData)
    {
      requestGet();
      setUpdateData(false);
    }
  }, [updateData]);

  return (
    <div className="student-container">
      <h3>Students registration</h3>
      <header>
        <img src={logoRegister} alt="Register" />
        <button onClick={() => toggleInclude()} className='btn btn-success'>Register</button>
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
                <button className='btn btn-primary' onClick={() => selectStudent(student, 'Edit')}>Edit</button>
                <button className='btn btn-danger' onClick={() => selectStudent(student, 'Delete')}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalInclude}>
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
          <button className='btn btn-danger' onClick={() => toggleInclude()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalEdit}>
        <ModalHeader>Edit Student</ModalHeader>
        <ModalBody>
          <div className='form-group'>
            <label>ID:</label>
            <br />
            <input type="text" className='form-control' readOnly value={selectedStudent && selectedStudent.id} />
            <br />
            <label>Name:</label>
            <br />
            <input type="text" className='form-control' name='name' onChange={handleChange} value={selectedStudent && selectedStudent.name} />
            <br />
            <label>E-mail:</label>
            <br />
            <input type="text" className='form-control' name='email' onChange={handleChange} value={selectedStudent && selectedStudent.email} />
            <br />
            <label>Phone Number:</label>
            <br />
            <input type="text" className='form-control' name='phoneNumber' onChange={handleChange} value={selectedStudent && selectedStudent.phoneNumber} />
            <br />
            <label>Age:</label>
            <br />
            <input type="number" className='form-control' name='age' onChange={handleChange} value={selectedStudent && selectedStudent.age} />
          </div>
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => requestPut()}>Save</button>
          <button className='btn btn-danger' onClick={() => toggleEdit()}>Cancel</button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalDelete}>
        <ModalHeader>Delete Student</ModalHeader>
        <ModalBody>
          Are you sure you want to delete the student {selectedStudent && selectedStudent.name}?
        </ModalBody>
        <ModalFooter>
          <button className='btn btn-primary' onClick={() => requestDelete()}>Yes</button>
          <button className='btn btn-danger' onClick={() => toggleDelete()}>No</button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
export default App;
