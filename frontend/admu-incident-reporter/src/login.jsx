import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Removed unused 'Link'
import admulogo from './logos/admu_logo.png';

function Login() {


  const [studentId, setStudentId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState(null); 
  
  const navigate = useNavigate();

 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Stops page refresh
    setError('');
    

    if (role === 'student') {
      if (studentId.length !== 6 || isNaN(studentId)) {
          setError("Invalid ID Number. Must be six numbers");
          return;
      }
      try {
        console.log("Checking Student ID:", studentId);

      
        const response = await fetch('http://localhost:9999/student/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: studentId }) // Matching DtoStudent
        });

        if (response.ok) {
           
            console.log("Student Logged In:", studentId);
            
           
            localStorage.setItem('loggedInStudentId', studentId);
            localStorage.setItem('userRole', 'student');
            
            navigate('/home');
        } else {
           
            setError("ID Number does not exist");
        }
      } catch (err) {
        console.error("Connection Error:", err);
        setError("Could not connect to Student Server (Port 9999).");
      }
    }

    if (role === 'admin') {
      try {
        console.log("Attempting Admin Login...");
        const response = await fetch('http://localhost:9998/admin/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({ 
                username: username, 
                password: password 
            })
        });

        if (response.ok) {
            const adminData = await response.json();
            console.log("Logged in as:", adminData);
            navigate('/home');
        } else {
            setError("Invalid username or password.");
        }
      } catch (err) {
        console.error("Connection Error:", err);
        setError("Could not connect to the server. Is Spring Boot running?");
      }
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
              onClick={() => { setRole('student'); setError(''); }}
            >
              Log in as Student
            </button>
            <button
              className={`hover:underline ${role === 'admin' ? 'font-bold underline' : ''}`}
              onClick={() => { setRole('admin'); setError(''); }}
            >
              Log in as ADMU Admin
            </button>
          </ul>
        </div>
      </div>

      {/* LOGIN FORM */}
      <div className="flex flex-col min-h-screen p-10 w-full justify-center items-center">
        {!role && (
          <p className="text-gray-600 text-lg">Log in to ADMU Incident Reporter</p>
        )}

        {role && (
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-2/3 lg:justify-center lg:items-center justify-start items-center">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            
            {role === 'student' && (
              <input
                value={studentId}
                onChange={e => setStudentId(e.target.value)}
                type="number"
                placeholder="Student ID"
                className="rounded-md border p-2 w-2/3"
                required
              />
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