import { useEffect, useState } from "react"
import { OzelAlanReadService, OzelAlanUpdateService } from "../../api/service"
import { Controller } from "react-hook-form"
import { InputText } from "primereact/inputtext"
import SelectBox from "./SelectBox"
import { InputNumber } from "primereact/inputnumber"


const OzelAlan = ({ form, control, data }) => {
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
            code: 865
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 866
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
        OzelAlanReadService(form).then(res => {
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
            OzelAlanUpdateService(form, value, field.key).then(res => console.log(res.data))

        }, 5000);
    };

    return (
        <>
            {fields.map(field => {
                if (field.type === 'text') {
                    return (
                        <div key={field.label} className="col-12 md:col-6 lg:col-4">
                            <div className="flex flex-column gap-2 ozel-alan">
                                <input
                                    id={field.label}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    value={field.value}
                                    style={{ border: "none", outline: "none" }}
                                />
                                <Controller
                                    name={field.label}
                                    control={control}
                                    render={({ field: { onChange } }) => <InputText defaultValue={data !== undefined ? data[field.label] : null} onChange={(e) => onChange(e.target.value)} />}
                                />
                            </div>
                        </div>
                    )
                } else if (field.type === 'select') {
                    return (
                        <div key={field.label} className="col-12 md:col-6 lg:col-4">
                            <div className="flex flex-column gap-2 ozel-alan">
                                <Controller
                                    name={field.label}
                                    control={control}
                                    render={({ field: { onChange } }) => <SelectBox control={control} name={field.label} label={field.value} value={data !== undefined ? data[field.label] : null} selectID={field.code} onChange={(e) => onChange(e.target.value)} />}
                                />
                            </div>
                        </div>
                    )
                } else if (field.type === 'number') {
                    return (
                        <div key={field.label} className="col-12 md:col-6 lg:col-4">
                            <div className="flex flex-column gap-2 ozel-alan">
                                <input
                                    id={field.label}
                                    onChange={(e) => handleInputChange(field, e.target.value)}
                                    value={field.value}
                                    style={{ border: "none", outline: "none" }}
                                />
                                <Controller
                                    name={field.label}
                                    control={control}
                                    render={({ field: { onChange } }) => <InputNumber value={data !== undefined ? data[field.label] : null} onValueChange={(e) => onChange(e.target.value)} />}
                                />
                            </div>
                        </div>
                    )
                }

            })}
        </>
    )
}

export default OzelAlan
