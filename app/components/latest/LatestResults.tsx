import { PhoneticAssessmentLatestResults, PhoneticAssessmentResults } from '@/app/js/types';
import React, { useState } from 'react';

type LatestResultsProps = {
    phonicResults: PhoneticAssessmentResults
};

const LatestResults:React.FC<LatestResultsProps> = ({phonicResults}) => {

    const [latestResults, setLatestResults] = useState<PhoneticAssessmentLatestResults | undefined>(phonicResults.latestResults);

    if(latestResults === undefined) return <div className='text-xl'>
        <p> You have not taken any tests yet! Click the microphone button and read the sentence aloud to start! </p>
    </div>

    return <div>
        <p className='text-3xl'> Your latest results: </p>
        <div className='flex justify-center'>
            <div className='text-xl'>
                <p> Total Score: {latestResults.totalScore} </p>
                <p> Misspronounced Words: {latestResults.missprouncedWords.join(', ')} </p>
                <p> Worst Word: {latestResults.worstWord.word} </p>
                <p> Worst Word Score: {latestResults.worstWord.score} </p>
                <p> Worst Word Phonemes: {latestResults.worstWord.phonemes.join(', ')} </p>
            </div>
        </div>

    </div>
}
export default LatestResults;