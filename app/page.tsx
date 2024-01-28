"use client";
import React, { useEffect, useState } from 'react';
import SpeechHandler from './components/speech/SpeechHandler';
import Image from 'next/image';
import { PhoneticAssessmentResults } from './js/types';
import PhonicGraph from './components/overall/PhonicData';
import { Orbitron } from 'next/font/google'
import './components/stars/Stars.css';
import LatestResults from './components/latest/LatestResults';

const orbitron = Orbitron({ subsets: ['latin'] });

const Page = () => {

    const [phoneticAssessmentResults, setPhoneticAssessmentResults] = useState<PhoneticAssessmentResults>(new PhoneticAssessmentResults());
    // This value is a bit weird, but there is no time to restructure. When SpeechHandler updates the phoneticAssessmentResults, it will update this value to rerender the PhonicGraph
    const [psudeoValueForRerender, setPsudeoValueForRerender] = useState<number>(0);

    // This function will check if myPhonicScore used in phonic_results is in local storage.
    useEffect(() => {
        const phonogramResults = window.localStorage.getItem('phonogramResults');
        if (phonogramResults) {
            setPhoneticAssessmentResults(new PhoneticAssessmentResults(JSON.parse(phonogramResults)));
        }
    }, []);

    // Amazing twinkling star effect from https://tailwindcomponents.com/component/landing-page-with-twinkling-stars
    useEffect(() => {
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star m-0';
            star.style.animation = `twinkle ${Math.random() * 5 + 5}s linear ${Math.random() * 1 + 1}s infinite`;
            star.style.top = `${Math.random() * window.innerHeight}px`;
            star.style.left = `${Math.random() * window.innerWidth}px`;
            document.querySelector('.homescreen')?.appendChild(star);
        }
    }, []);

    return <div className='homescreen'>
        <div className='p-10'>

            <div className='flex justify-center rounded-xl flex flex-col'>

                {/* TITLE PAGE */}
                <div className='p-10 h-1/2 flex flex-cols'>
                    <div className=''>
                        <p className='py-3 text-5xl text-white font-alien'> JCKWBIFKKF SISKSKKD</p>
                        <div className={`py-3 text-3xl text-white ${orbitron.className}`}>
                            TRANSLATION: Welcome Aliens!

                        </div>
                    </div>
                    <div></div>
                </div>


                {/* DESCRIPTION */}
                <div className='p-10'>
                    <div className='bg-white rounded-2xl grid grid-cols-2 p-5'>

                        <div className='p-5 flex flex-col justify-between'>
                            <div>
                                <p className='text-3xl font-alien'> LCMEIWNV </p>
                                <p className='text-lg'> Alien vocal cords are unlike humans which means many aliens have trouble speaking Earthlanguage. So, we have made this site to help you on your path to speaking fluently! Input some sample text below,
                                    or generate some random text, hit the microphone and start reading! We will grade you on your ability to pronounce Earth phonics. </p>
                            </div>
                            <p className='text-sm p-2'> Earth is home to over 10 billion humans with 2 billion more on their planet Mars. Earth is still primative, but is one of the top tourist destinations among the galaxy. </p>
                        </div>


                        <div className='flex justify-center relative item-detail'>
                            <Image src='https://climatekids.nasa.gov/why-earth/earth.jpg' layout={'fill'} objectFit={'contain'} alt='Picture of the earth' />
                        </div>
                    </div>
                </div>

                {/* SPEECH HANDLER */}
                <div className='p-10'>
                    <div className='bg-white rounded-2xl'>
                        <SpeechHandler phonicResults={phoneticAssessmentResults} psudeoValueForRerender={psudeoValueForRerender} setPsudeoValueForRerender={setPsudeoValueForRerender} />
                    </div>
                </div>

                {/* LASTEST RESULTS */}
                <div className='p-10'>
                    <div className='bg-white rounded-2xl'>
                        <div className='p-5'>
                            <div className='py-3'>
                                <p className='text-4xl'> Your Latest Results </p>
                            </div>
                            <div>
                                <LatestResults phonicResults={phoneticAssessmentResults} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* OVERALL PHONIC RESULTS */}
                <div className='p-10'>
                    <div className='bg-white rounded-2xl'>

                        <PhonicGraph phonicResults={phoneticAssessmentResults} />
                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default Page;