import { useFormContext, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { Checkbox, ConfigProvider, DatePicker, Divider, Input, InputNumber, TimePicker } from 'antd'
import Driver from '../../../../../components/form/Driver'
import FuelType from '../../../../../components/form/FuelType'
import Location from '../../../../../components/form/Location'
import Firma from '../../../../../components/form/Firma'
import Istasyon from '../../../../../components/form/Istasyon'
import MasrafMerkezi from '../../../../../components/form/MasrafMerkezi'
import Guzergah from '../../../../../components/form/Guzergah'
import FuelTank from '../../../../../components/form/FuelTank'
import TextArea from 'antd/lib/input/TextArea'

dayjs.locale('tr')

const GeneralInfo = () => {
    const { control } = useFormContext()

    return (
        <>
            <div className="grid gap-1">
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
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
                        <div className="col-span-6">
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
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Tarih</label>
                                <Controller
                                    name="tarih"
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
                                <label>Saat</label>
                                <Controller
                                    name="saat"
                                    control={control}
                                    render={({ field }) => (
                                        <TimePicker {...field} placeholder="" format="HH:mm" onChange={e => {
                                            field.onChange(e)
                                        }} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="yakitId">Yakıt Tipi</label>
                                <Controller
                                    name="yakitTipId"
                                    control={control}
                                    render={({ field }) => (
                                        <FuelType field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
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
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Firma</label>
                                <Controller
                                    name="firmaId"
                                    control={control}
                                    render={({ field }) => (
                                        <Firma field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>İstasyon</label>
                                <Controller
                                    name="istasyonId"
                                    control={control}
                                    render={({ field }) => (
                                        <Istasyon field={field} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'> Son Alınan Km</label>
                                <Controller
                                    name="sonAlinanKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={e => {
                                                field.onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>Fark Km</label>
                                <Controller
                                    name="farkKm"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            readOnly
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>Yakıtın Alındığı Km</label>
                                <Controller
                                    name="alinanKm"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            className="w-full"
                                            {...field}
                                            onChange={e => {
                                                field.onChange(e)
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-danger'>Ortalama Tuketim</label>
                                <Controller
                                    name="tuketim"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            readOnly
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <div className="flex align-baseline justify-between">
                                    <label className='text-info'>Miktar (lt)</label>
                                    {/* <Button className="depo" onClick={() => setOpen(true)}>Depo Hacmi: {yakitHacmi} {data?.birim === "LITRE" && "lt"}</Button> */}
                                </div>
                                <Controller
                                    name="miktar"
                                    control={control}
                                    render={({ field }) => <InputNumber className="w-full"  {...field} onChange={(e => {
                                        field.onChange(e)
                                    })} />}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>Tutar</label>
                                <Controller
                                    name="tutar"
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={(e => {
                                                field.onChange(e)
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>Birim Fiyat</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={(e => {
                                                field.onChange(e)
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>KDV Tutar</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <InputNumber
                                            {...field}
                                            className='w-full'
                                            onChange={(e => {
                                                field.onChange(e)
                                            })}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6">
                    <Divider />
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Fatura / Fiş No</label>
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
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Fatura / Fiş Tarihi</label>
                                <Controller
                                    name=""
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
                                <label>Görev No -- ?</label>
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
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Özel Kullanım</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} />
                                    )}
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-span-6 p-20">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Masraf Merkezi -- ?</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <MasrafMerkezi field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Güzergah</label>
                                <Controller
                                    name="guzergahId"
                                    control={control}
                                    render={({ field }) => (
                                        <Guzergah field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Stoktan Kullanım</label>
                                <Controller
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox {...field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>Yakıt Tankı --- ?</label>
                                <Controller
                                    name="yakitTanki"
                                    control={control}
                                    render={({ field }) => (
                                        <FuelTank field={field} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12">
                    <Divider />
                </div>
                <div className="col-span-12 p-20">
                    <div className="flex flex-col gap-1">
                        <label>Açıklama</label>
                        <Controller
                            name="yakitTanki"
                            control={control}
                            render={({ field }) => (
                                <TextArea field={field} />
                            )}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default GeneralInfo
