import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { Input, ConfigProvider, DatePicker, TimePicker } from "antd";

dayjs.locale("tr");

const GeneralInfo = () => {
  const { control } = useFormContext();

  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("fisNo")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("tarih")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <ConfigProvider locale={tr_TR}>
                  <DatePicker
                    {...field}
                    placeholder=""
                    locale={dayjs.locale("tr")}
                    format="DD.MM.YYYY"
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                </ConfigProvider>
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("girisDeposu")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("firma")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("saat")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => <TimePicker format="HH:mm:ss" />}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("cikisDeposu")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("plaka")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("islemTipi")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("lokasyon")}</label>
            <Controller
              name=""
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
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

export default GeneralInfo;
