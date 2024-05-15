import { useForm } from "react-hook-form"
import TextInput from "../../../components/form/TextInput"
import TextArea from "antd/es/input/TextArea"
import { Button } from "antd"

const FirmaInfo = () => {
    const defaultValues = {
        kmAracId: 0,
        seferSiraNo: 0,
        yakitSiraNo: 0,
        plaka: "",
        tarih: new Date(),
        saat: "",
        eskiKm: 0,
        yeniKm: 0,
        fark: 0,
        kaynak: "",
        dorse: false,
        aciklama: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    return (
        <div>
            <div className="grid gap-1">
                <div className="col-span-2" style={{ textAlign: 'center' }}>
                    <img src="/images/ats_login_image.jpg" alt="" style={{ width: "100%" }} />
                </div>
                <div className="col-span-10">
                    <div className="grid gap-1 p-10">
                        <div className="col-span-3">
                            <TextInput control={control} name='' label="Firma Ünvanı" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name='' label="Adres 1" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name='' label="Adres 2" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name='' label="Şehir" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name='' label="İlçe" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name='' label="PK" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name='' label="Ülke" />
                        </div>
                    </div>
                </div>
                <div className="col-span-2">
                    <TextInput control={control} name='' label="Telefon" />
                </div>
                <div className="col-span-2">
                    <TextInput control={control} name='' label="Fax" />
                </div>
                <div className="col-span-2">
                    <TextInput control={control} name='' label="Web" />
                </div>
                <div className="col-span-2">
                    <TextInput control={control} name='' label="Email" />
                </div>
                <div className="col-span-2">
                    <TextInput control={control} name='' label="Vergi Dairesi" />
                </div>
                <div className="col-span-2">
                    <TextInput control={control} name='' label="Vergi Numarası" />
                </div>
                <div className="col-span-12">
                    <label htmlFor="">Açıklama</label>
                    <TextArea />
                </div>
                <div className="justify-end flex gap-1 col-span-12 mt-10">
                    <Button className="primary-btn">Kaydet</Button>
                    <Button className="cancel-btn">İptal</Button>
                </div>
            </div>
        </div>
    )
}

export default FirmaInfo
