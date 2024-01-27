import React from 'react';

type ReferenceTextProps = {
    text: string;

};

const ReferenceText:React.FC<ReferenceTextProps> = ({text}) => {
    
    return <div >
        <div className='flex justify-center'>

            <textarea className='border-2 rounded-sm' placeholder='Input text here...' >

            </textarea>
        </div>
    
    </div>
}
export default ReferenceText;