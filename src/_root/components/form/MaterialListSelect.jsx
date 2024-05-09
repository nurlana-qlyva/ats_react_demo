import { Select } from "antd"
import { useState } from "react";
import { Controller } from "react-hook-form";
import { MaterialListSelectService } from "../../../api/service";

const MaterialListSelect = ({ control, name, label, type, setValue, name2 }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        MaterialListSelectService(type).then(res => setData(res.data))
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
                            value: item.malzemeId,
                        }))}
                        onClick={handleClickSelect}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                field.onChange("")
                                setValue(name2, -1)
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (!selectedOption) {
                                    setValue("yakitFilter", "")
                                }
                            }else {
                                setValue(name2, e)
                                const selectedOption = data.find(option => option.malzemeId === e);
                                if (selectedOption) {
                                    setValue("yakitFilter", selectedOption.tanim)
                                }
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

export default MaterialListSelect
