import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Input } from 'antd'

const TextInput = ({ name, length, style, readonly }) => {
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
                    readOnly={readonly}
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
    style: PropTypes.object,
    readonly: PropTypes.bool,
}

export default TextInput
