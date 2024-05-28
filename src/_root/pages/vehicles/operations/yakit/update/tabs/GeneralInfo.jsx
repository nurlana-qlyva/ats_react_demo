import { Controller, useFormContext } from 'react-hook-form'
import dayjs from 'dayjs'
import tr_TR from 'antd/lib/locale/tr_TR'
import { ConfigProvider, DatePicker, Divider, Input, TimePicker } from 'antd'
import Location from '../../../../../../components/form/Location'
import Firma from '../../../../../../components/form/Firma'
import Istasyon from '../../../../../../components/form/Istasyon'
import FuelType from '../../../../../../components/form/FuelType'
import Driver from '../../../../../../components/form/Driver'

dayjs.locale('tr')

const GeneralInfoTab = () => {
    const { control } = useFormContext()
    return (
        <>
            <div className="grid">
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
                                    name=""
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
                                    name=""
                                    control={control}
                                    render={({ field }) => (
                                        <Istasyon field={field} />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12">
                    <Divider />
                </div>
                <div className="col-span-12 border p-20">
                    <div className="grid">
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>21.01.2024</p>
                            <div>
                                <img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} />
                            </div>
                            <p style={{ fontSize: "14px" }}>200 km</p>
                            <p style={{ fontSize: "14px" }}>200 Lt.</p>
                            <p style={{ fontSize: "14px" }}>1 Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>0 km</p>
                        </div>
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>21.01.2024</p>
                            <div>
                                <img src="/images/kirmizi.svg" alt="" style={{ width: "20%" }} />
                            </div>
                            <p style={{ fontSize: "14px" }}>200 km</p>
                            <p style={{ fontSize: "14px" }}>200 Lt.</p>
                            <p style={{ fontSize: "14px" }}>1 Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>0 km</p>
                        </div>
                        <div className="col-span-2 flex flex-col" style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: "14px" }}>21.01.2024</p>
                            <div>
                                <img src="/images/Mor.svg" alt="" style={{ width: "20%" }} />
                            </div>
                            <p style={{ fontSize: "14px" }}>200 km</p>
                            <p style={{ fontSize: "14px" }}>200 Lt.</p>
                            <p style={{ fontSize: "14px" }}>1 Lt.Km..</p>
                        </div>
                        <div className="col-span-1 mt-20" style={{ textAlign: 'center' }}>
                            <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
                            <p>0 km</p>
                        </div>
                        <div className="col-span-2 mt-20" style={{ textAlign: 'center' }}>
                            <div><img src="/images/Araba.svg" alt="" style={{ width: "40%" }} /></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralInfoTab
