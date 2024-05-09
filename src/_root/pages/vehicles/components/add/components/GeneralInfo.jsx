import TextInput from "../../../../../components/form/TextInput"
import NumberInput from "../../../../../components/form/NumberInput"
import SelectInput from "../../../../../components/form/SelectInput"
import LocationTreeSelect from "../../../../../components/form/LocationTreeSelect"
import MarkaSelectInput from "../../../../../components/form/MarkaSelectInput"
import ModelSelectInput from "../../../../../components/form/ModelSelectInput"
import DriverSelectInput from "../../../../../components/form/DriverSelectInput"
import MaterialListSelect from "../../../../../components/form/MaterialListSelect"
import DateInput from "../../../../../components/form/DateInput"


const GeneralInfo = ({ control, setValue }) => {
    return (
        <>
            <div className="grid grid-cols-12 gap-1 border">
                <div className="col-span-8 p-10">
                    <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-4">
                            <TextInput control={control} name="plaka" label="Plaka" />
                        </div>
                        <div className="col-span-4">
                            <SelectInput control={control} name="aracTipi" label="Araç Tipi" selectID="100" setValue={setValue}/>
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="guncelKm" label="Güncel Km." />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-10">
                    <LocationTreeSelect control={control} />
                </div>
            </div>
            <div className="grid grid-cols-12 gap-1 mt-10">
                <div className="col-span-8 border p-10">
                    <h3 className="sub-title">Araç Bilgileri</h3>
                    <div className="grid grid-cols-12 gap-1">
                        <div className="col-span-4">
                            <MarkaSelectInput control={control} />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="modelYili" label="Model Yılı" />
                        </div>
                        <div className="col-span-4">
                            <ModelSelectInput control={control} setValue={setValue}/>
                        </div>
                        <div className="col-span-4">
                            <SelectInput control={control} name="aracGrup" label="Araç Grup" selectID="101" />
                        </div>
                        <div className="col-span-4">
                            <SelectInput control={control} name="aracCinsi" label="Araç Cinsi" />
                        </div>
                        <div className="col-span-4">
                            <SelectInput control={control} name="renk" label="Renk" selectID="111" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="mulkiyet" label="Mülkiyet" />
                        </div>
                        <div className="col-span-4">
                            <SelectInput control={control} name="departman" label="Departman" selectID="200" />
                        </div>
                        <div className="col-span-4">
                            <DriverSelectInput control={control} />
                        </div>
                        <div className="col-span-4">
                            <MaterialListSelect control={control} name="yakitTipi" label="Yakıt Tipi" type="YAKIT" />
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border p-10">
                    <h3 className="sub-title">Yenilenme Tarihleri</h3>
                    <div className="grid grid-cols-12 gap-1 mt-10">
                        <div className="col-span-6">
                            <DateInput control={control} name="muayeneTarih" label="Muayene Tarihi" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="sozlesmeTarih" label="Sözleşme" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="egzozEmisyon" label="Egzoz Emisyon" />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="vergiTarih" label="Vergi" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GeneralInfo
