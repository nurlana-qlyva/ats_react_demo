import { useContext, useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { t } from 'i18next'
import { Button, Checkbox, ConfigProvider, DatePicker, Divider, Input, InputNumber, message, Modal, TimePicker } from 'antd'
import { ArrowUpOutlined, CheckOutlined } from '@ant-design/icons'
import { PlakaContext } from '../../../../../../context/plakaSlice'
import { FuelTankContext } from '../../../../../../context/fuelTankSlice'
import { DetailInfoUpdateService, YakitDataGetByDateService, YakitHistoryGetService, YakitKmLogValidateService, YakitPriceGetService } from '../../../../../../api/service'
import Driver from '../../../../../components/form/Driver'
import FuelType from '../../../../../components/form/FuelType'
import FuelTank from '../../../../../components/form/FuelTank'
import Plaka from '../../../../../components/form/Plaka'

dayjs.locale('tr')

const GeneralInfo = ({ setIsValid, response, setResponse }) => {
    const [, contextHolder] = message.useMessage()
    const { control, setValue, watch } = useFormContext()
    const { data, history, setHistory } = useContext(PlakaContext)
    const { setId } = useContext(FuelTankContext)
    const [open, setOpen] = useState(false)
    const [openDetail, setOpenDetail] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [content, setContent] = useState(null)
    const [logError, setLogError] = useState(false)

    useEffect(() => {
        setId(data.yakitTipId)
        fetchData()
    }, [data])

    useEffect(() => {
        YakitPriceGetService(watch('yakitTipId')).then(res => {
            setValue("litreFiyat", res?.data.price)
            setValue("kdv", res?.data.kdv)
        })
    }, [watch('yakitTipId')])


    useEffect(() => {
        const fullDepo = watch("fullDepo");
        const farkKm = watch("farkKm");
        const miktar = watch("miktar");
        const yakitHacmi = watch("yakitHacmi");

        let tktm = 0;

        if (fullDepo) {
            if (farkKm > 0 && miktar > 0) {
                tktm = (miktar / farkKm).toFixed(2);
            } else {
                tktm = 0
            }
            const content = (
                <div className="grid detail-tuketim">
                    <div className="col-span-5">
                        <p>{t("gidilenYol")}:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{watch('farkKm')} km</p>
                    </div>
                    <div className="col-span-5">
                        <p>{t("yakitMiktari")}:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{watch("miktar")} lt</p>
                    </div>
                    <div className="col-span-5">
                        <p>{t("kalanYakitMiktari")}:</p>
                    </div>
                    <div className="col-span-6">
                        <div className='text-info'>
                            <Controller
                                name="depoYakitMiktar"
                                control={control}
                                render={({ field }) => (
                                    <InputNumber
                                        {...field}
                                        value={watch('yakitHacmi') - watch('miktar')}
                                        onChange={e => field.onChange(e)}
                                        readOnly
                                    />
                                )}
                            />
                            &nbsp; lt (Depo {watch('fullDepo') ? "fullendi" : "fullenmedi"})
                        </div>
                    </div>
                    <div className="col-span-12">
                        <Divider />
                    </div>
                    <div className="col-span-5">
                        <p>{t("yakitTuketimi")}:</p>
                    </div>
                    <div className="col-span-6">
                        <p className='text-info'>{watch('tuketim')} lt/km</p>
                    </div>
                </div>
            )

            setContent(content)
        } else {
            if (history[0]?.fullDepo) {
                if (farkKm > 0 && miktar > 0) {
                    tktm = (history[0]?.miktar / farkKm).toFixed(2);
                } else {
                    tktm = 0
                }

                const content = (
                    <div className="grid detail-tuketim">
                        <div className="col-span-5">
                            <p>{t("gidilenYol")}:</p>
                        </div>
                        <div className="col-span-6">
                            <p className='text-info'>{watch('farkKm')} km</p>
                        </div>
                        <div className="col-span-5">
                            <p>{t("oncekiYakitMiktari")}:</p>
                        </div>
                        <div className="col-span-6">
                            <p className='text-info'>{history[0]?.miktar} lt</p>
                        </div>
                        <div className="col-span-5">
                            <p>{t("kalanYakitMiktari")}:</p>
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
                                &nbsp; lt (Depo {history[0]?.fullDepo ? "fullendi" : "fullenmedi"})
                            </div>
                        </div>
                        <div className="col-span-12">
                            <Divider />
                        </div>
                        <div className="col-span-5">
                            <p>{t("yakitTuketimi")}:</p>
                        </div>
                        <div className="col-span-6">
                            <p className='text-info'>{watch('tuketim')} lt/km</p>
                        </div>
                    </div>
                )

                setContent(content)
            } else {
                if (farkKm > 0 && miktar > 0) {
                    yakitHacmi !== null ? tktm = (yakitHacmi / farkKm).toFixed(2) : tktm = 0

                    const content = (
                        <div className="grid detail-tuketim">
                            <div className="col-span-5">
                                <p>{t("gidilenYol")}:</p>
                            </div>
                            <div className="col-span-6">
                                <p className='text-info'>{watch('farkKm')} km</p>
                            </div>
                            <div className="col-span-5">
                                <p>{t("aracDepoHacmi")}:</p>
                            </div>
                            <div className="col-span-6">
                                <p className='text-info'>{watch("yakitHacmi")} lt</p>
                            </div>
                            <div className="col-span-5">
                                <p>{t("oncekiYakitMiktari")}:</p>
                            </div>
                            <div className="col-span-6">
                                <p className='text-info'>{history[0]?.miktar} lt</p>
                            </div>
                            <div className="col-span-5">
                                <p>{t("kalanYakitMiktari")}:</p>
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
                                    &nbsp; lt (Depo {history[0]?.fullDepo ? "fullendi" : "fullenmedi"})
                                </div>
                            </div>
                            <div className="col-span-12">
                                <Divider />
                            </div>
                            <div className="col-span-5">
                                <p>{t("yakitTuketimi")}:</p>
                            </div>
                            <div className="col-span-6">
                                <p className='text-info'>{watch('tuketim')} lt/km</p>
                            </div>
                        </div>
                    )

                    setContent(content)
                } else {
                    tktm = 0
                }
            }
        }
        setValue("tuketim", tktm);
    }, [watch("fullDepo"), watch("farkKm"), watch("miktar"), watch("yakitHacmi")])

    const validateLog = () => {
        const body = {
            aracId: data.aracId,
            tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
            saat: dayjs(watch("saat")).format("HH:mm:ss"),
            alinanKm: watch("alinanKm"),
            "kmLog": {
                "kmAracId": data.aracId,
                "plaka": data.plaka,
                "tarih": dayjs(watch("tarih")).format("YYYY-MM-DD"),
                "saat": dayjs(watch("saat")).format("HH:mm:ss"),
                "yeniKm": watch("alinanKm"),
                "dorse": false,
                "kaynak": "YAKIT",
                "lokasyonId": data.lokasyonId
            }
        }

        YakitKmLogValidateService(body).then(res => {
            if (res?.data.statusCode === 400) {
                setResponse("error");
                if (res?.data.message === " Invalid Km range for both KmLog and FuelKm !") {
                    setErrorMessage("Alınan Km Yakıt ve Km Log-a girilemez!")
                } else if (res?.data.message === " Invalid FuelKm Range !") {
                    setErrorMessage("Alınan Km Yakıt Log-a girilemez!")
                } else if (res?.data.message === " Invalid KmLog Range !") {
                    setErrorMessage("Alınan Km Km Log-a girilemez!")
                    setLogError(true)
                    if (watch('engelle')) {
                        setResponse("success");
                    }
                }

            } else if (res?.data.statusCode === 200) {
                setResponse("success");
                setIsValid(false)
            }
        })

        setIsValid(true)
    }

    useEffect(() => {
        if (watch('depoYakitMiktar') + history[0]?.miktar > watch('yakitHacmi')) {
            message.warning("Miktar depo hacminden büyükdür. Depo hacmini güncelleyin!")
            setIsValid(true)
        }else {
            setIsValid(false)
        }
    }, [watch('depoYakitMiktar')])

    useEffect(() => {
        if (logError) {
            if (watch('engelle')) {
                setResponse("success");
                setIsValid(false)
            }
        }
    }, [logError, watch('engelle')])

    useEffect(() => {
        if (errorMessage) {
            message.error(errorMessage);
        }
        setErrorMessage("")
    }, [errorMessage])

    const updateDepoHacmi = () => {
        const body = {
            dtyAracId: data.aracId,
            yakitHacmi: watch("yakitHacmi")
        };

        DetailInfoUpdateService(body).then((res) => {
            if (res?.data.statusCode === 202) {
                setOpen(false);
            }
        })
    }

    const fetchData = () => {
        const body = {
            aracId: data.aracId,
            tarih: dayjs(watch("tarih")).format("YYYY-MM-DD"),
            saat: dayjs(watch("saat")).format("HH:mm:ss")
        }
        YakitDataGetByDateService(body).then(res => {
            res.data === -1 ? setValue("sonAlinanKm", 0) : setValue("sonAlinanKm", res.data)
            if (watch('farkKm') > 0 && watch('alinanKm')) setValue('farkKm', watch('alinanKm') - watch('sonAlinanKm'))
        })
        YakitHistoryGetService(data.aracId, dayjs(watch("tarih")).format("YYYY-MM-DD"), dayjs(watch("saat")).format("HH:mm:ss")).then((res) => setHistory(res.data))
    }

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={updateDepoHacmi}>
                {t("kaydet")}
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setOpen(false)
            }}>
                {t("iptal")}
            </Button>
        ]
    )

    const detailModalFooter = (
        [
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setOpenDetail(false)
            }}>
                {t("kapat")}
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
                                <label htmlFor="plaka">{t("plaka")}</label>
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
                                <label htmlFor="surucuId">{t("surucu")}</label>
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
                                <label>{t("tarih")}</label>
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
                                                onBlur={() => {
                                                    fetchData()
                                                }}
                                                onChange={e => {
                                                    field.onChange(e)
                                                    if (watch('alinanKm')) validateLog()
                                                }}
                                            />
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("saat")}</label>
                                <Controller
                                    name="saat"
                                    control={control}
                                    render={({ field }) => (
                                        <TimePicker
                                            {...field}
                                            placeholder=""
                                            format="HH:mm:ss"
                                            onBlur={() => {
                                                fetchData()
                                            }}
                                            onChange={e => {
                                                field.onChange(e)
                                                if (watch('alinanKm')) validateLog()
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
                                <label>{t("yakitTip")}</label>
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
                            <label>{t("stoktanKullanim")}</label>
                            <Controller
                                name="stokKullanimi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} onChange={e => field.onChange(e.target.checked)} />}
                            />
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("yakitTank")} -- ?</label>
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
                                <label>{t("sonAlinanKm")}</label>
                                <Controller
                                    name="sonAlinanKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            readOnly={data.sonAlinanKm !== 0}
                                            onPressEnter={e => {
                                                validateLog()
                                                e.target.blur()
                                            }}
                                            onBlur={validateLog}
                                            onChange={e => {
                                                field.onChange(e)
                                                setIsValid(true)
                                                if (watch("alinanKm")) {
                                                    const fark = watch("alinanKm") - e
                                                    setValue("farkKm", fark)
                                                    validateLog()
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("yakitinAlindigiKm")}</label>
                                <Controller
                                    name="alinanKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            className="w-full"
                                            style={response === 'error' ? { borderColor: "#dc3545" } : response === "success" ? { borderColor: "#23b545" } : { color: '#000' }}
                                            {...field}
                                            onPressEnter={e => {
                                                validateLog()
                                                e.target.blur()
                                            }}
                                            onBlur={validateLog}
                                            onChange={e => {
                                                field.onChange(e)
                                                setIsValid(true)
                                                if (data.sonAlinanKm === 0 && !watch("alinanKm")) {
                                                    setValue("farkKm", 0)
                                                } else {
                                                    const fark = +e - watch("sonAlinanKm")
                                                    setValue("farkKm", fark)
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("farkKm")}</label>
                                <Controller
                                    name="farkKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            readOnly={data.sonAlinanKm === 0}
                                            value={watch('farkKm') < 0 ? 0 : watch('farkKm')}
                                            onPressEnter={e => {
                                                validateLog()
                                                e.target.blur()
                                            }}
                                            onBlur={validateLog}
                                            onChange={e => {
                                                field.onChange(e)
                                                setIsValid(true)
                                                const alinanKm = watch("sonAlinanKm") + +e
                                                setValue("alinanKm", alinanKm)
                                                validateLog()
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("engelle")}</label>
                                <Controller
                                    name="engelle"
                                    control={control}
                                    render={({ field }) => <Checkbox className='custom-checkbox' {...field} checked={field.value} onChange={e => {
                                        field.onChange(e.target.checked)
                                    }
                                    } />}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex align-baseline gap-1">
                                    <label htmlFor="miktar">{t("miktar")} (lt)</label>
                                    <Button className="depo" onClick={() => setOpen(true)}>{t("depoHacmi")}: {watch("yakitHacmi")} {watch("birim") === "LITRE" && "lt" || "lt"}</Button>
                                </div>
                                <Controller
                                    name="miktar"
                                    control={control}
                                    render={({ field }) => <InputNumber
                                        className="w-full"
                                        {...field}
                                        onPressEnter={e => {
                                            if (watch("yakitHacmi") === 0 && !watch("fullDepo")) message.warning("Depo Hacmi sıfırdır. Depo hacmi giriniz!")

                                            if (watch("yakitHacmi") < (+e.target.value + +watch("depoYakitMiktar"))) {
                                                message.warning("Miktar depo hacminden büyükdür. Depo hacmini güncelleyin!")
                                                setIsValid(true)
                                            }else {
                                                setIsValid(false)
                                            }
                                        }}
                                        onChange={(e => {
                                            field.onChange(e)

                                            if (watch("litreFiyat") === null) {
                                                setValue("tutar", 0)
                                            } else {
                                                const tutar = +e * watch("litreFiyat")
                                                setValue("tutar", tutar)
                                            }
                                        })}
                                    />}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="grid">
                                <div className="col-span-4 flex flex-col">
                                    <label htmlFor="">{t("fullDepo")}</label>
                                    <Controller
                                        control={control}
                                        name="fullDepo"
                                        render={({ field }) => <Checkbox {...field} checked={field.value} onChange={e => {
                                            field.onChange(e.target.checked)
                                        }} />}
                                    />
                                </div>
                                <div className="col-span-8">
                                    <div className="grid gap-1">
                                        <div className="col-span-10">
                                            <div className="flex flex-col gap-1">
                                                <label>{t("ortalamaTuketim")} <ArrowUpOutlined style={{ color: 'red' }} /></label>
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
                                <label>{watch("birim") === "LITRE" && t("litr")} {t("fiyati")}</label>
                                <Controller
                                    name="litreFiyat"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={e => {
                                                field.onChange(e)
                                                if (e === null) {
                                                    setValue("miktar", 0)
                                                } else {
                                                    const miktar = watch("tutar") / +e
                                                    setValue("miktar", Math.round(miktar))
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("tutar")}</label>
                                <Controller
                                    name="tutar"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={e => {
                                                field.onChange(e)

                                                if (watch("litreFiyat") === null) {
                                                    setValue("miktar", 0)
                                                } else {
                                                    const miktar = +e / watch("litreFiyat")
                                                    setValue("miktar", Math.round(miktar))
                                                }
                                            }}
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
                title={t("depoHacmiGirisi")}
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
                title={t("ortalamaYakitTuketimi")}
                footer={detailModalFooter}
                onCancel={() => setOpenDetail(false)}
            >
                {content}
            </Modal>

            {history.length >= 3 && (
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
                                <p style={{ fontSize: "14px" }}>{history[2]?.sonAlinanKm} km</p>
                                <p style={{ fontSize: "14px" }}>{history[2]?.miktar} Lt. {history[2]?.fullDepo && <CheckOutlined className='text-success' />}</p>
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
                                <p style={{ fontSize: "14px" }}>{history[1]?.sonAlinanKm} km</p>
                                <p style={{ fontSize: "14px" }}>{history[1]?.miktar} Lt.  {history[1]?.fullDepo && <CheckOutlined className='text-success' />}</p>
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
                                    {dayjs(history[0]?.tarih).format("DD.MM.YYYY")}
                                </p>
                                <div>
                                    <img src="/images/Mor.svg" alt="" style={{ width: "20%" }} />
                                </div>
                                <p style={{ fontSize: "14px" }}>{history[0]?.sonAlinanKm} km</p>
                                <p style={{ fontSize: "14px" }}>{history[0]?.miktar} Lt.  {history[0]?.fullDepo && <CheckOutlined className='text-success' />}</p>
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
            )}

        </>
    )
}

GeneralInfo.propTypes = {
    setIsValid: PropTypes.func,
    response: PropTypes.string,
    setResponse: PropTypes.func,
}

export default GeneralInfo

