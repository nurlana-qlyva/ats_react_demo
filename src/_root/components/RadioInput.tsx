import { Controller } from 'react-hook-form'
// components
import { RadioButton, RadioButtonChangeEvent } from "primereact/radiobutton";

const RadioInput = ({ control, label, name, value }) => {
    return (
        <div className="flex align-items-center">
            <Controller
                name={name}
                control={control}
                render={({ field }) => <RadioButton {...field} inputId="islemiYapan2" name={name} value={value} />}
            />
            <label htmlFor={name} className="ml-2">{label}</label>
        </div>
    )
}

export default RadioInput
