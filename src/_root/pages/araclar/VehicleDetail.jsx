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
import { useEffect, useState } from "react"
import { Button } from "primereact/button"
import { Divider } from 'primereact/divider';
import { AraclarUpdateReadService, AraclarUpdateSetService } from "../../../api/service"
import { useParams } from "react-router-dom"

const format = (date) => {
  const d = new Date(date)
  let month = d.getMonth() + 1
  let day = d.getDate()
  if (month < 10) month = "0" + month
  if (day < 10) day = "0" + day
  const format = d.getFullYear() + "-" + month + "-" + day
  return format
}

const VehicleDetail = () => {
  const [images, setImages] = useState([])
  const [documents, setDocuments] = useState([])
  const [selectedValue, setSelectedValue] = useState('');
  const [data, setData] = useState([])
  const [defaultValues, setDefaultValues] = useState({
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
  })

  const { id } = useParams()

  const methods = useForm({
    defaultValues: defaultValues
  })

  const { control, handleSubmit, reset } = methods

  const handleLocationChange = (value) => {
    setSelectedValue(value);
  };

  useEffect(() => {
    AraclarUpdateReadService(id).then(res => {
      console.log(res.data)
      setData(res.data)
    })
  }, [id])

  useEffect(() => setDefaultValues(data), [data])


  const handleUpdate = handleSubmit((value) => {
    console.log(value)
    const body = {
      "aracId": id,
      "plaka": value.plaka !== '' ? value.plaka : defaultValues.plaka,
      "yil": value.modelYili !== '' ? value.modelYili : defaultValues.yil,
      "markaId": value?.marka?.siraNo || 0,
      "modelId": value?.model?.siraNo || 0,
      "aracGrubuId": value?.aracGrubu?.siraNo || 0,
      "aracRenkId": value?.renk?.siraNo || 0,
      "lokasyonId": +selectedValue,
      "departmanId": value?.departman?.siraNo || 0,
      "surucuId": value?.surucu?.surucuId || 0,
      "aracTipId": value?.aracTipi?.siraNo || 0,
      "guncelKm": value.guncelKm !== '' ? value.guncelKm : defaultValues.guncelKm,
      "muayeneTarih": value.muayene !== null ? format(value.muayene) : format(new Date(defaultValues.muayeneTarih)),
      "egzosTarih": value.egzozEmisyon !== null ? format(value.egzozEmisyon) : format(new Date(defaultValues.egzosTarih)),
      "vergiTarih": value.vergi !== null ? format(value.vergi) : format(new Date(defaultValues.vergiTarih)),
      "sozlesmeTarih": value.sozlesme !== null ? format(value.sozlesme) : format(new Date(defaultValues.sozlesmeTarih)),
      "yakitId": value?.yakitTipi?.malzemeId || 0,
      "tts": "",
      "durumKodId": value?.durum?.siraNo || 0,
      "aktif": true,
      "havuzGrup": ""
    }

    AraclarUpdateSetService(body).then(res => console.log(res.data))
  })

  return (
    <div>
      <BreadCrumbComp items={[{ label: 'ARAÇ LİSTESİ' }, { label: 'ARAÇ DETAY KARTI' }]} />
      <div className="card mt-3">
        <div className="grid p-3">
          <div className="col-12 md:col-3">
            <img src="/assets/images/ats_login_image.jpg" alt="" className="border-round" style={{ width: "100%", height: "280px" }} />
            <div className="flex gap-4 mt-3">
              <div>
                <span className="pi pi-circle-fill mr-1" style={{ color: "green" }} />
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
                  <Button label="Güncelle" icon="pi pi-check" className="save-btn" onClick={handleUpdate} />
                  <Button label="İptal" icon="pi pi-times" className='iptal-btn' />
                </div>
              </div>
              <Divider className="my-3" />
              <div className="col-12 md:col-6 lg:col-4">
                <TextInput control={control} name="plaka" label="Plaka" value={data.plaka} />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <SelectBox control={control} name="aracTipi" label="Araç Tipi" selectID="100" value={data.aracTip} />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <TextInput control={control} name="guncelKm" label="Güncel Km." value={data.guncelKm} />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <Location control={control} label="Lokasyon" name="lokasyon" url="Location/GetLocationList" onChangeValue={handleLocationChange} defaultValue={data.lokasyon} />
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
                <MarkaSelectbox control={control} label="Marka" name="marka" url="Mark/GetMarkList" value={data.marka} />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <ModelSelectbox control={control} label="Model" name="model" url="Model/GetModelList" value={data.model} />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <DriverSelectbox control={control} label="Sürücü" name="surucu" url="Driver/GetDriverListForInput" value={data.surucu} />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <MaterialListSelectbox control={control} label="Yakıt Tipi" name="yakitTipi" type="YAKIT" value={data.yakitTip} />
              </div>
              <div className="col-12 md:col-6 lg:col-4">
                <SelectBox control={control} label="Renk" name="renk" selectID="111" value={data.renk} />
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
                      <TextInput control={control} label={"Model Yılı"} name={"modelYili"} type="text" value={data.yil} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Araç Grubu" name="aracGrubu" selectID="101" value={data.grup} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Araç Cinsi" name="aracCinsi" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label={"Mülkiyet"} name={"mulkiyyet"} type="text" value={data.mulkiyet} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Departman" name="departman" selectID="200" value={data.departman} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Proje" name="proje" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Masraf Merkezi" name="masrafMerkezi" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label="Havuz" name="havuz" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Kullanım Amacı" name="kullanimAmaci" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Durum" name="durum" selectID="122" value={data.durum} />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="Bağlı Araç" name="bagliArac" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <SelectBox control={control} label="HGS" name="hgs" />
                    </div>
                    <div className="col-12 md:col-6 lg:col-3">
                      <TextInput control={control} label="TTS" name="tts" />
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
                        render={({ field }) => (
                          <Calendar
                            dateFormat="dd/mm/yy"
                            value={field.value ? field.value : new Date(data.muayeneTarih)}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            showIcon={true}
                            appendTo={document.body}
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 md:col-6 flex flex-column gap-2">
                      <label htmlFor={"sozlesme"} style={{ color: "#007bff" }}>Sözleşme</label>
                      <Controller
                        name="sozlesme"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            dateFormat="dd/mm/yy"
                            value={field.value ? field.value : new Date(data.sozlesmeTarih)}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            showIcon={true}
                            appendTo={document.body}
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 md:col-6 flex flex-column gap-2">
                      <label htmlFor={"egzozEmisyon"} style={{ color: "#007bff" }}>Egzoz Emisyon</label>
                      <Controller
                        name="egzozEmisyon"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            dateFormat="dd/mm/yy"
                            value={field.value ? field.value : new Date(data.egzosTarih)}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            showIcon={true}
                            appendTo={document.body}
                          />
                        )}
                      />
                    </div>
                    <div className="col-12 md:col-6 flex flex-column gap-2">
                      <label htmlFor={"vergi"} style={{ color: "#007bff" }}>Vergi</label>
                      <Controller
                        name="vergi"
                        control={control}
                        render={({ field }) => (
                          <Calendar
                            dateFormat="dd/mm/yy"
                            value={field.value ? field.value : new Date(data.vergiTarih)}
                            onChange={(e) => {
                              field.onChange(e.target.value)
                            }}
                            showIcon={true}
                            appendTo={document.body}
                          />
                        )}
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
