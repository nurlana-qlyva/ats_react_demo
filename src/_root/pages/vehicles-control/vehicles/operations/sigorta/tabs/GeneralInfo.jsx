import PropTypes from "prop-types";
import { t } from "i18next";
import Plaka from "../../../../../../components/form/selects/Plaka";
import DateInput from "../../../../../../components/form/date/DateInput";
import NumberInput from "../../../../../../components/form/inputs/NumberInput";
import TextInput from "../../../../../../components/form/inputs/TextInput";
import Textarea from "../../../../../../components/form/inputs/Textarea";
import CheckboxInput from "../../../../../../components/form/checkbox/CheckboxInput";
import CodeControl from "../../../../../../components/form/selects/CodeControl";
import Firma from "../../../../../../components/form/selects/Firma";

const GeneralInfo = () => {
  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-4 border p-20">
          <div className="grid gap-1">
            <div className="col-span-12">
              <div className="grid gap-1">
                <div className="col-span-10">
                  <div className="flex flex-col gap-1">
                    <label>{t("plaka")}</label>
                    <Plaka />
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-col gap-1">
                    <label>{t("aktif")}</label>
                    <CheckboxInput name="aktif" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("sigortaTanim")}</label>
                <CodeControl
                  name="sigorta"
                  codeName="sigortaKodId"
                  id={405}
                />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("baslangicTarih")}</label>
                <DateInput name="baslangicTarih" />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("bitisTarih")}</label>
                <DateInput name="bitisTarih" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-8 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("policeNo")}</label>
                <TextInput name="policeNo" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("tutar")}</label>
                <NumberInput name="tutar" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("aracBedeli")}</label>
                <NumberInput name="aracBedeli" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("hasarIndirimi")}</label>
                <NumberInput name="hasarIndirimi" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("firma")}</label>
                <Firma />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("yetkili")}</label>
                <TextInput name="yetkili" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("ruhsatBelgeSeriNo")}</label>
                <TextInput name="ruhsatBelgeSeriNo" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("adres")}</label>
                <TextInput name="adres" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("il")}</label>
                <TextInput name="il" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("ilce")}</label>
                <TextInput name="ilce" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("acenta")}</label>
                <CodeControl
                  name="acenta"
                  codeName="acentaKodId"
                  id={406}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("telefon")}</label>
                <TextInput name="telefon" />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex flex-col gap-1">
                <label>{t("aciklama")}</label>
                <Textarea name="aciklama" />
              </div>
            </div>
            <div className="col-span-12">
              <div className="flex gap-2">
                <CheckboxInput name="varsayilan" />
                <label>{t("varsayilan")}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

GeneralInfo.propTypes = {
  setIsValid: PropTypes.func,
  response: PropTypes.string,
  setResponse: PropTypes.func,
};

export default GeneralInfo;
