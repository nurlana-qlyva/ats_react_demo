import { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
// components
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
// import { TabView, TabPanel } from 'primereact/tabview';
// import { InputText } from "primereact/inputtext";
// import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
// import TextInput from './components/TextInput';
// import SelectBox from './components/SelectBox';
// import PhotoUpload from './components/PhotoUpload';
// import FileUploadComp from './components/FileUploadComp';


const AddModal = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: "",
            remember: false
        }
    })

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-times" onClick={() => setVisible(false)} className="save-btn" />
            <Button label="İptal" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <div className="card flex">
            <Button label="Ekle" icon="pi pi-plus" onClick={() => setVisible(true)} className='add-btn' />
            <Dialog visible={visible} style={{ width: '70vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                salam
                {/* <TabView>
                    <TabPanel header="Genel Bilgiler">
                        <div className="border-1 border-300 border-round p-3">
                            <div className="grid">
                                <div className="col-12 md:col-6 lg:col-4">
                                    <TextInput control={control} label={"Plaka"} name={"plaka"} type="text" />
                                </div>
                                <div className="col-12 md:col-6 lg:col-4">
                                    <SelectBox control={control} label="Araç Tipi" name="aracTipi" />
                                </div>
                                <div className="col-12 md:col-6 lg:col-4">
                                    <TextInput control={control} label={"Güncel Km."} name={"guncelKm"} type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="grid mt-1">
                            <div className="col-12 md:col-8">
                                <div className="border-1 border-300 border-round p-3">
                                    <h2>Araç Bilgileri</h2>
                                    <div className="grid mt-2">
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Marka" name="marka" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <TextInput control={control} label={"Model Yılı"} name={"modelYili"} type="text" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Model" name="model" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Araç Grubu" name="aracGrubu" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Araç Cinsi" name="aracCinsi" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Renk" name="renk" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Lokasyon" name="lokasyon" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <TextInput control={control} label={"Mülkiyet"} name={"mulkiyyet"} type="text" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Departman" name="departman" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Sürücü" name="surucu" />
                                        </div>
                                        <div className="col-12 md:col-6 lg:col-4">
                                            <SelectBox control={control} label="Yakıt Tipi" name="yakitTipi" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="border-1 border-300 border-round p-3">
                                    <h2>Yenilenme Tarihleri</h2>
                                    <div className="grid mt-2">
                                        <div className="col-12 md:col-6">
                                            <TextInput control={control} label={"Muayene"} name={"muayene"} type="date" color={"#007bff"} />
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <TextInput control={control} label={"Sözleşme"} name={"sozlesme"} type="date" color={"#007bff"} />
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <TextInput control={control} label={"Egzoz Emisyon"} name={"egzozEmisyon"} type="date" color={"#007bff"} />
                                        </div>
                                        <div className="col-12 md:col-6">
                                            <TextInput control={control} label={"Vergi"} name={"vergi"} type="date" color={"#007bff"} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Özel Alanlar">
                        <div className="grid">
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Özel Alan 1"} name={"aracOzelAlan1"} type="text" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label="Özel Alan 2" name="aracOzelAlan2" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Özel Alan 3"} name={"aracOzelAlan3"} type="text" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Özel Alan 4"} name={"aracOzelAlan4"} type="text" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Özel Alan 5"} name={"aracOzelAlan5"} type="text" />
                            </div>
                            <div className="col-12 md:col-6 lg:col-4">
                                <TextInput control={control} label={"Özel Alan 6"} name={"aracOzelAlan6"} type="text" />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Resimler">
                        <PhotoUpload />
                    </TabPanel>
                    <TabPanel header="Ekli Belgeler">
                        <FileUploadComp />
                    </TabPanel>
                </TabView> */}
            </Dialog>

        </div>
    )
}

export default AddModal
