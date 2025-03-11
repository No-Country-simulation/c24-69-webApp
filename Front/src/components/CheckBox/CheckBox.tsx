import React from 'react';

interface CheckboxProps {
    type: string;
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ type,label, value, checked, onChange }) => {
    return (
        <div className="mb-4 flex justify-between items-center">
            <span className='answers-text'>{label}</span>
            <label className="flex items-center">
                <input 
                    type={type} 
                    value={value} 
                    checked={checked} 
                    onChange={() => onChange(value)} 
                    className="hidden" 
                />
                <span className="custom-checkbox"></span>
            </label>
        </div>
    );
};

export default Checkbox;
