import { useState } from 'react'
import { FunnelPlotOutlined } from "@ant-design/icons"
import { Button, Drawer, Input } from 'antd'

const options = [
    {
        value: 'aracId',
        label: 'ARAÇ ID',
    },
    {
        value: 'plaka',
        label: 'ARAÇ PLAKA',
    },
    {
        value: 'aracTip',
        label: 'ARAÇ TİP',
    },
    {
        value: 'marka',
        label: 'MARKA',
    },
    {
        value: 'model',
        label: 'MODEL',
    },
    {
        value: 'grup',
        label: 'GRUP',
    },
    {
        value: 'renk',
        label: 'RENK',
    },
    {
        value: 'yil',
        label: 'ÜRETİM YILI',
    },
    {
        value: 'yakitTip',
        label: 'YAKIT TİPİ',
    },
]

const Filter = ({ setVehiclesData }) => {

    const [openDrawer, setOpenDrawer] = useState(false);
    const [filter, setFilter] = useState({
        aracId: "",
        plaka: "",
        aracTip: "",
        marka: "",
        model: "",
        grup: "",
        renk: "",
        yil: "",
        yakitTip: ""
    })

    const showDrawer = () => {
        setOpenDrawer(true);
    };
    const onCloseDrawer = () => {
        setOpenDrawer(false);
    };

    const title = (
        <div className='flex justify-between align-center'>
            <p><FunnelPlotOutlined /> Filtreler</p>
            <div className='flex gap-1'>
                <Button className='cancel-btn'>Temizle</Button>
                <Button className='primary-btn'>Uygula</Button>
            </div>
        </div>
    )

    return (
        <div>
            <Button className="primary-btn" onClick={showDrawer}>
                <FunnelPlotOutlined /> Filtreler
            </Button>
            <Drawer title={title} onClose={onCloseDrawer} open={openDrawer}>
                <div className="flex flex-col gap-1">
                    {options.map(option => (
                        <div key={option.value} className="border grid gap-1 p-10 align-center">
                            <label htmlFor={option.value} className='col-span-3'>{option.label}</label>
                            <Input className='col-span-9' onChange={e => setFilter({ ...filter, [option.value]: e.target.value })} />
                        </div>
                    ))}

                </div>
            </Drawer>
        </div>
    )
}

export default Filter
