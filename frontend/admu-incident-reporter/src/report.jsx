import React, { useState, useEffect } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import admulogo from './logos/admu_logo.png';

function Report() {
    const navigate = useNavigate();

    
    const [formData, setFormData] = useState({
        location: '',
        description: '', 
        image: '',
       
    });

    const [locations, setLocations] = useState([]); 
    const [error, setError] = useState(null);
    const [message, setMessage] = useState('');

   
    useEffect(() => {
        
        fetch('http://localhost:9999/location/all')
            .then(res => res.json())
            .then(data => {
                setLocations(data); 
            })
            .catch(err => console.error("Error fetching locations:", err));
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onloadend = () => {
                
                setFormData({ ...formData, image: reader.result });
            };
            reader.onerror = () => {
                setError("Failed to read file");
            };
        }
    };

  
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        
        const loggedInStudentId = localStorage.getItem('loggedInStudentId') ;

        const payload = {
            studentId: loggedInStudentId,
            location: formData.location,
            description: formData.description,
            image: formData.image
        };

        if (!formData.location || !formData.description) {
            setError("Please fill in all fields!");
            return;
        }

        try {
            const response = await fetch('http://localhost:9999/incident/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                setMessage("Report Submitted Successfully!");
                setTimeout(() => navigate('/home'), 1500);
            } else {
                setError("Failed to submit report.");
            }
        } catch (err) {
            console.error(err);
            setError("Server Error.");
        }
    };

    return (
        <div className='flex flex-col min-h-screen w-full overflow-x-hidden'>
            <nav className="flex flex-row justify-between items-center bg-indigo-900 px-9 py-4 text-white">
                <div>
                    <Link to='/'><img src={admulogo} className='h-20 y-20' alt="ADMU Logo" /></Link>
                </div>
                <ul className='flex flex-row gap-8 text-xl'>
                    <li><Link to='/home'>Home</Link></li>
                    <li><Link to='/report'>Make a Report</Link></li>
                    <li><Link to='/contact'>Contact Us</Link></li>
                </ul>
            </nav>

            <div className='flex flex-col justify-center items-center lg:px-50 px-10 py-8 w-full'>
                <h1 className='text-3xl font-bold mb-4'>Make a Report</h1>

                <form onSubmit={handleSubmit} className='flex flex-col gap-4 lg:w-2/3 w-3/4'>
                    {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
                    {message && <p className="text-green-600 text-sm font-bold">{message}</p>}

                  
                    <label className="font-semibold text-gray-700">Location</label>
                    <select
                        className='border p-2 rounded bg-white'
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        required
                    >
                        <option value="" disabled>Select a Location</option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.locationname}>
                                {loc.locationname}
                            </option>
                        ))}
                    </select>

                    <label className="font-semibold text-gray-700">Description</label>
                    <textarea
                        placeholder='Describe the incident...'
                        className='border p-2 rounded h-32'
                        value={formData.description}
                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                        required
                    />

                    <label className="font-semibold text-gray-700">Attach Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className='border p-2 rounded bg-white'
                            onChange={handleImageChange} 
                        />
                    
                  
                    {formData.image && (
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">Preview:</p>
                            <img src={formData.image} alt="Preview" className="h-32 object-contain border" />
                        </div>
                    )}

                    <button type='submit' className='bg-indigo-900 text-white px-4 py-2 rounded hover:bg-indigo-500 mt-4'>
                        Submit Report
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Report;