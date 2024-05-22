import { useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types'
import { Select } from "antd"
import { CustomCodeControlService } from "../../../api/service";


const MarkaSelectInput = ({ control, setValue, name2 }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        CustomCodeControlService("Mark/GetMarkList").then(res => setData(res.data))
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="marka">Marka</label>
            <Controller
                name="marka"
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
                            label: item.marka,
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
                                    setValue("markaFilter", "")
                                }
                            } else {
                                setValue(name2, e)
                                const selectedOption = data.find(option => option.siraNo === e);
                                if (selectedOption) {
                                    setValue("markaFilter", selectedOption.marka)
                                }
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

MarkaSelectInput.propTypes = {
    control: PropTypes.func,
    setValue: PropTypes.func,
    name2: PropTypes.string,
}

export default MarkaSelectInput
