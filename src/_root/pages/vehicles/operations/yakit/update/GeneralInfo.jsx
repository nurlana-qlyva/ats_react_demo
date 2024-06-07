import { useEffect, useState } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { Button, Checkbox, ConfigProvider, DatePicker, Divider, Input, InputNumber, message, Modal, TimePicker } from 'antd'
import { ArrowUpOutlined } from '@ant-design/icons'
import { DetailInfoUpdateService, YakitDataGetByDateService, YakitKmLogValidateForUpdateService, YakitPriceGetService } from '../../../../../../api/service'
import Driver from '../../../../../components/form/Driver'
import FuelType from '../../../../../components/form/FuelType'
import Location from '../../../../../components/form/Location'
import Firma from '../../../../../components/form/Firma'
import Istasyon from '../../../../../components/form/Istasyon'
import MasrafMerkezi from '../../../../../components/form/MasrafMerkezi'
import Guzergah from '../../../../../components/form/Guzergah'
import FuelTank from '../../../../../components/form/FuelTank'
import TextArea from 'antd/lib/input/TextArea'

dayjs.locale('tr')

const GeneralInfo = ({ setIsValid, response, setResponse }) => {
    const { control, watch, setValue } = useFormContext()
    const [open, setOpen] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)

    useEffect(() => {
        const fullDepo = watch("fullDepo");
        const farkKm = watch("farkKm");
        const miktar = watch("miktar");
        const yakitHacmi = watch("yakitHacmi");

        let tktm = 0;

        if (fullDepo) {
            if (farkKm > 0) {
                tktm = (miktar / farkKm).toFixed(2);
            } else {
                tktm = 0
            }
        } else {
            if (fullDepo) {
                if (farkKm > 0) {
                    tktm = (miktar / farkKm).toFixed(2);
                } else {
                    tktm = 0
                }
            } else {
                if (miktar > 0) {
                    // yakitHacmi !== null ? tktm = (yakitHacmi / farkKm).toFixed(2) : tktm = 0
                }
            }
        }
        setValue("tuketim", tktm);
    }, [watch("fullDepo"), watch("farkKm"), watch("miktar"), watch("yakitHacmi")])

    useEffect(() => {
        if (watch("tuketim") === "0.00") {
            message.warning("Depo Hacmi sıfırdır. Depo hacmi giriniz!");
            setValue("tuketim", 0)
        }
    }, [watch("tuketim")])

    useEffect(() => {
        YakitPriceGetService(watch('yakitTipId')).then(res => setValue("litreFiyat", res.data))
    }, [watch('yakitTipId')])

    const validateLog = () => {
        const body = {
            "siraNo": watch('siraNo'),
            "aracId": watch('aracId'),
            "plaka": watch('plaka'),
            "sonAlinanKm": watch('sonAlinanKm'),
            "farkKm": watch('farkKm'),
            "tuketim": watch('tuketim'),
            "alinanKm": watch('alinanKm'),
            "hasToInsertKmLog": watch('engelle'),
            tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
            saat: dayjs(watch("saat")).format("HH:mm:ss"),
            "kmLog": {
                "siraNo": watch('kmLogId'),
                "kmAracId": watch('aracId'),
                "plaka": watch('plaka'),
                "tarih": dayjs(watch("tarih")).format("YYYY-MM-DD"),
                "saat": dayjs(watch("saat")).format("HH:mm:ss"),
                "yeniKm": watch("alinanKm"),
                "eskiKm": watch("eskiKm"),
                "dorse": false,
                "kaynak": "YAKIT",
                "lokasyonId": watch('lokasyonId')
            }
        }

        YakitKmLogValidateForUpdateService(body).then(res => {
            if (res?.data.statusCode === 400) {
                setResponse("error");
                if (res?.data.message === " Invalid Km range for both KmLog and FuelKm !") {
                    message.error("Alınan Km Yakıt ve Km Log-a girilemez!")
                } else if (res?.data.message === " Invalid FuelKm Range !") {
                    message.error("Alınan Km Yakıt Log-a girilemez!")
                } else if (res?.data.message === " Invalid KmLog Range !") {
                    message.error("Alınan Km Km Log-a girilemez!")
                }
            } else if (res?.data.statusCode === 200) {
                setResponse("success");
                setIsValid(true)
            }
        })

        setIsValid(false)
    }

    useEffect(() => {
        if (watch("alinanKm")) {
            const fark = watch("alinanKm") - watch("sonAlinanKm")
            setValue("farkKm", fark)
        }
    }, [watch("sonAlinanKm")])

    const handlePressAlinanKm = e => {
        if (watch("sonAlinanKm") === 0) {
            setValue("farkKm", 0)
        } else {
            const fark = +e.target.value - watch("sonAlinanKm")
            setValue("farkKm", fark)
        }

        validateLog()
        e.target.blur()
    }

    const fetchData = () => {
        const body = {
            aracId: watch('aracId'),
            tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
            saat: dayjs(watch("saat")).format("HH:mm")
        }
        YakitDataGetByDateService(body).then(res => {
            res.data === -1 ? setValue("sonAlinanKm", 0) : setValue("sonAlinanKm", res.data)
        })
    }

    const handlePressFarkKm = e => {
        const alinanKm = watch("sonAlinanKm") + +e.target.value
        setValue("alinanKm", alinanKm)
        validateLog()
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

    const updateDepoHacmi = () => {
        const body = {
            dtyAracId: watch('aracId'),
            yakitHacmi: watch("yakitHacmi")
        };

        DetailInfoUpdateService(body).then((res) => {
            if (res?.data.statusCode === 202) {
                setOpen(false);
            }
        })
    }

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={updateDepoHacmi}>
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
            <div className="grid gap-1">
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6" style={{ display: 'none' }}>
                            <div className="flex flex-col gap-1">
                                <Controller
                                    name="aracId"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            hidden
                                        />
                                    )}
                                />
                                 <Controller
                                    name="siraNo"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            hidden
                                        />
                                    )}
                                />
                                 <Controller
                                    name="eskiKm"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            hidden
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="plaka">Plaka</label>
                                <Controller
                                    name="plaka"
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
                                            <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY"
                                                onBlur={() => {
                                                    fetchData()
                                                }}
                                                onChange={e => {
                                                    field.onChange(e)
                                                    if (watch('alinanKm')) validateLog()
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
                                        <TimePicker {...field} placeholder="" format="HH:mm"
                                            onBlur={() => {
                                                fetchData()
                                            }}
                                            onChange={e => {
                                                field.onChange(e)
                                                if (watch('alinanKm')) validateLog()
                                            }} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 p-20">
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
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Stoktan Kullanım</label>
                                <Controller
                                    name="stokKullanimi"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} checked={field.value} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Yakıt Tankı --- ?</label>
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
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'> Son Alınan Km</label>
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
                                <label className='text-info'>Yakıtın Alındığı Km</label>
                                <Controller
                                    name="alinanKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            className="w-full"
                                            {...field}
                                            style={response === 'error' ? { borderColor: "#dc3545" } : response === "success" ? { borderColor: "#23b545" } : { color: '#000' }}
                                            {...field}
                                            onPressEnter={handlePressAlinanKm}
                                            onBlur={handlePressAlinanKm}
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
                                <label className='text-info'>Fark Km</label>
                                <Controller
                                    name="farkKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onPressEnter={handlePressFarkKm}
                                            onBlur={handlePressFarkKm}
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
                                    render={({ field }) => <Checkbox className='custom-checkbox' {...field}  onChange={(e) => {
                                        field.onChange(e);
                                        validateLog();
                                    }}  />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex align-baseline justify-between">
                                    <label className='text-info'>Miktar (lt)</label>
                                    <Button className="depo" onClick={() => setOpen(true)}>Depo Hacmi: {watch('yakitHacmi')} {watch('birim') === "LITRE" && "lt"}</Button>
                                </div>
                                <Controller
                                    name="miktar"
                                    control={control}
                                    render={({ field }) => <InputNumber
                                        className="w-full"
                                        {...field}
                                        onPressEnter={handlePressMiktar}
                                        onBlur={handlePressMiktar}
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
                                                <label className='text-danger'>Ortalama Tuketim <ArrowUpOutlined style={{ color: 'red' }} /></label>
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
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>Birim Fiyat</label>
                                <Controller
                                    name="litreFiyat"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onPressEnter={handlePressLitreFiyat}
                                            onBLur={handlePressLitreFiyat}
                                            onChange={(e => {
                                                field.onChange(e)
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>Tutar</label>
                                <Controller
                                    name="tutar"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onPressEnter={handlePressTutar}
                                            onBLur={handlePressTutar}
                                            onChange={(e => {
                                                field.onChange(e)
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>KDV Tutar</label>
                                <Controller
                                    name="kdv"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={(e => {
                                                field.onChange(e)
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Fatura / Fiş No</label>
                                <Controller
                                    name="faturaNo"
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
                                <label>Fatura / Fiş Tarihi</label>
                                <Controller
                                    name="faturaTarih"
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
                                <label>Görev No -- ?</label>
                                <Controller
                                    name=""
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
                                <label>Özel Kullanım</label>
                                <Controller
                                    name="ozelKullanim"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} checked={field.value} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>Masraf Merkezi -- ?</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <MasrafMerkezi field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>Güzergah</label>
                                <Controller
                                    name="guzergahId"
                                    control={control}
                                    render={({ field }) => (
                                        <Guzergah field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="lokasyonId">Lokasyon</label>
                                <Controller
                                    name="lokasyonId"
                                    control={control}
                                    render={({ field }) => (
                                        <Location field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Firma</label>
                                <Controller
                                    name="firmaId"
                                    control={control}
                                    render={({ field }) => (
                                        <Firma field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>İstasyon</label>
                                <Controller
                                    name="istasyonKodId"
                                    control={control}
                                    render={({ field }) => (
                                        <Istasyon field={field} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12">
                    <Divider />
                </div>
                <div className="col-span-12 p-20">
                    <div className="flex flex-col gap-1">
                        <label>Açıklama</label>
                        <Controller
                            name="aciklama"
                            control={control}
                            render={({ field }) => (
                                <TextArea {...field} onChange={(e => field.onChange(e.target.value))} />
                            )}
                        />
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

            {/* <Modal
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
            </Modal> */}
        </>
    )
}

GeneralInfo.propTypes = {
    setIsValid: PropTypes.func,
    response: PropTypes.string,
    setResponse: PropTypes.string,
}

export default GeneralInfo
