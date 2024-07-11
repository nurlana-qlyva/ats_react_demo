import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import { Button, Modal, Tabs } from "antd";
import { CodeItemValidateService } from "../../../../api/service";
import PersonalFields from "../../../components/form/personal-fields/PersonalFields";
import GeneralInfo from "./tabs/GeneralInfo";
import { GetMaterialCardByIdService, UpdateMaterialCardService } from "../../../../api/services/yakit-yonetimi/services";

const UpdateModal = ({ updateModal, setUpdateModal, setStatus, id }) => {
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

  const defaultValues = {};
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await GetMaterialCardByIdService(id);
        setValue("malzemeKod", res.data.yakitKod);
        setValue("aktif", res.data.aktif);
        setValue("tanim", res.data.tanim);
        setValue("birim", res.data.birim);
        setValue("birimKodId", res.data.birimKodId);
        setValue("fiyat", res.data.fiyat);
        setValue("kdvOran", res.data.kdvOran);
        setValue("malzemeTipKodText", res.data.yakitTipKodText);
        setValue("malzemeTipKodId", res.data.yakitKodId);
        setValue("girenMiktar", res.data.girenMiktar);
        setValue("cikanMiktar", res.data.cikanMiktar);
        setValue("stokMiktar", res.data.girenMiktar - res.data.cikanMiktar);
        setValue("ozelAlan1", res?.data.ozelAlan1);
        setValue("ozelAlan2", res?.data.ozelAlan2);
        setValue("ozelAlan3", res?.data.ozelAlan3);
        setValue("ozelAlan4", res?.data.ozelAlan4);
        setValue("ozelAlan5", res?.data.ozelAlan5);
        setValue("ozelAlan6", res?.data.ozelAlan6);
        setValue("ozelAlan7", res?.data.ozelAlan7);
        setValue("ozelAlan8", res?.data.ozelAlan8);
        setValue("ozelAlanKodId9", res?.data.ozelAlanKodId9);
        setValue("ozelAlan9", res?.data.ozelAlan9);
        setValue("ozelAlan10", res?.data.ozelAlan10);
        setValue("ozelAlanKodId10", res?.data.ozelAlanKodId10);
        setValue("ozelAlan11", res?.data.ozelAlan11);
        setValue("ozelAlan12", res?.data.ozelAlan12);
      } catch (error) {
        console.error("Error updating driver:", error);
      }
    };

    if (updateModal) {
      fetchData();
    }

  }, [id, updateModal]);

  const onSubmit = handleSubmit((values) => {
    const body = {
      malzemeId: id,
      tanim: values.tanim,
      stokMiktar: values.stokMiktar || 0,
      birimKodId: values.birimKodId || -1,
      malzemeTipKodId: values.malzemeTipKodId || -1,
      fiyat: values.fiyat || 0,
      kdvOran: values.kdvOran || 0,
      aktif: values.aktif,
      "malzemeTip": "YAKIT",
      malzemeKod: values.malzemeKod,
      ozelAlan1: values.ozelAlan1 || "",
      ozelAlan2: values.ozelAlan2 || "",
      ozelAlan3: values.ozelAlan3 || "",
      ozelAlan4: values.ozelAlan4 || "",
      ozelAlan5: values.ozelAlan5 || "",
      ozelAlan6: values.ozelAlan6 || "",
      ozelAlan7: values.ozelAlan7 || "",
      ozelAlan8: values.ozelAlan8 || "",
      ozelAlanKodId9: values.ozelAlanKodId9 || -1,
      ozelAlanKodId10: values.ozelAlanKodId10 || -1,
      ozelAlan11: values.ozelAlan11 || 0,
      ozelAlan12: values.ozelAlan12 || 0,
    };

    UpdateMaterialCardService(body).then((res) => {
      if (res.data.statusCode === 202) {
        setUpdateModal(false);
        setStatus(true);
        reset(defaultValues);
      }
    });


    setStatus(false);
  });

  const personalProps = {
    form: "MALZEME",
    fields,
    setFields,
  };

  const items = [
    {
      key: "1",
      label: t("genelBilgiler"),
      children: <GeneralInfo isValid={isValid} />,
    },
    {
      key: "2",
      label: t("ozelAlanlar"),
      children: <PersonalFields personalProps={personalProps} />,
    },
  ];

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        reset(defaultValues);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <Modal
      title={t("surucuGuncelle")}
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

UpdateModal.propTypes = {
  updateModal: PropTypes.bool,
  setUpdateModal: PropTypes.func,
  setStatus: PropTypes.func,
  id: PropTypes.number,
};

export default UpdateModal;
