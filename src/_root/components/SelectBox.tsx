import { useContext, useEffect, useState } from 'react';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Controller } from 'react-hook-form';
import { DataContext } from '../pages/araclar/components/add-modal/DataContext';
import { CodeSelectService } from '../../api/service';

interface SelectOptionValue {
    codeDelete: boolean;
    codeText: string;
    codeUpdate: boolean;
    codeView: boolean;
    id: number;
    siraNo: number;
}

const SelectBox = ({ control, label, name, selectID }) => {
    const [selectData, setSelectData] = useState<SelectOptionValue[]>([]);
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

    const selectedTemplate = (option: SelectOptionValue, props) => {
        if (option) {
            return (
                <div className="flex align-items-center">
                    <div>{option.codeText}</div>
                </div>
            );
        }
        return <span>{props.name}</span>;
    };

    const optionTemplate = (option: SelectOptionValue) => {
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
                        value={data ? data[name] : null}
                        onChange={(e: DropdownChangeEvent) => {
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

export default SelectBox;
