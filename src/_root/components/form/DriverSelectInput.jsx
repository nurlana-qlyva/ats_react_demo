import { Select } from "antd"
import { useState } from "react";
import { Controller } from "react-hook-form";
import { CustomCodeControlService } from "../../../api/service";


const DriverSelectInput = ({ control, setValue, name2 }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        CustomCodeControlService("Driver/GetDriverListForInput").then(res => {
            setData(res.data)
        })
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="surucu">Sürücü</label>
            <Controller
                name="surucu"
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
                            label: item.isim,
                            value: item.surucuId,
                        }))}
                        onClick={handleClickSelect}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                field.onChange("")
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

export default DriverSelectInput
