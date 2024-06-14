import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GeneralInfo from "./GeneralInfo";
import MalzemeLists from "./MalzemeLists";
import EkBilgiler from "./EkBilgiler";

const AddModal = ({ setStatus }) => {
  const [isOpen, setIsModalOpen] = useState(false);

  const defaultValues = {};

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = handleSubmit((values) => {
    const body = {};
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
