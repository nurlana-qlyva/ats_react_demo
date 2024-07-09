import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { InputNumber } from 'antd'

const NumberInput = ({ name, checked }) => {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <InputNumber
                    {...field}
                    className='w-full'
                    readOnly={checked}
                    onChange={(e) => {
                        field.onChange(e)
                        if (e === null) {
                            setValue(name, 0)
                        }
                    }}
                />
            )}
        />
    )
}

NumberInput.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.bool,
}

export default NumberInput
