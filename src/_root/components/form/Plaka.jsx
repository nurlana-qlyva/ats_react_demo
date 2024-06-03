import { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { PlakaContext } from '../../../context/plakaSlice'
import { YakitDataGetByIdService } from '../../../api/service'
import { Select } from 'antd'

const Plaka = ({ field }) => {
    const { plaka, setData } = useContext(PlakaContext)

    useEffect(() => {
        if (plaka.length === 1) {
            YakitDataGetByIdService(plaka[0].id).then(res => setData(res.data))
        }
    }, [plaka])

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
            disabled={plaka.length === 1}
        />
    )
}

Plaka.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Plaka
