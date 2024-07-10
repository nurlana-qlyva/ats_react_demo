import { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../../context/plakaSlice";
import { AddDriverSubstitutionItemService } from "../../../../../../../api/services/vehicles/vehicles/services";
import {
  CodeItemValidateService,
  GetModuleCodeByCode,
} from "../../../../../../../api/services/code/services";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
import Driver from "../../../../../../components/form/selects/Driver";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";

const AddModal = ({ setStatus }) => {
  const { plaka, aracId } = useContext(PlakaContext);
  const isFirstRender = useRef(true);
  const [isValid, setIsValid] = useState("normal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [surucuIsValid, setSurucuIsValid] = useState(false);

  const defaultValues = {
    checked: true,
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    if (isModalOpen && isFirstRender.current) {
      GetModuleCodeByCode("ARAC_TESTLIM").then((res) =>
        setValue("tutanakNo", res.data)
      );
    }
  }, [isModalOpen, setValue]);

  useEffect(() => {
    if (watch("tutanakNo")) {
      const body = {
        tableName: "TutanakNo",
        code: watch("tutanakNo"),
      };
      CodeItemValidateService(body).then((res) => {
        res.data.status ? setIsValid("success") : setIsValid("error");
      });
    }
  }, [watch("tutanakNo")]);

  const handleOk = handleSubmit(async (values) => {
    const body = {
      asAracId: aracId,
      plaka: plaka,
      tutanakNo: values.tutanakNo,
      teslimTarih: dayjs(values.teslimTarih).format("YYYY-MM-DD") || null,
      teslimSaat: dayjs(values.teslimSaat).format("HH:mm:ss") || null,
      aciklama: values.aciklama,
      km: values.km || 0,
      surucuTeslimAlanId: values.surucuTeslimAlanId || -1,
      surucuTeslimEdenId: values.surucuTeslimEdenId || -1,
    };

    AddDriverSubstitutionItemService(body).then((res) => {
      if (res?.data.statusCode === 200) {
        setIsModalOpen(false);
        setStatus(true);
        reset();
      }
    });
    setStatus(false);
  });

  useEffect(() => {
    !watch("surucuTeslimAlanId") || watch("surucuTeslimAlanId") === watch("surucuTeslimEdenId") ? setSurucuIsValid(true) : setSurucuIsValid(false)
  }, [watch("surucuTeslimEdenId"), watch("surucuTeslimAlanId")])

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={handleOk}
      disabled={
        isValid === "success" ? true : isValid === "error" ? false : false || surucuIsValid
      }
    >
      {t("kaydet")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => setIsModalOpen(false)}
    >
      {t("iptal")}
    </Button>,
  ];

  const validateStyle = {
    borderColor:
      isValid === "success"
        ? "#dc3545"
        : isValid === "error"
        ? "#23b545"
        : "#000",
  };

  return (
    <div>
      <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> {t("ekle")}
      </Button>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={600}
      >
        <FormProvider {...methods}>
          <form>
            <div className="grid gap-1">
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("tutanakNo")}</label>
                  <TextInput name="tutanakNo" style={validateStyle} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("teslimTarih")}</label>
                  <DateInput name="teslimTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("teslimSaat")}</label>
                  <TimeInput name="teslimSaat" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("teslimEden")}</label>
                  <Driver
                    name="surucuTeslimEden"
                    codeName="surucuTeslimEdenId"
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label className="text-info">{t("teslimAlan")}</label>
                  <Driver
                    name="surucuTeslimAlan"
                    codeName="surucuTeslimAlanId"
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("aracKm")}</label>
                  <NumberInput name="km" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("aciklama")}</label>
                  <Textarea name="aciklama" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex gap-1">
                  <CheckboxInput name="checked" />
                  <label>{t("teslimTutanagiYazdir")}</label>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

AddModal.propTypes = {
  setStatus: PropTypes.func,
};

export default AddModal;
