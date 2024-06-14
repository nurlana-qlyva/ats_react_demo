import { Controller, useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import {
  Input,
  ConfigProvider,
  DatePicker,
  TimePicker,
  InputNumber,
} from "antd";
import Firma from "../../../components/form/Firma";
import Plaka from "../../../components/form/Plaka";
import Location from "../../../components/form/Location";
import IslemTipi from "../../../components/form/IslemTipi";
import TextArea from "antd/lib/input/TextArea";

dayjs.locale("tr");

const EkBilgiler = () => {
  const { control } = useFormContext();

  return (
    <>
      <div className="grid gap-1 mt-20">
        <div className="col-span-6 border p-20">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("indirim")}</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("araToplam")}</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("kdvToplam")}</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("genelToplam")}</label>
                <Controller
                  name=""
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 border p-20">
          <div className="flex flex-col gap-1 h-full">
            <label>{t("aciklama")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <TextArea
                  {...field}
                  className="w-full custom"
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default EkBilgiler;
