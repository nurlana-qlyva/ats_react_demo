import { Controller } from "react-hook-form"
import DateInput from "../../../../../components/form/DateInput"
import NumberInput from "../../../../../components/form/NumberInput"
import SelectInput from "../../../../../components/form/SelectInput"
import MaterialListSelect from "../../../../../components/form/MaterialListSelect"
import { Button, Checkbox, Input, InputNumber, message, Modal } from "antd"
import DriverSelectInput from "../../../../../components/form/DriverSelectInput"
import { ArrowUpOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react"
import { DetailInfoUpdateService, KMValidateService } from "../../../../../../api/service"

const GeneralInfo = ({ control, data }) => {
    const [alinanKm, setAlinanKm] = useState(0)
    const [fark, setFark] = useState(0)
    const [miktar, setMiktar] = useState(0)
    const [full, setFull] = useState(false)
    const [tuketim, setTuketim] = useState(0)
    const [open, setOpen] = useState(false)
    const [response, setResponse] = useState('normal')
    const [yakitHacmi, setYakitHacmi] = useState('normal')


    // ortalama tuketim hesaplama
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
                if (depo === 0) {
                    message
                }

                const depo = 60;
                const tktm = (depo / fark).toFixed(2);
                setTuketim(tktm);
            }
        }
    }, [full, miktar])

    const handleDepoHacmi = () => {
        setOpen(true)
    }

    const onClose = () => {
        setOpen(false)
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
            "kaynak": "yakit",
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

    const updateDepoHacmi = () => {
        const body = {
            dtyAracId: data.aracId,
            yakitHacmi: yakitHacmi
        }

        DetailInfoUpdateService(body).then(res => console.log(res.data))
    }


    const footer = (
        [
            <Button key="submit" className="btn primary-btn" onClick={updateDepoHacmi}>
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                İptal
            </Button>
        ]
    )

    return (
        <>
            <div className="grid gap-4 border p-10">
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-12">
                            <SelectInput control={control} name="" label="Plaka" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="tarih" label="Tarih" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="saat" label="Saat" type="time" />
                        </div>
                        <div className="col-span-12">
                            <DriverSelectInput control={control} />
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-12">
                            <MaterialListSelect control={control} name="yakitTipId" label="Yakıt Tipi" type="YAKIT" />
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
                            <SelectInput control={control} name="yakitTanki" label="Yakıt Tankı" />
                        </div>
                    </div>
                </div>

            </div>
            <div className="grid gap-4 border p-10 mt-10">
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="sonAlinanKm" > Son Alınan Km</label>
                                <InputNumber className="w-full" value={data.sonAlinanKm} readOnly />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="alinanKm" > Yakıtın Alındığı Km</label>
                                <Controller
                                    name="alinanKm"
                                    control={control}
                                    render={({ field }) => <InputNumber className="w-full" style={response === 'error' ? { borderColor: "#f00" } : response === "success" ? { borderColor: "#0f0" } : { color: '#000' }} onPressEnter={handleValidateKm} {...field} onChange={e => {
                                        field.onChange(e)
                                        setAlinanKm(e)
                                        if (e) {
                                            setFark(e - data.sonAlinanKm)
                                        } else {
                                            setFark(0)
                                        }
                                    }} />}
                                />
                            </div>
                        </div>

                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="farkKm" > Fark Km</label>
                                <InputNumber className="w-full" value={fark} readOnly />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex align-center justify-between">
                                    <label htmlFor="miktar" >Miktar (lt)</label>
                                    <Button className="depo" onClick={handleDepoHacmi}>Depo Hacmi: {data?.yakitHacmi}</Button>
                                </div>
                                <Controller
                                    name="miktar"
                                    control={control}
                                    render={({ field }) => <InputNumber className="w-full"  {...field} onChange={(e => {
                                        field.onChange(e)
                                        setMiktar(e)
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
                                    <p>Ortalama Tuketim <ArrowUpOutlined style={{ color: 'red' }} /></p>
                                    <Input value={tuketim} readOnly />
                                </div>
                            </div>

                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="litreFiyat" label="Litre Fiyatı" />
                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="tutar" label="Tutar" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="grid gap-1 border p-10 mt-10">
                <div className="col-span-12">
                    <div className="grid">
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>02.05.2024</p>
                            <div>
                                <img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} />

                            </div>
                            <p style={{ fontSize: "14px" }}>12.500</p>
                            <p style={{ fontSize: "14px" }}>33 Lt.</p>
                            <p style={{ fontSize: "14px" }}>7,25 Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>200km</p>
                        </div>
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>02.05.2024</p>
                            <div><img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} /></div>
                            <p style={{ fontSize: "14px" }}>12.500</p>
                            <p style={{ fontSize: "14px" }}>33 Lt.</p>
                            <p style={{ fontSize: "14px" }}>7,25 Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>200km</p>
                        </div>
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>02.05.2024</p>
                            <div><img src="/images/Mor.svg" alt="" style={{ width: "20%" }} /></div>
                            <p style={{ fontSize: "14px" }}>12.500</p>
                            <p style={{ fontSize: "14px" }}>33 Lt.</p>
                            <p style={{ fontSize: "14px" }}>7,25 Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>200km</p>
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
                onCancel={onClose}
            >
                <Input onChange={e => setYakitHacmi(e.target.value)} />
            </Modal>
        </>
    )
}

export default GeneralInfo
