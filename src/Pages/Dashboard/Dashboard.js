import { useEffect, useState } from 'react';
import authService from '../../services/authService';
import studentService from '../../services/studentService';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [dob, setDob] = useState();

  useEffect(() => {
    getEmailSession();
    getStudentList();
  }, []);

  const getEmailSession = async () => {
    await authService
      .getUser()
      .then((response) => {
        console.log('User data--->', response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudentList = async () => {
    await studentService
      .getStudents()
      .then((response) => {
        setStudents(response?.documents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCreateStudent = async () => {
    await studentService
      .createStudent({
        name: name,
        address: address,
        dob: new Date(dob)
      })
      .then((response) => {
        console.log(response);
        getStudentList();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();
    const navigateToNewScreen = () => {
      navigate('/newScreen');
    }

  return (
    <div>
      <div style={createStudentStyle}>
        <TextField
          value={name}
          style={textField}
          label={'Name'}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          value={address}
          style={textField}
          label={'Address'}
          onChange={(event) => setAddress(event.target.value)}
        />
        <TextField
          value={dob}
          style={textField}
          label={'DOB yyyy-mm-dd'}
          onChange={(event) => setDob(event.target.value)}
        />
        <Button variant={'text'} onClick={onCreateStudent} style={buttonStyle}>
          {'Create student'}
        </Button>
      </div>
      <Button variant="text" onClick={navigateToNewScreen}> {'news API'}</Button>
      {students.map((student) => (
        <>
          <h1>{student.name}</h1>
          <p>{new Date(student.dob).toLocaleDateString()}</p>
          <p>{student.address}</p>
        </>
      ))}
    </div>
  );
}
const textField = {
  margin: '10px',
  width: '300px'
};
const buttonStyle = {
  width: '150px'
};
const createStudentStyle = {
  flexDirection: 'column',
  display: 'flex'
};
export default Dashboard;