import { useContext, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from 'react-hook-form';
import { DataContext } from '../pages/araclar/components/add-modal/DataContext';
import { MaterialListSelectService } from '../../api/service';


const MaterialListSelectbox = ({ control, label, name, type }) => {
    const [selectData, setSelectData] = useState([]);
    const { data, setData } = useContext(DataContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleRequest = () => {
        if (type && !isLoaded && selectData.length === 0) {
            MaterialListSelectService(type).then(res => {
                setSelectData(res.data);
                setIsLoaded(true);
            });
        }
    }

    const selectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.tanim}</div>
                </div>
            );
        }
        return <span>{props.name}</span>;
    };

    const optionTemplate = (option) => {
        return (
            <>
                <div className="flex align-items-center">
                    <div>{option.tanim}</div>
                </div>
            </>
        );
    };

    return (
        <div className="flex flex-column gap-2">
            <label htmlFor={name}>{label}</label>
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Dropdown
                        {...field}
                        value={data ? data[name] : null}
                        onChange={(e) => {
                            setData({ ...data, [name]: e.value });
                            field.onChange(e.value);
                        }}
                        onClick={handleRequest}
                        options={selectData}
                        optionLabel="codeText"
                        filter
                        valueTemplate={selectedTemplate}
                        itemTemplate={optionTemplate}
                        className="w-full"
                    />
                )}
            />
        </div>
    );
};

export default MaterialListSelectbox;
