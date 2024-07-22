import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Button, Modal } from "antd";
import Plaka from "../../../../../../components/form/selects/Plaka";
import Driver from "../../../../../../components/form/selects/Driver";
import ReadonlyInput from "../../../../../../components/form/inputs/ReadonlyInput";
import DateInput from "../../../../../../components/form/date/DateInput";
import TimeInput from "../../../../../../components/form/date/TimeInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import Guzergah from "../../../../../../components/form/selects/Guzergah";
import VehicleList from "./VehiclesList";
import TextInput from "../../../../../../components/form/inputs/TextInput";

const GeneralInfo = ({ isValid }) => {
  const { setValue } = useFormContext();
  const [open, setOpen] = useState(false);
  const [dorse, setDorse] = useState(false);

  const validateStyle = {
    borderColor:
      isValid === "error"
        ? "#dc3545"
        : isValid === "success"
        ? "#23b545"
        : "#000",
  };

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={() => {
        setValue("dorsePlaka", dorse[0].plaka);
        setValue("dorseId", dorse[0].aracId);
        setOpen(false);
      }}
    >
      {t("ekle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => setOpen(false)}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-4 border p-20">
          <div className="grid gap-1">
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("plaka")}</label>
                <Plaka />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("seferNo")}</label>
                <TextInput name="seferNo" style={validateStyle} />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("surucu")} 1</label>
                <Driver name="surucu1" codeName="surucuId1" />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("surucu")} 2</label>
                <Driver name="surucu2" codeName="surucuId2" />
              </div>
            </div>
            <div className="col-span-12">
              <div className="grid gap-1">
                <div className="col-span-10">
                  <div className="flex flex-col gap-1">
                    <label>{t("dorse")}</label>
                    <ReadonlyInput name="dorsePlaka" checked="true" />
                  </div>
                </div>
                <div className="col-span-2 self-end">
                  <Button onClick={() => setOpen(true)}>...</Button>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("seferAdedi")}</label>
                <NumberInput name="seferAdedi" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 border p-20">
          <div className="grid gap-1">
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("cikisTarih")}</label>
                <DateInput name="cikisTarih" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("cikisSaat")}</label>
                <TimeInput name="cikisSaat" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("cikisKm")}</label>
                <NumberInput name="cikisKm" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("varisTarih")}</label>
                <DateInput name="varisTarih" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("varisSaat")}</label>
                <TimeInput name="varisSaat" />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("varisKm")}</label>
                <NumberInput name="varisKm" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("guzergah")}</label>
                <Guzergah />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("farkKm")}</label>
                <NumberInput name="farkKm" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("seferTip")}</label>
                <CodeControl
                  name="seferTip"
                  codeName="seferTipKodId"
                  id={120}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("seferDurum")}</label>
                <CodeControl
                  name="seferDurum"
                  codeName="seferDurumKodId"
                  id={121}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-12 mt-10">
        <div className="flex flex-col gap-1">
          <label>{t("aciklama")}</label>
          <Textarea name="aciklama" />
        </div>
      </div>

      <Modal
        title={t("araclar")}
        open={open}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <VehicleList setDorse={setDorse} open={open} />
      </Modal>
    </>
  );
};

export default GeneralInfo;
