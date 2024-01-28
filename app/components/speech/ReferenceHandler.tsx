import React, { useEffect, useState } from 'react';
import ReferenceButton from './ReferenceButton';
import sentences from "../../js/paragraphs.json"

type ReferenceTextProps = {
    text: string;
    difficulty: string;
    difficultyIndex : {easy : number, medium : number, hard : number}
    setReferenceText: React.Dispatch<React.SetStateAction<string>>;
    setDifficulty: React.Dispatch<React.SetStateAction<string>>;
    setDifficultyIndex: React.Dispatch<React.SetStateAction<{easy: number; medium: number; hard: number }>>

};

const ReferenceText:React.FC<ReferenceTextProps> = ({text, difficulty, difficultyIndex, setReferenceText, setDifficulty, setDifficultyIndex}) => {


    function onReferenceButtonClick(difficulty: "easy" | "medium" | "hard") {
        setDifficulty(difficulty);
        
        let index = difficultyIndex[difficulty] + 1;
        setReferenceText(sentences[difficulty][index]);
        setDifficultyIndex({...difficultyIndex, [difficulty]: index});
        window.localStorage.setItem('difficultyIndex', JSON.stringify(difficultyIndex));
    }

    
    return <div >
        <div className='flex justify-center'>

            <ReferenceButton selected={difficulty === 'easy'} name='Easy' onClick={() => onReferenceButtonClick('easy')}/>
            <ReferenceButton selected={difficulty === 'medium'} name='Medium' onClick={() => onReferenceButtonClick('medium')}/>
            <ReferenceButton selected={difficulty === 'hard'} name='Hard' onClick={() => onReferenceButtonClick('hard')}/>
            <ReferenceButton selected={difficulty === 'custom'} name='Custom' onClick={() => setDifficulty('custom')}/>
        </div>

            <div>
                {text}
            </div>

    </div>

}
export default ReferenceText;