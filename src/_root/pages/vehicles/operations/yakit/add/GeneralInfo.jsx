import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { Button, Checkbox, ConfigProvider, DatePicker, Input, InputNumber, Modal, TimePicker } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { DetailInfoUpdateService, KMValidateService, YakitHistoryGetService } from '../../../../../../api/service'
import Driver from '../../../../../components/form/Driver'
import FuelType from '../../../../../components/form/FuelType'
import FuelTank from '../../../../../components/form/FuelTank'

dayjs.locale('tr')

const GeneralInfo = ({ data }) => {
    const [alinanKm, setAlinanKm] = useState(0)
    const [fark, setFark] = useState(0)
    const [miktar, setMiktar] = useState(0)
    const [full, setFull] = useState(false)
    const [tuketim, setTuketim] = useState(0)
    const [open, setOpen] = useState(false)
    const [response, setResponse] = useState('normal')
    const [yakitHacmi, setYakitHacmi] = useState(data.yakitHacmi)
    const [tutar, setTutar] = useState(0)
    const [history, setHistory] = useState(0)

    const { control, setValue } = useFormContext()

    useEffect(() => {
        const frk = alinanKm - data.sonAlinanKm

        if (frk === 0) {
            setFark(0);
            return;
        }

        if (full) {
            if (frk > 0) {
                const tktm = (miktar / frk).toFixed(2);
                setTuketim(tktm);
            } else {
                setTuketim(0);
            }
        } else {
            if (!data.fullDepo) {
                if (fark > 0) {
                    const tktm = (data.miktar / fark).toFixed(2);
                    setTuketim(tktm);
                } else {
                    setTuketim(0);
                }
            } else {
                if (data.yakitHacmi === 0) {
                    console.log(1)
                }

                const tktm = (data.yakitHacmi / fark).toFixed(2);
                setTuketim(tktm);
            }
        }
    }, [full, miktar])

    useEffect(() => {
        setValue("plaka", data.plaka)
        setValue("surucuId", data.surucuId)
        setValue("tarih", dayjs(data.tarih))
        setValue("saat", dayjs(data.saat, 'HH:mm'))
        setValue("sonAlinanKm", data.sonAlinanKm)
        setValue("litreFiyat", data.litreFiyat)
        setValue("tuketim", tuketim)
        setValue("farkKm", fark)

        YakitHistoryGetService(data.aracId).then(res => setHistory(res.data))
    }, [tuketim, fark])

    const updateDepoHacmi = () => {
        const body = {
            dtyAracId: data.aracId,
            yakitHacmi: yakitHacmi
        }

        DetailInfoUpdateService(body).then(res => {
            if (res?.data.statusCode === 202) {
                setOpen(false)
            }
        })
    }

    const handleValidateKm = () => {
        const body = {
            "siraNo": 0,
            "kmAracId": data.aracId,
            "seferSiraNo": 0,
            "yakitSiraNo": 0,
            "plaka": data.plaka,
            "tarih": data.tarih,
            "saat": data.saat,
            "eskiKm": data.sonAlinanKm,
            "yeniKm": alinanKm,
            "fark": 0,
            "kaynak": "YAKIT",
            "dorse": true,
            "aciklama": ""
        }
        if (alinanKm) {
            KMValidateService(body).then(res => {
                if (res?.data.statusCode === 400) {
                    setResponse('error')
                } else if (res?.data.statusCode === 200) {
                    setResponse('success')
                }
            })
        } else {
            setResponse('normal')
        }
    }

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={updateDepoHacmi}>
                Kaydet
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setOpen(false)
                setMiktar(0)
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
                                <label htmlFor="yakitId">Yakıt Tipi</label>
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
                            <label htmlFor="stokKullanimi">Stoktan Kullanım</label>
                            <Controller
                                name="stokKullanimi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Yakıt Tankı</label>
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
                                        <Input
                                            {...field}
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
                                            style={response === 'error' ? { borderColor: "#f00" } : response === "success" ? { borderColor: "#0f0" } : { color: '#000' }}
                                            {...field}
                                            onPressEnter={handleValidateKm}
                                            onChange={e => {
                                                field.onChange(e)
                                                setAlinanKm(e)
                                                if (e) {
                                                    setFark(e - data.sonAlinanKm)
                                                } else {
                                                    setFark(0)
                                                }
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
                                        <Input
                                            {...field}
                                            value={fark}
                                            readOnly
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
                                    <Button className="depo" onClick={() => setOpen(true)}>Depo Hacmi: {yakitHacmi} {data?.birim === "LITRE" && "lt"}</Button>
                                </div>
                                <Controller
                                    name="miktar"
                                    control={control}
                                    render={({ field }) => <InputNumber className="w-full"  {...field} onChange={(e => {
                                        field.onChange(e)
                                        setMiktar(e)
                                        setTutar(e * data.litreFiyat)
                                    })} />}
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
                                            setFull(e.target.checked)
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
                                                    value={tuketim}
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
                                        <Input
                                            {...field}
                                            readOnly
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
                                        <Input
                                            {...field}
                                            value={tutar}
                                            readOnly
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-1 border p-10 mt-10">
                <div className="col-span-12">
                    <div className="grid">
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>{dayjs(history[2]?.tarih).format("DD.MM.YYYY")}</p>
                            <div>
                                <img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} />

                            </div>
                            <p style={{ fontSize: "14px" }}>{history[2]?.alinanKm}</p>
                            <p style={{ fontSize: "14px" }}>{history[2]?.miktar} Lt.</p>
                            <p style={{ fontSize: "14px" }}>{history[2]?.tuketim} Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>{history[1]?.farkKm} km</p>
                        </div>
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>{dayjs(history[1]?.tarih).format("DD.MM.YYYY")}</p>
                            <div><img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} /></div>
                            <p style={{ fontSize: "14px" }}>{history[1]?.alinanKm}</p>
                            <p style={{ fontSize: "14px" }}>{history[1]?.miktar} Lt.</p>
                            <p style={{ fontSize: "14px" }}>{history[1]?.tuketim} Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>{history[0]?.farkKm} km</p>
                        </div>
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>{dayjs(history[0]?.tarih).format("DD.MM.YYYY")}</p>
                            <div><img src="/images/Mor.svg" alt="" style={{ width: "20%" }} /></div>
                            <p style={{ fontSize: "14px" }}>{history[0]?.alinanKm}</p>
                            <p style={{ fontSize: "14px" }}>{history[0]?.miktar} Lt.</p>
                            <p style={{ fontSize: "14px" }}>{history[0]?.tuketim} Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>{fark} km</p>
                        </div>
                        <div className="col-span-2 mt-20" style={{ textAlign: 'center' }}>
                            <div><img src="/images/Araba.svg" alt="" style={{ width: "40%" }} /></div>
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
                <Input onChange={e => setYakitHacmi(e.target.value)} />
            </Modal>
        </>
    )
}

GeneralInfo.propTypes = {
    data: PropTypes.object
}

export default GeneralInfo
