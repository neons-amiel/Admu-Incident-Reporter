import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import admulogo from './logos/admu_logo.png';

function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); 
  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (role === 'student') navigate('/home');
    else if (role === 'admin') navigate('/report');
  };

  return (
    <div className="flex flex-row min-h-screen w-full overflow-x-hidden">
      
      {/* LEFT SIDEBAR */}
      <div className="flex flex-col min-h-screen w-1/2 bg-indigo-900 text-white justify-start items-center px-5 py-10">
        <div className="flex flex-col justify-center items-center gap-5">
          <img src={admulogo} alt="ADMU Logo" className="w-32 h-32" />
          <h1 className="text-2xl font-bold">ADMU Incident Reporter</h1>
        </div>

        <div className="flex flex-col justify-start items-start mt-20 w-full px-5">
          <ul className="flex flex-col text-lg justify-center items-start gap-8">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-2/3 justify-center items-center">
            {role === 'student' && (
              <>
                <input
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
                  type="text"
                  placeholder="Username"
                  className="rounded-md border p-2 w-2/3"
                  required
                />
                <input
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
