import { useContext, useState } from 'react';
import { useForm, FormProvider, Controller } from 'react-hook-form'
// components
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { TabView, TabPanel } from 'primereact/tabview';
import TextInput from '../../../../components/TextInput';
import SelectBox from '../../../../components/SelectBox';
import PhotoUpload from '../../../../components/PhotoUpload';
import FileUploadComp from '../../../../components/FileUploadComp';
import { Calendar } from 'primereact/calendar';
import { DataContext } from './DataContext';
import MarkaSelectbox from './components/MarkaSelectbox';
import ModelSelectbox from './components/ModelSelectbox';


const AddModal = () => {
    const [visible, setVisible] = useState(false);
    const { setData } = useContext(DataContext)

    const defaultValues = {
        plaka: "",
        aracTipi: null,
        guncelKm: "",
        marka: null,
        model: null,
        modelYili: "",
        aracGrubu: null,
        aracCinsi: null,
        renk: null,
        lokasyon: null,
        mulkiyet: "",
        departman: null,
        surucu: null,
        yakitTipi: null,
        muayene: null,
        sozlesme: null,
        egzozEmisyon: null,
        vergi: null,
        aracOzelAlan1: "",
        aracOzelAlan2: "",
        aracOzelAlan3: "",
        aracOzelAlan4: "",
        aracOzelAlan5: "",
        aracOzelAlan6: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset } = methods


    const handleSubmitClick = handleSubmit(() => {
        setData(defaultValues);
        reset();
    });

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-times" onClick={() => setVisible(false)} className="save-btn" onClickCapture={handleSubmitClick} />
            <Button label="İptal" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <FormProvider {...methods}>
            <div className="card flex">
                <Button label="Ekle" icon="pi pi-plus" onClick={() => setVisible(true)} className='add-btn' />
                <Dialog visible={visible} style={{ width: '70vw' }} onHide={() => {
                    setVisible(false)
                    setData(defaultValues)
                }} footer={footerContent}>
                    <TabView>
                        <TabPanel header="Genel Bilgiler">
                            <div className="border-1 border-300 border-round p-3">
                                <div className="grid">
                                    <div className="col-12 md:col-6 lg:col-4">
                                        <TextInput control={control} label={"Plaka"} name={"plaka"} type="text" />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-4">
                                        <SelectBox control={control} name={"aracTipi"} label={"Arac tip"} selectID="100" />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-4">
                                        <TextInput control={control} label={"Güncel Km."} name={"guncelKm"} type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="grid mt-1">
                                <div className="col-12 md:col-8">
                                    <div className="border-1 border-300 border-round p-3">
                                        <h3>Araç Bilgileri</h3>
                                        <div className="grid mt-2">
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <MarkaSelectbox control={control} label="Marka" name="marka" url="Mark/GetMarkList" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <TextInput control={control} label={"Model Yılı"} name={"modelYili"} type="text" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <ModelSelectbox control={control} label="Model" name="model" url="Model/GetModelList" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <SelectBox control={control} label="Araç Grubu" name="aracGrubu" selectID="101" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <SelectBox control={control} label="Araç Cinsi" name="aracCinsi" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <SelectBox control={control} label="Renk" name="renk" selectID="111" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <SelectBox control={control} label="Lokasyon" name="lokasyon" selectID="201" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <TextInput control={control} label={"Mülkiyet"} name={"mulkiyyet"} type="text" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <SelectBox control={control} label="Departman" name="departman" selectID="200" />
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
                                        <h3>Yenilenme Tarihleri</h3>
                                        <div className="grid mt-2">
                                            <div className="col-12 md:col-6 flex flex-column gap-2">
                                                <label htmlFor={"muayene"} style={{ color: "#007bff" }}>Muayene</label>
                                                <Controller
                                                    name="muayene"
                                                    control={control}
                                                    render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                                />
                                            </div>
                                            <div className="col-12 md:col-6 flex flex-column gap-2">
                                                <label htmlFor={"sozlesme"} style={{ color: "#007bff" }}>Sözleşme</label>
                                                <Controller
                                                    name="sozlesme"
                                                    control={control}
                                                    render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                                />
                                            </div>
                                            <div className="col-12 md:col-6 flex flex-column gap-2">
                                                <label htmlFor={"egzozEmisyon"} style={{ color: "#007bff" }}>Egzoz Emisyon</label>
                                                <Controller
                                                    name="egzozEmisyon"
                                                    control={control}
                                                    render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                                />
                                            </div>
                                            <div className="col-12 md:col-6 flex flex-column gap-2">
                                                <label htmlFor={"vergi"} style={{ color: "#007bff" }}>Vergi</label>
                                                <Controller
                                                    name="vergi"
                                                    control={control}
                                                    render={({ field }) => <Calendar dateFormat="dd/mm/yy" {...field} />}
                                                />
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
                    </TabView>
                </Dialog>

            </div>
        </FormProvider>

    )
}

export default AddModal
