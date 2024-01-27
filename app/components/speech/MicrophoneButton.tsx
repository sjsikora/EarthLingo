import React from 'react';

type MicrophoneButtonProps = {
    
};

const MicrophoneButton:React.FC<MicrophoneButtonProps> = () => {

    const microphoneOn = {
        fontSize: '5rem',
        color: 'green'
    }

    const microphoneOff = {
        fontSize: '5rem',
        color: 'red'
    }
    
    return <div className='flex justify-center'>
        <div className='bg-gray-300 p-2 rounded-2xl'>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <span className="material-symbols-outlined" style={microphoneOn}> mic </span>
    </div>
    </div>
}
export default MicrophoneButton;