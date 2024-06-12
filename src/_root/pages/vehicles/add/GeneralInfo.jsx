import { Controller, useFormContext } from 'react-hook-form'
import { t } from 'i18next'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import { ConfigProvider, DatePicker, Input, InputNumber } from 'antd'
import tr_TR from 'antd/lib/locale/tr_TR'
import VehicleType from '../../../components/form/VehicleType'
import VehicleGroup from '../../../components/form/VehicleGroup'
import VehicleCins from '../../../components/form/VehicleCins'
import Renk from '../../../components/form/Renk'
import Departman from '../../../components/form/Departman'
import Driver from '../../../components/form/Driver'
import FuelType from '../../../components/form/FuelType'
import Location from '../../../components/form/Location'
import Marka from '../../../components/form/Marka'
import Model from '../../../components/form/Model'

dayjs.locale('tr')

const GeneralInfo = () => {
    const { control, setValue } = useFormContext()

    return (
        <>
            <div className="grid gap-1 border">
                <div className="col-span-8 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="plaka">{t("plaka")}</label>
                                <Controller
                                    name="plaka"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aracTipId">{t("aracTip")}</label>
                                <Controller
                                    name="aracTipId"
                                    control={control}
                                    render={({ field }) => (
                                        <VehicleType field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="guncelKm">{t("guncelKm")}</label>
                                <Controller
                                    name="guncelKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={(e) => {
                                                field.onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-10">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="lokasyonId">{t("lokasyon")}</label>
                        <Controller
                            name="lokasyonId"
                            control={control}
                            render={({ field }) => (
                                <Location field={field} />
                            )}
                        />
                    </div>
                </div>
            </div>

            <div className="grid gap-1 mt-10">
                <div className="col-span-8 border p-10">
                    <h3 className="sub-title">{t("aracBilgileri")}</h3>
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="markaId">{t("marka")}</label>
                                <Controller
                                    name="markaId"
                                    control={control}
                                    render={({ field }) => (
                                        <Marka field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="modelId">{t("model")}</label>
                                <Controller
                                    name="modelId"
                                    control={control}
                                    render={({ field }) => (
                                        <Model field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="yil">{t("yil")}</label>
                                <Controller
                                    name="yil"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className="w-full"
                                            onChange={(e) => {
                                                field.onChange(e)
                                                if (e === null) {
                                                    setValue('yil', 0)
                                                }
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aracGrubuId">{t("aracGrup")}</label>
                                <Controller
                                    name="aracGrubuId"
                                    control={control}
                                    render={({ field }) => (
                                        <VehicleGroup field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="">{t("aracCinsi")}</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <VehicleCins field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="aracRenkId">{t("renk")}</label>
                                <Controller
                                    name="aracRenkId"
                                    control={control}
                                    render={({ field }) => (
                                        <Renk field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="">{t("mulkiyet")}</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            onChange={(e) => {
                                                field.onChange(e.target.value)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="departmanId">{t("departman")}</label>
                                <Controller
                                    name="departmanId"
                                    control={control}
                                    render={({ field }) => (
                                        <Departman field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="surucuId">{t("surucu")}</label>
                                <Controller
                                    name="surucuId"
                                    control={control}
                                    render={({ field }) => (
                                        <Driver field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="yakitTipId">{t("yakitTip")}</label>
                                <Controller
                                    name="yakitTipId"
                                    control={control}
                                    render={({ field }) => (
                                        <FuelType field={field} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 border p-10">
                    <h3 className="sub-title">{t("yenilenmeTarihleri")}</h3>
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="muayeneTarih" className='text-info'>{t("muayeneTarihi")}</label>
                                <Controller
                                    name="muayeneTarih"
                                    control={control}
                                    render={({ field }) => (
                                        <ConfigProvider locale={tr_TR}>
                                            <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                                field.onChange(e)
                                            }} />
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="sozlesmeTarih" className='text-info'>{t("sozlesmeTarihi")}</label>
                                <Controller
                                    name="sozlesmeTarih"
                                    control={control}
                                    render={({ field }) => (
                                        <ConfigProvider locale={tr_TR}>
                                            <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                                field.onChange(e)
                                            }} />
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="egzosTarih" className='text-info'>{t("egzozTarihi")}</label>
                                <Controller
                                    name="egzosTarih"
                                    control={control}
                                    render={({ field }) => (
                                        <ConfigProvider locale={tr_TR}>
                                            <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                                field.onChange(e)
                                            }} />
                                        </ConfigProvider>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="vergiTarih" className='text-info'>{t("vergiTarihi")}</label>
                                <Controller
                                    name="vergiTarih"
                                    control={control}
                                    render={({ field }) => (
                                        <ConfigProvider locale={tr_TR}>
                                            <DatePicker {...field} placeholder="" locale={dayjs.locale("tr")} format="DD.MM.YYYY" onChange={e => {
                                                field.onChange(e)
                                            }} />
                                        </ConfigProvider>
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
