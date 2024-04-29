import { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import { CodeCustomSelectService } from '../../api/service';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Tree } from 'primereact/tree';

const Location = ({ control, label, name, url, onChangeValue  }) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false);
    const [nodes, setNodes] = useState([]);
    const [selectedNodeKey, setSelectedNodeKey] = useState('');

    const handleCLick = () => {
        setVisible(!visible)
        if (url && !isLoaded && data.length === 0) {
            CodeCustomSelectService(url).then(res => {
                setData(res.data);
                setIsLoaded(true);
            });
        }
    }

    const transformData = (data, parentId = 0) => {
        const result = [];
        for (const item of data) {
            if (item.anaLokasyonId === parentId) {
                const children = transformData(data, item.lokasyonId);
                const newItem = {
                    key: item.lokasyonId.toString(),
                    label: item.lokasyonTanim,
                    children: children.length ? children : null,
                };
                result.push(newItem);
            }
        }
        return result;
    };

    useEffect(() => {
        setNodes(transformData(data));
    }, [data]);

    const onSelect = (event) => {
        setValue({
            key: event.node.key,
            label: event.node.label,
            lokasyon: event.node.label
        });
        setSelectedNodeKey(event.node.key);

        onChangeValue(event.node.key);
    };

    return (
        <div className="flex flex-column gap-2">
            <label htmlFor={name}>{label}</label>
            <div className='grid'>
                <div className="col-12 md:col-10">
                    <InputText value={value.label} readOnly />
                
                </div>
                <div className="col-12 md:col-2 popup">
                    <Button icon="pi pi-plus" onClick={handleCLick} />
                    {
                        visible && (
                            <div className="card flex justify-content-center popup-dialog">
                                <Tree value={nodes} selectionKeys={selectedNodeKey} onSelectionChange={(e) => setSelectedNodeKey(e.value)} selectionMode="single" onSelect={onSelect} className="w-full md:w-30rem" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default Location;
