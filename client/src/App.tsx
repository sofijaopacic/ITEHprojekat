import axios from 'axios';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { Notification, useToaster } from 'rsuite';
import './App.css';
import LoginPage from './components/LoginPage';
import ExamShowPage from './components/professor/ExamShowPage';
import ProfessorExamPage from './components/professor/ProfessorExamPage';
import ProfessorNavbar from './components/professor/ProfessorNavbar';
import ProfessorSubmissionPage from './components/professor/ProfessorSubmissionPage';
import StatisticsPage from './components/professor/StatisticsPage';
import RegisterPage from './components/RegisterPage';
import AssignementsPage from './components/student/AssignementsPage';
import ExamPage from './components/student/ExamPage';
import StudentNavbar from './components/student/StudentNavbar';
import SubmissionsPage from './components/student/SubmissionsPage';
import { Professor, Student, User } from './types';
axios.defaults.baseURL = 'http://localhost:8080';


function App() {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const toaster = useToaster();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    axios.defaults.headers.common.authorization = 'Bearer ' + token;
    axios.get('/user')
      .then(res => {
        setUser(res.data);
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  if (loading) {
    return null;
  }

  const logout = () => {
    axios.defaults.headers.common.authorization = '';
    localStorage.clear();
    setUser(undefined);
  }

  if (!user) {
    return <Routes>
      <Route path='/register' element={(<RegisterPage
        onRegister={async data => {
          try {
            const res = await axios.post('/auth/register', data);
            setUser(res.data.user);
            axios.defaults.headers.common.authorization = 'Bearer ' + res.data.token;
            localStorage.setItem('token', res.data.token);
          } catch (error: any) {
            toaster.push((
              <Notification type='error'>{error.response.data.error}</Notification>
            ), { placement: 'topCenter' })
          }
        }}
      />)} />
      <Route path='*' element={(<LoginPage
        onLogin={async data => {
          try {
            const res = await axios.post('/auth/login', data);
            setUser(res.data.user);
            axios.defaults.headers.common.authorization = 'Bearer ' + res.data.token;
            localStorage.setItem('token', res.data.token);
          } catch (error: any) {
            toaster.push((
              <Notification type='error'>{error.response.data.error}</Notification>
            ), { placement: 'topCenter' })
          }
        }}
      />)} />
    </Routes>
  }
  if (user.type === 'STUDENT') {
    return (
      <div>
        <StudentNavbar
          user={user as Student}
          onLogout={logout}
        />
        <div className='container'>
          <Routes>
            <Route path='*' element={<ExamPage />} />
            <Route path='/assignement' element={<AssignementsPage />} />
            <Route path='/submission' element={<SubmissionsPage />} />
          </Routes>
        </div>
      </div>
    )
  }
  return (
    <div>
      <ProfessorNavbar
        user={user}
        onLogout={logout}
      />
      <div className='container'>
        <Routes>
          <Route path='*' element={<ProfessorExamPage professor={user as Professor} />} />
          <Route path='/exam/:id' element={<ExamShowPage professor={user as Professor} />} />
          <Route path='/submission' element={<ProfessorSubmissionPage professor={user as Professor} />} />
          <Route path='/statistics' element={<StatisticsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
