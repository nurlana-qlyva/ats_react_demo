import { Controller } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';
import { useState } from 'react';

const RadioInput = ({ control, label, name, value }) => {
    const [aracDurum, setAracDurum] = useState('')
    
    const inputId = `input_${name}`;

    return (
        <div className="flex align-items-center">
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <RadioButton {...field} inputId={inputId} name={name} value={value} />
                )}
            />
            <label htmlFor={inputId} className="ml-2">{label}</label>
        </div>
    );
};

export default RadioInput;
