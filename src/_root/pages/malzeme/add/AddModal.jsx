import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PersonalFields from "../../../components/form/PersonalFields";
import GeneralInfo from "./GeneralInfo";
import dayjs from "dayjs";
import {
  CodeItemValidateService,
  MalzemeAddService,
  MalzemeCodeGetService,
} from "../../../../api/service";
import { t } from "i18next";

const AddModal = ({ setStatus }) => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [isValid, setIsValid] = useState("normal");
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
      code: 869,
      name2: "ozelAlanKodId9",
    },
    {
      label: "ozelAlan10",
      key: "OZELALAN_10",
      value: "Özel Alan 10",
      type: "select",
      code: 870,
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
    birimKodId: null,
    birim: null,
    malzemeTipKodId: null,
    fiyat: null,
    seriNo: "",
    barKodNo: "",
    depoId: 0,
    bolum: "",
    raf: "",
    kritikMiktar: null,
    kdvOran: null,
    aktif: false,
    yedekParca: false,
    sarfMlz: false,
    demirBas: false,
    olcu: "",
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (watch("malzemeKod")) {
      const body = {
        tableName: "Malzeme",
        code: watch("malzemeKod"),
      };
      CodeItemValidateService(body).then((res) => {
        !res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("malzemeKod")]);

  const personalProps = {
    form: "MALZEME",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: "Genel Bilgiler",
      children: <GeneralInfo isValid={isValid} />,
    },
    {
      key: "2",
      label: "Özel Alanlar",
      children: <PersonalFields personalProps={personalProps} />,
    },
  ];

  useEffect(() => {
    MalzemeCodeGetService().then((res) => setValue("malzemeKod", res.data));
  }, [isOpen]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      malzemeKod: values.malzemeKod,
      tanim: values.tanim,
      birimKodId: values.birimKodId || 0,
      malzemeTipKodId: values.malzemeTipKodId || 0,
      fiyat: values.fiyat || 0,
      seriNo: values.seriNo,
      barKodNo: values.barKodNo,
      depoId: values.depoId || 0,
      bolum: values.bolum,
      raf: values.raf,
      kritikMiktar: values.kritikMiktar || 0,
      kdvOran: values.kdvOran || 0,
      aktif: values.aktif,
      yedekParca: values.yedekParca,
      sarfMlz: values.sarfMlz,
      demirBas: values.demirBas,
      olcu: values.olcu,
      ozelAlan1: values.ozelAlan1 || "",
      ozelAlan2: values.ozelAlan2 || "",
      ozelAlan3: values.ozelAlan3 || "",
      ozelAlan4: values.ozelAlan4 || "",
      ozelAlan5: values.ozelAlan5 || "",
      ozelAlan6: values.ozelAlan6 || "",
      ozelAlan7: values.ozelAlan7 || "",
      ozelAlan8: values.ozelAlan8 || "",
      ozelAlanKodId9: values.ozelAlanKodId9 || 0,
      ozelAlanKodId10: values.ozelAlanKodId10 || 0,
      ozelAlan11: values.ozelAlan11 || 0,
      ozelAlan12: values.ozelAlan12 || 0,
      kdvDahilHaric: values.kdvDahilHaric === "dahil" ? true : false,
    };

    MalzemeAddService(body).then((res) => {
      if (res?.data.statusCode === 200) {
        setStatus(true);
        setIsModalOpen(false);
        reset(defaultValues);
      }
    });
    setStatus(false);
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit} disabled={isValid === "error"
      ? true
      : isValid === "success"
          ? false
          : false} >
      {t("kaydet")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsModalOpen(false);
        reset(defaultValues);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        title={t("yeniMalzemeGirisi")}
        open={isOpen}
        onCancel={() => setIsModalOpen(false)}
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

export default AddModal;
