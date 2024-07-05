import { Controller, useFormContext } from "react-hook-form"
import PropTypes from 'prop-types'
import { Checkbox } from "antd"

const CheckboxInput = ({ name }) => {
    const { control } = useFormContext()

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => <Checkbox {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
        />
    )
}

CheckboxInput.propTypes = {
    name: PropTypes.string,
}


export default CheckboxInput
