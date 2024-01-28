import { PhoneticAssessmentResults } from '@/app/js/types';
import React, { useEffect } from 'react';
import DataBar from './DataBar';

type PhonicGraphProps = {
    phonicResults: PhoneticAssessmentResults;
    psudeoValueForRerender: number;
    setPhonicResults: React.Dispatch<React.SetStateAction<PhoneticAssessmentResults>>;
};

const PhonicGraph: React.FC<PhonicGraphProps> = ({ phonicResults, psudeoValueForRerender, setPhonicResults}) => {

    function clearMyPhonogramData() {
        window.localStorage.removeItem('phonogramResults');
        setPhonicResults(new PhoneticAssessmentResults());
    }


    return <div className='p-5'>
        <div className='py-3 flex justify-between'>
            <p className='text-4xl'> Your Overall Phonics Results </p>

            <button className='bg-rose-600 p-5 rounded-3xl' onClick={() => clearMyPhonogramData() }>
                <div className='text-white text-xl'>Clear</div>
            </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {phonicResults?.sortMyPhonogram().map((phonogram) => {
                if (phonogram[1].score > 99) return;
                return <DataBar score={phonogram[1].score} count={phonogram[1].count} key={phonogram[0]} phoneme={phonogram[0]} />
            })}

        </div>
    </div>
}
export default PhonicGraph;