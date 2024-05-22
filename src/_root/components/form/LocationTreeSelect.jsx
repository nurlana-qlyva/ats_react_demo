import { useState } from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import { CustomCodeControlService } from '../../../api/service'

const convertToFormat = (data, parentId = 0) => {
    const result = [];

    data.forEach(item => {
        if (item.anaLokasyonId === parentId) {
            const newItem = {
                value: item.lokasyonId,
                id: item.lokasyonId,
                title: item.lokasyonTanim,
                icon: <CarryOutOutlined />,
                children: convertToFormat(data, item.lokasyonId)
            };
            result.push(newItem);
        }
    });

    return result;
};

const LocationTreeSelect = ({ control, setValue, name2 }) => {
    const [data, setData] = useState([])

    const handleClickTree = () => {
        CustomCodeControlService("Location/GetLocationList").then(res => setData(res.data))
    }

    return (
        <div className="flex flex-col gap-1">
            <label htmlFor="lokasyon">Lokasyon</label>
            <Controller
                name='lokasyon'
                control={control}
                render={({ field }) => (
                    <TreeSelect
                        {...field}
                        showSearch
                        allowClear
                        dropdownStyle={{
                            maxHeight: 400,
                            overflow: 'auto',
                        }}
                        className='w-full'
                        treeLine={true}
                        treeData={convertToFormat(data)}
                        onClick={handleClickTree}
                        onChange={e => {
                            field.onChange(e)
                            if (e === undefined) {
                                field.onChange("")
                                setValue(name2, -1)
                            } else {
                                setValue(name2, e)
                            }
                        }}
                    />
                )}
            />

        </div>

    );
}

LocationTreeSelect.propTypes ={
    control: PropTypes.func,
    label: PropTypes.string,
    setValue: PropTypes.func,
    name2: PropTypes.string,
}

export default LocationTreeSelect
