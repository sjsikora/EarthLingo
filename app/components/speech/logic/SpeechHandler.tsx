"use client";
import React, { useState } from 'react';
import MicrophoneButton from '../MicrophoneButton';
import ReferenceText from '../ReferenceText';

type SpeechHandlerProps = {
    
};

const SpeechHandler:React.FC<SpeechHandlerProps> = () => {

    const [text, updateText] = useState('');
    const [player, updatePlayer] = useState({p: undefined, muted: false});


    return <div>
        <div className='flex justify-center flex flex-col'>
            <ReferenceText text={text}/>
            <MicrophoneButton />

        </div>


    </div>
}
export default SpeechHandler;