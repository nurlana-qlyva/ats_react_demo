import { useState } from 'react'
import PropTypes from 'prop-types';
// antd
import { FunnelPlotOutlined } from "@ant-design/icons"
import { Button, Drawer } from 'antd'
// components
import SelectInput from '../../../components/form/SelectInput'
import MarkaSelectInput from '../../../components/form/MarkaSelectInput'
import ModelSelectInput from '../../../components/form/ModelSelectInput'
import TextInput from '../../../components/form/TextInput'
import NumberInput from '../../../components/form/NumberInput'
import MaterialListSelect from '../../../components/form/MaterialListSelect'
import { useForm } from 'react-hook-form';

const Filter = ({ filter, clearFilters }) => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const defaultValues = {
        aracId: "",
        plaka: "",
        model: "",
        marka: "",
        aracTip: "",
        grup: "",
        renk: "",
        yil: "",
        yakitTip: "",
    }
    const methods = useForm({
        defaultValues: defaultValues
    })
    const { control, handleSubmit, reset, setValue } = methods

    const handleSearchFilters = handleSubmit((values) => {
        if (!values.aracId && !values.aracTip && !values.model && !values.marka && !values.plaka && !values.yakitTip && !values.grup && !values.renk && !values.yil) {
            setHasValue(false)
        } else {
            setHasValue(true)
        }

        const data = {
            aracId: +values.aracId,
            plaka: values.plaka || '',
            model: values.modelFilter || '',
            marka: values.markaFilter || '',
            aracTip: values.aracTipFilter || '',
            grup: values.grupFilter || '',
            renk: values.renkFilter || '',
            yil: +values.yil || 0,
            yakitTip: values.yakitFilter || '',
        }

        filter(data)
    })

    const clear = () => {
        reset()
        setHasValue(false)
        clearFilters()
    }

    const showDrawer = () => {
        setOpenDrawer(true);
    }
    const onCloseDrawer = () => {
        setOpenDrawer(false);
    }

    const title = (
        <div className='flex justify-between align-center'>
            <p><FunnelPlotOutlined /> Filtreler</p>
            <div className='flex gap-1'>
                <Button className='cancel-btn' onClick={() => {
                    clear()
                    setOpenDrawer(false)
                }}>Temizle</Button>
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
                {hasValue && <div className='filter-icon' />}
                <FunnelPlotOutlined /> Filtreler
            </Button>
            <Drawer title={title} onClose={onCloseDrawer} open={openDrawer}>
                <div className="grid gap-1">
                    <div className="col-span-6 border p-10 align-center">
                        <TextInput control={control} name="plaka" label="Plaka" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <SelectInput control={control} name="aracTip" label="Araç Tip" setValue={setValue} selectID="100" filter="aracTipFilter" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <MarkaSelectInput control={control} setValue={setValue} />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <ModelSelectInput control={control} setValue={setValue} />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <SelectInput control={control} name="grup" label="Araç Grup" setValue={setValue} selectID="101" filter="grupFilter" />
                    </div>
                    <div className="col-span-6 border p-10 align-center">
                        <SelectInput control={control} name="renk" label="Renk" selectID="111" filter="renkFilter" setValue={setValue} />
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

// props types
Filter.propTypes = {
    clearFilters: PropTypes.func,
    filter: PropTypes.func,
}

export default Filter
