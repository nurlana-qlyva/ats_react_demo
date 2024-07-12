import { t } from "i18next";
import ReadonlyInput from "../../../../components/form/inputs/ReadonlyInput";
import Textarea from "../../../../components/form/inputs/Textarea";


const EkBilgiler = () => {
  return (
    <>
      <div className="grid gap-1 mt-20">
        <div className="col-span-6 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("araToplam")}</label>
                <ReadonlyInput name="toplam_araToplam" checked="true" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("indirim")}</label>
                <ReadonlyInput name="toplam_indirim" checked="true" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("kdvToplam")}</label>
                <ReadonlyInput name="toplam_kdvToplam" checked="true" />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("genelToplam")}</label>
                <ReadonlyInput name="toplam_genelToplam" checked="true" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 border p-20">
          <div className="flex flex-col gap-1 h-full">
            <label>{t("aciklama")}</label>
            <Textarea name="aciklama" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EkBilgiler;
