import { useParams } from "react-router-dom"
import { HomeOutlined, LoadingOutlined } from "@ant-design/icons"
import { useEffect, useState } from "react"
import { Button, Input, message, Modal, Spin, Tabs } from "antd"
import { Controller, useForm } from "react-hook-form"
import BreadcrumbComp from "../../components/breadcrumb/Breadcrumb"
import SelectInput from "../../components/form/SelectInput"
import LocationTreeSelect from "../../components/form/LocationTreeSelect"
import MarkaSelectInput from "../../components/form/MarkaSelectInput"
import ModelSelectInput from "../../components/form/ModelSelectInput"
import DriverSelectInput from "../../components/form/DriverSelectInput"
import MaterialListSelect from "../../components/form/MaterialListSelect"
import TextInput from "../../components/form/TextInput"
import GeneralInfo from "./components/GeneralInfo"
import SpecialFields from "../../components/form/SpecialFields"
import PhotoUpload from "../../components/form/PhotoUpload"
import FileUpload from "../../components/form/FileUpload"
import { FileReadService, PhotoReadService, VehiclesUpdateReadService, VehiclesUpdateSetService } from "../../../api/service"
import dayjs from "dayjs"
import { formatDate } from "../../../utils/format"
import DetailInfo from "./components/DetailInfo"
import NumberInput from "../../components/form/NumberInput"
import { upload } from "../../../utils/upload"
import KmHistory from "../../components/table/KmHistory"

const breadcrumb = [
  {
    href: '/',
    title: <HomeOutlined />,
  },
  {
    href: '/araclar',
    title: 'Araçlar',
  },
  {
    title: 'ARAÇ DETAY KARTI'
  }
]

const VehiclesUpdate = () => {
  const [vehiclesData, setVehiclesData] = useState([])
  const [status, setStatus] = useState(false)
  const [dataStatus, setDataStatus] = useState(false)
  const [imageUrls, setImageUrls] = useState([]);
  const [filesUrl, setFilesUrl] = useState([]);
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [loading, setLoading] = useState(false)
  const [kmHistryModal, setKmHistryModal] = useState(false)

  const [fields, setFields] = useState([
    {
      label: "ozelAlan1",
      key: "OZELALAN_1",
      value: "Özel Alan 1",
      type: 'text'
    },
    {
      label: "ozelAlan2",
      key: "OZELALAN_2",
      value: "Özel Alan 2",
      type: 'text'
    },
    {
      label: "ozelAlan3",
      key: "OZELALAN_3",
      value: "Özel Alan 3",
      type: 'text'
    },
    {
      label: "ozelAlan4",
      key: "OZELALAN_4",
      value: "Özel Alan 4",
      type: 'text'
    },
    {
      label: "ozelAlan5",
      key: "OZELALAN_5",
      value: "Özel Alan 5",
      type: 'text'
    },
    {
      label: "ozelAlan6",
      key: "OZELALAN_6",
      value: "Özel Alan 6",
      type: 'text'
    },
    {
      label: "ozelAlan7",
      key: "OZELALAN_7",
      value: "Özel Alan 7",
      type: 'text'
    },
    {
      label: "ozelAlan8",
      key: "OZELALAN_8",
      value: "Özel Alan 8",
      type: 'text'
    },
    {
      label: "ozelAlan9",
      key: "OZELALAN_9",
      value: "Özel Alan 9",
      type: 'select',
      code: 865,
      name2: "ozelAlanKodId9"
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: 'select',
      code: 866,
      name2: "ozelAlanKodId10"
    },
    {
      label: "ozelAlan11",
      key: "OZELALAN_11",
      value: "Özel Alan 11",
      type: 'number'
    },
    {
      label: "ozelAlan12",
      key: "OZELALAN_12",
      value: "Özel Alan 12",
      type: 'number'
    },
  ])

  const { id } = useParams()

  const defaultValues = {
    plaka: "",
    aracTip: null,
    aracTipId: "",
    guncelKm: "",
    marka: 0,
    model: 0,
    yil: "",
    grup: 0,
    aracCinsi: 0,
    renk: 0,
    lokasyon: 0,
    mulkiyet: "",
    departman: 0,
    surucu: 0,
    yakitTip: 0,
    muayeneTarih: "",
    sozlesmeTarih: "",
    egzozEmisyon: "",
    vergiTarih: "",
    ozelAlan1: "",
    ozelAlan2: "",
    ozelAlan3: "",
    ozelAlan4: "",
    ozelAlan5: "",
    ozelAlan6: "",
    ozelAlan7: "",
    ozelAlan8: "",
    ozelAlan9: "",
    ozelAlan10: "",
    ozelAlan11: "",
    ozelAlan12: "",
  }

  const methods = useForm({
    defaultValues: defaultValues
  })

  const { control, handleSubmit, reset, setValue } = methods

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = upload(id, "Arac", images)
      setImageUrls([...imageUrls, data.imageUrl]);
      console.log(data)
    } catch (error) {
      message.error("Resim yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingImages(false);
    }
  }


  const uploadFiles = () => {
    try {
      setLoadingFiles(true);
      const data = upload(id, "Arac", files)
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  }

  const items = [
    {
      key: '1',
      label: 'Genel Bilgiler',
      children: <GeneralInfo control={control} data={vehiclesData} setValue={setValue} />,
    },
    {
      key: '2',
      label: 'Özel Alanlar',
      children: <SpecialFields form="Arac" control={control} data={vehiclesData} setValue={setValue} fields={fields} setFields={setFields} />,
    },
    {
      key: '3',
      label: `[${imageUrls.length}] Resimler`,
      children: <PhotoUpload uploadImages={uploadImages} imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} setLoadingImages={setLoadingImages} setImageUrls={setImageUrls} />,
    },
    {
      key: '4',
      label: `[${filesUrl.length}] Ekli Belgeler`,
      children: <FileUpload uploadFiles={uploadFiles} filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} setLoadingFiles={setLoadingFiles} setFilesUrl={setFilesUrl} />,
    },
  ];

  useEffect(() => {
    setLoading(true)
    VehiclesUpdateReadService(id).then(res => {
      setVehiclesData(res.data)
      setLoading(false)
      setValue("plaka", res?.data.plaka)
      setValue("guncelKm", res?.data.guncelKm ? res?.data.guncelKm : null)
      setValue("aracTip", res?.data.aracTip)
      setValue("aracTipId", res?.data.aracTipId)
      setValue("aracCinsi", res?.data.aracCinsi ? res?.data.aracCinsi : null)
      setValue("marka", res?.data.marka)
      setValue("markaId", res?.data.markaId)
      setValue("model", res?.data.model)
      setValue("modelId", res?.data.modelId)
      setValue("surucu", res?.data.surucu)
      setValue("surucuId", res?.data.surucuId)
      setValue("lokasyon", res?.data.lokasyon)
      setValue("lokasyonId", res?.data.lokasyonId)
      setValue("yakitTip", res?.data.yakitTip)
      setValue("yakitId", res?.data.yakitId)
      setValue("renk", res?.data.renk)
      setValue("aracRenkId", res?.data.aracRenkId)
      setValue("yil", res?.data.yil ? res?.data.yil : "")
      setValue("grup", res?.data.grup)
      setValue("aracGrubuId", res?.data.aracGrubuId)
      setValue("departman", res?.data.departman)
      setValue("departmanId", res?.data.departmanId)
      setValue("havuzGrup", res?.data.havuzGrup)
      setValue("durum", res?.data.durum)
      setValue("durumKodId", res?.data.durumKodId)
      setValue("tts", res?.data.tts)
      setValue("muayeneTarih", res?.data.muayeneTarih && res?.data.muayeneTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.muayeneTarih) : null)
      setValue("sozlesmeTarih", res?.data.sozlesmeTarih && res?.data.sozlesmeTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.sozlesmeTarih) : null)
      setValue("vergiTarih", res?.data.vergiTarih && res?.data.vergiTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.vergiTarih) : null)
      setValue("egzosTarih", res?.data.egzosTarih && res?.data.egzosTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.egzosTarih) : null)
      setValue("onGorulen", res?.data.onGorulen)
      setValue("onGorulenMin", res?.data.onGorulenMin)
      setValue("gerceklesen", res?.data.gerceklesen)
      setValue("ozelAlan1", res?.data.ozelAlan1)
      setValue("ozelAlan2", res?.data.ozelAlan2)
      setValue("ozelAlan3", res?.data.ozelAlan3)
      setValue("ozelAlan4", res?.data.ozelAlan4)
      setValue("ozelAlan5", res?.data.ozelAlan5)
      setValue("ozelAlan6", res?.data.ozelAlan6)
      setValue("ozelAlan7", res?.data.ozelAlan7)
      setValue("ozelAlan8", res?.data.ozelAlan8)
      setValue("ozelAlan9", res?.data.ozelAlan9)
      setValue("ozelAlanKodId9", res?.data.ozelAlanKodId9)
      setValue("ozelAlan10", res?.data.ozelAlan10)
      setValue("ozelAlanKodId10", res?.data.ozelAlanKodId10)
      setValue("ozelAlan11", res?.data.ozelAlan11)
      setValue("ozelAlan12", res?.data.ozelAlan12)
    })

    PhotoReadService(id, "Arac").then(res => setImageUrls(res.data))
    FileReadService(id, "Arac").then(res => setFilesUrl(res.data))
    
  }, [id, status, dataStatus])

  console.log(dataStatus)

  const onChange = (key) => {
    // console.log(key);
  };

  const onSubmit = handleSubmit((values) => {
    const data = {
      "aracId": id,
      "plaka": values.plaka,
      "yil": values.yil ? values.yil : 0,
      "aracTipId": values.aracTipId,
      "guncelKm": values.guncelKm ? values.guncelKm : 0,
      "markaId": values.markaId,
      "modelId": values.modelId,
      "aracGrubuId": values.aracGrubuId,
      "aracRenkId": values.aracRenkId,
      "lokasyonId": values.lokasyonId,
      "departmanId": values.departmanId,
      "surucuId": values.surucuId,
      "muayeneTarih": values?.muayeneTarih ? formatDate(values?.muayeneTarih.$d) : "1970-01-01",
      "egzosTarih": values?.egzosTarih ? formatDate(values?.egzosTarih.$d) : "1970-01-01",
      "vergiTarih": values?.vergiTarih ? formatDate(values?.vergiTarih.$d) : "1970-01-01",
      "sozlesmeTarih": values?.sozlesmeTarih ? formatDate(values?.sozlesmeTarih.$d) : "1970-01-01",
      "yakitId": values.yakitId,
      "tts": values.tts,
      "durumKodId": values.durumKodId,
      "aktif": true,
      "havuzGrup": values.havuzGrup,
      "onGorulenMin": values.onGorulenMin,
      "onGorulen": values.onGorulen,
      "gerceklesen": values.gerceklesen,
      "ozelAlan1": values.ozelAlan1,
      "ozelAlan2": values.ozelAlan2,
      "ozelAlan3": values.ozelAlan3,
      "ozelAlan4": values.ozelAlan4,
      "ozelAlan5": values.ozelAlan5,
      "ozelAlan6": values.ozelAlan6,
      "ozelAlan7": values.ozelAlan7,
      "ozelAlan8": values.ozelAlan8,
      "ozelAlanKodId9": values.ozelAlanKodId9,
      "ozelAlanKodId10": values.ozelAlanKodId10,
      "ozelAlan11": values.ozelAlan11,
      "ozelAlan12": values.ozelAlan12,
    }
    setLoading(true)
    VehiclesUpdateSetService(data).then(res => {
      if (res.data.statusCode === 202) {
        setStatus(true)
        setLoading(false)
      }
    })

    uploadImages()
    uploadFiles()
  })

  const getKmHistory = () => {
    setKmHistryModal(true)
  }

  const footer = (
    [
      <Button key="back" className="btn cancel-btn" onClick={() => setKmHistryModal(false)}>
        Kapat
      </Button>
    ]
  )


  return (
    <>
      {loading && (
        <div className="loading-spin">
          <div>
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 100,
                  }}
                  spin
                />
              }
            />
          </div>
        </div>
      )}

      <div className="content">
        <BreadcrumbComp items={breadcrumb} />
      </div>

      <div className="content">
        <div className="grid">
          <div className="col-span-3">
            <img src="/images/ats_login_image.jpg" className="car-image border" alt="" />
            <div className="flex gap-1 justify-between">
              <p>Aktif</p>
              <p>Bursa</p>
              <p>50 km/h</p>
            </div>
          </div>
          <div className="col-span-9">
            <div className="grid p-10 gap-1">
              <div className="col-span-12 flex gap-1 justify-end">
                <Button className="primary-btn" onClick={onSubmit}>Güncelle</Button>
                <Button className="cancel-btn">İptal</Button>
              </div>
              <div className="col-span-4">
                <TextInput control={control} name="plaka" label="Plaka" />
              </div>
              <div className="col-span-4">
                <SelectInput control={control} name="aracTip" label="Araç Tipi" selectID="100" name2="aracTipId" setValue={setValue} />
                <Controller
                  name="aracTipId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ display: 'none' }}
                    />
                  )}
                />
              </div>
              <div className="col-span-4">
                <div className="grid gap-1">
                  <div className="col-span-10">
                    <NumberInput control={control} name="guncelKm" label="Güncel Km." setValue={setValue} />
                  </div>
                  <div className="col-span-2 self-end">
                    <Button onClick={getKmHistory}>...</Button>
                  </div>
                </div>
              </div>
              <div className="col-span-4">
                <LocationTreeSelect control={control} name2="lokasyonId" setValue={setValue} />
                <Controller
                  name="lokasyonId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ display: 'none' }}
                    />
                  )}
                />
              </div>
              <div className="col-span-4">
                <MarkaSelectInput control={control} name2="markaId" setValue={setValue} />
                <Controller
                  name="markaId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ display: 'none' }}
                    />
                  )}
                />
              </div>
              <div className="col-span-4">
                <ModelSelectInput control={control} name2="modelId" setValue={setValue} />
                <Controller
                  name="modelId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ display: 'none' }}
                    />
                  )}
                />
              </div>
              <div className="col-span-4">
                <DriverSelectInput control={control} name2="surucuId" setValue={setValue} />
                <Controller
                  name="surucuId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ display: 'none' }}
                    />
                  )}
                />
              </div>
              <div className="col-span-4">
                <MaterialListSelect control={control} name="yakitTip" label="Yakıt Tipi" type="YAKIT" name2="yakitId" setValue={setValue} />
                <Controller
                  name="yakitId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ display: 'none' }}
                    />
                  )}
                />
              </div>
              <div className="col-span-4">
                <SelectInput control={control} name="renk" label="Renk" selectID="111" name2="aracRenkId" setValue={setValue} />
                <Controller
                  name="aracRenkId"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      style={{ display: 'none' }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content relative">
        <DetailInfo id={id} />
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </div>

      <Modal
        title={`Kilometre Güncelleme Geçmişi: ${vehiclesData?.plaka}`}
        open={kmHistryModal}
        onCancel={() => setKmHistryModal(false)}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <KmHistory data={vehiclesData} setDataStatus={setDataStatus} />
      </Modal>
    </>
  )
}

export default VehiclesUpdate
