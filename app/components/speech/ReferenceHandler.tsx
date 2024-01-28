import React, { useEffect, useState } from 'react';
import ReferenceButton from './ReferenceButton';

type ReferenceTextProps = {
    text: string;
    setReferenceText: React.Dispatch<React.SetStateAction<string>>;

};

const ReferenceText:React.FC<ReferenceTextProps> = ({text}) => {

    const[difficulty, setDifficulty] = useState<string>('easy');
    const[index, setIndex] = useState({easy: 0, medium: 0, hard: 0});

    useEffect(() => {
        
    }, [])
    
    return <div >
        <div className='flex justify-center'>
            <ReferenceButton selected={difficulty === 'easy'} name='Easy' onClick={() => setDifficulty('easy')}/>
            <ReferenceButton selected={difficulty === 'medium'} name='Medium' onClick={() => setDifficulty('medium')}/>
            <ReferenceButton selected={difficulty === 'hard'} name='Hard' onClick={() => setDifficulty('hard')}/>
            <ReferenceButton selected={difficulty === 'custom'} name='Custom' onClick={() => setDifficulty('custom')}/>

        </div>
    
    </div>
}
export default ReferenceText;