import { Controller, useFormContext } from 'react-hook-form'
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
                                <label htmlFor="plaka">Plaka</label>
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
                                <label htmlFor="aracTipId">Araç Tipi</label>
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
                                <label htmlFor="guncelKm">Güncel Km.</label>
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
                        <label htmlFor="lokasyonId">Lokasyon</label>
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
                    <h3 className="sub-title">Araç Bilgileri</h3>
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="markaId">Marka</label>
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
                                <label htmlFor="yil">Model Yılı</label>
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
                                <label htmlFor="modelId">Model</label>
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
                                <label htmlFor="aracGrubuId">Araç Grup</label>
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
                                <label htmlFor="">Araç Cinsi</label>
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
                                <label htmlFor="aracRenkId">Renk</label>
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
                                <label htmlFor="">Mülkiyet</label>
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
                                <label htmlFor="departmanId">Departman</label>
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
                                <label htmlFor="surucuId">Sürücü</label>
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
                                <label htmlFor="yakitTipId">Yakıt Tipi</label>
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
                    <h3 className="sub-title">Yenilenme Tarihleri</h3>
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="muayeneTarih">Muayene Tarihi</label>
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
                                <label htmlFor="sozlesmeTarih">Sözleşme</label>
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
                                <label htmlFor="egzosTarih">Egzoz Emisyon</label>
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
                                <label htmlFor="vergiTarih">Vergi</label>
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
