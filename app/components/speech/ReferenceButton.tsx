import React from 'react';

type ReferenceButtonProps = {
    selected: boolean;
    name: string;
    onClick: () => void;
    
};

const ReferenceButton:React.FC<ReferenceButtonProps> = ({selected, name, onClick}) => {
    
    return <button onClick={onClick} className={'text-white p-5 text-lg'}>
        <div className={"px-5 py-2 rounded-xl " + (selected ? "bg-slate-800" : "bg-slate-400")}>
            {name}
        </div>
    </button>

}
export default ReferenceButton;