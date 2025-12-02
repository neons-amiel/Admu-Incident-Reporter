

import React from 'react';
import asean from '../logos/asean.png'; 

function Posts({ reportId, location, desc, image, time, studentId, isAdmin, onDelete }) {
// -------------------------------------------------------------

    

    const imageContent = (image && typeof image === 'string' && image.length > 20) 
        ? image 
        : null;
    
    
    const renderImage = imageContent && (
        <div className='md:w-1/3 w-full h-64 md:h-auto relative bg-gray-200'>
            <img 
                src={imageContent} 
                alt={location} 
                className='w-full h-full object-cover' 
            />
        </div>
    );
    
   
    const contentClass = renderImage ? 'md:w-2/3 w-full' : 'w-full';

    return (
        <div className='flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden w-full border border-gray-100 transition-all hover:shadow-xl hover:scale-[1.01] duration-300'>
            
            {renderImage} 

            <div className={`flex flex-col justify-between p-6 ${contentClass}`}>
                
                <div className='mb-4'>
                    <div className='flex justify-between items-start'>
                        <h2 className='text-2xl font-bold text-indigo-900 uppercase tracking-wide'>
                            📍 {location}
                        </h2>
                        
                        <div className='flex items-center gap-2'>
                            <span className='bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full'>
                                {time}
                            </span>
                            
                           
                            {isAdmin && (
                                <button
                                    className="text-red-600 hover:text-red-800 transition-colors p-1 rounded-full"
                                    onClick={() => onDelete(reportId)} 
                                >
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
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