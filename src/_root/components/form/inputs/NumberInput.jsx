import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const NumberInput = ({ name }) => {
    const { control, setValue } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Input
                    {...field}
                    className='w-full'
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
}

export default NumberInput
