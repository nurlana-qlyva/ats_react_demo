import { Controller, useForm } from "react-hook-form"
import BreadCrumbComp from "../../components/BreadCrumbComp"
import { InputText } from "primereact/inputtext"
import FileUploadComp from "../../components/FileUploadComp"
import { TabPanel, TabView } from "primereact/tabview"
import PhotoUpload from "../../components/PhotoUpload"
import TextInput from "../../components/TextInput"
import { Calendar } from "primereact/calendar"
import MaterialListSelectbox from "../../components/MaterialListSelectbox"
import DriverSelectbox from "./components/add-modal/components/DriverSelectbox"
import SelectBox from "../../components/SelectBox"
import Location from "../../components/Location"
import RadioInput from "../../components/RadioInput"
import ModelSelectbox from "./components/add-modal/components/ModelSelectbox"
import MarkaSelectbox from "./components/add-modal/components/MarkaSelectbox"
import { Checkbox } from 'primereact/checkbox';
import { useState } from "react"
import { Button } from "primereact/button"
import { Divider } from 'primereact/divider';
        

const VehicleDetail = () => {
  const [images, setImages] = useState([])
  const [documents, setDocuments] = useState([])
  const [selectedValue, setSelectedValue] = useState('');

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

  return (
    <div>
      <BreadCrumbComp items={[{ label: 'ARAÇ LİSTESİ' }, { label: 'ARAÇ DETAY KARTI' }]} />
      <div className="card mt-3">
        <div className="grid p-3">
          <div className="col-12 md:col-3">
            <img src="/assets/images/ats_login_image.jpg" alt="" className="border-round" style={{ width: "100%", height: "280px" }} />
            <div className="flex gap-4 mt-3">
              <div>
                <span className="pi pi-circle-fill mr-1" style={{color: "green"}}/>
                <span>Aktif</span>
              </div>
              <div>
                <span className="pi pi-map-marker mr-1" />
                <span>Bursa</span>
              </div>
              <div>
                <span className="pi pi-history mr-1" />
                <span>50 km/h</span>
              </div>
            </div>
          </div>
          <div className="col-12 md:col-9">
            <div className="grid">
              <div className="col-12">
                <div className='flex justify-content-end gap-2'>
                  <Button label="Güncelle" icon="pi pi-check" className="save-btn" />
                  <Button label="İptal" icon="pi pi-times" className='iptal-btn' />
                </div>
              </div>
              <Divider className="my-3"/>
              <div className="col-12 md:col-6 lg:col-4">
                <TextInput control={control} name="plaka" label="Plaka" />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <SelectBox control={control} name="aracTipi" label="Araç Tipi" selectID="100" />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <TextInput control={control} name="guncelKm" label="Güncel Km." />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
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
              <div className="col-12 md:col-6 lg:col-4">
                <MarkaSelectbox control={control} label="Marka" name="marka" url="Mark/GetMarkList" />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <ModelSelectbox control={control} label="Model" name="model" url="Model/GetModelList" />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <DriverSelectbox control={control} label="Sürücü" name="surucu" url="Driver/GetDriverListForInput" />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <MaterialListSelectbox control={control} label="Yakıt Tipi" name="yakitTipi" type="YAKIT" />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <SelectBox control={control} label="Renk" name="renk" selectID="111" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card mt-3">
        <TabView>
          <TabPanel header="Genel Bilgiler">
            <div className="grid mt-1">
              <div className="col-12 md:col-8">
                <div className="border-1 border-300 border-round p-3">
                  <h3>Araç Bilgileri</h3>
                  <div className="grid mt-2">
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label={"Model Yılı"} name={"modelYili"} type="text" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Araç Grubu" name="aracGrubu" selectID="101" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Araç Cinsi" name="aracCinsi" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label={"Mülkiyet"} name={"mulkiyyet"} type="text" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Departman" name="departman" selectID="200" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Proje" name="proje" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Masraf Merkezi" name="masrafMerkezi" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Havuz" name="havuz" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Kullanım Amacı" name="kullanimAmaci" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Durum" name="durum" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Bağlı Araç" name="bagliArac" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="HGS" name="hgs" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="TTS" name="tts" />
                    </div>
                  </div>
                </div>
                <div className="border-1 border-300 border-round p-3 mt-3">
                  <h3>Yakıt Tüketim Kontrol</h3>
                  <div className="grid mt-2">
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label={"Min. Yakıt Tüketimi"} name={"minYakitTuketimi"} type="text" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label="Maks. Yakıt Tüketimi" name="maksYakitTuketimi" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label="Gerçek Yakıt Tüketimi" name="gercekYakitTuketimi" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <label htmlFor="uyari">Uyarı</label>
                      <Controller
                        name="uyari"
                        control={control}
                        render={({ field }) => <Checkbox {...field} className="w-full" />}
                      />
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
                <div className="border-1 border-300 border-round p-3 mt-3">
                  <div className="grid mt-2">
                    <div className="col-12 md:col-6 flex flex-column gap-2">
                      <SelectBox control={control} label="Araç Sorumlusu" name="aracSormlusu" />
                    </div>
                    <div className="col-12 md:col-6 flex flex-column gap-2">
                      <SelectBox control={control} label="Anahtar Kodu" name="anahtarKodu" />
                    </div>
                    <div className="col-12 md:col-6 flex flex-column gap-2">
                      <SelectBox control={control} label="Yedek Anahtar" name="yedekAnahtar" />
                    </div>
                  </div>
                </div>
                <div className="border-1 border-300 border-round p-3 mt-3">
                  <div className="grid mt-2">
                    <div className="col-12 md:col-6 lg:col-4 flex flex-column gap-2">
                      <RadioInput control={control} label="Aktif" name="aracDurum" value="aktif" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-4 flex flex-column gap-2">
                      <RadioInput control={control} label="Pasif" name="aracDurum" value={"pasif"} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-4 flex flex-column gap-2">
                      <RadioInput control={control} label="Arşiv" name="aracDurum" value={"arsiv"} />
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
            <PhotoUpload control={control} name="images[]" setImages={setImages} />
          </TabPanel>
          <TabPanel header="Ekli Belgeler">
            <FileUploadComp control={control} name="documents[]" setDocuments={setDocuments} />
          </TabPanel>
        </TabView>
      </div>
    </div>
  )
}

export default VehicleDetail
