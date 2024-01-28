import React from 'react';

type DataBarProps = {
    score : number;
    phoneme : string;
    count : number;
};

const DataBar:React.FC<DataBarProps> = ({score, phoneme, count}) => {
    
    return <div className='text-5xl p-3 flex'>
        <div className='shadow-xl border-2 flex rounded-3xl'>
            <div className={(score > 90 ? 'text-emerald-800 p-3' : (score > 80 ? 'text-orange-400 p-3' : 'text-rose-600 p-3'))}> {score} </div>
            <div className='p-3'> | </div>
            <div className='p-3'> "{phoneme}" </div>
        </div>
    </div>
}
export default DataBar;