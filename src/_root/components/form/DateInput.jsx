import { Controller } from "react-hook-form"
import PropTypes from 'prop-types'
import { DatePicker } from "antd"
import dayjs from "dayjs"
import "dayjs/locale/tr"

dayjs.locale("tr")

const DateInput = ({ control, name, label, disabled, type }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker {...field} picker={type} disabled={disabled} placeholder="" locale={dayjs.locale("tr")} onChange={e => {
                        console.log(e)
                        field.onChange(e)
                    }} />
                )}
            />
        </div>
    )
}

DateInput.propTypes ={
    control: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
}

export default DateInput
