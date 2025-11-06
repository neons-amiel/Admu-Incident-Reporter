import React from 'react';
import { Link} from 'react-router-dom';

import admulogo from './logos/admu_logo.png'

function Contact() {
    return(

        <div class=' flex flex-col min-h-screen w-full overflow-x-hidden '>
            <nav class="flex flex-row justify-between items-center bg-indigo-900 px-9 py-4 text-white ">
                <div>
                    <a href="#"><img src={admulogo} class='h-20 y-20' alt="ADMU Logo" /></a>
                </div>
                
                <ul class='flex flex-row gap-8 text-xl'>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/report'>Make a Report</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                </ul>
            </nav>
            
        </div>

    )
}

export default Contact;