import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button, Drawer, Input, InputNumber } from 'antd'
import { FunnelPlotOutlined } from '@ant-design/icons'
import VehicleType from '../../../components/form/VehicleType'
import Marka from '../../../components/form/Marka'
import Model from '../../../components/form/Model'
import VehicleGroup from '../../../components/form/VehicleGroup'
import Renk from '../../../components/form/Renk'
import FuelType from '../../../components/form/FuelType'

const Filter = ({ filter, clearFilters }) => {
    const [openDrawer, setOpenDrawer] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    const defaultValues = {
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
            plaka: values.plaka || '',
            model: values.model || '',
            marka: values.marka || '',
            aracTip: values.aracTip || '',
            grup: values.grup || '',
            renk: values.renk || '',
            yil: values.yil || 0,
            yakitTip: values.yakitTip || '',
        }

        filter(data)
    })

    const clear = () => {
        reset()
        setHasValue(false)
        clearFilters()
    }

    const title = (
        <div className='flex justify-between align-center'>
            <p><FunnelPlotOutlined /> Filtreler</p>
            <div className='flex gap-1'>
                <Button className='btn btn-min cancel-btn' onClick={() => {
                    clear()
                    setOpenDrawer(false)
                }}>Temizle</Button>
                <Button className='btn btn-min primary-btn' onClick={() => {
                    handleSearchFilters()
                    setOpenDrawer(false)
                }}>Uygula</Button>
            </div>
        </div>
    )

    return (
        <>
            <Button className="btn primary-btn" onClick={() => setOpenDrawer(true)}>
                {hasValue && <div className='filter-icon' />}
                <FunnelPlotOutlined /> Filtreler
            </Button>
            <Drawer title={title} onClose={() => setOpenDrawer(false)} open={openDrawer}>
                <FormProvider {...methods}>
                    <div className="grid gap-1">
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="plaka">Plaka</label>
                                <Controller
                                    name="plaka"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aracTipId">Araç Tipi</label>
                                <Controller
                                    name="aracTipId"
                                    control={control}
                                    render={({ field }) => (
                                        <VehicleType field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="markaId">Marka</label>
                                <Controller
                                    name="markaId"
                                    control={control}
                                    render={({ field }) => (
                                        <Marka field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="modelId">Model</label>
                                <Controller
                                    name="modelId"
                                    control={control}
                                    render={({ field }) => (
                                        <Model field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aracGrubuId">Araç Grup</label>
                                <Controller
                                    name="aracGrubuId"
                                    control={control}
                                    render={({ field }) => (
                                        <VehicleGroup field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aracRenkId">Renk</label>
                                <Controller
                                    name="aracRenkId"
                                    control={control}
                                    render={({ field }) => (
                                        <Renk field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="yil">Model Yılı</label>
                                <Controller
                                    name="yil"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className="w-full"
                                            onChange={(e) => {
                                                field.onChange(e)
                                                if (e === null) {
                                                    setValue('yil', 0)
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 border p-10 align-center">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="yakitId">Yakıt Tipi</label>
                                <Controller
                                    name="yakitId"
                                    control={control}
                                    render={({ field }) => (
                                        <FuelType field={field} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </FormProvider>
            </Drawer>
        </>
    )
}

Filter.propTypes = {
    filter: PropTypes.func,
    clearFilters: PropTypes.func,
}

export default Filter
