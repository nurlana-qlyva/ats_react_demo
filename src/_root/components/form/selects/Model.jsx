import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Select } from 'antd'
import { CodeControlByUrlService } from '../../../../api/services/code/services'

const Model = () => {
    const [data, setData] = useState([])
    const { setValue, watch, control } = useFormContext()

    const handleClickSelect = () => {
        CodeControlByUrlService("Model/GetModelList").then(res => {
            setData(res.data)
        })
    }

    return (
        <Controller
            name="modelId"
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
                        label: item.modelDef,
                        value: item.siraNo,
                    }))}
                    value={watch("model")}
                    onClick={handleClickSelect}
                    onChange={e => {
                        field.onChange(e)
                        if (e === undefined) {
                            field.onChange("")
                            const selectedOption = data.find(option => option.siraNo === e);
                            if (!selectedOption) {
                                setValue("model", "")
                            }
                        } else {
                            const selectedOption = data.find(option => option.siraNo === e);
                            if (selectedOption) {
                                setValue("model", selectedOption.modelDef)
                            }
                        }
                    }}
                />
            )}
        />

    )
}

Model.propTypes = {
    field: PropTypes.shape({
        onChange: PropTypes.func,
    })
}

export default Model
