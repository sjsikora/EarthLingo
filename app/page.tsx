import React, { useEffect } from 'react';
import SpeechHandler from './components/speech/logic/SpeechHandler';


// Idea. Have background have twinkling stars

const Page = () => {

  return <div className='p-[5rem]'>
        <div className='bg-white flex p-4 justify-center rounded-xl flex flex-col'>


            <p className='text-5xl font-alien flex justify-center'> JCKWBIFKKF SISKSKKD 🛸</p>
            <p className='text-3xl flex justify-center'> Translation: Welcome Aliens!</p>

            <p className='p-2'> Alien vocal cords are unlike humans which means many aliens have trouble speaking Earthlanguage. So, we have made this site to help you on your path to speaking Earthlanguage fluently. Input some sample text below,
                or generate some random text, hit the microphone and start reading! We will grade you on your ability to pronounce Earth phonics. </p>

            <div className='py-[5rem]'>
                <SpeechHandler />
            </div>

        </div>
    </div>
};

export default Page;