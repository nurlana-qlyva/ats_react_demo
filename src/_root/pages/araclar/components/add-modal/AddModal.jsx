import { useContext, useEffect, useState, useRef } from 'react';
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
import DriverSelectbox from './components/DriverSelectbox';
import MaterialListSelectbox from '../../../../components/MaterialListSelectbox';
import Location from '../../../../components/Location';
import { AracAddService, AraclarSearchService, FileUploadService, OzelAlanUpdateService, PhotoUploadService } from '../../../../../api/service';
import { InputText } from 'primereact/inputtext';
import { Messages } from 'primereact/messages';
import { useMountEffect } from 'primereact/hooks';
import OzelAlan from '../../../../components/OzelAlan';

const format = (date) => {
    const d = new Date(date)
    let month = d.getMonth() + 1
    let day = d.getDate()
    if (month < 10) month = "0" + month
    if (day < 10) day = "0" + day
    const format = d.getFullYear() + "-" + month + "-" + day
    return format
}

const MessageTemplate = () => {
    const msgs = useRef(null);
    useMountEffect(() => {
        if (msgs.current) {
            msgs.current.clear();
            msgs.current.show([
                { sticky: true, severity: 'success', summary: 'Success', detail: 'Closable Message' },
            ]);
        }
    });
    return (
        <div className="card" style={{ position: 'fixed', top: "0", right: "0", zIndex: "2000" }}>
            <Messages ref={msgs} />
        </div>
    )
}

const AddModal = ({ setVehicles, setVehiclesCount }) => {
    const [visible, setVisible] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [status, setStatus] = useState(false);
    const [fileStatus, setFileStatus] = useState(false);
    const [imageStatus, setImageStatus] = useState(false);
    const [images, setImages] = useState(null)
    const [documents, setDocuments] = useState([])
    const [aracId, setAracId] = useState(0)

    const { setData } = useContext(DataContext)

    const defaultValues = {
        plaka: "",
        aracTipi: null,
        guncelKm: "",
        marka: 0,
        model: 0,
        modelYili: "",
        aracGrubu: 0,
        aracCinsi: 0,
        renk: 0,
        lokasyon: 0,
        mulkiyet: "",
        departman: 0,
        surucu: 0,
        yakitTipi: 0,
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
        images: [],
        documents: []
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset } = methods

    const handleLocationChange = (value) => {
        setSelectedValue(value);
    };

    const handleSubmitClick = handleSubmit((value) => {
        console.log(value)
        const data = {
            "plaka": value.plaka,
            "yil": +value.modelYili,
            "markaId": value?.marka?.siraNo || 0,
            "modelId": value?.model?.siraNo || 0,
            "aracGrubuId": value?.aracGrubu?.siraNo || 0,
            "aracRenkId": value?.renk?.siraNo || 0,
            "lokasyonId": +selectedValue,
            "departmanId": value?.departman?.siraNo || 0,
            "surucuId": value?.surucu?.surucuId || 0,
            "aracTipId": value?.aracTipi?.siraNo || 0,
            "guncelKm": value.guncelKm,
            "muayeneTarih": format(value.muayene) || "",
            "egzosTarih": format(value.egzozEmisyon) || null,
            "vergiTarih": format(value.vergi) || null,
            "sozlesmeTarih": format(value.sozlesme) || null,
            "yakitId": value?.yakitTipi?.malzemeId || 0,
        }
        setData(defaultValues);
        reset();

        AracAddService(data).then(res => {

            if (res.data.statusCode === 201) {
                setStatus(true)
            }
        })
    });

    useEffect(() => {
        if (status) {
            PhotoUploadService(1041, "Arac", images).then(res => {
                console.log(res)
                if (res.data.statusCode === 201) {
                    setImageStatus(true)
                }
            })

            FileUploadService(1041, "Arac", documents).then(res => {
                if (res.data.statusCode === 201) {
                    setFileStatus(true)
                }
            })

            AraclarSearchService("").then(res => {
                setVehicles(res.data.vehicleList)
                setVehiclesCount(res.data.vehicleCount)
            })
        }
    }, [status, images, documents])




    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-check" onClick={() => setVisible(false)} className="save-btn" onClickCapture={handleSubmitClick} />
            <Button label="İptal" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <FormProvider {...methods}>
            {(imageStatus || fileStatus || status) ? <MessageTemplate /> : null}
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
                                    <div className="col-12 md:col-6 lg:col-3">
                                        <TextInput control={control} label={"Plaka"} name={"plaka"} type="text" />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-3">
                                        <SelectBox control={control} name={"aracTipi"} label={"Arac tip"} selectID="100" />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-3">
                                        <TextInput control={control} label={"Güncel Km."} name={"guncelKm"} type="text" />
                                    </div>
                                    <div className="col-12 md:col-6 lg:col-3">
                                        <Location control={control} label="Lokasyon" name="lokasyon" url="Location/GetLocationList" onChangeValue={handleLocationChange} />
                                        <Controller
                                            name={"lokasyon"}
                                            control={control}
                                            render={({ field }) => (
                                                <>
                                                    <InputText {...field} value={selectedValue} hidden />
                                                </>
                                            )}
                                        />
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
                                                <TextInput control={control} label={"Mülkiyet"} name={"mulkiyyet"} type="text" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <SelectBox control={control} label="Departman" name="departman" selectID="200" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <DriverSelectbox control={control} label="Sürücü" name="surucu" url="Driver/GetDriverListForInput" />
                                            </div>
                                            <div className="col-12 md:col-6 lg:col-4">
                                                <MaterialListSelectbox control={control} label="Yakıt Tipi" name="yakitTipi" type="YAKIT" />
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
                                <OzelAlan form="Arac" />
                            </div>
                        </TabPanel>
                        <TabPanel header="Resimler">
                            <PhotoUpload control={control} name="images[]" setImages={setImages} images={images} />
                        </TabPanel>
                        <TabPanel header="Ekli Belgeler">
                            <FileUploadComp control={control} name="documents[]" setDocuments={setDocuments} />
                        </TabPanel>
                    </TabView>
                </Dialog>
            </div>
        </FormProvider>
    )
}

export default AddModal
