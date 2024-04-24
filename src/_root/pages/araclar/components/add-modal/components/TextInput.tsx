import { Controller } from 'react-hook-form'
// components
import { InputText } from "primereact/inputtext";

const TextInput = ({control, label, name, type, color }) => {
    return (
        <div className="flex flex-column gap-2">
            <label htmlFor={name} style={{color: color}}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => <InputText type={type} {...field} />}
            />
        </div>
    )
}

export default TextInput
