import { PhoneticAssessmentLatestResults, PhoneticAssessmentResults } from '@/app/js/types';
import React, { useEffect, useState } from 'react';

type LatestResultsProps = {
    phonicResults: PhoneticAssessmentResults
    psudeoValueForRerender: number;
};

const LatestResults:React.FC<LatestResultsProps> = ({phonicResults, psudeoValueForRerender}) => {

    const [latestResults, setLatestResults] = useState<PhoneticAssessmentLatestResults | undefined>(phonicResults.latestResults);

    useEffect(() => {
        setLatestResults(phonicResults.latestResults);

    }, [phonicResults, psudeoValueForRerender])

    if(latestResults === undefined) return <div className='text-xl'>
        <p> You have not taken any tests yet! Click the microphone button and read the sentence aloud to start! </p>
    </div>

    return <div>
        <div className='flex grid grid-cols-2'>
            <div>
                <div className='text-2xl'> Sentence Score: </div>
                <div className={'text-4xl ' + ((latestResults.totalScore > 90 ? 'text-emerald-800 p-3' : (latestResults.totalScore > 80 ? 'text-orange-400 p-3' : 'text-rose-600 p-3')))}> {latestResults.totalScore} </div>
            </div>

            <div>
                <div>
                    <div className='text-2xl'> Misspronounced Words: </div>
                    <div className='text-xl'> {latestResults.missprouncedWords.length > 0 ? latestResults.missprouncedWords.join(', ') : "None! Nice job."} </div>
                </div>

            </div>
        </div>
        <div className='py-2'>
            <div className='text-2xl'>
                Worst Word Phonic Breakdown: {latestResults.worstWord.word} : {latestResults.worstWord.phonemes.join('/ ')}
            </div>
        </div>

    </div>
}
export default LatestResults;