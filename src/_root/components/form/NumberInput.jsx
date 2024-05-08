import { InputNumber } from "antd"
import { Controller } from "react-hook-form"

const NumberInput = ({ control, name, label, color, setValue }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name} style={{ color: color }}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => <InputNumber className="w-full"  {...field} onChange={(e) => {
                    field.onChange(e)
                    if (e === null) {
                        setValue(name, 0)
                    }
                }} />}
            />
        </div>
    )
}

export default NumberInput
