import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select } from 'antd'
import { CodeControlByUrlService } from '../../../../api/services/code/services'

const Driver = () => {
    const [data, setData] = useState([])
    const { watch, setValue, control } = useFormContext()

    const handleClickSelect = () => {
        CodeControlByUrlService("Driver/GetDriverList").then(res => {
            setData(res.data)
        })
    }

    return (
        <Controller
            name="surucuId"
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
                    options={data.map((item) => ({
                        label: item.isim,
                        value: item.surucuId,
                    }))}
                    value={watch('surucu')}
                    onClick={handleClickSelect}
                    onChange={e => {
                        field.onChange(e)
                        if (e === undefined) {
                            const selectedOption = data.find(option => option.surucuId === e);
                            if (!selectedOption) {
                                setValue('surucu', "")
                            }
                        } else {
                            const selectedOption = data.find(option => option.surucuId === e);
                            if (selectedOption) {
                                setValue('surucu', selectedOption.isim)
                            }
                        }
                    }}
                />
            )}
        />
    )
}

export default Driver
