import { useContext, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select } from 'antd'
import { PlakaContext } from '../../../../context/plakaSlice'
import { GetFuelCardContentByIdService } from '../../../../api/services/vehicles/yakit/services'

const Plaka = () => {
    const { plaka, setData } = useContext(PlakaContext)
    const { setValue, control } = useFormContext()

    useEffect(() => {
        if (plaka.length === 1) {
            GetFuelCardContentByIdService(plaka[0].id).then(res => {
                setData(res.data)
            })
        }
    }, [plaka])


    const handleChange = (e) => {
        GetFuelCardContentByIdService(e).then(res => setData(res.data))
    }

    return (
        <Controller
            name="plaka"
            control={control}
            render={({ field }) => (
                <Select
                    {...field}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
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
                        if (e === undefined) {
                            const selectedOption = plaka.find(option => option.id === e);
                            if (!selectedOption) {
                                setValue('plaka', "")
                            }
                        } else {
                            const selectedOption = plaka.find(option => option.id === e);
                            if (selectedOption) {
                                setValue('plaka', selectedOption.plaka)
                            }
                        }
                    }}
                    disabled={plaka.length === 1}
                />
            )}
        />

    )
}

export default Plaka
