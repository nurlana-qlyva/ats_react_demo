import { Modal, Button, Checkbox, Divider } from 'antd';
import SelectInput from '../../../../components/form/SelectInput';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../../../components/form/TextInput';
import DateInput from '../../../../components/form/DateInput';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import { RuhsatInfoGetService } from '../../../../../api/service';
import dayjs from 'dayjs';

const RuhsatModal = ({ visible, onClose, id }) => {
    const [hakMahrumiyetChecked, setHakMahrumiyetChecked] = useState(false);
    const [romok, setRomok] = useState(false);
    const [taksimetre, setTaksimetre] = useState(false);
    const [tokograf, setTokograf] = useState(false);
    const [yukNakli, setYukNakli] = useState(false);
    const [ticari, setTicari] = useState(false);
    const [resmi, setResmi] = useState(false);
    const [yolcuNakli, setYolcuNakli] = useState(false);
    const [hususi, setHususi] = useState(false);

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
        romorkIstiap: null,
        romorkIstiapHaddiBirim: null,
        romorkIstiapHaddiBirimKodId: 0,
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
            setValue("aciklama", res?.data.aciklama)
            setValue("aracCinsi", res?.data.aracCinsi)
            setValue("aracSinifi", res?.data.aracSinifi)
            setValue("ayaktaYolcuSayisi", res?.data.ayaktaYolcuSayisi)
            setValue("belgeSeriNo", res?.data.belgeSeriNo)
            setValue("dtyAracId", res?.data.dtyAracId)
            setValue("hakMahrumiyet", res?.data.hakMahrumiyet)
            setHakMahrumiyetChecked(res?.data.hakMahrumiyet)
            setValue("hakMahrumiyetAciklama", res?.data.hakMahrumiyetAciklama)
            setValue("hakMahrumiyetDurum", res?.data.hakMahrumiyetDurum)
            setValue("hakMahrumiyettarih", res?.data.hakMahrumiyettarih !== "1970-01-21T00:00:00" ? dayjs(res?.data.hakMahrumiyettarih) : "")
            setValue("hususi", res?.data.hususi)
            setHususi(res?.data.hususi)
            setValue("il", res?.data.il)
            setValue("ilKodId", res?.data.ilKodId)
            setValue("ilce", res?.data.ilce)
            setValue("istiapHaddi", res?.data.istiapHaddi)
            setValue("istiapHaddiBirim", res?.data.istiapHaddiBirim)
            setValue("istiapHaddiBirimKodId", res?.data.istiapHaddiBirimKodId)
            setValue("koltukSayisi", res?.data.koltukSayisi)
            setValue("kullanimAmaci", res?.data.kullanimAmaci)
            setValue("onayNo", res?.data.onayNo)
            setValue("resmi", res?.data.resmi)
            setResmi(res?.data.resmi)
            setValue("romok", res?.data.romok)
            setRomok(res?.data.romok)
            setValue("romorkIstiap", res?.data.romorkIstiap)
            setValue("romorkIstiapHaddiBirim", res?.data.romorkIstiapHaddiBirim)
            setValue("romorkIstiapHaddiBirimKodId", res?.data.romorkIstiapHaddiBirimKodId)
            setValue("ruhsatSahibi", res?.data.ruhsatSahibi)
            setValue("ruhsatSahibiKodId", res?.data.ruhsatSahibiKodId)
            setValue("taksiMetre", res?.data.taksiMetre)
            setTaksimetre(res?.data.taksiMetre)
            setValue("tescilNo", res?.data.tescilNo)
            setValue("ticari", res?.data.ticari)
            setTicari(res?.data.ticari)
            setValue("ticariAdi", res?.data.ticariAdi)
            setValue("tokograf", res?.data.tokograf)
            setTokograf(res?.data.tokograf)
            setValue("trafikciktarih", dayjs(res?.data.trafikciktarih))
            setValue("vergiDaire", res?.data.vergiDaire)
            setValue("vergiNo", res?.data.vergiNo)
            setValue("yolcuNakli", res?.data.yolcuNakli)
            setYolcuNakli(res?.data.yolcuNakli)
            setValue("yukNakli", res?.data.yukNakli)
            setYukNakli(res?.data.yukNakli)
        })
    }, [id])

    const footer = (
        [
            <Button key="submit" className="btn primary-btn">
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                İptal
            </Button>
        ]
    )

    const header = (
        <h2>Ruhsat Bilgileri</h2>
    )

    return (
        <Modal
            title="Ruhsat Bilgileri"
            visible={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            header={header}
            width={1200}
        >
            <div className="grid gap-1 mt-14">
                <div className="col-span-9 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-3">
                            <SelectInput control={control} name="ruhsatSahibi" label="Ruhsat Sahibi" name2="ruhsatSahibiId" setValue={setValue} />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="il" label="Verdiği İl" name2="ilKodId" setValue={setValue} />
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
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="" label="R.Azami Yüklü Ağırlığı" name2="" setValue={setValue} />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="" label="Azami Yüklü Ağırlığı" />
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
                            <TextInput control={control} name="ticariAdi" label="Ticari Adı" />
                        </div>
                        <div className="col-span-4">
                            <SelectInput control={control} name="istiapHaddi" label="İstiap Haddi" name2="" setValue={setValue} />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="kullanimAmaci" label="Kullanım Amacı" />
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
                                render={({ field }) => <Checkbox {...field} checked={taksimetre} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="yolcuNakli">Yüklü Nakli</label>
                            <Controller
                                name="yolcuNakli"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={yukNakli} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="tokograf">Takograf</label>
                            <Controller
                                name="tokograf"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={tokograf} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="ticari">Ticari</label>
                            <Controller
                                name="ticari"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={ticari} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="romok">Römork Takar</label>
                            <Controller
                                name="romok"
                                control={control}
                                render={({ field }) => {
                                    return <Checkbox {...field} checked={romok} onChange={e => field.onChange(e.target.value)} />
                                }}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="resmi">Resmi</label>
                            <Controller
                                name="resmi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={resmi} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="yolcuNakli">Yolcu Nakli</label>
                            <Controller
                                name="yolcuNakli"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={yolcuNakli} />}
                            />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="hususi">Hüsusi</label>
                            <Controller
                                name="hususi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={hususi} />}
                            />
                        </div>
                        <div className="col-span-12">
                            <Divider />
                        </div>
                        <div className="col-span-6">
                            <Controller
                                control={control}
                                name='hakMahrumiyet'
                                render={({ field }) => <Checkbox {...field} className='mr-10' checked={hakMahrumiyetChecked} onChange={e => {
                                    setHakMahrumiyetChecked(e.target.value)
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
