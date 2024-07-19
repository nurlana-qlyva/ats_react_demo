import { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { IoIosWarning } from "react-icons/io";
import { Button, Radio, Modal } from "antd";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import DateInput from "../../../../components/form/date/DateInput";
import VehicleList from "./VehiclesList";
import { useFormContext } from "react-hook-form";
import Textarea from "../../../../components/form/inputs/Textarea";

const GeneralInfo = () => {
  const { setValue, watch } = useFormContext();
  const [open, setOpen] = useState(false);
  const [vehicle, setVehicle] = useState(false);
  const [warning, setWarning] = useState(false);

  useEffect(() => {
    let current = new Date().getDate();
    if (current < 10) current = "0" + current;

    if (current - dayjs(watch("muayeneTarih")).format("DD") === 2)
      setWarning(true);
  }, []);

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={() => {
        setValue("bagliArac", vehicle[0].plaka);
        setValue("bagliAracId", vehicle[0].aracId);
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
      <div className="grid gap-1 gap-1 mt-10">
        <div className="col-span-8">
          <div className="border p-10 mb-10">
            <h3 className="sub-title">{t("aracBilgileri")}</h3>
            <div className="grid gap-1 mt-10">
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="yil">{t("yil")}</label>
                  <NumberInput name="yil" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="aracGrubuId">{t("aracGrup")}</label>
                  <CodeControl name="grup" codeName="aracGrubuId" id={101} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("aracCinsi")}</label>
                  <CodeControl
                    name="aracCinsi"
                    codeName="aracCinsiKodId"
                    id={107}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="">{t("mulkiyet")}</label>
                  <TextInput name="mulkiyet" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label htmlFor="departmanId">{t("departman")}</label>
                  <CodeControl
                    name="departman"
                    codeName="departmanId"
                    id={200}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("proje")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("masrafMerkezi")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("havuz")} -- ?</label>
                  <TextInput name="havuzGrup" readonly={true} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("kullanimAmaci")}</label>
                  <CodeControl
                    name="kullanimAmaci"
                    codeName="kullanimAmaciKodId"
                    id={887}
                  />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("durum")}</label>
                  <CodeControl name="durum" codeName="durumKodId" id={122} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("hgs")}</label>
                  <TextInput name="hgsNo" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("tts")}</label>
                  <TextInput name="tts" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid gap-1">
                  <div className="col-span-10">
                    <div className="flex flex-col gap-1">
                      <label>{t("bagliArac")}</label>
                      <TextInput name="bagliArac" readonly={true} />
                    </div>
                  </div>
                  <div className="col-span-2 self-end">
                    <Button className="w-full" onClick={() => setOpen(true)}>
                      ...
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border p-10 mt-10">
            <div className="grid gap-1">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("anahtarKodu")}</label>
                  <TextInput name="anahtarKodu" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("yedekAnahtar")}</label>
                  <CodeControl
                    name="yedekAnahtar"
                    codeName="yedekAnahtarKodId"
                    id={888}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-10 mt-10">
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Textarea name="aciklama" />
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="border p-10">
            <h3 className="sub-title">{t("yenilenmeTarihleri")}</h3>
            <div className="grid gap-1 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info flex align-center gap-1">
                    <span>{t("muayeneTarihi")} </span>
                    <span
                      className={`warning-icon ${!warning ? "show" : "hide"}`}
                    >
                      <IoIosWarning style={{ color: "red" }} />
                    </span>
                  </label>
                  <DateInput name="muayeneTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info">{t("sozlesmeTarihi")}</label>
                  <DateInput name="sozlesmeTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info">{t("egzozEmisyon")}</label>
                  <DateInput name="egzosTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label className="text-info">{t("vergi")}</label>
                  <DateInput name="vergiTarih" />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-10 mt-10">
            <h3 className="sub-title">{t("yakitTuketimKontrol")}</h3>
            <div className="grid gap-2">
              <div className="col-span-6 mt-10">
                <div className="flex flex-col gap-1">
                  <label>{t("minYakitTuketimi")}</label>
                  <NumberInput name="onGorulenMin" />
                </div>
              </div>
              <div className="col-span-6 mt-10">
                <div className="flex flex-col gap-1">
                  <label>{t("maxYakitTuketimi")}</label>
                  <NumberInput name="onGorulen" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("gercekYakitTuketimi")}</label>
                  <NumberInput name="gerceklesen" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("uyari")}</label>
                  <CheckboxInput name="uyari" />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-10 mt-10">
            <Radio.Group style={{ width: 16 }} className="flex">
              <Radio value={1}>{t("aktif")}</Radio>
              <Radio value={2}>{t("pasif")}</Radio>
              <Radio value={3}>{t("arsiv")}</Radio>
            </Radio.Group>
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
          <VehicleList setVehicle={setVehicle} open={open} />
        </Modal>
      </div>
    </>
  );
};

export default GeneralInfo;
