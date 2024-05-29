import { useContext, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { PlakaContext } from '../../../context/plakaSlice'
import { YakitDataGetByIdService } from '../../../api/service'
import { Select } from 'antd'

const Plaka = ({ field }) => {
    const { plaka, setData } = useContext(PlakaContext)

    const handleChange = (e) => {
        YakitDataGetByIdService(e).then(res => setData(res.data))
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
            options={plaka.map((item) => ({
                label: item.plaka,
                value: item.id,
            }))}
            onChange={e => {
                field.onChange(e)
                handleChange(e)
            }}
        />
    )
}

Plaka.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Plaka
