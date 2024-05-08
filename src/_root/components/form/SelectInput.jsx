import { Select } from "antd"
import { useState } from "react";
import { Controller } from "react-hook-form";
import { CodeControlService } from "../../../api/service";

const SelectInput = ({ control, name, label, selectID, name2, setValue }) => {
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
                            }else {
                                setValue(name2, e)
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

export default SelectInput
