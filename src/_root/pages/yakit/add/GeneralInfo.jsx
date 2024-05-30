import { useContext, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { Button, Checkbox, ConfigProvider, DatePicker, Divider, Input, InputNumber, message, Modal, TimePicker } from 'antd'
import { ArrowUpOutlined, CheckOutlined } from '@ant-design/icons'
import { PlakaContext } from '../../../../context/plakaSlice'
import { FuelTankContext } from '../../../../context/fuelTankSlice'
import Plaka from '../../../components/form/Plaka'
import Driver from '../../../components/form/Driver'
import FuelType from '../../../components/form/FuelType'
import FuelTank from '../../../components/form/FuelTank'


dayjs.locale('tr')

const GeneralInfo = () => {
    const { control, setValue, watch } = useFormContext()
    const { data } = useContext(PlakaContext)
    const { setId } = useContext(FuelTankContext)
    const [messageApi, contextHolder] = message.useMessage()
    const [open, setOpen] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [history, setHistory] = useState(0)

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
        setValue("depoYakitMiktar", data.depoYakitMiktar)
    }, [data])


    useEffect(() => {
        const fullDepo = watch("fullDepo");
        const farkKm = watch("farkKm");
        const miktar = watch("miktar");
        const yakitHacmi = watch("yakitHacmi");

        let tktm = 0;

        if (fullDepo) {
            if (farkKm > 0) {
                tktm = (miktar / farkKm).toFixed(2);
            }
        } else {
            if (data.fullDepo) {
                if (farkKm > 0) {
                    tktm = (data.miktar / farkKm).toFixed(2);
                }
            } else {
                if (miktar > 0) tktm = (yakitHacmi / farkKm).toFixed(2);
            }
        }
        setValue("tuketim", tktm);
    })

    useEffect(() => {
        if (watch("tuketim") === "0.00") {
            message.warning("Depo Hacmi sıfırdır. Depo hacmi giriniz!");
        }
    }, [watch("tuketim")])


    const fetchData = () => {
        const body = {
            aracId: data.aracId,
            tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
            saat: dayjs(watch("saat")).format("HH:mm")
        }
        YakitDataGetByDateService(body).then(res => setValue("sonAlinanKm", res.data))
    }

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

    const detailModalFooter = (
        [
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setOpenDetail(false)
            }}>
                Kapat
            </Button>
        ]
    )

    return (
        <>
            {contextHolder}

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
                                            <DatePicker
                                                {...field}
                                                placeholder=""
                                                locale={dayjs.locale("tr")}
                                                format="DD.MM.YYYY"
                                                onBlur={fetchData}
                                                onChange={e => {
                                                    field.onChange(e)
                                                }}
                                            />
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
                                        <TimePicker
                                            {...field}
                                            placeholder=""
                                            format="HH:mm"
                                            onBlur={fetchData}
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
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>KM Log&apos;a Yazma</label>
                                <Controller
                                    name="engelle"
                                    control={control}
                                    render={({ field }) => <Checkbox className='custom-checkbox' {...field} />}
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
                                <div className="col-span-4 flex flex-col">
                                    <label htmlFor="">Full Depo</label>
                                    <Controller
                                        control={control}
                                        name="fullDepo"
                                        render={({ field }) => <Checkbox {...field} onChange={e => {
                                            field.onChange(e.target.checked)
                                        }} />}
                                    />
                                </div>
                                <div className="col-span-8">
                                    <div className="grid gap-1">
                                        <div className="col-span-10">
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
                                        <div className="col-span-2 self-end">
                                            <Button className='w-full text-center' style={{ padding: "4px" }} onClick={() => setOpenDetail(true)}>...</Button>
                                        </div>
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

            <Modal
                open={openDetail}
                maskClosable={false}
                title="Ortalama Yakıt Tüketimi"
                footer={detailModalFooter}
                onCancel={() => setOpenDetail(false)}
            >
                <div className="grid detail-tuketim">
                    <div className="col-span-5">
                        <p>Araç depo hacmi:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{watch("yakitHacmi")} lt</p>
                    </div>
                    <div className="col-span-5">
                        <p>Bir önceki yakıt miktarı:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{data.miktar} lt</p>
                    </div>
                    <div className="col-span-5">
                        <p>Depoda bulunan yakıt miktarı:</p>
                    </div>
                    <div className="col-span-6">
                        <div className='text-info'>
                            <Controller
                                name="depoYakitMiktar"
                                control={control}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        onChange={e => field.onChange(e)}
                                    />
                                )}
                            />
                            &nbsp; lt (Depo {data.fullDepo ? "fullendi" : "fullenmedi"})
                        </div>
                    </div>
                    <div className="col-span-12">
                        <Divider />
                    </div>
                    <div className="col-span-5">
                        <p>Harcanan yakıt miktarı:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{data.miktar - data.depoYakitMiktar} lt</p>
                    </div>
                    <div className="col-span-5">
                        <p>Gidilen yol:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{data.farkKm} km</p>
                    </div>
                    <div className="col-span-12">
                        <Divider />
                    </div>
                    <div className="col-span-5">
                        <p>Yakıt Tüketimi:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{data.tuketim} lt/km</p>
                    </div>
                </div>
            </Modal>

            <div className="grid gap-1 border p-10 mt-10">
                <div className="col-span-12">
                    <div className="grid">
                        <div
                            className="col-span-2 flex flex-col"
                            style={{ textAlign: "center" }}
                        >
                            <p style={{ fontSize: "14px" }}>
                                {dayjs(history[2]?.tarih).format("DD.MM.YYYY")}
                            </p>
                            <div>
                                <img
                                    src="/images/kirmizi.svg"
                                    alt=""
                                    style={{ width: "20%" }}
                                />
                            </div>
                            <p style={{ fontSize: "14px" }}>{history[2]?.alinanKm}</p>
                            <p style={{ fontSize: "14px" }}>{history[2]?.miktar} Lt. {history[2]?.fullDepo && <CheckOutlined className='text-danger' />}</p>
                            <p style={{ fontSize: "14px" }}>{history[2]?.tuketim} Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>{history[2]?.farkKm} km</p>
                        </div>
                        <div
                            className="col-span-2 flex flex-col"
                            style={{ textAlign: "center" }}
                        >
                            <p style={{ fontSize: "14px" }}>
                                {dayjs(history[1]?.tarih).format("DD.MM.YYYY")}
                            </p>
                            <div>
                                <img
                                    src="/images/kirmizi.svg"
                                    alt=""
                                    style={{ width: "20%" }}
                                />
                            </div>
                            <p style={{ fontSize: "14px" }}>{history[1]?.alinanKm}</p>
                            <p style={{ fontSize: "14px" }}>{history[1]?.miktar} Lt.  {history[1]?.fullDepo && <CheckOutlined className='text-danger' />}</p>
                            <p style={{ fontSize: "14px" }}>{history[1]?.tuketim} Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>{history[1]?.farkKm} km</p>
                        </div>
                        <div
                            className="col-span-2 flex flex-col"
                            style={{ textAlign: "center" }}
                        >
                            <p style={{ fontSize: "14px" }}>
                                {dayjs(watch("tarih")).format("DD.MM.YYYY")}
                            </p>
                            <div>
                                <img src="/images/Mor.svg" alt="" style={{ width: "20%" }} />
                            </div>
                            <p style={{ fontSize: "14px" }}>{history[0]?.alinanKm}</p>
                            <p style={{ fontSize: "14px" }}>{history[0]?.miktar} Lt.  {history[0]?.fullDepo && <CheckOutlined className='text-danger' />}</p>
                            <p style={{ fontSize: "14px" }}>{history[0]?.tuketim} Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>{history[0]?.farkKm} km</p>
                        </div>
                        <div className="col-span-2 mt-20" style={{ textAlign: "center" }}>
                            <div>
                                <img src="/images/Araba.svg" alt="" style={{ width: "40%" }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralInfo