import { Modal, Button, Checkbox, Divider, Input } from 'antd';
import SelectInput from '../../../../components/form/SelectInput';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../../../components/form/TextInput';
import DateInput from '../../../../components/form/DateInput';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { RuhsatInfoGetService, RuhsatInfoUpdateService } from '../../../../../api/service';
import dayjs from 'dayjs';
import { formatDate } from '../../../../../utils/format';
import IlSelect from '../../../../components/form/IlSelect';

const RuhsatModal = ({ visible, onClose, id }) => {
    const [hakMahrumiyetChecked, setHakMahrumiyetChecked] = useState(false);
    const [status, setStatus] = useState(false)

    const defaultValues = {
        aciklama: '',
        aracCinsi: null,
        aracSinifi: "",
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
        RuhsatInfoGetService(id).then(res => {
            console.log(res.data)
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
        console.log(values)
        const data = {
            "dtyAracId": +id,
            "ilSehirId": values.ilSehirId,
            "ruhsatSahibiKodId": values.ruhsatSahibiKodId,
            "ilce": values.ilce,
            "tescilNo": values.tescilNo,
            "tescilTarih": values?.tescilTarih ? formatDate(values?.tescilTarih.$d) : "1970-01-01",
            "trafikciktarih": values?.trafikciktarih ? formatDate(values?.trafikciktarih.$d) : "1970-01-01",
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
            "hakMahrumiyettarih": values?.hakMahrumiyettarih ? formatDate(values?.hakMahrumiyettarih.$d) : "1970-01-01",
            "onayNo": values.onayNo,
            "yolcuNakli": values.yolcuNakli,
            "yukNakli": values.yukNakli,
            "ticari": values.ticari,
            "resmi": values.resmi,
            "hususi": values.hususi,
            "vergiNo": values.vergiNo,
            "vergiDaire": values.vergiDaire,
        }

        console.log(data)

        RuhsatInfoUpdateService(data).then(res => {
            console.log(res.data)
            if (res.data.statusCode === 200) {
                setStatus(true)
            }
        })
    })

    const footer = (
        [
            <Button key="submit" className="btn primary-btn" onClick={onSumbit}>
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
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
                            <SelectInput control={control} name="ruhsatSahibi" label="Ruhsat Sahibi" name2="ruhsatSahibiKodId" selectID={115} setValue={setValue} />
                            <Controller
                                name='ruhsatSahibiKodId'
                                control={control}
                                render={({ field }) => <Input
                                    {...field}
                                    style={{ display: 'none' }}
                                />
                                }
                            />
                        </div>
                        <div className="col-span-3">
                            <IlSelect control={control} name="il" label="Verdiği İl" name2="ilSehirId" setValue={setValue} />
                            <Controller
                                name='ilSehirId'
                                control={control}
                                render={({ field }) => <Input
                                    {...field}
                                    style={{ display: 'none' }}
                                />
                                }
                            />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="ilce" label="Verdiği İlçe" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="tescilNo" label="Tescil Sıra No" />
                        </div>
                        <div className="col-span-3">
                            <DateInput control={control} name="trafikciktarih" label="İlk Tescil Tarihi" />
                        </div>
                        <div className="col-span-3">
                            <DateInput control={control} name="tescilTarih" label="Tescil Tarihi" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="belgeSeriNo" label="Belge Seri No" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="aracSinifi" label="Araç Sınıfı" />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="aracCinsi" label="Araç Cinsi" name2="" setValue={setValue} />
                            <Controller
                                name=''
                                control={control}
                                render={({ field }) => <Input
                                    {...field}
                                    style={{ display: 'none' }}
                                />
                                }
                            />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="ticariAdi" label="Ticari Adı" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="azamiYukluAgirligi" label="Azami Yüklü Ağırlığı" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="koltukSayisi" label="Koltuk Sayısı" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="ayaktaYolcuSayisi" label="Ayakta Yolcu Sayısı" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="onayNo" label="Onay No" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="vergiNo" label="Vergi No/TC No" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="vergiDaire" label="Vergi Dairesi" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="kullanimAmaci" label="Kullanım Amacı" />
                        </div>
                        <div className="col-span-4">
                            <div className="grid gap-1">
                                <div className="col-span-9">
                                    <TextInput control={control} name="istiapHaddi" label="İstiap Haddi" />
                                </div>
                                <div className="col-span-3 self-end">
                                    <SelectInput control={control} name="istiapHaddiBirim" label="" selectID={109} name2="istiapHaddiBirimKodId" setValue={setValue} />
                                    <Controller
                                        name='istiapHaddiBirimKodId'
                                        control={control}
                                        render={({ field }) => <Input
                                            {...field}
                                            style={{ display: 'none' }}
                                        />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="grid gap-1">
                                <div className="col-span-9">
                                    <TextInput control={control} name="rAzamiYuklu" label="R.Azami Yüklü Ağırlığı" />
                                </div>
                                <div className="col-span-3 self-end">
                                    <SelectInput control={control} name="rAzamiIstiapHaddiBirim" label="" name2="rAzamiIstiapHaddiBirimKodId" selectID={109} setValue={setValue} />
                                    <Controller
                                        name='rAzamiIstiapHaddiBirimKodId'
                                        control={control}
                                        render={({ field }) => <Input
                                            {...field}
                                            style={{ display: 'none' }}
                                        />
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aciklama">Açıklama</label>
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
                                render={({ field }) => <Checkbox {...field} checked={field.value}/>}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="yukNakli">Yüklü Nakli</label>
                            <Controller
                                name="yukNakli"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value}/>}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="tokograf">Takograf</label>
                            <Controller
                                name="tokograf"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value}/>}
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
                                render={({ field }) => <Checkbox {...field} checked={field.value}/>}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="yolcuNakli">Yolcu Nakli</label>
                            <Controller
                                name="yolcuNakli"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value}/>}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="hususi">Hüsusi</label>
                            <Controller
                                name="hususi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value}/>}
                            />
                        </div>
                        <div className="col-span-12">
                            <Divider />
                        </div>
                        <div className="col-span-6">
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
                            <TextInput control={control} name="hakMahrumiyetAciklama" label="Açıklama" disabled={!hakMahrumiyetChecked} />
                        </div>
                        <div className="col-span-12">
                            <TextInput control={control} name="hakMahrumiyetDurum" label="Makam/Kurum" disabled={!hakMahrumiyetChecked} />
                        </div>
                        <div className="col-span-12">
                            <DateInput control={control} name="hakMahrumiyettarih" label="Tarih" disabled={!hakMahrumiyetChecked} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default RuhsatModal;
