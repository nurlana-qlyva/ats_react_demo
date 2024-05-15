import { Controller } from "react-hook-form"
import DateInput from "../../../../../components/form/DateInput"
import NumberInput from "../../../../../components/form/NumberInput"
import SelectInput from "../../../../../components/form/SelectInput"
import TextInput from "../../../../../components/form/TextInput"
import LocationTreeSelect from "../../../../../components/form/LocationTreeSelect"
import DriverSelectInput from "../../../../../components/form/DriverSelectInput"
import MaterialListSelect from "../../../../../components/form/MaterialListSelect"
import { Checkbox } from "antd"

const GeneralInfo = ({ control }) => {
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
                            <LocationTreeSelect control={control} />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <SelectInput control={control} name="" label="Güzergah" />
                        </div>
                        <div className="col-span-6">
                            <SelectInput control={control} name="istasyon" label="İstasyon" />
                        </div>
                        <div className="col-span-6">
                            <SelectInput control={control} name="" label="Firma" />
                        </div>
                        <div className="col-span-6">
                            <SelectInput control={control} name="seferNo" label="Sefer No" />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <NumberInput control={control} name="" label="Son Alınan Km" />
                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="" label="Yakıtın Alındığı Km" />
                        </div>
                        {/* <div className="col-span-6">
                            <NumberInput control={control} name="" label="Fark Km" />
                        </div> */}
                        <div className="col-span-6">
                            <NumberInput control={control} name="" label="Kullanım" />
                        </div>
                        {/* <div className="col-span-6">
                            <NumberInput control={control} name="" label="Yakıt Tüketimi" />
                        </div> */}
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-12">
                            <div className="grid gap-1">
                                <div className="col-span-6">
                                    <NumberInput control={control} name="" label="Miktar (lt)" />
                                </div>
                                <div className="col-span-6 flex gap-1 self-center mt-10">
                                    <Controller
                                        control={control}
                                        name=""
                                        render={({ field }) => <Checkbox {...field} />}
                                    />
                                    <label htmlFor="">Full Depo</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="" label="Litre Fiyatı" />
                        </div>
                        <div className="col-span-6">
                            <NumberInput control={control} name="" label="Tutar" />
                        </div>
                        {/* <div className="col-span-6">
                            <NumberInput control={control} name="" label="Kdv Tutar" />
                        </div> */}
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <DriverSelectInput control={control} />
                        </div>
                        <div className="col-span-6">
                            <MaterialListSelect control={control} name="yakitTipi" label="Yakıt Tipi" type="YAKIT" />
                        </div>
                        <div className="col-span-6">
                            <TextInput control={control} name="faturaNO" label="Evrak No" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="istasyon" label="Evrak Tarihi" />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <SelectInput control={control} name="" label="Yakıt Tankı" />
                        </div>
                        <div className="col-span-6 flex flex-col">
                            <label htmlFor="">Stoktan Kullanım</label>
                            <Controller
                                name=""
                                control={control}
                                render={({ field }) => <Checkbox {...field} checked={field.value} />}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralInfo
