import React, { useEffect, useState } from 'react';
import SpeechHandler from './components/speech/logic/SpeechHandler';
import Image from 'next/image';


// Idea. Have background have twinkling stars

const Page = () => {

  return <div> 
      <div className='p-10'>
    
        <div className='flex justify-center rounded-xl flex flex-col'>
            
            {/* TITLE PAGE */} 
            <div className='p-10'>
                <div className='bg-white rounded-2xl'>
                    <p className='py-3 text-5xl font-alien flex justify-center'> JCKWBIFKKF SISKSKKD</p>
                    <p className='py-3 text-3xl flex justify-center'> Translation: Welcome Aliens!</p>
                </div>
            </div>


            {/* DESCRIPTION */} 
            <div className='p-10'>
                <div className='bg-white rounded-2xl grid grid-cols-2 p-5'>
                    
                    <div className='p-5 flex flex-col justify-between'>
                        <div>
                            <p className='text-3xl font-alien'> LCMEIWNV </p>
                            <p className='text-lg'> Alien vocal cords are unlike humans which means many aliens have trouble speaking Earthlanguage. So, we have made this site to help you on your path to speaking Earthlanguage fluently. Input some sample text below,
                                or generate some random text, hit the microphone and start reading! We will grade you on your ability to pronounce Earth phonics. </p>
                        </div>
                        <p className='text-sm p-2'> Earth is home to over 10 billion humans with 2 billion more on their planet Mars. Earth is still primative, but is one of the top tourist destinations among the galaxy. </p>
                    </div>
                    
            
                    <div className='flex justify-center'>
                        <Image src='https://climatekids.nasa.gov/why-earth/earth.jpg' width={400} height={400} alt='Picture of the earth'/>
                    </div>
                </div>
            </div>


            <div className='p-10'>
                <div className='bg-white rounded-2xl'>
                    <SpeechHandler />
                </div>
            </div>
        </div>
    </div>
    </div>
};

export default Page;