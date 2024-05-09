import { Select } from "antd"
import { useState } from "react";
import { Controller } from "react-hook-form";
import { CustomCodeControlService } from "../../../api/service";


const ModelSelectInput = ({ control, setValue, name2 }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        CustomCodeControlService("Model/GetModelList").then(res => {
            setData(res.data)
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="model">Model</label>
            <Controller
                name="model"
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
                            label: item.modelDef,
                            value: item.siraNo,
                        }))}
                        onClick={handleClickSelect}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                field.onChange("")
                                setValue(name2, -1)
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (!selectedOption) {
                                    setValue("modelFilter", "")
                                }
                            }else {
                                setValue(name2, e)
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (selectedOption) {
                                    setValue("modelFilter", selectedOption.modelDef)
                                }
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

export default ModelSelectInput
