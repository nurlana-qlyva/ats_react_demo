import { Controller, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import { Checkbox, ConfigProvider, DatePicker, Input, InputNumber, Radio } from 'antd'
import tr_TR from 'antd/lib/locale/tr_TR'
import VehicleGroup from '../../../components/form/VehicleGroup'
import VehicleCins from '../../../components/form/VehicleCins'
import Departman from '../../../components/form/Departman'
import Durum from '../../../components/form/Durum'

dayjs.locale('tr')

const GeneralInfo = () => {
    const { control, setValue } = useFormContext()

    return (
        <>
            <div className="grid gap-1 gap-1 mt-10">
                <div className="col-span-8">
                    <div className="border p-10 mb-10">
                        <h3 className="sub-title">Araç Bilgileri</h3>
                        <div className="grid gap-1">
                            <div className="col-span-3">
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
                            <div className="col-span-3">
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Araç Cinsi</label>
                                    <Controller
                                        name="AracCinsiKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <VehicleCins field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
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
                            <div className="col-span-3">
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label >Proje</label>
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Masraf Merkezi</label>
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label >Havuz</label>
                                    <Controller
                                        name="havuzGrup"
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Kullanım Amacı</label>
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="durumKodId">Durum</label>
                                    <Controller
                                        name="durumKodId"
                                        control={control}
                                        render={({ field }) => (
                                            <Durum field={field} />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Bağlı Araç</label>
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>HGS</label>
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>TTS</label>
                                    <Controller
                                        name="tts"
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
                        </div>
                    </div>
                    <div className="border p-10">
                        <h3 className="sub-title">Yakıt Tüketim Kontrol</h3>
                        <div className="grid gap-2">
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Min. Yakıt Tüketimi</label>
                                    <Controller
                                        name="onGorulenMin"
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Maks. Yakıt Tüketimi</label>
                                    <Controller
                                        name="onGorulen"
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
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Gerçek Yakıt Tüketimi</label>
                                    <Controller
                                        name="gerceklesen"
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
                            <div className="col-span-3">
                                <div className="flex flex-col">
                                    <label htmlFor="uyari">Uyarı</label>
                                    <Controller
                                        name="uyari"
                                        control={control}
                                        render={({ field }) => <Checkbox {...field} />}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4">
                    <div className="border p-10">
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
                    <div className="border p-10 mt-10">
                        <div className="grid gap-1 mt-10">
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label >Araç Sorumlusu</label>
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
                                    <label>Anahtar Kodu</label>
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
                                    <label>Yedek Anahtar</label>
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
                        </div>
                    </div>
                    <div className="border p-10 mt-10">
                        <Radio.Group>
                            <Radio value={1}>Aktif</Radio>
                            <Radio value={2}>Pasif</Radio>
                            <Radio value={3}>Arşiv</Radio>
                        </Radio.Group>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GeneralInfo;
