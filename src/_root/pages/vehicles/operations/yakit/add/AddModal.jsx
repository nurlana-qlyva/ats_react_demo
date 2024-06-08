import { useContext, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Button, Modal, Tabs } from 'antd'
import { PlakaContext } from '../../../../../../context/plakaSlice'
import { YakitAddService, YakitDataGetByIdService } from '../../../../../../api/service'
import GeneralInfo from './GeneralInfo'
import PersonalFields from '../../../../../components/form/PersonalFields'

const AddModal = ({ setStatus }) => {
    const { data, plaka, setData } = useContext(PlakaContext)

    const [openModal, setopenModal] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [response, setResponse] = useState("normal")

    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: "Özel Alan 1",
            type: 'text'
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: "Özel Alan 2",
            type: 'text'
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: "Özel Alan 3",
            type: 'text'
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: "Özel Alan 4",
            type: 'text'
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: "Özel Alan 5",
            type: 'text'
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: "Özel Alan 6",
            type: 'text'
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: "Özel Alan 7",
            type: 'text'
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: "Özel Alan 8",
            type: 'text'
        },
        {
            label: "ozelAlan9",
            key: "OZELALAN_9",
            value: "Özel Alan 9",
            type: 'select',
            code: 867,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 868,
            name2: "ozelAlanKodId10"
        },
        {
            label: "ozelAlan11",
            key: "OZELALAN_11",
            value: "Özel Alan 11",
            type: 'number'
        },
        {
            label: "ozelAlan12",
            key: "OZELALAN_12",
            value: "Özel Alan 12",
            type: 'number'
        },
    ])

    const defaultValues = {
        sonAlinanKm: null,
        plaka: "",
        yakitTipId: null,
        yakitTanki: "",
        surucuId: null,
        surucu: "",
        litreFiyat: null,
        yakitHacmi: null,
        "tarih": dayjs(new Date()),
        "saat": dayjs(new Date()),
        "alinanKm": null,
        "farkKm": null,
        "miktar": null,
        "fullDepo": false,
        "tutar": null,
        "tuketim": null,
        engelle: false
    }
    const methods = useForm({
        defaultValues: defaultValues
    })
    const { handleSubmit, reset, setValue, watch } = methods

    useEffect(() => {
        setValue("surucuId", data.surucuId)
        setValue("surucu", data.surucuAdi)
        setValue("tarih", dayjs(new Date()))
        setValue("saat", dayjs(new Date()))
        setValue("sonAlinanKm", data.sonAlinanKm)
        setValue("litreFiyat", data.litreFiyat)
        setValue("yakitHacmi", data.yakitHacmi)
        setValue("yakitTip", data.yakitTip)
        setValue("yakitTipId", data.yakitTipId)
        setValue("yakitTanki", data.yakitTanki)
        setValue("birim", data.birim)
        setValue("depoYakitMiktar", data.depoYakitMiktar)

        if (plaka.length === 1) {
            setValue("plaka", plaka[0].id)
        }

        if (watch('farkKm') < 0 && !watch('alinanKm')) setValue('farkKm', null)
    }, [data, status])

    const onSubmit = handleSubmit((values) => {
        const kmLog = {
            "kmAracId": data.aracId,
            "plaka": data.plaka,
            "tarih": dayjs(values.tarih).format("YYYY-MM-DD"),
            "saat": dayjs(values.saat).format("HH:mm:ss"),
            "eskiKm": data.sonAlinanKm,
            "yeniKm": values.alinanKm,
            "kaynak": "YAKIT",
            "dorse": true,
            lokasyon: data.lokasyon,
            lokasyonId: data.lokasyonId,
            aciklama: ""
        }

        const body = {
            "aracId": data.aracId,
            "plaka": data.plaka,
            "tarih": dayjs(values.tarih).format("YYYY-MM-DD"),
            "saat": dayjs(values.saat).format("HH:mm:ss"),
            "surucuId": values.surucuId,
            "yakitTipId": values.yakitTipId,
            "sonAlinanKm": values.sonAlinanKm,
            "farkKm": values.farkKm,
            "tuketim": values.tuketim,
            "alinanKm": values.alinanKm,
            "miktar": values.miktar ? values.miktar : 0.00,
            "fullDepo": values.fullDepo,
            "stokKullanimi": values.stokKullanimi,
            "litreFiyat": values.litreFiyat,
            "tutar": values.tutar ? values.tutar : 0,
            birim: data.birim,
            "ozelKullanim": false,
            "kmLog": kmLog,
            "yakitTanki": values.yakitTanki,
            "lokasyonId": values.lokasyonId,
            ozelAlan1: values.ozelAlan1 || "",
            ozelAlan2: values.ozelAlan2 || "",
            ozelAlan3: values.ozelAlan3 || "",
            ozelAlan4: values.ozelAlan4 || "",
            ozelAlan5: values.ozelAlan5 || "",
            ozelAlan6: values.ozelAlan6 || "",
            ozelAlan7: values.ozelAlan7 || "",
            ozelAlan8: values.ozelAlan8 || "",
            ozelAlanKodId9: values.ozelAlanKodId9 || 0,
            ozelAlanKodId10: values.ozelAlanKodId10 || 0,
            ozelAlan11: values.ozelAlan11 || 0,
            ozelAlan12: values.ozelAlan12 || 0,
            hasToInsertKmLog: values.engelle ? values.engelle : false
        }

        YakitAddService(body).then(res => {
            if (res?.data.statusCode === 200) {
                setStatus(true)
                setResponse("normal")
                setopenModal(false)
                if (plaka.length === 1) {
                    reset(
                        {
                            plaka: data.plaka,
                            sonAlinanKm: data.sonAlinanKm,
                            litreFiyat: data.litreFiyat,
                            "tarih": dayjs(new Date()),
                            "saat": dayjs(new Date()),
                            "alinanKm": null,
                            "farkKm": null,
                            "miktar": null,
                            "fullDepo": false,
                            "tutar": null,
                            "tuketim": null,
                            "engelle": false,
                            surucuId: data.surucuId,
                            yakitTipId: data.yakitTipId,
                            yakitTip: data.yakitTip,
                            surucu: data.surucuAdi,
                            stokKullanimi: data.stokKullanimi
                        }
                    )
                } else {
                    reset()
                }

                if (plaka.length === 1) {
                    YakitDataGetByIdService(plaka[0].id).then(res => {
                        setData(res.data)
                    })
                }
            }
        })
        setStatus(false)
    })

    const personalProps = {
        form: "YAKIT",
        fields,
        setFields
    }

    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo setIsValid={setIsValid} response={response} setResponse={setResponse} />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <PersonalFields personalProps={personalProps} />
        }
    ]

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid}>
                Kaydet
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setopenModal(false)
                if (plaka.length === 1) {
                    reset(
                        {
                            plaka: data.plaka,
                            sonAlinanKm: data.sonAlinanKm,
                            litreFiyat: data.litreFiyat,
                            "tarih": dayjs(new Date()),
                            "saat": dayjs(new Date()),
                            "alinanKm": null,
                            "farkKm": null,
                            "miktar": null,
                            "fullDepo": false,
                            "tutar": null,
                            "tuketim": null,
                            "engelle": false,
                            surucuId: data.surucuId,
                            yakitTipId: data.yakitTipId,
                            yakitTip: data.yakitTip,
                            surucu: data.surucuAdi,
                            stokKullanimi: data.stokKullanimi
                        }
                    )
                } else {
                    reset()
                }
                setResponse("normal")
            }}>
                İptal
            </Button>
        ]
    )

    return (
        <>
            <Button className='btn primary-btn' onClick={() => setopenModal(true)}>Yenisini Ekle</Button>
            <Modal
                title="Yeni Yakıt Girişi"
                open={openModal}
                onCancel={() => setopenModal(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <p className="count">Güncel Km: []</p>
                <FormProvider {...methods}>
                    <form>
                        <Tabs defaultActiveKey="1" items={items} />
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}

AddModal.propTypes = {
    setStatus: PropTypes.func,
}

export default AddModal
