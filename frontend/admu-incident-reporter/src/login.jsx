import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import admulogo from './logos/admu_logo.png';

function Login() {

  {/* setting accounts before database*/}

  const students = [
    { id: '230012' },
    { id: '235198' },
    { id: '233942' },
  ]

  const admins =[
    {
      username: 'amiel',
      password: '123'
    },
    {
      username: 'martin',
      password: '123'
    },
    {
      username: 'mykel',
      password: '123'
    },
  ]

  const [studentId, setStudentId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  

  const navigate = useNavigate();
  const [role, setRole] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

  
    if (role === 'student') {
      const found = students.find( s => s.id === studentId);
      
      if (role === 'student'){
        if (studentId.length !== 6 || isNaN(studentId)) {
          setError("Invalid ID Number. Must be six numbers");
          return;
        }
      if (!found) {
        setError("Student doesnt exist");
        return;
        } 
      }

      navigate('/home');
    }
    if (role === 'admin') {
      const found = admins.find( a => a.username === username && a.password === password  )
      if (!found) {
        setError("Invalid username or password");
        return;
      }
      navigate('/home');
    }
  };

  return (
    <div className="flex lg:flex-row flex-col min-h-screen w-full overflow-x-hidden">
      
      {/* SIDEBAR */}
      <div className="flex lg:flex-col flex-row lg:min-h-screen lg:w-1/2 w-full h-15  bg-indigo-900 text-white lg:justify-start lg:items-center justify-start items-center px-5 py-10">
        <div className="flex lg:flex-col flex-row justify-center items-center gap-5">
          <img src={admulogo} alt="ADMU Logo" className="lg:w-32 lg:h-32 w-12 h-12" />
          <h1 className="text-md lg:text-2xl font-bold">ADMU Incident Reporter</h1>
        </div>

        <div className="flex lg:flex-col lg:justify-start lg:items-start justify-center items-center lg:mt-20 mt-5 w-full px-5">
          <ul className="flex lg:flex-col lg:text-lg text-md lg:justify-center lg:items-start gap-8 flex-row justify-center items-center">
            <button
              className={`hover:underline ${role === 'student' ? 'font-bold underline' : ''}`}
              onClick={() => setRole('student')}
            >
              Log in as Student
            </button>
            <button
              className={`hover:underline ${role === 'admin' ? 'font-bold underline' : ''}`}
              onClick={() => setRole('admin')}
            >
              Log in as ADMU Admin
            </button>
          </ul>
        </div>
      </div>

      
      <div className="flex flex-col min-h-screen p-10 w-full justify-center items-center">
        {!role && (
          <p className="text-gray-600 text-lg">Log in to ADMU Incident Reporter</p>
        )}

        {role && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-2/3 lg:justify-center lg:items-center justify-start items-center">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {role === 'student' && (
              <>
                <input
                  value={studentId}
                  onChange={e => setStudentId(e.target.value)}
                  type="number"
                  placeholder="Student ID"
                  className="rounded-md border p-2 w-2/3"
                  required
                />
              </>
            )}

            {role === 'admin' && (
              <>
                <input
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  placeholder="Username"
                  className="rounded-md border p-2 w-2/3"
                  required
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="rounded-md border p-2 w-2/3"
                  required
                />
              </>
              
            )}

           
            <button
              type="submit"
              onClick={handleSubmit}
              className="flex justify-center px-4 py-2 bg-indigo-800 hover:bg-indigo-500 text-white rounded-md w-2/3"
            >
              Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Login;
