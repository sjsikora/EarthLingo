import React from 'react';

type ReferenceTextProps = {
    text: string;
    setReferenceText: React.Dispatch<React.SetStateAction<string>>;

};

const ReferenceText:React.FC<ReferenceTextProps> = ({text}) => {
    
    return <div >
        <div className='flex justify-center'>

        </div>
    
    </div>
}
export default ReferenceText;