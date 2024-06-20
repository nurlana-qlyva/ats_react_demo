import { Controller, useFormContext } from "react-hook-form";
import { t } from "i18next";
import { Checkbox, Input, InputNumber, Select } from "antd";
import Firma from "../../../components/form/Firma";
import Birim from "../../../components/form/Birim";
import MalzemeTipi from "../../../components/form/MalzemeTipi";
import Depo from "../../../components/form/Depo";
import { useEffect } from "react";

const GeneralInfo = () => {
  const { control, setValue } = useFormContext();

  useEffect(() => {setValue("kdvDahilHaric", "dahil")}, [])

  return (
    <>
      <div className="grid gap-1">
        <div className="col-span-6 p-10">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("malzemeKodu")}</label>
                <Controller
                  name="malzemeKod"
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
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("aktifDegil")}</label>
                <Controller
                  name="aktif"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("tanimi")}</label>
                <Controller
                  name="tanim"
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
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("birim")}</label>
                <Controller
                  name="birimKodId"
                  control={control}
                  render={({ field }) => <Birim field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("malzemeTipi")}</label>
                <Controller
                  name="malzemeTipKodId"
                  control={control}
                  render={({ field }) => <MalzemeTipi field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("fiyat")}</label>
                <Controller
                  name="fiyat"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="grid gap-1">
                <div className="col-span-8">
                  <div className="flex flex-col gap-1">
                    <label>{t("kdvOrani")}</label>
                    <Controller
                      name="kdvOran"
                      control={control}
                      render={({ field }) => (
                        <InputNumber
                          {...field}
                          className="w-full"
                          onChange={(e) => field.onChange(e)}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-span-4 self-end">
                  <Controller
                    name="kdvDahilHaric"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        defaultValue="dahil"
                        options={[
                          { value: "dahil", label: <span>Dahil</span> },
                          { value: "haric", label: <span>Hariç</span> },
                        ]}
                        onChange={e => field.onChange(e)}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("kritikStokMiktari")}</label>
                <Controller
                  name="kritikMiktar"
                  control={control}
                  render={({ field }) => (
                    <InputNumber
                      {...field}
                      className="w-full"
                      onChange={(e) => field.onChange(e)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-6 p-10">
          <div className="grid gap-1">
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("seriNo")}</label>
                <Controller
                  name="seriNo"
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
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("barkodNo")}</label>
                <Controller
                  name="barKodNo"
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
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("depo")}</label>
                <Controller
                  name="depoId"
                  control={control}
                  render={({ field }) => <Depo field={field} />}
                />
              </div>
            </div>
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("bolum")}</label>
                <Controller
                  name="bolum"
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
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("raf")}</label>
                <Controller
                  name="raf"
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
            <div className="col-span-6">
              <div className="flex flex-col gap-1">
                <label>{t("olcu")}</label>
                <Controller
                  name="olcu"
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
                <label>{t("yedekParca")}</label>
                <Controller
                  name="yedekParca"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("sarfMalz")}</label>
                <Controller
                  name="sarfMlz"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col gap-1">
                <label>{t("demirbas")}</label>
                <Controller
                  name="demirBas"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralInfo;
