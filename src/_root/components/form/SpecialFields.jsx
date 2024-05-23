import { useEffect } from "react"
import { Controller } from "react-hook-form"
import { Input, InputNumber } from "antd"
import { SpecialFieldsReadService, SpecialFieldsUpdateService } from "../../../api/service"
import SelectInput from "./SelectInput"

const SpecialFields = ({ form, control, setValue, fields, setFields }) => {

    useEffect(() => {
        SpecialFieldsReadService(form).then(res => {
            const apiData = res.data;
            const updatedFields = fields.map(field => {
                const apiFieldName = field.label;
                if (apiData?.hasOwnProperty(apiFieldName)) {
                    return {
                        ...field,
                        value: apiData[apiFieldName],
                        label: apiFieldName, 
                    };
                } else {
                    return field; 
                }
            });
            setFields(updatedFields);
        });
    }, [form]);

    const handleInputChange = async (field, value) => {
        const updatedFields = fields.map((fld) =>
            fld.key === field.key ? { ...fld, value } : fld
        );
        setFields(updatedFields);

        if (field.debounceTimer) {
            clearTimeout(field.debounceTimer);
        }

        field.debounceTimer = setTimeout(async () => {
            SpecialFieldsUpdateService(form, value, field.key).then(res => console.log(res.data))
        }, 5000);
    };

    return (
        <div className="grid grid-cols-12 gap-1">
            {fields.map(field => {
                if (field.type === 'text') {
                    return (
                        <div key={field.label} className="col-span-3 mt-10">
                            <div className="flex flex-col gap-1">
                                <input
                                    id={field.label}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    value={field.value}
                                    style={{ border: "none", outline: "none" }}
                                />
                                <Controller
                                    name={field.label}
                                    control={control}
                                    render={({ field }) => <Input {...field} onChange={(e) => field.onChange(e.target.value)} />}
                                />
                            </div>
                        </div>
                    )
                } else if (field.type === 'select') {
                    return (
                        <div key={field.label} className="col-span-3 mt-10">
                            <SelectInput control={control} name={field.label} label={field.value} selectID={field.code} setValue={setValue} name2={field.name2} />
                            <Controller
                                name={field.name2}
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        style={{ display: 'none' }}
                                    />
                                )}
                            />
                        </div>
                    )
                } else if (field.type === 'number') {
                    return (
                        <div key={field.label} className="col-span-3 mt-10">
                            <div className="flex flex-col gap-1">
                                <input
                                    id={field.label}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    value={field.value}
                                    style={{ border: "none", outline: "none" }}
                                />
                                <Controller
                                    name={field.label}
                                    control={control}
                                    render={({ field }) => <InputNumber {...field} className="w-full" onChange={(e) => field.onChange(e)} style={{ marginTop: "5px" }} />}
                                />
                            </div>
                        </div>
                    )
                }

            })}
        </div>
    )
}

export default SpecialFields
