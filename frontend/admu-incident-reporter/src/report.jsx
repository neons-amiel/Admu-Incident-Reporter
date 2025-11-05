import React from 'react';
import { Link } from 'react-router-dom';

import admulogo from './logos/admu_logo.png'



function Report() {
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
            
        </div>



    )
}

export default Report;