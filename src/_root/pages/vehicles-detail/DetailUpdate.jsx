
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { HomeOutlined, LoadingOutlined } from '@ant-design/icons'
import { Button, Input, InputNumber, message, Modal, Spin, Tabs } from 'antd'
import dayjs from 'dayjs'
import { FileReadService, PhotoReadService, VehiclesUpdateReadService, VehiclesUpdateSetService } from '../../../api/service'
import { uploadFile, uploadPhoto } from '../../../utils/upload'
import BreadcrumbComp from '../../components/breadcrumb/Breadcrumb'
import VehicleType from '../../components/form/VehicleType'
import Location from '../../components/form/Location'
import Marka from '../../components/form/Marka'
import Model from '../../components/form/Model'
import Driver from '../../components/form/Driver'
import FuelType from '../../components/form/FuelType'
import Renk from '../../components/form/Renk'
import DetailInfo from './detail-info/DetailInfo'
import GeneralInfo from './tabs/GeneralInfo'
import PersonalFields from '../../components/form/PersonalFields'
import FileUpload from '../../components/upload/FileUpload'
import PhotoUpload from '../../components/upload/PhotoUpload'
import KmLog from '../../components/table/KmLog'
import { t } from 'i18next'

const breadcrumb = [
    {
        href: '/',
        title: <HomeOutlined />,
    },
    {
        href: '/araclar',
        title: t('araclar'),
    },
    {
        title: t('aracDetayKarti')
    }
]

const DetailUpdate = () => {
    const [vehiclesData, setVehiclesData] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false)
    const [dataStatus, setDataStatus] = useState(false)
    const [kmHistryModal, setKmHistryModal] = useState(false)
    // file
    const [filesUrl, setFilesUrl] = useState([])
    const [files, setFiles] = useState([])
    const [loadingFiles, setLoadingFiles] = useState(false)
    // photo
    const [imageUrls, setImageUrls] = useState([])
    const [loadingImages, setLoadingImages] = useState(false)
    const [images, setImages] = useState([])

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
            code: 865,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 866,
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
    const { id } = useParams()

    const defaultValues = {
        plaka: "",
        aracTip: "",
        aracTipId: 0,
        guncelKm: 0,
        markaId: null,
        modelId: 0,
        yil: 0,
        aracGrubuId: 0,
        AracCinsiKodId: 0,
        aracRenkId: 0,
        lokasyonId: 0,
        mulkiyet: "",
        departmanId: 0,
        surucuId: 0,
        yakitTipId: 0,
        muayeneTarih: "",
        sozlesmeTarih: "",
        egzosTarih: "",
        vergiTarih: "",
        ozelAlan1: "",
        ozelAlan2: "",
        ozelAlan3: "",
        ozelAlan4: "",
        ozelAlan5: "",
        ozelAlan6: "",
        ozelAlan7: "",
        ozelAlan8: "",
        ozelAlanKodId9: "",
        ozelAlanKodId10: "",
        ozelAlan11: "",
        ozelAlan12: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, setValue, handleSubmit } = methods

    useEffect(() => {
        setLoading(true)
        VehiclesUpdateReadService(id).then(res => {
            setLoading(false)
            setVehiclesData(res.data)
            setValue("plaka", res?.data.plaka)
            setValue("guncelKm", res?.data.guncelKm)
            setValue("aracTipId", res?.data.aracTipId ? res?.data.aracTipId : null)
            setValue("aracTip", res?.data.aracTip)
            setValue("AracCinsiKodId", res?.data.aracCinsi)
            setValue("markaId", res?.data.markaId ? res?.data.markaId : null)
            setValue("marka", res?.data.marka)
            setValue("model", res?.data.model)
            setValue("modelId", res?.data.modelId ? res?.data.modelId : null)
            setValue("surucuId", res?.data.surucuId ? res?.data.surucuId : null)
            setValue("surucu", res?.data.surucu)
            setValue("lokasyonId", res?.data.lokasyonId ? res?.data.lokasyonId : null)
            setValue("lokasyon", res?.data.lokasyon)
            setValue("yakitTipId", res?.data.yakitTipId ? res?.data.yakitTipId : null)
            setValue("yakitTip", res?.data.yakitTip)
            setValue("aracRenkId", res?.data.aracRenkId ? res?.data.aracRenkId : null)
            setValue("renk", res?.data.renk)
            setValue("yil", res?.data.yil)
            setValue("aracGrubuId", res?.data.aracGrubuId ? res?.data.aracGrubuId : null)
            setValue("grup", res?.data.grup)
            setValue("departmanId", res?.data.departmanId ? res?.data.departmanId : null)
            setValue("departman", res?.data.departman)
            setValue("havuzGrup", res?.data.havuzGrup)
            setValue("durumKodId", res?.data.durumKodId ? res?.data.durumKodId : null)
            setValue("durum", res?.data.durum)
            setValue("tts", res?.data.tts)
            setValue("muayeneTarih", res?.data.muayeneTarih && res?.data.muayeneTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.muayeneTarih) : null)
            setValue("sozlesmeTarih", res?.data.sozlesmeTarih && res?.data.sozlesmeTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.sozlesmeTarih) : null)
            setValue("vergiTarih", res?.data.vergiTarih && res?.data.vergiTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.vergiTarih) : null)
            setValue("egzosTarih", res?.data.egzosTarih && res?.data.egzosTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.egzosTarih) : null)
            setValue("onGorulen", res?.data.onGorulen)
            setValue("onGorulenMin", res?.data.onGorulenMin)
            setValue("gerceklesen", res?.data.gerceklesen)
            setValue("ozelAlan1", res?.data.ozelAlan1)
            setValue("ozelAlan2", res?.data.ozelAlan2)
            setValue("ozelAlan3", res?.data.ozelAlan3)
            setValue("ozelAlan4", res?.data.ozelAlan4)
            setValue("ozelAlan5", res?.data.ozelAlan5)
            setValue("ozelAlan6", res?.data.ozelAlan6)
            setValue("ozelAlan7", res?.data.ozelAlan7)
            setValue("ozelAlan8", res?.data.ozelAlan8)
            setValue("ozelAlanKodId9", res?.data.ozelAlanKodId9)
            setValue("ozelAlanKodId10", res?.data.ozelAlanKodId10)
            setValue("ozelAlan11", res?.data.ozelAlan11)
            setValue("ozelAlan12", res?.data.ozelAlan12)
        })

        PhotoReadService(id, "Arac").then(res => setImageUrls(res.data))
        FileReadService(id, "Arac").then(res => setFilesUrl(res.data))
    }, [id, status, dataStatus])

    const uploadImages = () => {
        try {
            setLoadingImages(true);
            const data = uploadPhoto(id, "Arac", images)
            setImageUrls([...imageUrls, data.imageUrl]);
        } catch (error) {
            message.error("Resim yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingImages(false);
        }
    }

    const uploadFiles = () => {
        try {
            setLoadingFiles(true);
            uploadFile(id, "Arac", files)
        } catch (error) {
            message.error("Dosya yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingFiles(false);
        }
    }

    const onSubmit = handleSubmit((values) => {
        const data = {
            "aracId": id,
            "plaka": values.plaka,
            "yil": values.yil ? values.yil : 0,
            "aracTipId": values.aracTipId || -1,
            "guncelKm": values.guncelKm ? values.guncelKm : 0,
            "markaId": values.markaId || -1,
            "modelId": values.modelId || -1,
            "aracGrubuId": values.aracGrubuId || -1,
            "aracRenkId": values.aracRenkId || -1,
            "lokasyonId": values.lokasyonId || -1,
            "departmanId": values.departmanId || -1,
            "surucuId": values.surucuId || -1,
            "muayeneTarih": values?.muayeneTarih ? dayjs(values?.muayeneTarih).format("YYYY-MM-DD") : null,
            "egzosTarih": values?.egzosTarih ? dayjs(values?.egzosTarih).format("YYYY-MM-DD") : null,
            "vergiTarih": values?.vergiTarih ? dayjs(values?.vergiTarih).format("YYYY-MM-DD") : null,
            "sozlesmeTarih": values?.sozlesmeTarih ? dayjs(values?.sozlesmeTarih).format("YYYY-MM-DD") : null,
            "yakitTipId": values.yakitTipId || -1,
            "tts": values.tts,
            "durumKodId": values.durumKodId || -1,
            "aktif": true,
            "havuzGrup": values.havuzGrup,
            "onGorulenMin": values.onGorulenMin,
            "onGorulen": values.onGorulen,
            "gerceklesen": values.gerceklesen,
            "ozelAlan1": values.ozelAlan1,
            "ozelAlan2": values.ozelAlan2,
            "ozelAlan3": values.ozelAlan3,
            "ozelAlan4": values.ozelAlan4,
            "ozelAlan5": values.ozelAlan5,
            "ozelAlan6": values.ozelAlan6,
            "ozelAlan7": values.ozelAlan7,
            "ozelAlan8": values.ozelAlan8,
            "ozelAlanKodId9": values.ozelAlanKodId9,
            "ozelAlanKodId10": values.ozelAlanKodId10,
            "ozelAlan11": values.ozelAlan11,
            "ozelAlan12": values.ozelAlan12,
        }
        setLoading(true)
        VehiclesUpdateSetService(data).then(res => {
            if (res.data.statusCode === 202) {
                setStatus(true)
                setLoading(false)
            }
        })

        uploadImages()
        uploadFiles()
    })

    const personalProps = {
        form: "Arac",
        fields,
        setFields
    }

    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <PersonalFields personalProps={personalProps} />
        },
        {
            key: '3',
            label: `[${imageUrls.length}] Resimler`,
            children: <PhotoUpload imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />
        },
        {
            key: '4',
            label: `[${filesUrl.length}] Ekli Belgeler`,
            children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />
        },
    ]

    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={() => setKmHistryModal(false)}>
                Kapat
            </Button>
        ]
    )

    return (
        <>
            {loading && (
                <div className="loading-spin">
                    <div>
                        <Spin
                            indicator={
                                <LoadingOutlined
                                    style={{
                                        fontSize: 100,
                                    }}
                                    spin
                                />
                            }
                        />
                    </div>
                </div>
            )}

            <div className="content">
                <BreadcrumbComp items={breadcrumb} />
            </div>

            <FormProvider {...methods}>
                <div className="content">
                    <div className="grid">
                        <div className="col-span-3">
                            <img src="/images/ats_login_image.jpg" className="car-image border" alt="" />
                            <div className="flex gap-1 justify-between">
                                <p>Aktif</p>
                                <p>Bursa</p>
                                <p>50 km/h</p>
                            </div>
                        </div>
                        <div className="col-span-9">
                            <div className="grid p-10 gap-1">
                                <div className="col-span-12 flex gap-1 justify-end">
                                    <Button className="btn btn-min primary-btn" onClick={onSubmit}>{t('guncelle')}</Button>
                                    <Button className="btn btn-min cancel-btn">İptal</Button>
                                </div>
                                <div className="col-span-4">
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
                                <div className="col-span-4">
                                    <div className="flex flex-col gap-1">
                                        <label>Araç Tipi</label>
                                        <Controller
                                            name="aracTipId"
                                            control={control}
                                            render={({ field }) => (
                                                <VehicleType field={field} />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <div className="grid gap-1">
                                        <div className="col-span-10">
                                            <div className="flex flex-col gap-1">
                                                <label htmlFor="guncelKm">Güncel Km.</label>
                                                <Controller
                                                    name="guncelKm"
                                                    control={control}
                                                    render={({ field }) => (
                                                        <InputNumber
                                                            {...field}
                                                            className='w-full'
                                                            onChange={(e) => {
                                                                field.onChange(e)
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-2 self-end">
                                            <Button onClick={() => setKmHistryModal(true)}>...</Button>
                                        </div>
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
                                <div className="col-span-4">
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
                                <div className="col-span-4">
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
                                <div className="col-span-4">
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
                                <div className="col-span-4">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="yakitTipId">Yakıt Tipi</label>
                                        <Controller
                                            name="yakitTipId"
                                            control={control}
                                            render={({ field }) => (
                                                <FuelType field={field} />
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-4">
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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="content relative">
                    <DetailInfo id={id} />
                    <Tabs defaultActiveKey="1" items={items} />
                </div>
            </FormProvider>

            <Modal
                title={`Kilometre Güncelleme Geçmişi: ${vehiclesData?.plaka}`}
                open={kmHistryModal}
                onCancel={() => setKmHistryModal(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <KmLog data={vehiclesData} setDataStatus={setDataStatus} />
            </Modal>
        </>


    )
}

export default DetailUpdate
