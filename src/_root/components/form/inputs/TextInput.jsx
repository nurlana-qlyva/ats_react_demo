import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const TextInput = ({ name, length, style }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <Input
                    {...field}
                    maxLength={length}
                    style={style}
                    onChange={(e) => {
                        field.onChange(e.target.value)
                    }}
                />
            )}
        />
    )
}

TextInput.propTypes = {
    name: PropTypes.string,
    length: PropTypes.number,
}

export default TextInput
