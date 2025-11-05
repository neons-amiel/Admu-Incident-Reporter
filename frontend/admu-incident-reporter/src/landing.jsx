import React from 'react';
import { Link } from 'react-router-dom';
import admulogo from './logos/admu_logo.png'


function Landing() {
    return (

        <div class=' flex flex-col min-h-screen max-w-8xl  '>
            <nav class="flex flex-row justify-between items-center bg-indigo-900 px-9 py-4 text-white ">
                <div>
                    <Link to='/'><img src={admulogo} class='h-20 y-20' alt="ADMU Logo" /></Link>
                </div>
                
                <ul class='flex flex-row gap-8 text-xl'>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/report'>Make a Report</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                </ul>
            </nav>

            <div class='flex flex-col justify-center items-center px-5 py-4 '>
                <h1 class='text-3xl font-bold'>Welcome to the ADMU Incident Reporter</h1>
                <div class='flex flex-col justify-center items-center gap-6'>
                    <h1 class='text-2xl font-semibold pt-10'>Witnessed an incident?</h1>
                    <button class='bg-indigo-900 text-white px-20 py-10 rounded-xl hover:bg-indigo-500 text-xl'>Report it here!</button>
                </div>

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