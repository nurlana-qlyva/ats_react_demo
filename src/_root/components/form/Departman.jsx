import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types' 
import { Select } from 'antd'
import { CodeControlService } from '../../../api/service'

const Departman = ({ field }) => {
    const [data, setData] = useState([])
    const { watch } = useFormContext()

    const handleClick = () => {
        CodeControlService(200).then(res => {
            setData(res.data)
        })
    }

    return (
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
                label: item.codeText,
                value: item.siraNo,
            }))}
            value={watch('departman')}
            onClick={handleClick}
            onChange={e => {
                field.onChange(e)
            }}
        />
    )
}

Departman.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Departman
