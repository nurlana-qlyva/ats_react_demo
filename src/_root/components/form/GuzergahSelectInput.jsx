import { useState } from "react"
import { Controller } from "react-hook-form"
import PropTypes from 'prop-types'
import { Select } from "antd"
import { CustomCodeControlService } from "../../../api/service"

const GuzergahSelectInput = ({ control, setValue, name2 }) => {
    const [data, setData] = useState([]);

    const handleClickSelect = () => {
        CustomCodeControlService("FuelRoute/GetFuelRoutesList").then(res => setData(res.data))
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="guzergah">Güzergah</label>
            <Controller
                name="guzergah"
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
                            label: item.guzergah,
                            value: item.guzergahId,
                        }))}
                        onClick={handleClickSelect}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                field.onChange("")
                                setValue(name2, -1)
                                const selectedOption = data.find(option => option.guzergahId === e);
                                if (!selectedOption) {
                                    setValue("markaFilter", "")
                                }
                            }else {
                                setValue(name2, e)
                                const selectedOption = data.find(option => option.guzergahId === e);
                                if (selectedOption) {
                                    setValue("markaFilter", selectedOption.guzergah)
                                }
                            }
                        }}
                    />
                )}
            />
        </div>
    )
}

GuzergahSelectInput.propTypes ={
    control: PropTypes.func,
    setValue: PropTypes.func,
    name2: PropTypes.string,
}

export default GuzergahSelectInput
