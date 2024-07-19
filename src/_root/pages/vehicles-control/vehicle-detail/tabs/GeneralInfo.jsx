import { t } from "i18next";
import { Radio } from "antd";
import NumberInput from "../../../../components/form/inputs/NumberInput";
import CodeControl from "../../../../components/form/selects/CodeControl";
import TextInput from "../../../../components/form/inputs/TextInput";
import CheckboxInput from "../../../../components/form/checkbox/CheckboxInput";
import DateInput from "../../../../components/form/date/DateInput";

const GeneralInfo = () => {
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
                  <label>{t("havuz")}</label>
                  <TextInput name="havuzGrup" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("kullanimAmaci")} -- ?</label>
                  <TextInput name="" readonly={true} />
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
                  <label>{t("bagliArac")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("hgs")} -- ?</label>
                  <TextInput name="" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("tts")}</label>
                  <TextInput name="tts" />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-10">
            <h3 className="sub-title">{t("yakitTuketimKontrol")}</h3>
            <div className="grid gap-2">
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("minYakitTuketimi")}</label>
                  <NumberInput name="onGorulenMin" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("maxYakitTuketimi")}</label>
                  <NumberInput name="onGorulen" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col gap-1">
                  <label>{t("gercekYakitTuketimi")}</label>
                  <NumberInput name="gerceklesen" />
                </div>
              </div>
              <div className="col-span-3">
                <div className="flex flex-col">
                  <label>{t("uyari")}</label>
                  <CheckboxInput name="uyari" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="border p-10">
            <h3 className="sub-title">{t("yenilenmeTarihleri")}</h3>
            <div className="grid gap-1 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="muayeneTarih">{t("muayeneTarihi")}</label>
                  <DateInput name="muayeneTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="sozlesmeTarih">{t("sozlesmeTarihi")}</label>
                  <DateInput name="sozlesmeTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="egzosTarih">{t("egzozEmisyon")}</label>
                  <DateInput name="egzosTarih" />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label htmlFor="vergiTarih">{t("vergi")}</label>
                  <DateInput name="vergiTarih" />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-10 mt-10">
            <div className="grid gap-1 mt-10">
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("aracSorumlusu")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("anahtarKodu")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
              <div className="col-span-6">
                <div className="flex flex-col gap-1">
                  <label>{t("yedekAnahtar")} -- ?</label>
                  <TextInput name="" readonly={true} />
                </div>
              </div>
            </div>
          </div>
          <div className="border p-10 mt-10">
            <Radio.Group>
              <Radio value={1}>{t("aktif")}</Radio>
              <Radio value={2}>{t("pasif")}</Radio>
              <Radio value={3}>{t("arsiv")}</Radio>
            </Radio.Group>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
