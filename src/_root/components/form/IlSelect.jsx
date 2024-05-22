import { useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types'
import { Select } from "antd"
import { CustomCodeControlService } from "../../../api/service";

const IlSelect = ({ control, name, label, setValue, name2 }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        CustomCodeControlService("Town/GetTownList").then(res => {
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
                            label: item.tanim,
                            value: item.sehirId,
                        }))}
                        onClick={handleClickSelect}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                field.onChange("")
                                setValue(name2, -1)
                            } else {
                                setValue(name2, e)
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

IlSelect.propTypes ={
    control: PropTypes.func,
    name: PropTypes.string,
    label: PropTypes.string,
    setValue: PropTypes.func,
    name2: PropTypes.string,
}

export default IlSelect
