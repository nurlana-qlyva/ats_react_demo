import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { DetailInfoGetService, DetailInfoUpdateService } from '../../../../../api/service'
import { Button, Checkbox, ConfigProvider, DatePicker, Divider, Input, Modal } from 'antd'
import RuhsatSahibi from '../../../../components/form/RuhsatSahibi'
import Town from '../../../../components/form/Town'
import VehicleCins from '../../../../components/form/VehicleCins'
import IstihapHaddiBirim from '../../../../components/form/IstihapHaddiBirim'
import RAzamiIstihapHaddiBirim from '../../../../components/form/RAzamiIstihapBirim'
import TextArea from 'antd/lib/input/TextArea'

dayjs.locale('tr')

const Ruhsat = ({ visible, onClose, id }) => {
    const [hakMahrumiyetChecked, setHakMahrumiyetChecked] = useState(false)
    const [status, setStatus] = useState(false)

    const defaultValues = {
        aciklama: '',
        aracCinsi: '',
        aracCinsiKodId: null,
        aracSinifi: "",
        azamiYukluAgirligi: '',
        ayaktaYolcuSayisi: "",
        belgeSeriNo: "",
        dtyAracId: 0,
        hakMahrumiyet: false,
        hakMahrumiyetAciklama: "",
        hakMahrumiyetDurum: "",
        hakMahrumiyettarih: "",
        hususi: false,
        il: "",
        ilKodId: 0,
        ilce: "",
        istiapHaddi: "",
        istiapHaddiBirim: "",
        istiapHaddiBirimKodId: 0,
        koltukSayisi: "",
        kullanimAmaci: "",
        onayNo: "",
        resmi: false,
        romok: false,
        ruhsatSahibi: "",
        ruhsatSahibiKodId: 0,
        taksiMetre: false,
        tescilNo: "",
        tescilTarih: "",
        ticari: false,
        ticariAdi: "",
        tokograf: false,
        trafikciktarih: "",
        vergiDaire: "",
        vergiNo: "",
        yolcuNakli: false,
        yukNakli: false,
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    useEffect(() => {
        DetailInfoGetService(id).then(res => {
            setValue("aciklama", res?.data.aciklama)
            setValue("aracCinsi", res?.data.aracCinsi ? res?.data.aracCinsi : "")
            setValue("aracSinifi", res?.data.aracSinifi)
            setValue("ayaktaYolcuSayisi", res?.data.ayaktaYolcuSayisi)
            setValue("belgeSeriNo", res?.data.belgeSeriNo)
            setValue("dtyAracId", res?.data.dtyAracId)
            setValue("hakMahrumiyet", res?.data.hakMahrumiyet)
            setHakMahrumiyetChecked(res?.data.hakMahrumiyet)
            setValue("hakMahrumiyetAciklama", res?.data.hakMahrumiyetAciklama)
            setValue("hakMahrumiyetDurum", res?.data.hakMahrumiyetDurum)
            setValue("hakMahrumiyettarih", res?.data.hakMahrumiyettarih && res?.data.hakMahrumiyettarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.hakMahrumiyettarih) : null)
            setValue("hususi", res?.data.hususi)
            setValue("il", res?.data.il)
            setValue("ilSehirId", res?.data.ilSehirId)
            setValue("ilce", res?.data.ilce)
            setValue("istiapHaddi", res?.data.istiapHaddi)
            setValue("istiapHaddiBirim", res?.data.istiapHaddiBirim)
            setValue("istiapHaddiBirimKodId", res?.data.istiapHaddiBirimKodId)
            setValue("koltukSayisi", res?.data.koltukSayisi)
            setValue("kullanimAmaci", res?.data.kullanimAmaci)
            setValue("rAzamiIstiapHaddiBirim", res?.data.rAzamiIstiapHaddiBirim)
            setValue("rAzamiIstiapHaddiBirimKodId", res?.data.rAzamiIstiapHaddiBirimKodId)
            setValue("rAzamiYuklu", res?.data.rAzamiYuklu)
            setValue("azamiYukluAgirligi", res?.data.azamiYukluAgirligi)
            setValue("onayNo", res?.data.onayNo)
            setValue("resmi", res?.data.resmi)
            setValue("romok", res?.data.romok)
            setValue("ruhsatSahibi", res?.data.ruhsatSahibi)
            setValue("ruhsatSahibiKodId", res?.data.ruhsatSahibiKodId)
            setValue("taksiMetre", res?.data.taksiMetre)
            setValue("tescilNo", res?.data.tescilNo)
            setValue("tescilTarih", res?.data.tescilTarih && res?.data.tescilTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.tescilTarih) : null)
            setValue("ticari", res?.data.ticari)
            setValue("ticariAdi", res?.data.ticariAdi)
            setValue("tokograf", res?.data.tokograf)
            setValue("trafikciktarih", res?.data.trafikciktarih && res?.data.trafikciktarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.trafikciktarih) : null)
            setValue("vergiDaire", res?.data.vergiDaire)
            setValue("vergiNo", res?.data.vergiNo)
            setValue("yolcuNakli", res?.data.yolcuNakli)
            setValue("yukNakli", res?.data.yukNakli)
        })
    }, [id, status])

    const onSumbit = handleSubmit((values) => {
        const data = {
            "dtyAracId": +id,
            "ilSehirId": values.ilSehirId,
            "ruhsatSahibiKodId": values.ruhsatSahibiKodId,
            "ilce": values.ilce,
            "tescilNo": values.tescilNo,
            "tescilTarih": values?.tescilTarih,
            "trafikciktarih": values?.trafikciktarih,
            "istiapHaddi": values.istiapHaddi,
            "romok": values.romok,
            "taksiMetre": values.taksiMetre,
            "tokograf": values.tokograf,
            "aciklama": values.aciklama,
            "istiapHaddiBirimKodId": values.istiapHaddiBirimKodId,
            "belgeSeriNo": values.belgeSeriNo,
            "ticariAdi": values.ticariAdi,
            "aracSinifi": values.aracSinifi,
            "koltukSayisi": values.koltukSayisi,
            "ayaktaYolcuSayisi": values.ayaktaYolcuSayisi,
            "kullanimAmaci": values.kullanimAmaci,
            "hakMahrumiyet": values.hakMahrumiyet,
            "hakMahrumiyetAciklama": values.hakMahrumiyetAciklama,
            "hakMahrumiyetDurum": values.hakMahrumiyetDurum,
            "hakMahrumiyettarih": values?.hakMahrumiyettarih ? dayjs(values?.hakMahrumiyettarih).format('YYYY-MM-DD') : "1970-01-01",
            "onayNo": values.onayNo,
            "yolcuNakli": values.yolcuNakli,
            "yukNakli": values.yukNakli,
            "ticari": values.ticari,
            "resmi": values.resmi,
            "hususi": values.hususi,
            "vergiNo": values.vergiNo,
            "vergiDaire": values.vergiDaire,
        }

        DetailInfoUpdateService(data).then(res => {
            if (res.data.statusCode === 202) {
                setStatus(true)
                onClose()
            }
        })
    })

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
                Kaydet
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title="Ruhsat Bilgileri"
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <div className="grid gap-1 mt-14">
                <div className="col-span-9 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Ruhsat Sahibi</label>
                                <Controller
                                    name="aracTipId"
                                    control={control}
                                    render={({ field }) => (
                                        <RuhsatSahibi field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aracTipId">Araç Tipi</label>
                                <Controller
                                    name="aracTipId"
                                    control={control}
                                    render={({ field }) => (
                                        <Town field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Verdiği İlçe</label>
                                <Controller
                                    name="ilce"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Tescil Sıra No</label>
                                <Controller
                                    name="tescilNo"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>İlk Tescil Tarihi</label>
                                <Controller
                                    name="trafikciktarih"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Tescil Tarihi</label>
                                <Controller
                                    name="tescilTarih"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Belge Seri No</label>
                                <Controller
                                    name="belgeSeriNo"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Araç Sınıfı</label>
                                <Controller
                                    name="aracSinifi"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Araç Cinsi</label>
                                <Controller
                                    name="aracCinsiKodId"
                                    control={control}
                                    render={({ field }) => (
                                        <VehicleCins field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Ticari Adı</label>
                                <Controller
                                    name="ticariAdi"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Azami Yüklü Ağırlığı</label>
                                <Controller
                                    name="azamiYukluAgirligi"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Koltuk Sayısı</label>
                                <Controller
                                    name="koltukSayisi"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Ayakta Yolcu Sayısı</label>
                                <Controller
                                    name="ayaktaYolcuSayisi"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Onay No</label>
                                <Controller
                                    name="onayNo"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Vergi No/TC No</label>
                                <Controller
                                    name="vergiNo"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Vergi Dairesi</label>
                                <Controller
                                    name="vergiDaire"
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
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>Kullanım Amacı</label>
                                <Controller
                                    name="kullanimAmaci"
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
                            <div className="grid gap-1">
                                <div className="col-span-3">
                                    <div className="flex flex-col gap-1">
                                        <label>İstiap Haddi</label>
                                        <Controller
                                            name="istiapHaddi"
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
                                <div className="col-span-3 self-end">
                                    <div className="flex flex-col gap-1">
                                        <Controller
                                            name="istiapHaddiBirimKodId"
                                            control={control}
                                            render={({ field }) => (
                                                <IstihapHaddiBirim field={field} />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="grid gap-1">
                                <div className="col-span-9">
                                    <div className="flex flex-col gap-1">
                                        <label>R.Azami Yüklü Ağırlığı</label>
                                        <Controller
                                            name="rAzamiYuklu"
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
                                <div className="col-span-3 self-end">
                                    <div className="flex flex-col gap-1">
                                        <Controller
                                            name="istiapHaddrAzamiIstiapHaddiBirimKodIdiBirimKodId"
                                            control={control}
                                            render={({ field }) => (
                                                <RAzamiIstihapHaddiBirim field={field} />
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>Açıklama</label>
                                <Controller
                                    name="aciklama"
                                    control={control}
                                    render={({ field }) => (
                                        <TextArea
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 border p-10">
                    <div className="grid">
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="taksiMetre">Taksimetre</label>
                            <Controller
                                name="taksiMetre"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="yukNakli">Yüklü Nakli</label>
                            <Controller
                                name="yukNakli"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="tokograf">Takograf</label>
                            <Controller
                                name="tokograf"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="ticari">Ticari</label>
                            <Controller
                                name="ticari"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="romok">Römork Takar</label>
                            <Controller
                                name="romok"
                                control={control}
                                render={({ field }) => {
                                    return <Checkbox {...field} checked={field.value} />
                                }}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="resmi">Resmi</label>
                            <Controller
                                name="resmi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="yolcuNakli">Yolcu Nakli</label>
                            <Controller
                                name="yolcuNakli"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="hususi">Hüsusi</label>
                            <Controller
                                name="hususi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        <div className="col-span-12">
                            <Divider />
                        </div>
                        <div className="col-span-12 flex gap-1 mb-10">
                            <Controller
                                control={control}
                                name='hakMahrumiyet'
                                render={({ field }) => <Checkbox {...field} className='mr-10' checked={field.value} onChange={e => {
                                    field.onChange(e.target.checked)
                                    setHakMahrumiyetChecked(e.target.checked)
                                }} />}
                            />
                            <label htmlFor="">Hak Mahrumiyeti</label>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>Açıklama</label>
                                <Controller
                                    name="hakMahrumiyetAciklama"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            disabled={!hakMahrumiyetChecked}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>Makam/Kurum</label>
                                <Controller
                                    name="hakMahrumiyetDurum"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            disabled={!hakMahrumiyetChecked}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>Tarih</label>
                                <Controller
                                    name="hakMahrumiyettarih"
                                    control={control}
                                    render={({ field }) => (
                                        <ConfigProvider locale={tr_TR}>
                                            <DatePicker
                                                {...field}
                                                placeholder=""
                                                disabled={!hakMahrumiyetChecked}
                                                locale={dayjs.locale("tr")}
                                                format="DD.MM.YYYY"
                                                onChange={e => {
                                                    field.onChange(e)
                                                }}
                                            />
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default Ruhsat
