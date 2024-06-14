import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GeneralInfo from "./GeneralInfo";
import MalzemeLists from "./MalzemeLists";
import EkBilgiler from "./EkBilgiler";
import dayjs from "dayjs";

const AddModal = ({ setStatus }) => {
  const [isOpen, setIsModalOpen] = useState(false);

  const defaultValues = {
    fisNo: "",
    tarih: dayjs(new Date()),
    saat: dayjs(new Date()),
    girisDepoSiraNo: null,
    girisDepo: "",
    firmaId: null,
    lokasyonId: null,
    lokasyon: "",
    aracId: null,
    plaka: "",
    islemTipiKodId: null,
    islemTipi: "",
    aciklama: "",
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = handleSubmit((values) => {
    const body = {
      fisNo: values.fisNo,
      tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
      saat: dayjs(values.saat).format("HH:mm:ss"),
      girisDepoSiraNo: values.girisDepoSiraNo,
      firmaId: values.firmaId,
      lokasyonId: values.lokasyonId,
      aracId: values.aracId,
      islemTipiKodId: values.islemTipiKodId,
      aciklama: values.aciklama
    };

    console.log(body)
  });

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      Kaydet
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsModalOpen(false);
        reset(defaultValues);
      }}
    >
      İptal
    </Button>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> Ekle
      </Button>
      <Modal
        title="Fiş Giriş Detayı"
        open={isOpen}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={1300}
      >
        <FormProvider {...methods}>
          <form>
            <GeneralInfo />
            <MalzemeLists />
            <EkBilgiler />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddModal;
