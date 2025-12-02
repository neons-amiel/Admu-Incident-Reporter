

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import admulogo from './logos/admu_logo.png'; 

function AdminSettings() {
    const navigate = useNavigate();

    
    const [newLocationName, setNewLocationName] = useState('');
    const [locationMessage, setLocationMessage] = useState('');
    const [locationError, setLocationError] = useState('');

    
    const [newStudentId, setNewStudentId] = useState('');
    const [newStudentName, setNewStudentName] = useState(''); 
    const [newStudentEmail, setNewStudentEmail] = useState('');
    const [newStudentContact, setNewStudentContact] = useState('');
    const [newStudentCourse, setNewStudentCourse] = useState('');
    const [studentMessage, setStudentMessage] = useState('');
    const [studentError, setStudentError] = useState('');


    
    const handleAddLocation = async (e) => {
        e.preventDefault();
        setLocationMessage('');
        setLocationError('');

        if (!newLocationName.trim()) {
            setLocationError("Location name cannot be empty.");
            return;
        }

        try {
            
            const response = await fetch('http://localhost:9999/location/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ locationname: newLocationName }) 
            });

            if (response.ok) {
                setLocationMessage(`Location "${newLocationName}" added successfully!`);
                setNewLocationName(''); 
            } else {
                const errorData = await response.json();
                setLocationError(`Failed to add location: ${errorData.error || response.statusText}`);
            }
        } catch (err) {
            console.error("Error adding location:", err);
            setLocationError("Server error. Could not add location.");
        }
    };

    
    const handleAddStudent = async (e) => {
        e.preventDefault();
        setStudentMessage('');
        setStudentError('');

        if (!newStudentId || isNaN(newStudentId) || newStudentId.length !== 6) {
            setStudentError("Student ID must be a 6-digit number.");
            return;
        }
        
        
        

        try {
            
            const response = await fetch('http://localhost:9999/student/add', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    id: newStudentId, 
                    name: newStudentName,
                    email: newStudentEmail,
                    course: newStudentCourse,
                    phonenumber: newStudentContact
                })
            });

            if (response.ok) {
                setStudentMessage(`Student ID "${newStudentId}" added successfully!`);
                setNewStudentId(''); 
                setNewStudentName('');
                setNewStudentEmail('');
                setNewStudentContact('');
                setNewStudentCourse('');
            } else {
                const errorData = await response.json();
                setStudentError(`Failed to add student: ${errorData.error || response.statusText}`);
            }
        } catch (err) {
            console.error("Error adding student:", err);
            setStudentError("Server error. Could not add student.");
        }
    };


    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

   
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
        navigate('/'); 
        return null; 
    }


    return (
        <div className='flex flex-col min-h-screen w-full overflow-x-hidden '>
            {/* Navbar */}
            <nav className="flex flex-row justify-between items-center bg-indigo-900 px-9 py-4 text-white ">
                <div>
                    <Link to='/home'><img src={admulogo} className='h-20 w-20' alt="ADMU Logo" /></Link>
                </div>
                
                <ul className='flex flex-row gap-8 text-xl'>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/report'>Make a Report</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                    
                </ul>
            </nav>

            
            <div className='flex flex-col items-center justify-center p-10 w-full flex-grow'>
                <h1 className='text-5xl font-bold text-indigo-900 mb-10'>Admin Settings</h1>

                <div className='flex lg:flex-row flex-col justify-around items-start lg:gap-10 gap-16 px-10 py-8 w-full max-w-6xl'>
                    
                    {/* Add a Location Form */}
                    <div className='flex flex-col gap-4 p-6 border border-gray-200 rounded-xl shadow-lg lg:w-1/2 w-full'>
                        <h2 className='text-3xl font-semibold text-indigo-800 border-b pb-3 mb-4'>Add New Location</h2>
                        <form onSubmit={handleAddLocation} className='flex flex-col gap-4'>
                            {locationError && <p className="text-red-500 text-sm">{locationError}</p>}
                            {locationMessage && <p className="text-green-500 text-sm">{locationMessage}</p>}
                            
                            <label htmlFor='locationName' className='font-medium text-gray-700'>Location Name:</label>
                            <input 
                                id='locationName'
                                type='text' 
                                value={newLocationName}
                                onChange={(e) => setNewLocationName(e.target.value)}
                                className='border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none'
                                placeholder='e.g., Loyola Schools Library'
                                required
                            />
                            <button 
                                type='submit' 
                                className='bg-indigo-700 text-white px-5 py-3 rounded-lg hover:bg-indigo-600 transition-colors self-end'
                            >
                                Add Location
                            </button>
                        </form>
                    </div>

                    {/* Add a Student Form */}
                    <div className='flex flex-col gap-4 p-6 border border-gray-200 rounded-xl shadow-lg lg:w-1/2 w-full'>
                        <h2 className='text-3xl font-semibold text-indigo-800 border-b pb-3 mb-4'>Add New Student</h2>
                        <form onSubmit={handleAddStudent} className='flex flex-col gap-4'>
                            {studentError && <p className="text-red-500 text-sm">{studentError}</p>}
                            {studentMessage && <p className="text-green-500 text-sm">{studentMessage}</p>}

                            <label htmlFor='studentId' className='font-medium text-gray-700'>Student ID (6 digits):</label>
                            <input 
                                id='studentId'
                                type='number' 
                                value={newStudentId}
                                onChange={(e) => setNewStudentId(e.target.value)}
                                className='border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none'
                                placeholder='e.g., 202300'
                                maxLength={6} 
                                required
                            />

                            <label htmlFor='studentCourse' className='font-medium text-gray-700'>Student Course (Optional):</label>
                            <input 
                                id='studentCourse'
                                type='text' 
                                value={newStudentCourse}
                                onChange={(e) => setNewStudentCourse(e.target.value)}
                                className='border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none'
                                placeholder='e.g., Juan Dela Cruz'
                                
                            />

                            <label htmlFor='studentEmail' className='font-medium text-gray-700'>Student Email (Optional):</label>
                            <input 
                                id='studentEmail'
                                type='email' 
                                value={newStudentEmail}
                                onChange={(e) => setNewStudentEmail(e.target.value)}
                                className='border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none'
                                placeholder='e.g., juan.delacruz@ateneo.edu'
                                
                            />

                            <label htmlFor='studentContact' className='font-medium text-gray-700'>Student Contact Number (Optional):</label>
                            <input 
                                id='studentContact'
                                type='tel' 
                                value={newStudentContact}
                                onChange={(e) => setNewStudentContact(e.target.value)}
                                className='border border-gray-300 rounded px-4 py-2 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none'
                                placeholder='e.g., +639171234567'
                            />

                            <button 
                                type='submit' 
                                className='bg-indigo-700 text-white px-5 py-3 rounded-lg hover:bg-indigo-600 transition-colors self-end'
                            >
                                Add Student
                            </button>
                        </form>
                    </div>
                </div>


                <h3 className='flex justify-center items-center px-6 py-3 bg-red-600 rounded-md w-fit text-white hover:bg-red-500 cursor-pointer mt-10' onClick={handleLogout}>
                    Log Out
                </h3>
            </div>

            
            <footer className='h-30 w-screen bg-indigo-900 text-white flex justify-center items-center py-6'>
                <div className='flex flex-col justify-center items-center'>
                    <p>Developed by Boys Pogi</p>
                    <p>All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default AdminSettings;