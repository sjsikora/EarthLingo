import React from 'react';

type MicrophoneButtonProps = {
    isMicrophoneOn: "on" | "off" | "loading";
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

    const microphoneLoading = {
        fontSize: '5rem',
        color: 'gray'
    }


    return <div className='flex justify-center'>
        <button onClick={whenClicked} className='bg-gray-300 p-2 rounded-2xl'>

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
        <span className="material-symbols-outlined" style={isMicrophoneOn === "on" ? microphoneOn : isMicrophoneOn === "off" ? microphoneOff : microphoneLoading}> mic </span>
    </button>
    </div>
}
export default MicrophoneButton;