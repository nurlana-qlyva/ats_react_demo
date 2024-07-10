import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import tr_TR from 'antd/lib/locale/tr_TR'
import { ConfigProvider, DatePicker } from 'antd'

dayjs.locale('tr')

const DateInput = ({ name, checked }) => {
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <ConfigProvider locale={tr_TR}>
                    <DatePicker {...field} placeholder="" disabled={checked} locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                        field.onChange(e)
                    }} />
                </ConfigProvider>
            )}
        />
    )
}

DateInput.propTypes = {
    name: PropTypes.string,
    checked: PropTypes.string,
}

export default DateInput
