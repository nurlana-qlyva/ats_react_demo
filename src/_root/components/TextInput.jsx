import { Controller } from 'react-hook-form'
// components
import { InputText } from "primereact/inputtext";

const TextInput = ({ control, label, name, type, color, value }) => {
    return (
        <div className="flex flex-column gap-2">
            <label htmlFor={name} style={{ color: color }}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange } }) => <InputText type={type} value={value} onChange={(e) => onChange(e.target.value)} />}
            />
        </div>
    )
}

export default TextInput
