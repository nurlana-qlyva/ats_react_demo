import { Select } from "antd"
import { useState } from "react";
import { Controller } from "react-hook-form";
import { CustomCodeControlService } from "../../../api/service";


const CompanySelectInput = ({ control, setValue, name2 }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        CustomCodeControlService("Company/GetCompaniesList").then(res => setData(res.data))
    }
    
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="firma">Firma</label>
            <Controller
                name="firma"
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
                            label: item.unvan,
                            value: item.firmaId,
                        }))}
                        onClick={handleClickSelect}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                field.onChange("")
                                setValue(name2, -1)
                                const selectedOption = data.find(option => option.firmaId === e);
                                if (!selectedOption) {
                                    setValue("markaFilter", "")
                                }
                            }else {
                                setValue(name2, e)
                                const selectedOption = data.find(option => option.firmaId === e);
                                if (selectedOption) {
                                    setValue("markaFilter", selectedOption.unvan)
                                }
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

export default CompanySelectInput
