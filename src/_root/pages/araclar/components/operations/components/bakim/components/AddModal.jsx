import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
// components
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import TextInput from '../../../../../../../components/TextInput';
import SelectBox from '../../../../../../../components/SelectBox';
import { Divider } from 'primereact/divider';
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";

const AddModal = () => {
    const [visible, setVisible] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: "",
            remember: false
        }
    })

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-check" onClick={() => setVisible(false)} className="save-btn" />
            <Button label="İptal" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <div className="card flex">
            <Button label="Ekle" icon="pi pi-plus" onClick={() => setVisible(true)} className='add-btn' />
            <Dialog visible={visible} style={{ width: '70vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <h2>Servis Bilgileri Plaka: <span>[16 EG 1231 [BMW - X6]]</span></h2>
                <div className="grid py-4">
                    <div className="col-12 md:col-6">
                        <div className="grid border-200 border-right-1 p-2">
                            <div className="col-12 md:col-6">
                                <div className="grid">
                                    <div className="col-6 flex flex-column gap-2">
                                        <label htmlFor={"servisTarih"}>Tarih</label>
                                        <Controller
                                            name="servisTarih"
                                            control={control}
                                            render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                        />
                                    </div>
                                    <div className="col-6 flex flex-column gap-2">
                                        <label htmlFor={"servisSaat"}>Saat</label>
                                        <Controller
                                            name="servisSaat"
                                            control={control}
                                            render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} timeOnly />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <TextInput control={control} label={"Servis Kodu"} name={"servisKodu"} type="text" />
                            </div>
                            <div className="col-12 md:col-6">
                                <SelectBox control={control} label="Servis Tipi" name="servisTipi" />
                            </div>
                            <div className="col-12 md:col-6">
                                <SelectBox control={control} label="Servis Tanımı" name="servisTanimi" />
                            </div>
                            <div className="col-12 md:col-6">
                                <SelectBox control={control} label="Servis Nedeni" name="servisNedeni" />
                            </div>
                            <div className="col-12 md:col-6">
                                <SelectBox control={control} label={"Sürücü"} name={"surucu"} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="grid p-2">

                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Fatura No"} name={"faturaNo"} type="text" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <div className="flex flex-column gap-2">
                                    <label htmlFor={"faturaTarihi"}>Fatura Tarihi</label>
                                    <Controller
                                        name="faturaTarihi"
                                        control={control}
                                        render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                    />
                                </div>
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Hasar No"} name={"hasarNo"} type="text" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Talep No"} name={"talepNo"} type="text" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"İş Emri No"} name={"isEmriNo"} type="text" />
                            </div>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className="grid py-4">
                    <div className="col-12 md:col-6">
                        <div className="grid grid border-200 border-right-1 p-2">
                            <div className="col-12 md:col-6">
                                <div className="grid">
                                    <div className="col-6 flex flex-column gap-2">
                                        <label htmlFor={"baslamaTarihi"} style={{ color: "#007bff" }}>Başlama Tarihi</label>
                                        <Controller
                                            name="baslamaTarihi"
                                            control={control}
                                            render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                        />
                                    </div>
                                    <div className="col-6 flex flex-column gap-2">
                                        <label htmlFor={"baslamaSaati"} style={{ color: "#007bff" }}>Saat</label>
                                        <Controller
                                            name="baslamaSaati"
                                            control={control}
                                            render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} timeOnly />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="grid">
                                    <div className="col-6 flex flex-column gap-2">
                                        <label htmlFor={"bitisTarihi"} style={{ color: "#007bff" }}>Bitiş Tarihi</label>
                                        <Controller
                                            name="bitisTarihi"
                                            control={control}
                                            render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                        />
                                    </div>
                                    <div className="col-6 flex flex-column gap-2">
                                        <label htmlFor={"bitisSaati"} style={{ color: "#007bff" }}>Saat</label>
                                        <Controller
                                            name="bitisSaati"
                                            control={control}
                                            render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} timeOnly />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <TextInput control={control} label={"Araç Km."} name={"aracKm"} type="text" color={"#007bff"} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="grid py-2">
                            <div className="col-12 md:col-6">
                                <SelectBox control={control} label={"Masraf Merkezi"} name={"masrafMerkei"} />
                            </div>
                            <div className="col-12 md:col-6">
                                <SelectBox control={control} label={"Lokasyon"} name={"lokasyon"} />
                            </div>
                            <div className="col-12 md:col-6">
                                <SelectBox control={control} label={"Onay"} name={"onay"} />
                            </div>
                        </div>
                    </div>
                </div>

                <Divider />
                <div className="grid py-4">
                    <div className="col-12 md:col-6">
                        <div className="grid">
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="flex align-items-center">
                                    <Controller
                                        name="islemiYapan"
                                        control={control}
                                        render={({ field }) => <RadioButton {...field} inputId="islemiYapan1" name="islemiYapan" value="yetkiliServis" />}
                                    />
                                    <label htmlFor="islemiYapa1" className="ml-2">Yetkili Servis</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-6 lg:col-3">
                                <div className="flex align-items-center">
                                    <Controller
                                        name="baslamaSaati"
                                        control={control}
                                        render={({ field }) => <RadioButton {...field} inputId="islemiYapan2" name="islemiYapan" value="BakimAtolyesi" />}
                                    />
                                    <label htmlFor="islemiYapa2" className="ml-2">Bakım Atölyesi</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 md:col-6">
                        <div className="grid py-2">
                            <div className="col-12 md:col-6">
                                <div className="flex align-items-center">
                                    <Controller
                                        name="durum"
                                        control={control}
                                        render={({ field }) => <Checkbox inputId="tamamlandi" name="durum" value="tamamlandi" />}
                                    />
                                    <label htmlFor="tamamlandi" className="ml-2" style={{color: "#007bff"}}>Tamamlandı</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="flex align-items-center">
                                    <Controller
                                        name="durum"
                                        control={control}
                                        render={({ field }) => <Checkbox inputId="tekrarlanacak" name="durum" value="tekrarlanacak" />}
                                    />
                                    <label htmlFor="tekrarlanacak" className="ml-2" style={{color: "#007bff"}}>Tekrarlanacak</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="flex align-items-center">
                                    <Controller
                                        name="durum"
                                        control={control}
                                        render={({ field }) => <Checkbox inputId="yapilamadi" name="durum" value="Cheese" />}
                                    />
                                    <label htmlFor="yapilamadi" className="ml-2" style={{color: "#007bff"}}>Yapılamadı</label>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <div className="flex align-items-center">
                                    <Controller
                                        name="durum"
                                        control={control}
                                        render={({ field }) => <Checkbox inputId="garantiKapsaminda" name="durum" value="Cheese" />}
                                    />
                                    <label htmlFor="garantiKapsaminda" className="ml-2" style={{color: "#007bff"}}>Garanti Kapsamında</label>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </Dialog>
        </div>
    )
}

export default AddModal