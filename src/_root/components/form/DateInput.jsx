import { DatePicker } from "antd"
import dayjs from "dayjs"
import "dayjs/locale/tr"
import { Controller } from "react-hook-form"

dayjs.locale("tr")

const DateInput = ({ control, name, label, disabled, setValue }) => {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <DatePicker {...field} disabled={disabled} placeholder="" locale={dayjs.locale("tr")} onChange={e => {
                        console.log(e)
                        field.onChange(e)
                    }} />
                )}
            />
        </div>
    )
}

export default DateInput
