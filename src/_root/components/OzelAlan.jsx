import { useEffect, useState } from "react"
import TextInput from "./TextInput"
import { OzelAlanReadService } from "../../api/service"


const OzelAlan = ({ form }) => {
    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: "Özel Alan 1",
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: "Özel Alan 2",
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: "Özel Alan 3",
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: "Özel Alan 4",
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: "Özel Alan 5",
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: "Özel Alan 6",
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: "Özel Alan 7",
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: "Özel Alan 8",
        },
    ])

    useEffect(() => {
        OzelAlanReadService(form).then(res => {
            const apiData = res.data;
            const updatedFields = fields.map(field => {
                const apiFieldName = field.label;
                if (apiData.hasOwnProperty(apiFieldName)) {
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

    return (
        <>
            {fields.map(field => {
                return (
                    <div key={field.label} className="col-12 md:col-6 lg:col-4">
                        <TextInput label={field.value} name={field.label} />
                    </div>
                )
            })}
        </>
    )
}

export default OzelAlan
