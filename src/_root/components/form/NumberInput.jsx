import { Controller } from "react-hook-form"
import PropTypes from 'prop-types'
import { InputNumber } from "antd"

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

NumberInput.propTypes ={
    control: PropTypes.func,
    setValue: PropTypes.func,
    name2: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    color: PropTypes.string,
}

export default NumberInput
