import { useState } from "react"
import { Controller } from "react-hook-form"
import PropTypes from 'prop-types'
import { Select } from "antd"
import { CodeControlService } from "../../../api/service"

const SelectInput = ({ control, name, label, selectID, name2, setValue, filter, placeholder }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        CodeControlService(selectID).then(res => {
            setData(res.data)
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
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
                        onClick={handleClickSelect}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                setValue(name, "")
                                setValue(name2, -1)
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (!selectedOption) {
                                    setValue(filter, "")
                                }
                            } else {
                                setValue(name2, e)
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (selectedOption) {
                                    setValue(filter, selectedOption.codeText)
                                }
                            }
                        }}
                        placeholder={placeholder}
                    />
                )}
            />
        </div>
    )
}


SelectInput.propTypes ={
    control: PropTypes.func,
    setValue: PropTypes.func,
    name2: PropTypes.string,
    name: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    filter: PropTypes.string,
    selectID: PropTypes.number,
}

export default SelectInput
