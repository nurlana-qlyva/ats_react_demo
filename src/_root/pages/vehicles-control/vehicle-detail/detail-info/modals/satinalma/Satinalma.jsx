import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import tr_TR from "antd/lib/locale/tr_TR";
import { t } from "i18next";
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Divider,
  Input,
  Modal,
} from "antd";
import { GetVehicleDetailsInfoService, UpdateVehicleDetailsInfoService } from '../../../../../../../api/services/vehicles/vehicles/services'

import CodeControl from "../../../../../../components/form/selects/CodeControl";
import Towns from "../../../../../../components/form/selects/Towns";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import DateInput from "../../../../../../components/form/date/DateInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import ReadonlyInput from "../../../../../../components/form/inputs/ReadonlyInput";

dayjs.locale("tr");

const Satinalma = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);

  const defaultValues = {
    kiralik: false
  }
  const methods = useForm({
    defaultValues: defaultValues
  })
  const { handleSubmit, watch } = methods

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 4).then((res) => {

    });
  }, [id, status]);

  const onSumbit = handleSubmit((values) => {
    const body = {}

    UpdateVehicleDetailsInfoService(body).then(res => {
      if (res.data.statusCode === 202) {
        setStatus(true)
        onClose()
      }
    })
  })

  const footer = (
    [
      <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
        {t("kaydet")}
      </Button>,
      <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
        {t("iptal")}
      </Button>
    ]
  )

  console.log(!watch("kiralik"))

  return (
    <Modal
      title={t("satinalmaBilgiler")}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
      <div className="mt-14">
        <div className="grid gap-2">
          <div className="col-span-8">
            <h2>{t("satinalmaBilgiler")}</h2>
            <div className="grid gap-1 p-20 border mt-10">
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("noterSatisTarih")}</label>
                  <DateInput name="" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("fatureTarih")}</label>
                  <DateInput name="" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("noterSozlesmeNo")}</label>
                  <TextInput name="" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("faturaNo")}</label>
                  <TextInput name="" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("satinalmaTarih")}</label>
                  <DateInput name="" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("faturaTutar")}</label>
                  <NumberInput name="" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("aracKM")}</label>
                  <TextInput name="" />
                </div>
              </div>
              <div className="col-span-4">
                <div className="flex flex-col gap-1">
                  <label>{t("fiyat")}</label>
                  <NumberInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("satinalmaYeri")}</label>
                  <ReadonlyInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("adres")}</label>
                  <TextInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("sehirIlcePK")}</label>
                  <TextInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("aciklama")}</label>
                  <Textarea name="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <h2>{t("ammorTismanBilgiler")}</h2>
            <div className="grid gap-1 p-20 border mt-10">
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("hesapTarih")}</label>
                  <DateInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("defterDeger")}</label>
                  <NumberInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("faydaliOmru")}</label>
                  <TextInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("amorTismanTutar")}</label>
                  <ReadonlyInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("netAktifDeger")}</label>
                  <ReadonlyInput name="" />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("kalanSure")}</label>
                  <ReadonlyInput name="" />
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-12">
            <h2><CheckboxInput name="kiralik" /> {t("satinalmaBilgiler")}</h2>
            <div className="grid gap-1 p-20 border mt-10">
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("kiralamaYeri")}</label>
                  <ReadonlyInput name="" checked={!watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("aylikOdemeTutar")}</label>
                  <ReadonlyInput name="" checked={watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("kiralamaTutar")}</label>
                  <ReadonlyInput name="" checked={watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("hesapNo")}</label>
                  <ReadonlyInput name="" checked={watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("kiraBaslangicTarih")}</label>
                  <ReadonlyInput name="" checked={watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("ilgili")}</label>
                  <ReadonlyInput name="" checked={watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("kiralamaSuresi")}</label>
                  <ReadonlyInput name="" checked={watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("ilkOdemeTarih")}</label>
                  <ReadonlyInput name="" checked={watch("kiralik")} />
                </div>
              </div>
              <div className="col-span-12">
                <div className="flex flex-col gap-1">
                  <label>{t("aciklama")}</label>
                  <Textarea name="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Satinalma;
