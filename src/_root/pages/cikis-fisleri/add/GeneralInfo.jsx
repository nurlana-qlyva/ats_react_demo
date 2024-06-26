import { Controller, useFormContext } from "react-hook-form";
import { useContext, useEffect } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import tr_TR from "antd/lib/locale/tr_TR";
import { Input, ConfigProvider, DatePicker, TimePicker } from "antd";
import { PlakaContext } from "../../../../context/plakaSlice";
import {
  CustomCodeControlService,
  GetLocationByDepoIdService,
} from "../../../../api/service";
import FirmaUnvani from "../../../components/form/FirmaUnvani";
import Plaka from "../../../components/form/Plaka";
import Location from "../../../components/form/Location";
import IslemTipi from "../../../components/form/IslemTipi";
import Depo from "../../../components/form/Depo";

dayjs.locale("tr");

const GeneralInfo = ({ isValid }) => {
  const { control, setValue, watch } = useFormContext();
  const { setPlaka } = useContext(PlakaContext);

  useEffect(() => {
    CustomCodeControlService("Vehicle/GetVehiclePlates").then((res) => {
      const updatedData = res.data.map((item) => {
        if ("aracId" in item && "plaka" in item) {
          return {
            ...item,
            id: item.aracId,
          };
        }
        return item;
      });
      setPlaka(updatedData);
    });
  }, []);

  useEffect(() => {
    if (watch("cikisDepoSiraNo")) {
      const id = watch("depoLokasyonId");
      GetLocationByDepoIdService(id).then((res) => {
        setValue("lokasyonId", res?.data.lokasyonId);
        setValue("lokasyon", res?.data.lokasyonTanim);
      });
    }
  }, [watch("cikisDepoSiraNo")]);

  return (
    <>
      <div className="grid gap-1 border p-20">
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("fisNo")}</label>
            <Controller
              name="fisNo"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  style={
                    !isValid
                      ? { borderColor: "#dc3545" }
                      : isValid
                      ? { borderColor: "#23b545" }
                      : { color: "#000" }
                  }
                  onChange={(e) => field.onChange(e.target.value)}
                />
              )}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("tarih")}</label>
                <Controller
                  name="tarih"
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
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("saat")}</label>
                <Controller
                  name="saat"
                  control={control}
                  render={({ field }) => (
                    <TimePicker
                      {...field}
                      placeholder=""
                      format="HH:mm:ss"
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("cikisDeposu")}</label>
            <Controller
              name="cikisDepoSiraNo"
              control={control}
              render={({ field }) => <Depo field={field} />}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("firma")}</label>
            <Controller
              name="firmaId"
              control={control}
              render={({ field }) => <FirmaUnvani field={field} />}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("islemTipi")}</label>
            <Controller
              name="islemTipiKodId"
              control={control}
              render={({ field }) => <IslemTipi field={field} />}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("lokasyon")}</label>
            <Controller
              name="lokasyonId"
              control={control}
              render={({ field }) => <Location field={field} />}
            />
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col gap-1">
            <label>{t("plaka")}</label>
            <Controller
              name="aracId"
              control={control}
              render={({ field }) => <Plaka field={field} />}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
