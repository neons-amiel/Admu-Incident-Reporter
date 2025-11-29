import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import admulogo from './logos/admu_logo.png';
import asean from './logos/asean.png';

import Posts from './components/posts.jsx';





function Landing({posts}) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/report');
    };


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

            <div class='flex flex-col lg:justify-center lg:items-center justify-start items-center lg:h-screen h-3/4 py-10 '>
                <h1 class='lg:text-6xl text-5xl text-center font-bold lg:pt-5 pt-20'>Welcome to the ADMU Incident Reporter</h1>
                <div class='flex flex-col justify-center items-center gap-6'>
                    <h1 class='lg:text-4xl text-2xl text-center font-semibold lg:pt-14 pt-10'>Witnessed an incident?</h1>
                    <button class='bg-indigo-900 text-white lg:px-5 lg:py-5 py-6 px-6 rounded-xl hover:bg-indigo-500 text-xl' onClick={handleClick}> 
                        Report it here!
                    </button>
                </div>

            </div>

            {/* Everyone's Reports */}
 
            <div className='flex flex-col justify-center  px-10 py-4 w-full  '>
                <h1 className='flex text-5xl lg:pb-20 pb-10'>Reports: </h1>
                <div class='flex flex-wrap justify-center items-start lg:gap-6 gap-8  pb-10'>
                    {posts.map((post,index) => (
                        <Posts
                        key={index}
                        location={post.location}
                        desc={post.desc}
                        image={post.image ? URL.createObjectURL(post.image) : null}
                        />
                    ))}

                </div>

                <h3 class='flex justify-start items-center px-5 py-3 bg-blue-900 rounded-md w-fit text-white hover:bg-blue-500'>
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