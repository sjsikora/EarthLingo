import React, { useEffect, useState } from 'react';
import ReferenceButton from './ReferenceButton';
import sentences from "../../js/paragraphs.json"
import MicrophoneButton from './MicrophoneButton';


type MicroPhoneAndReferenceHandlerProps = {

    // Microphone Props
    isMicrophoneOn: boolean;
    whenMicrophoneClicked: () => void;

    // ReferenceText Props
    referenceText: string;
    setReferenceText: React.Dispatch<React.SetStateAction<string>>;
    
};

const MicroPhoneAndReferenceHandler:React.FC<MicroPhoneAndReferenceHandlerProps> = ({isMicrophoneOn, whenMicrophoneClicked, referenceText, setReferenceText }) => {

    const[difficulty, setDifficulty] = useState<string>('medium');
    const[difficultyIndex, setDifficultyIndex] = useState<{easy : number, medium : number, hard : number}>({easy: 0, medium: 0, hard: 0});

    useEffect(() => {
        const difficultyIndex = window.localStorage.getItem('difficultyIndex');
        if (difficultyIndex) {
            setDifficultyIndex(JSON.parse(difficultyIndex));
        }
    }, [])

    function onReferenceButtonClick(difficulty: "easy" | "medium" | "hard") {
        setDifficulty(difficulty);
        
        const index = (difficultyIndex[difficulty] + 1) % sentences[difficulty].length;
        setReferenceText(sentences[difficulty][index]);
        setDifficultyIndex({...difficultyIndex, [difficulty]: index});
        window.localStorage.setItem('difficultyIndex', JSON.stringify(difficultyIndex));
    }


    
    return <div>
        <div className='flex justify-center'>
                <ReferenceButton selected={difficulty === 'easy'} name='Easy' onClick={() => onReferenceButtonClick('easy')}/>
                <ReferenceButton selected={difficulty === 'medium'} name='Medium' onClick={() => onReferenceButtonClick('medium')}/>
                <ReferenceButton selected={difficulty === 'hard'} name='Hard' onClick={() => onReferenceButtonClick('hard')}/>
                <ReferenceButton selected={difficulty === 'custom'} name='Custom' onClick={() => setDifficulty('custom')}/>
        </div>
        <div className='px-10 flex'>

            <div className='p-3 w-2/3'>
                <div className="text-2xl"> Try Saying...</div>
                <div className='p-2 border-2 text-slate-600 text-3xl'>
                    {referenceText}
                </div>
            </div>

            <div className='pb-10 w-1/3'>
                <p className='text-3xl flex justify-center'> {isMicrophoneOn ? 'SPEAKING' : 'NOT SPEAKING'}</p>
                <MicrophoneButton isMicrophoneOn={isMicrophoneOn} whenClicked={whenMicrophoneClicked} />
            </div>
        </div>
    </div>
}
export default MicroPhoneAndReferenceHandler;