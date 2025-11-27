import React from 'react';
import { Link } from 'react-router-dom';

import admulogo from './logos/admu_logo.png'



function Report({addPost}){

    
    const [formData, setFormData] = React.useState({
        location: '',
        desc: '',
        image: null,
    });

    const [preview, setPreview] = React.useState('');
    const [error, setError] = React.useState(null);

    const handleSubmit = (e) =>{
        e.preventDefault();
        setError('');

        const {location, desc, image} = formData;
        
        if (!location || !formData.desc || !image ) {
            setError("Please fill in all fields !");
            return;
        }

        addPost({location,desc,image});        
        Navigate('/home');
    };

     const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });

            // Show a preview of the image
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };




    return (
        <div class=' flex flex-col min-h-screen w-full overflow-x-hidden'>
            <nav class="flex flex-row justify-between items-center bg-indigo-900 px-9 py-4 text-white ">
                <div>
                    <Link to='/'><img src={admulogo} class='h-20 y-20' alt="ADMU Logo" /></Link>
                </div>
                
                <ul class='flex flex-row gap-8 text-xl'>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/report'>Make a Report</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                </ul>
            </nav>

            <div class='flex flex-col justify-center lg:px-50 px-10 py-8 w-full  '>
                
                <h1 class='text-3xl font-bold mb-4 '>Make a Report</h1>

                
                <form onSubmit={handleSubmit} class='flex flex-col gap-4'>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <input type='text' placeholder='Location' class='border p-2 rounded' value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}  />
                    <textarea placeholder='Description' class='border p-2 rounded' value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
                    <input type="file" name="image" accept='image/*' className='border p-2 rounded' onChange={handleImageChange}/>
                    {preview && (
                        <img
                            src={preview}
                            alt="Preview"
                            className="mt-2 w-64 h-64 object-cover border"
                        />
                    )}

                    <button type='submit' class='bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-500'>Submit Report</button>
                </form>
            </div>
            
        </div>

            
        
        


    )
}

export default Report;