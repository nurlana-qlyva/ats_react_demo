import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { t } from "i18next";
import {
  Button,
  Modal,
} from "antd";
import { GetVehicleDetailsInfoService, UpdateVehicleDetailsInfoService } from '../../../../../../../api/services/vehicles/vehicles/services'
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import ReadonlyInput from "../../../../../../components/form/inputs/ReadonlyInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import MaterialType from "../../../../../../components/form/selects/MaterialType";

const Teknik = ({ visible, onClose, id }) => {
  const [status, setStatus] = useState(false);

  const defaultValues = {}
  const methods = useForm({
    defaultValues: defaultValues
  })
  const { handleSubmit } = methods

  useEffect(() => {
    GetVehicleDetailsInfoService(id, 1).then((res) => {

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

  return (
    <Modal
      title={t("teknikBilgiler")}
      open={visible}
      onCancel={onClose}
      maskClosable={false}
      footer={footer}
      width={1200}
    >
      <div className="mt-14">
        <h2>Motor Bilgileri</h2>
        <div className="grid gap-1 border p-20 mt-10">
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("sasiNo")}</label>
              <TextInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("motorSeriNo")}</label>
              <TextInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("kapiAdedi")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("silindirHacmiCC")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("silindirSayisi")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("maxHiz")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("motorGucuBG")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("tork")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("hizlanma")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("yakitTip")}</label>
              <MaterialType name="" codeName="" type="YAKIT" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("vitesTip")}</label>
              <ReadonlyInput name="vitesTip" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("cekisAksi")}</label>
              <TextInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("anahtarKod")}</label>
              <TextInput name="" />
            </div>
          </div>
          <div className="col-span-3">
            <div className="flex flex-col gap-1">
              <label>{t("radyoKod")}</label>
              <TextInput name="" />
            </div>
          </div>
        </div>
        <h2 className="mt-14">Boyut Bilgileri</h2>
        <div className="grid gap-1 border p-20 mt-10">
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("netAgirlik")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("katarAgirlik")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("icYukseklik")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("yakitDeposu")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("bagajHacmi")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("aksMesafesi")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("boy")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("genislik")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("yukseklik")}</label>
              <NumberInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("onLastik")}</label>
              <TextInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("onBasinc")}</label>
              <TextInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("arkaLastik")}</label>
              <TextInput name="" />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex flex-col gap-1">
              <label>{t("arkaBasinc")}</label>
              <TextInput name="" />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label>{t("aciklama")}</label>
          <Textarea name="aciklama" />
        </div>
      </div>
    </Modal>
  )
};

Teknik.propTypes = {
  id: PropTypes.number,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
}


export default Teknik;
