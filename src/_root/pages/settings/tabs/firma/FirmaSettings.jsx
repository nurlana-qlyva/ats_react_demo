import { FormProvider, useForm } from 'react-hook-form'
import { t } from 'i18next'
import { Button, Divider } from 'antd'
import TextInput from "../../../../components/form/inputs/TextInput"
import Textarea from "../../../../components/form/inputs/Textarea"

const FirmaSettings = () => {
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
    const { handleSubmit, reset, setValue } = methods


    return (
        <FormProvider {...methods}>
            <div className='grid gap-1'>
                <div className="col-span-2 text-center">
                    <img src="/images/ats_login_image.jpg" alt="ats" className='w-full' />
                </div>
                <div className="col-span-10">
                    <div className="grid gap-1 p-10">
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("firmaUnvani")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("adres")} 1</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("adres")} 2</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("sehir")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("ilce")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("pk")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("ulke")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-12 mt-10 mb-10">
                            <Divider />
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("telefon")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("fax")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("web")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("email")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("vergiDairesi")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col gap-1">
                                <label>{t("vergiNumarasi")}</label>
                                <TextInput name="" />
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-col gap-1">
                                <label>{t("aciklama")}</label>
                                <Textarea name="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="justify-end flex gap-1 col-span-12 mt-10">
                <Button className="btn btn-min primary-btn">Kaydet</Button>
                <Button className="btn btn-min cancel-btn">İptal</Button>
            </div>
        </FormProvider>
    )
}

export default FirmaSettings
