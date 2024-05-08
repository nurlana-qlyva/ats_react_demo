import { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { Input, InputNumber } from "antd"
import { SpecialFieldsReadService, SpecialFieldsUpdateService } from "../../../api/service"
import SelectInput from "./SelectInput"

const SpecialFields = ({ form, control, setValue }) => {
    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: "Özel Alan 1",
            type: 'text'
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: "Özel Alan 2",
            type: 'text'
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: "Özel Alan 3",
            type: 'text'
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: "Özel Alan 4",
            type: 'text'
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: "Özel Alan 5",
            type: 'text'
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: "Özel Alan 6",
            type: 'text'
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: "Özel Alan 7",
            type: 'text'
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: "Özel Alan 8",
            type: 'text'
        },
        {
            label: "ozelAlan9",
            key: "OZELALAN_9",
            value: "Özel Alan 9",
            type: 'select',
            code: 865,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 866,
            name2: "ozelAlanKodId10"
        },
        {
            label: "ozelAlan11",
            key: "OZELALAN_11",
            value: "Özel Alan 11",
            type: 'number'
        },
        {
            label: "ozelAlan12",
            key: "OZELALAN_12",
            value: "Özel Alan 12",
            type: 'number'
        },
    ])

    useEffect(() => {
        SpecialFieldsReadService(form).then(res => {
            const apiData = res.data;
            const updatedFields = fields.map(field => {
                const apiFieldName = field.label;
                if (apiData?.hasOwnProperty(apiFieldName)) {
                    // Update label and value based on API data
                    return {
                        ...field,
                        value: apiData[apiFieldName], // Update value
                        label: apiFieldName, // Update label if needed
                    };
                } else {
                    return field; // Return unchanged if not found in API data
                }
            });
            setFields(updatedFields); // Update the fields state
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
