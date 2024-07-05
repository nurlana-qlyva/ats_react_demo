import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Select } from 'antd'
import { CodeControlByUrlService } from '../../../../api/services/code/services'

const Firma = () => {
    const [data, setData] = useState([])
    const { setValue, watch, control } = useFormContext()

    const handleClick = () => {
        CodeControlByUrlService('Company/GetCompaniesList').then(res => {
            setData(res.data)
        })
    }

    return (
        <Controller
            name="firmaId"
            control={control}
            render={({ field }) => (
                <Select
                    {...field}
                    showSearch
                    allowClear
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
                    }
                    filterSort={(optionA, optionB) =>
                        (optionA?.label.toLowerCase() ?? '').localeCompare((optionB?.label.toLowerCase() ?? ''))
                    }
                    options={data.map((item) => ({
                        label: item.kod,
                        value: item.firmaId,
                    }))}
                    value={watch('firma')}
                    onClick={handleClick}
                    onChange={e => {
                        field.onChange(e)
                        if (e === undefined) {
                            setValue('tedarikciKod', "")
                            setValue('unvan', "")
                        } else {
                            const selectedOption = data.find(option => option.firmaId === e)
                            if (selectedOption) {
                                setValue('tedarikciKod', selectedOption.kod)
                                setValue('unvan', selectedOption.unvan)
                            }
                        }
                    }}
                />
            )}
        />

    )
}

export default Firma
