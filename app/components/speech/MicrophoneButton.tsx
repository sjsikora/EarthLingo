import React from 'react';

type MicrophoneButtonProps = {
    isMicrophoneOn: boolean;
    whenClicked: () => void;
};

const MicrophoneButton:React.FC<MicrophoneButtonProps> = ({isMicrophoneOn, whenClicked}) => {

    const microphoneOn = {
        fontSize: '5rem',
        color: 'green'
    }

    const microphoneOff = {
        fontSize: '5rem',
        color: 'red'
    }


    return <div className='flex justify-center'>
        <button onClick={whenClicked} className='bg-gray-300 p-2 rounded-2xl'>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <span className="material-symbols-outlined" style={isMicrophoneOn ? microphoneOn : microphoneOff}> mic </span>
    </button>
    </div>
}
export default MicrophoneButton;