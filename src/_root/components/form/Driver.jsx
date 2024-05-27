import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { CustomCodeControlService } from '../../../api/service'
import { Select } from 'antd'

const Driver = ({ field }) => {
    const [data, setData] = useState([])
    const { watch } = useFormContext()

    const handleClickSelect = () => {
        CustomCodeControlService("Driver/GetDriverListForInput").then(res => {
            setData(res.data)
        })
    }

    return (
        <>
            <Select
                {...field}
                showSearch
                allowClear
                optionFilterProp="children"
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                    (optionA?.label.toLowerCase() ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={data.map((item) => ({
                    label: item.isim,
                    value: item.surucuId,
                }))}
                value={watch('surucu')}
                onClick={handleClickSelect}
                onChange={e => {
                    field.onChange(e)
                }}
            />
        </>
    )
}

Driver.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Driver
