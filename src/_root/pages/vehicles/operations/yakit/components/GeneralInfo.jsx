import { Controller } from "react-hook-form"
import DateInput from "../../../../../components/form/DateInput"
import NumberInput from "../../../../../components/form/NumberInput"
import SelectInput from "../../../../../components/form/SelectInput"
import TextInput from "../../../../../components/form/TextInput"
import LocationTreeSelect from "../../../../../components/form/LocationTreeSelect"
import DriverSelectInput from "../../../../../components/form/DriverSelectInput"
import MaterialListSelect from "../../../../../components/form/MaterialListSelect"
import CompanySelectInput from "../../../../../components/form/CompanySelectInput"
import { Checkbox } from "antd"
import GuzergahSelectInput from "../../../../../components/form/GuzergahSelectInput"

const GeneralInfo = ({ control, setValue }) => {
    return (
        <>
            <div className="grid gap-1">
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <DateInput control={control} name="tarih" label="Tarih" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="saat" label="Saat" type="time" />
                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="alinanKm" label="Yakıtın Alındığı Km" />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="ozelKullanim">Kullanım</label>
                            <Controller
                                name="ozelKullanim"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                        {/* <div className="col-span-6">
                            <LocationTreeSelect control={control} />
                        </div> */}
                    </div>
                </div>
                {/* <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <GuzergahSelectInput control={control} />
                        </div>
                        <div className="col-span-6">
                            <SelectInput control={control} name="istasyonKodId" label="İstasyon" selectID="203" />
                        </div>
                        <div className="col-span-6">
                            <CompanySelectInput control={control} />
                        </div>
                        <div className="col-span-6">
                            <TextInput control={control} name="seferSiraNo" label="Sefer No" />
                        </div>
                    </div>
                </div> */}
                {/* <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <NumberInput control={control} name="sonAlinanKm" label="Son Alınan Km" />
                        </div>
                       
                    </div>
                </div> */}
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-12">
                            <div className="grid gap-1">
                                <div className="col-span-6">
                                    <NumberInput control={control} name="miktar" label="Miktar (lt)" />
                                </div>
                                <div className="col-span-6 flex flex-col">
                                <label htmlFor="">Full Depo</label>
                                    <Controller
                                        control={control}
                                        name="fullDepo"
                                        render={({ field }) => <Checkbox {...field} />}
                                    />
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="litreFiyat" label="Litre Fiyatı" />
                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="tutar" label="Tutar" />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <SelectInput control={control} name="yakitTanki" label="Yakıt Tankı" />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="stokKullanimi">Stoktan Kullanım</label>
                            <Controller
                                name="stokKullanimi"
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        {/* <div className="col-span-6">
                            <DriverSelectInput control={control} />
                        </div> */}
                        <div className="col-span-6">
                            <MaterialListSelect control={control} name="yakitTipId" label="Yakıt Tipi" type="YAKIT" />
                        </div>
                        {/* <div className="col-span-6">
                            <TextInput control={control} name="faturaNo" label="Evrak No" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="faturaTarih" label="Evrak Tarihi" />
                        </div> */}
                    </div>
                </div>
            
            </div>
        </>
    )
}

export default GeneralInfo
