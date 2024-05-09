import { useState } from 'react'
import { FunnelPlotOutlined } from "@ant-design/icons"
import { Button, Drawer } from 'antd'
import SelectInput from '../../../../components/form/SelectInput'
import MarkaSelectInput from '../../../../components/form/MarkaSelectInput'
import ModelSelectInput from '../../../../components/form/ModelSelectInput'
import TextInput from '../../../../components/form/TextInput'
import NumberInput from '../../../../components/form/NumberInput'
import MaterialListSelect from '../../../../components/form/MaterialListSelect'

const Filter = ({ control, setValue, handleSearchFilters, clear, hasValue }) => {

    const [openDrawer, setOpenDrawer] = useState(false);

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
                <Button className='cancel-btn' onClick={clear}>Temizle</Button>
                <Button className='primary-btn' onClick={() => {
                    handleSearchFilters()
                    setOpenDrawer(false)
                }}>Uygula</Button>
            </div>
        </div>
    )

    return (
        <div>
            <Button className="primary-btn" onClick={showDrawer}>
                {hasValue && <div className='filter-icon'/>}
                <FunnelPlotOutlined /> Filtreler
            </Button>
            <Drawer title={title} onClose={onCloseDrawer} open={openDrawer}>
                <div className="grid gap-1">
                    <div className="col-span-6 border p-10 align-center">
                        <TextInput control={control} name="aracId" label="Araç İd" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <TextInput control={control} name="plaka" label="Plaka" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <SelectInput control={control} name="aracTip" label="Araç Tip" setValue={setValue} selectID="100" filter="aracTipFilter" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <MarkaSelectInput control={control} />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <ModelSelectInput control={control} />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <SelectInput control={control} name="grup" label="Araç Grup" setValue={setValue} selectID="101" filter="grupFilter" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <SelectInput control={control} name="renk" label="Renk" selectID="111" filter="renkFilter" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <NumberInput control={control} name="yil" label="Model Yılı" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <MaterialListSelect control={control} name="yakitTip" label="Yakıt Tipi" type="YAKIT" setValue={setValue} />
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default Filter
