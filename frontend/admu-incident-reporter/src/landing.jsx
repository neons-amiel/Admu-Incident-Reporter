import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import admulogo from './logos/admu_logo.png';
import asean from './logos/asean.png';

import Posts from './components/posts.jsx';





function Landing() {

    const navigate = useNavigate();

    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const userRole = localStorage.getItem('userRole') || 'student';
    const isAdmin = userRole === 'admin';

    const handleClick = () => {
        navigate('/report');
    };
    
    const handleAdmin = () => {
        navigate('/adminsettings');
    }

    const handleLogout = () => {
        
        localStorage.clear(); 
        navigate('/'); 
    };

    const fetchReports = () => {
        fetch('http://localhost:9999/incident/all')
            .then(res => res.json())
            .then(data => {
                setReports(data.reverse()); 
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching reports:", err);
                setLoading(false);
            });
    };

    const handleDelete = async (reportId) => {
        if (!window.confirm(`Are you sure you want to delete report ID: ${reportId}? This action is irreversible.`)) {
            return;
        }

        try {
            // THE API CALL GOES HERE!
            const response = await fetch(`http://localhost:9999/incident/delete/${reportId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                
                alert(`Report ${reportId} deleted successfully.`);
                fetchReports(); 
            } else {
                
                const errorText = await response.text();
                alert(`Failed to delete report ${reportId}. Server response: ${errorText}`);
                console.error("Delete failed:", errorText);
            }
        } catch (err) {
            console.error("Connection Error:", err);
            alert("Could not connect to the server for deletion.");
        }
    };

    useEffect(() => {
        fetchReports(); 
    }, []);

    

    return (

        <div className=' flex flex-col justify-center min-h-screen w-full overflow-x-hidden '>

            {/* Navbar */}
            <nav className="flex flex-row justify-between items-center bg-indigo-900 px-9 py-4 text-white ">
                <div>
                    <Link to='/home'><img src={admulogo} class='h-20 y-20' alt="ADMU Logo" /></Link>
                </div>
                
                <ul class='flex flex-row gap-8 text-xl'>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/report'>Make a Report</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                    
                </ul>
            </nav>

            {/* Hero */}

            <div class='flex flex-col lg:justify-center lg:items-center justify-start items-center lg:h-screen h-3/4 pb-10  '>
                <h1 class='lg:text-6xl text-5xl text-center font-bold lg:pt-5 pt-20'>Welcome to the ADMU Incident Reporter</h1>
                <div class='flex flex-col justify-center items-center lg:gap-10 gap-6'>
                    <h1 class='lg:text-4xl text-2xl text-center font-semibold lg:pt-14 pt-10'>Witnessed an incident?</h1>
                    {!isAdmin && <button class='bg-indigo-900 text-white lg:px-5 lg:py-5 py-6 px-6 rounded-xl hover:bg-indigo-500 text-xl' onClick={handleClick}> 
                        Report it here!
                    </button>}
                    {isAdmin && <button class='bg-red-600 text-white lg:px-5 lg:py-5 py-6 px-6 rounded-xl hover:bg-red-400 text-xl' onClick={() => navigate('/adminsettings')}> 
                        Admin Settings
                    </button>}
                </div>

            </div>

           
 
            <div className='flex flex-col justify-center  px-10 py-4 w-full  '>
                <h1 className='flex text-5xl lg:pb-20 pb-10'>Reports: </h1>
                <div class='flex flex-wrap justify-start items-start lg:gap-6 gap-8  pb-10'>
                    {loading && <p className="text-xl">Loading reports...</p>}
                    
                    {!loading && reports.length === 0 && (
                         <p className="text-xl text-gray-500">No incidents reported yet.</p>
                    )}

                    
                    {reports.map((report) => (
                        <Posts
                            key={report.id}
                            reportId={report.id}
                            location={report.location} 
                            desc={report.description} 
                            time={report.timestamp}
                            studentId={report.studentid}
                            image={report.image} 
                            isAdmin={isAdmin} 
                            onDelete={handleDelete}
                        />
                    ))}

                </div>

                <h3 class='flex justify-start items-center px-5 py-3 bg-blue-900 rounded-md w-fit text-white hover:bg-blue-500 cursor-pointer' onClick={handleLogout}>
                        Log Out
                </h3>


                

            </div>

            <footer class='h-30 w-screen bg-indigo-900 text-white flex justify-center items-center py-6'>
                <div class='flex flex-col justify-center items-center'>
                    <p>Developed by Boys Pogi</p>
                    <p>All Rights Reserved.</p>
                </div>
            </footer>


        </div>
    )
    



}


export default Landing;