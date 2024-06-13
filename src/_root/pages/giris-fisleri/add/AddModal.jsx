import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GeneralInfo from "./GeneralInfo";

const AddModal = ({ setStatus }) => {
  const [isOpen, setIsModalOpen] = useState(false);

  const defaultValues = {};

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue } = methods;

  const items = [
    {
      key: "1",
      label: "Genel Bilgiler",
        children: <GeneralInfo />,
    },
    {
      key: "2",
      label: "Malzeme Listesi",
      //   children: <PersonalFields personalProps={personalProps} />,
    },
    {
        key: "3",
        label: "Ek Bilgiler",
        //   children: <PersonalFields personalProps={personalProps} />,
      },
  ];

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
