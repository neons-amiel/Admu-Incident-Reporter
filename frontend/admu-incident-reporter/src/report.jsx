import React from 'react';
import { Link } from 'react-router-dom';

import admulogo from './logos/admu_logo.png'



function Report() {

    const [formData, setFormData] = React.useState({
        location: '',
        desc: '',
        image: null,
    });


    
    return (
        <div class=' flex flex-col min-h-screen w-full overflow-x-hidden'>
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

            <div class='flex flex-col justify-center lg:px-50 px-10 py-8 w-full  '>
                <h1 class='text-3xl font-bold mb-4 '>Make a Report</h1>
                <form class='flex flex-col gap-4'>
                    <input type='text' placeholder='Location' class='border p-2 rounded' />
                    <textarea placeholder='Description' class='border p-2 rounded' />
                    <input type="file" name="image" accept='image/' className='border p-2 rounded' />
                    <button type='submit' class='bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-500'>Submit Report</button>
                </form>
            </div>
            
        </div>

            
        
        


    )
}

export default Report;