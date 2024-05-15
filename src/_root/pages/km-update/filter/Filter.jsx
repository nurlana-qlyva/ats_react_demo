import { useState } from 'react'
import { SearchOutlined } from "@ant-design/icons"
import { IoIosRefresh } from "react-icons/io";
import { Button, Select } from 'antd'
import SelectInput from '../../../components/form/SelectInput';
import { CustomCodeControlService, KMGetByIdService } from '../../../../api/service';


const Filter = ({ setDataSource, setTableParams, tableParams, control }) => {

  const [plaka, setPlaka] = useState(0)

  const [data, setData] = useState([]);

  const handleClickSelect = () => {
    CustomCodeControlService("Vehicle/GetVehiclePlates").then(res => {
      setData(res.data)
    })
  }

  const getPlaka = () => {
    KMGetByIdService(plaka, 1).then(res => {
      setDataSource(res?.data.km_list)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res?.data.total_count,
        },
      });
    })
  }

  return (
    <div className='flex flex-col gap-1'>
      <div className="grid gap-1 align-center">
        <div className="col-span-2">
          <div className="flex flex-col gap-1">
            <label htmlFor="plaka">Plaka</label>
            <Select
              showSearch
              allowClear
              optionFilterProp="children"
              filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
              filterSort={(optionA, optionB) =>
                (optionA?.label.toLowerCase() ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
              }
              options={data.map((item) => ({
                label: item.plaka,
                value: item.aracId,
              }))}
              onClick={handleClickSelect}
              onChange={e => {
                setPlaka(e)
              }}
            />
          </div>
        </div>
        <div className="col-span-2">
          <SelectInput control={control} name="aracTip" label="Araç Tipi" />
        </div>
        <div className="col-span-2">
          <SelectInput control={control} name="lokasyon" label="Lokasyon" />
        </div>
        <div className="col-span-2">
          <SelectInput control={control} name="departman" label="Departman" />
        </div>
        <div className="col-span-2 self-end flex gap-1">
          <Button className="primary-btn" onClick={getPlaka}>
            <SearchOutlined />
          </Button>
          <Button className="cancel-btn">
            <IoIosRefresh />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Filter
