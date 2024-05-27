import { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import { YakitTankGetService } from '../../../api/service'
import { Select } from 'antd'
import { FuelTankContext } from '../../../context/fuelTankSlice'

const FuelTank = ({ field }) => {
    const [data, setData] = useState([])
    const { id } = useContext(FuelTankContext)

    const handleClickSelect = () => {
        YakitTankGetService(id, "YAKIT").then(res => {
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
                label: item.tanim,
                value: item.siraNo,
            }))}
            onClick={handleClickSelect}
            onChange={e => {
                field.onChange(e)
            }}
        />
    )
}

FuelTank.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default FuelTank
