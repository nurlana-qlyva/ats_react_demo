import { useContext, useState, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { t } from "i18next";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { GetVehicleFineItemService } from "../../../../../../../api/services/vehicles/ceza/services";
import {
  GetDocumentsByRefGroupService,
  GetPhotosByRefGroupService,
} from "../../../../../../../api/services/upload/services";
import { uploadFile } from "../../../../../../../utils/upload";
import { message, Modal, Tabs, Button } from "antd";
import GeneralInfo from "./GeneralInfo";
import PersonalFields from "../../../../../../components/form/personal-fields/PersonalFields";
import FileUpload from "../../../../../../components/upload/FileUpload";

const UpdateModal = ({ updateModal, setUpdateModal, id, setStatus }) => {
  const { data, plaka, setData } = useContext(PlakaContext);
  // file
  const [filesUrl, setFilesUrl] = useState([]);
  const [files, setFiles] = useState([]);
  const [loadingFiles, setLoadingFiles] = useState(false);

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
      code: 879,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 880,
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

  const defaultValues = {};
  const methods = useForm({
    defaultValues: defaultValues,
  });
  const { handleSubmit, reset, watch, setValue } = methods;

  useEffect(() => {
    if (updateModal) {
      GetVehicleFineItemService(id).then((res) => {
        setValue("aracId", res?.data.aracId);
        setValue("plaka", res?.data.plaka);
        setValue("tarih", dayjs(res?.data.tarih));
        setValue("saat", dayjs(res?.data.saat, "HH:mm:ss"));
        setValue("ozelAlan1", res?.data.ozelAlan1);
        setValue("ozelAlan2", res?.data.ozelAlan2);
        setValue("ozelAlan3", res?.data.ozelAlan3);
        setValue("ozelAlan4", res?.data.ozelAlan4);
        setValue("ozelAlan5", res?.data.ozelAlan5);
        setValue("ozelAlan6", res?.data.ozelAlan6);
        setValue("ozelAlan7", res?.data.ozelAlan7);
        setValue("ozelAlan8", res?.data.ozelAlan8);
        setValue("ozelAlan9", res?.data.ozelAlan9);
        setValue("ozelAlanKodId9", res?.data.ozelAlanKodId9);
        setValue("ozelAlan10", res?.data.ozelAlan10);
        setValue("ozelAlanKodId10", res?.data.ozelAlanKodId10);
        setValue("ozelAlan11", res?.data.ozelAlan11);
        setValue("ozelAlan12", res?.data.ozelAlan12);
      });

      GetDocumentsByRefGroupService(id, "CEZA").then((res) =>
        setFilesUrl(res.data)
      );
    }
  }, [id, updateModal]);

  const uploadFiles = () => {
    try {
      setLoadingFiles(true);
      uploadFile(id, "YAKIT", files);
    } catch (error) {
      message.error("Dosya yüklenemedi. Yeniden deneyin.");
    } finally {
      setLoadingFiles(false);
    }
  };

  const personalProps = {
    form: "CEZA",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
    {
      key: "3",
      label: `[${filesUrl.length}] ${t("ekliBelgeler")}`,
      children: (
        <FileUpload
          filesUrl={filesUrl}
          loadingFiles={loadingFiles}
          setFiles={setFiles}
        />
      ),
    },
  ];

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
    //   onClick={onSubmit}
    >
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        setResponse("normal");
        setStatus(true);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal
      title={t("cezaBilgisiGuncelle")}
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
  );
};

export default UpdateModal;
