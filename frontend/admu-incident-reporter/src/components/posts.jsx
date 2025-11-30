import React from 'react';
import asean from '../logos/asean.png';

function Posts({ location, desc, image, time, studentId }) {

    const imageContent = (image && typeof image === 'string' && image.length > 20) 
        ? image 
        : null;
    
    
;    return (
        <div className='flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full  border border-gray-100 transition-all hover:shadow-xl hover:scale-[1.01] duration-300'>
            
            
            <div className='md:w-1/3 w-full h-64 md:h-auto relative bg-gray-200'>
                <img 
                    src={imageContent} 
                    alt={location} 
                    className='w-full h-full object-cover' 
                />
            </div>

            
            <div className='flex flex-col justify-between p-6 md:w-2/3 w-full'>
                
                
                <div className='mb-4'>
                    <div className='flex justify-between items-start'>
                        <h2 className='text-2xl font-bold text-indigo-900 uppercase tracking-wide'>
                            📍 {location}
                        </h2>
                        
                        <span className='bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full'>
                            {time}
                        </span>
                    </div>
                </div>

                
                <p className='text-gray-600 text-lg leading-relaxed mb-6'>
                    {desc}
                </p>

            
                <div className='mt-auto pt-4 border-t border-gray-100 flex justify-between items-center'>
                    <div className='text-sm font-medium text-yellow-600 flex items-center gap-1'>
                        👤 Reported by ID: <span className="font-bold text-indigo-900">{studentId}</span>
                    </div> 
                    <div className='text-sm font-medium text-yellow-600 flex items-center gap-1'>
                        ● Pending Review
                    </div>
                   
                </div>
            </div>

        </div>
    );
}

export default Posts;