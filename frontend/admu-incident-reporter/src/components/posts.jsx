import React from 'react';

function Posts({location, desc, image, time}) {
    return(

        <div className='flex lg:flex-row flex-col lg:justify-start lg:items-end justify-center items-center lg:px-10 lg:py-10 px-3 py-3 border-2 rounded-xl gap-4 w-full h-auto '>
            <img src={image} alt={location} className='lg:w-2/5 lg:h-auto w-full h-auto'  />
            <div className=' flex flex-col lg:justify-end lg:items-start text-center '> 
                <h1 className='lg:text-5xl text-3xl lg:pb-5 pb-2 font-bold'>Location: {location}</h1>
                <p className='lg:text-3xl text-xl'>{desc}</p>
                <p>{time}</p>
            </div>

        </div>

    )
}


export default Posts;