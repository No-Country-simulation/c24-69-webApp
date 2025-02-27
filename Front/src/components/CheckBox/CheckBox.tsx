import React from 'react';

interface CheckboxProps {
    label: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, value, checked, onChange }) => {
    return (
        <div className="mb-4 flex justify-between items-center">
            <span>{label}</span>
            <label className="flex items-center">
                <input 
                    type="checkbox" 
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
