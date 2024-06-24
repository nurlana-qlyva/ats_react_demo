import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Button, message, Modal, Tabs } from "antd";
import { uploadFile, uploadPhoto } from "../../../../utils/upload";
import { MalzemeDataByIdGetService, MalzemeUpdateService } from "../../../../api/service";
import PersonalFields from "../../../components/form/PersonalFields";
import PhotoUpload from "../../../components/upload/PhotoUpload";
import FileUpload from "../../../components/upload/FileUpload";
import GeneralInfo from "./GeneralInfo";
import { t } from "i18next";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, status, id }) => {
  // file
  const [filesUrl, setFilesUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  // photo
  const [imageUrls, setImageUrls] = useState([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [images, setImages] = useState([]);
  const [fields, setFields] = useState([
    {
      label: "ozelAlan1",
      key: "OZELALAN_1",
      value: "Özel Alan 1",
      type: "text",
    },
    {
      label: "ozelAlan2",
      key: "OZELALAN_2",
      value: "Özel Alan 2",
      type: "text",
    },
    {
      label: "ozelAlan3",
      key: "OZELALAN_3",
      value: "Özel Alan 3",
      type: "text",
    },
    {
      label: "ozelAlan4",
      key: "OZELALAN_4",
      value: "Özel Alan 4",
      type: "text",
    },
    {
      label: "ozelAlan5",
      key: "OZELALAN_5",
      value: "Özel Alan 5",
      type: "text",
    },
    {
      label: "ozelAlan6",
      key: "OZELALAN_6",
      value: "Özel Alan 6",
      type: "text",
    },
    {
      label: "ozelAlan7",
      key: "OZELALAN_7",
      value: "Özel Alan 7",
      type: "text",
    },
    {
      label: "ozelAlan8",
      key: "OZELALAN_8",
      value: "Özel Alan 8",
      type: "text",
    },
    {
      label: "ozelAlan9",
      key: "OZELALAN_9",
      value: "Özel Alan 9",
      type: "select",
      code: 865,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 866,
      name2: "ozelAlanKodId10",
    },
    {
      label: "ozelAlan11",
      key: "OZELALAN_11",
      value: "Özel Alan 11",
      type: "number",
    },
    {
      label: "ozelAlan12",
      key: "OZELALAN_12",
      value: "Özel Alan 12",
      type: "number",
    },
  ]);

  const defaultValues = {
    malzemeKod: "",
    tanim: "",
    stokMiktar: null,
    birimKodId: "",
    malzemeTipKodId: null,
    fiyat: null,
    firmaId: null,
    tedarikci: "",
    tedarikciFiyat: null,
    tedarikciIskontoOran: null,
    seriNo: "",
    barKodNo: "",
    depoId: null,
    bolum: "",
    raf: "",
    kritikMiktar: null,
    cikanMiktar: null,
    girenMiktar: null,
    sonAlisTarih: "",
    sonFiyat: null,
    kdvOran: null,
    aktif: false,
    yedekParca: false,
    sarfMlz: false,
    demirBas: false,
    olusturma: "",
    degistirme: "",
    aciklama: "",
    olcu: "",
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, watch, setValue } = methods;

  const uploadImages = () => {
    try {
      setLoadingImages(true);
      const data = uploadPhoto(id, "MALZEME", images)
      setImageUrls([...imageUrls, data.imageUrl]);
    } catch (error) {
      message.error("Resim yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingImages(false);
    }
  };

  const uploadFiles = () => {
    try {
      setLoadingFiles(true);
      uploadFile(id, "MALZEME", files)
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const personalProps = {
    form: "MALZEME",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: "Genel Bilgiler",
      children: <GeneralInfo />,
    },
    {
      key: "2",
      label: "Özel Alanlar",
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "3",
      label: `[${imageUrls.length}] Resimler`,
      children: (
        <PhotoUpload
          imageUrls={imageUrls}
          loadingImages={loadingImages}
          setImages={setImages}
        />
      ),
    },
    {
      key: "4",
      label: `[${filesUrl.length}] Ekli Belgeler`,
      children: (
        <FileUpload
          filesUrl={filesUrl}
          loadingFiles={loadingFiles}
          setFiles={setFiles}
        />
      ),
    },
  ]

  useEffect(() => {
    MalzemeDataByIdGetService(id).then(res => {
      setValue("malzemeKod", res.data.malzemeKod)
      setValue("aktif", res.data.aktif)
      setValue("barKodNo", res.data.barKodNo)
      setValue("birim", res.data.birim)
      setValue("birimKodId", res.data.birimKodId)
      setValue("bolum", res.data.bolum)
      setValue("demirBas", res.data.demirBas)
      setValue("depo", res.data.depo)
      setValue("depoId", res.data.depoId)
      setValue("fiyat", res.data.fiyat)
      setValue("kdvOran", res.data.kdvOran)
      setValue("malzemeTipKodText", res.data.malzemeTipKodText)
      setValue("malzemeTipKodId", res.data.malzemeTipKodId)
      setValue("olcu", res.data.olcu)
      setValue("raf", res.data.raf)
      setValue("sarfMlz", res.data.sarfMlz)
      setValue("seriNo", res.data.seriNo)
      setValue("tanim", res.data.tanim)
      setValue("firmaId", res.data.firmaId)
      setValue("tedarikciFiyat", res.data.tedarikciFiyat)
      setValue("tedarikciIskontoOran", res.data.tedarikciIskontoOran)
      setValue("yedekParca", res.data.yedekParca)
      setValue("unvan", res.data.tedarikci)
      setValue("kritikMiktar", res.data.kritikMiktar)
      setValue("kdvDH", res.data.kdvDahilHaric ? "Dahil" : "Hariç")
    })
  }, [id, updateModal])

  const onSubmit = handleSubmit((values) => {
    console.log(values)
    const body = {
      malzemeId: id,
      tanim: values.tanim,
      stokMiktar: values.stokMiktar || 0,
      birimKodId: values.birimKodId || 0,
      malzemeTipKodId: values.malzemeTipKodId || 0,
      fiyat: values.fiyat || 0,
      firmaId: values.firmaId || 0,
      tedarikci: values.malzemtedarikcieKod,
      tedarikciFiyat: values.tedarikciFiyat || 0,
      tedarikciIskontoOran: values.tedarikciIskontoOran || 0,
      seriNo: values.seriNo,
      barKodNo: values.barKodNo,
      depoId: values.depoId || 0,
      bolum: values.bolum,
      raf: values.raf,
      kritikMiktar: values.kritikMiktar || 0,
      cikanMiktar: values.cikanMiktar || 0,
      girenMiktar: values.girenMiktar || 0,
      // sonAlisTarih: dayjs(values.sonAlisTarih).format("YYYY-MM-DD") || "",
      sonFiyat: values.sonFiyat || 0,
      kdvOran: values.kdvOran || 0,
      aktif: values.aktif,
      yedekParca: values.yedekParca,
      sarfMlz: values.sarfMlz,
      demirBas: values.demirBas,
      // olusturma: values.olusturma,
      // degistirme: values.degistirme,
      // aciklama: values.aciklama,
      olcu: values.olcu,
      kdvDahilHaric: values.kdvDH === "dahil" ? true : false
    };

    MalzemeUpdateService(body).then(res => {
        if (res?.data.statusCode === 202) {
          setStatus(true)
          setUpdateModal(false)
          reset(defaultValues)
        }
    })
    setStatus(false)

    uploadImages()
    uploadFiles()
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        setStatus(true);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <Modal
        title={t("malzemeBilgisiGuncelle")}
        open={updateModal}
        onCancel={() => setUpdateModal(false)}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <FormProvider {...methods}>
          <form>
            <Tabs defaultActiveKey="1" items={items} />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.object,
  status: PropTypes.bool,
};

export default UpdateModal;
