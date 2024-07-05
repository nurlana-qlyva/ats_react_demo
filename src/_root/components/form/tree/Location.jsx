import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TreeSelect } from 'antd'
import { CarryOutOutlined } from '@ant-design/icons'
import { CodeControlByUrlService } from '../../../../api/services/code/services'

const convertToLocationFormat = (data, parentId = 0) => {
    const result = []

    data.forEach(item => {
        if (item.anaLokasyonId === parentId) {
            const newItem = {
                value: item.lokasyonId,
                id: item.lokasyonId,
                title: item.lokasyonTanim,
                icon: <CarryOutOutlined />,
                children: convertToLocationFormat(data, item.lokasyonId),
            };
            result.push(newItem)
        }
    });

    return result
}

const Location = () => {
    const [data, setData] = useState([])
    const { watch, setValue, control } = useFormContext()

    const handleClickTree = () => {
        CodeControlByUrlService("Location/GetLocationList").then(res => setData(res.data))
    }

    return (
        <Controller
            name="lokasyonId"
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
                    treeData={convertToLocationFormat(data)}
                    value={watch('lokasyon')}
                    onClick={handleClickTree}
                    onChange={e => {
                        field.onChange(e)
                        if (e === undefined) {
                            const selectedOption = data.find(option => option.lokasyonId === e);
                            if (!selectedOption) {
                                setValue('lokasyon', "")
                            }
                        } else {
                            const selectedOption = data.find(option => option.lokasyonId === e);

                            if (selectedOption) {
                                setValue('lokasyon', selectedOption.lokasyonTanim)
                            }
                        }
                    }}
                />
            )}
        />

    )
}

Location.propTypes = {}

export default Location
