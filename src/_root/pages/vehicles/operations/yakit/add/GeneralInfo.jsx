import { useContext, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { Button, Checkbox, ConfigProvider, DatePicker, Input, InputNumber, Modal, TimePicker } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { PlakaContext } from '../../../../../../context/plakaSlice'
import { FuelTankContext } from '../../../../../../context/fuelTankSlice'
import { DetailInfoUpdateService, KMValidateService, YakitHistoryGetService } from '../../../../../../api/service'
import Driver from '../../../../../components/form/Driver'
import FuelType from '../../../../../components/form/FuelType'
import FuelTank from '../../../../../components/form/FuelTank'
import Plaka from '../../../../../components/form/Plaka'

dayjs.locale('tr')

const GeneralInfo = () => {
    const { control, setValue, watch } = useFormContext()
    const { data } = useContext(PlakaContext)
    const { setId } = useContext(FuelTankContext)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setValue("surucuId", data.surucuId)
        setValue("tarih", dayjs(new Date()))
        setValue("saat", dayjs(new Date()))
        setValue("sonAlinanKm", data.sonAlinanKm)
        setValue("litreFiyat", data.litreFiyat)
        setValue("yakitHacmi", data.yakitHacmi)
        setValue("yakitTip", data.yakitTip)
        setValue("yakitTipId", data.yakitTipId)
        setValue("yakitTanki", data.yakitTanki)
        setId(data.yakitTipId)
        setValue("plaka", data.plaka)
        setValue("birim", data.birim)
    }, [data])

    useEffect(() => {
        if (watch("fullDepo")) {
            if (watch("farkKm") > 0) {
                const tktm = (watch("miktar") / watch("farkKm")).toFixed(2);
                setValue("tuketim", tktm)
            } else {
                setValue("tuketim", 0)
            }
        } else {
            if (!watch("fullDepo")) {
                if (watch("farkKm") > 0) {
                    const tktm = (data.miktar / watch("farkKm")).toFixed(2);
                    setValue("tuketim", tktm)
                } else {
                    setValue("tuketim", 0)
                }
            } else {
                if (data.yakitHacmi === 0) {
                    console.log(1)
                }

                const tktm = (watch("yakitHacmi") / watch("farkKm")).toFixed(2);
                setValue("tuketim", tktm)
            }
        }
    }, [])

    const handlePressAlinanKm = e => {
        const fark = +e.target.value - watch("sonAlinanKm")
        setValue("farkKm", fark)
    }

    const handlePressFarkKm = e => {
        const alinanKm = watch("sonAlinanKm") + +e.target.value
        setValue("alinanKm", alinanKm)
    }

    const handlePressMiktar = e => {
        const tutar = +e.target.value * watch("litreFiyat")
        setValue("tutar", tutar)
    }

    const handlePressTutar = e => {
        const miktar = +e.target.value / watch("litreFiyat")
        setValue("miktar", Math.round(miktar))
    }

    const handlePressLitreFiyat = e => {
        const miktar = watch("tutar") / +e.target.value
        setValue("miktar", Math.round(miktar))
    }

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn">
                Kaydet
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setOpen(false)
            }}>
                İptal
            </Button>
        ]
    )

    return (
        <>
            <div className="grid gap-4 border p-10">
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="plaka">Plaka</label>
                                <Controller
                                    name="plaka"
                                    control={control}
                                    render={({ field }) => (
                                        <Plaka field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="surucuId">Sürücü</label>
                                <Controller
                                    name="surucuId"
                                    control={control}
                                    render={({ field }) => (
                                        <Driver field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Tarih</label>
                                <Controller
                                    name="tarih"
                                    control={control}
                                    render={({ field }) => (
                                        <ConfigProvider locale={tr_TR}>
                                            <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                                field.onChange(e)
                                            }} />
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Saat</label>
                                <Controller
                                    name="saat"
                                    control={control}
                                    render={({ field }) => (
                                        <TimePicker {...field} placeholder="" format="HH:mm" onChange={e => {
                                            field.onChange(e)
                                        }} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>Yakıt Tipi</label>
                                <Controller
                                    name="yakitTipId"
                                    control={control}
                                    render={({ field }) => (
                                        <FuelType field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label>Stoktan Kullanım</label>
                            <Controller
                                name="stokKullanimi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} onChange={e => field.onChange(e.target.checked)} />}
                            />
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Yakıt Tankı -- ?</label>
                                <Controller
                                    name="yakitTanki"
                                    control={control}
                                    render={({ field }) => (
                                        <FuelTank field={field} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 border p-10 mt-10">
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label> Son Alınan Km</label>
                                <Controller
                                    name="sonAlinanKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            readOnly
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Yakıtın Alındığı Km</label>
                                <Controller
                                    name="alinanKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            className="w-full"
                                            // style={response === 'error' ? { borderColor: "#f00" } : response === "success" ? { borderColor: "#0f0" } : { color: '#000' }}
                                            {...field}
                                            // onPressEnter={handleValidateKm}
                                            onPressEnter={handlePressAlinanKm}
                                            onChange={e => {
                                                field.onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label> Fark Km</label>
                                <Controller
                                    name="farkKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onPressEnter={handlePressFarkKm}
                                            onChange={e => {
                                                field.onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex align-baseline justify-between">
                                    <label htmlFor="miktar" >Miktar (lt)</label>
                                    <Button className="depo" onClick={() => setOpen(true)}>Depo Hacmi: {watch("yakitHacmi")} {watch("birim") === "LITRE" && "lt"}</Button>
                                </div>
                                <Controller
                                    name="miktar"
                                    control={control}
                                    render={({ field }) => <InputNumber
                                        className="w-full"
                                        {...field}
                                        onPressEnter={handlePressMiktar}
                                        onChange={(e => {
                                            field.onChange(e)
                                        })}
                                    />}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="grid">
                                <div className="col-span-6 flex flex-col">
                                    <label htmlFor="">Full Depo</label>
                                    <Controller
                                        control={control}
                                        name="fullDepo"
                                        render={({ field }) => <Checkbox {...field} onChange={e => {
                                            field.onChange(e.target.checked)
                                        }} />}
                                    />
                                </div>
                                <div className="col-span-6">
                                    <div className="flex flex-col gap-1">
                                        <label>Ortalama Tuketim <ArrowUpOutlined style={{ color: 'red' }} /></label>
                                        <Controller
                                            name="tuketim"
                                            control={control}
                                            render={({ field }) => (
                                                <Input
                                                    {...field}
                                                    readOnly
                                                />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Litre Fiyatı</label>
                                <Controller
                                    name="litreFiyat"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onPressEnter={handlePressLitreFiyat}
                                            onChange={e => field.onChange(e)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Tutar</label>
                                <Controller
                                    name="tutar"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onPressEnter={handlePressTutar}
                                            onChange={e => field.onChange(e)}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                open={open}
                maskClosable={false}
                title="Depo Hacmi Girişi"
                footer={footer}
                onCancel={() => setOpen(false)}
            >
                <Controller
                    name="yakitHacmi"
                    control={control}
                    render={({ field }) => (
                        <Input
                            {...field}
                            onChange={e => field.onChange(e.target.value)}
                        />
                    )}
                />
            </Modal>

        </>
    )
}

export default GeneralInfo

