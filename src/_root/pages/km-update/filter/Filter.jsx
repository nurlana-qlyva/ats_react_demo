import { useEffect, useState } from 'react'
import { SearchOutlined } from "@ant-design/icons"
import { IoIosRefresh, IoIosMore } from "react-icons/io";
import { Button, message, Popconfirm, Popover, Select } from 'antd'
import SelectInput from '../../../components/form/SelectInput';
import { CustomCodeControlService, KMGetByIdService } from '../../../../api/service';


const Filter = ({ setDataSource, setTableParams, tableParams, control, content, addKm, errorRows, validatedRows }) => {
  const [plaka, setPlaka] = useState(0)
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

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

  useEffect(() => {
    if (errorRows.length > 0 || validatedRows.length === 0) {
      setIsDisabled(true)
    } else if (validatedRows.length > 0 && errorRows.length === 0) {
      setIsDisabled(false)
    }
  }, [errorRows, validatedRows])

  const cancel = (e) => {
    // message.error('Click on No');
  };

  const confirm = (e) => {
    addKm()
  };

  return (
    <div className='flex flex-col gap-1'>
      <div className="grid gap-1 align-center">
        <div className="col-span-2">
          <div className="flex flex-col-gap-1">
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
              placeholder="Plaka"
              className='w-full'
            />
          </div>
        </div>
        <div className="col-span-2">
          <SelectInput control={control} name="aracTip" label="" placeholder="Araç Tipi" />
        </div>
        <div className="col-span-2">
          <SelectInput control={control} name="lokasyon" label="" placeholder="Lokasyon" />
        </div>
        <div className="col-span-2">
          <SelectInput control={control} name="departman" label="" placeholder="Departman" />
        </div>
        <div className="col-span-2 flex gap-1">
          <Button className="primary-btn" onClick={getPlaka}>
            <SearchOutlined />
          </Button>
          <Button className="cancel-btn">
            <IoIosRefresh />
          </Button>
        </div>
        <div className="col-span-2 flex justify-self gap-1">
          <Popover
            placement="bottom"
            content={content}
            trigger="click"
            open={open}
            onOpenChange={handleOpenChange}
          >
            <Button><IoIosMore /></Button>
          </Popover>

          <Popconfirm
            title="Güncelle"
            description="Hızlı km verilerini güncellemeye eminmisiniz?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button className="primary-btn km-update" disabled={isDisabled}>Güncelle</Button>
          </Popconfirm>
        </div>
      </div>
    </div>
  )
}

export default Filter
