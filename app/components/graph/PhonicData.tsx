import { PhoneticAssessmentResults } from '@/app/js/types';
import React, { useEffect } from 'react';
import DataBar from './DataBar';

type PhonicGraphProps = {
    phonicResults: PhoneticAssessmentResults;
};

const PhonicGraph:React.FC<PhonicGraphProps> = ({phonicResults}) => {


    return <div className='p-5'>
        <div className='pt-3'>
            <p className='text-5xl'> Your Overall Phonogram Results </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            {phonicResults?.sortMyPhonogram().map((phonogram) => {
                if (phonogram[1].score > 99) return;
                return <DataBar score={phonogram[1].score} count={phonogram[1].count} key={phonogram[0]} phoneme={phonogram[0]}/>
            })}

        </div>
    </div>
}
export default PhonicGraph;