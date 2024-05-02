import { useContext, useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { Controller } from 'react-hook-form';
import { DataContext } from '../pages/araclar/components/add-modal/DataContext';
import { CodeSelectService } from '../../api/service';


const SelectBox = ({ control, label, name, selectID, value }) => {
    const [selectData, setSelectData] = useState([]);
    const { data, setData } = useContext(DataContext);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleRequest = () => {
        if (selectID && !isLoaded && selectData.length === 0) {
            CodeSelectService(selectID).then(res => {
                setSelectData(res.data);
                setIsLoaded(true);
            });
        }
    }

    const selectedTemplate = (option, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.codeText}</div>
                </div>
            );
        }
        return <span>{props.placeholder ? props.placeholder : props.name}</span>;
    };

    const optionTemplate = (option) => {
        return (
            <>
                <div className="flex align-items-center">
                    <div>{option.codeText}</div>
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
                        value={data && data[name] ? data[name] : value}
                        defaultValue={value}
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
                        placeholder={value}
                    />
                )}
            />
        </div>
    );
};

export default SelectBox;
