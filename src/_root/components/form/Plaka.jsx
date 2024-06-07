import { useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import { PlakaContext } from '../../../context/plakaSlice'
import { YakitDataGetByIdService } from '../../../api/service'
import { Select } from 'antd'

const Plaka = ({ field }) => {
    const { plaka, setData, data } = useContext(PlakaContext)
    const { setValue } = useFormContext()

    useEffect(() => {
        if (plaka.length === 1) {
            YakitDataGetByIdService(plaka[0].id).then(res => {
                setData(res.data)
                setValue("surucuId", data.surucuId)
                setValue("surucu", data.surucuAdi)
                setValue("tarih", dayjs(new Date()))
                setValue("saat", dayjs(new Date()))
                setValue("sonAlinanKm", data.sonAlinanKm)
                setValue("litreFiyat", data.litreFiyat)
                setValue("yakitHacmi", data.yakitHacmi)
                setValue("yakitTip", data.yakitTip)
                setValue("yakitTipId", data.yakitTipId)
                setValue("yakitTanki", data.yakitTanki)
                setValue("birim", data.birim)
                setValue("depoYakitMiktar", data.depoYakitMiktar)
            })
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
                // if (e === undefined) {
                //     const selectedOption = data.find(option => option.id === e);
                //     if (!selectedOption) {
                //         setValue('plaka', "")
                //     }
                // } else {
                //     const selectedOption = data.find(option => option.id === e);
                //     if (selectedOption) {
                //         setValue('plaka', selectedOption.plaka)
                //     }
                // }
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
