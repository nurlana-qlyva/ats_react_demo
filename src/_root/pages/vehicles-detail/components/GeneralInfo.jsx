import TextInput from "../../../components/form/TextInput"
import SelectInput from "../../../components/form/SelectInput"
import DateInput from "../../../components/form/DateInput"
import { Checkbox, Input, Radio } from "antd"
import { Controller } from "react-hook-form"
import NumberInput from "../../../components/form/NumberInput"


const GeneralInfo = ({ control, setValue }) => {
    return (
        <div className="grid grid-cols-12 gap-1 mt-10">
            <div className="col-span-8">
                <div className="border p-10 mb-10">
                    <h3 className="sub-title">Araç Bilgileri</h3>
                    <div className="grid gap-1">
                        <div className="col-span-3">
                            <NumberInput control={control} name="yil" label="Model Yılı" />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="grup" label="Araç Grup" selectID="101" setValue={setValue} name2="aracGrubuId" />
                            <Controller
                                name="aracGrubuId"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        style={{ display: 'none' }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="aracCinsi" label="Araç Cinsi" setValue={setValue} name2="aracCinsId" />
                            <Controller
                                name="aracCinsId"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        style={{ display: 'none' }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="mulkiyet" label="Mülkiyet" />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="departman" label="Departman" selectID="200" setValue={setValue} name2="departmanId" />
                            <Controller
                                name="departmanId"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        style={{ display: 'none' }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="proje" label="Proje" />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="masrafMerkezi" label="Masraf Merkezi" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} name="havuzGrup" label="Havuz" />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} name="kullanimAmaci" label="Kullanım Amacı" />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} label="Durum" name="durum" selectID="122" setValue={setValue} name2="durumKodId" />
                            <Controller
                                name="durumKodId"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        style={{ display: 'none' }}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} label="Bağlı Araç" name="bagliArac" />
                        </div>
                        <div className="col-span-3">
                            <SelectInput control={control} label="HGS" name="hgs" />
                        </div>
                        <div className="col-span-3">
                            <TextInput control={control} label="TTS" name="tts" />
                        </div>
                    </div>
                </div>
                <div className="border p-10">
                    <h3 className="sub-title">Yakıt Tüketim Kontrol</h3>
                    <div className="grid gap-1">
                        <div className="col-span-3">
                            <NumberInput control={control} name="onGorulenMin" label="Min. Yakıt Tüketimi" />
                        </div>
                        <div className="col-span-3">
                            <NumberInput control={control} name="onGorulen" label="Maks. Yakıt Tüketimi" />
                        </div>
                        <div className="col-span-3">
                            <NumberInput control={control} name="gerceklesen" label="Gerçek Yakıt Tüketimi" />
                        </div>
                        <div className="col-span-3 flex flex-col">
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
            <div className="col-span-4">
                <div className="border p-10 mb-10">
                    <h3 className="sub-title">Yenilenme Tarihleri</h3>
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-6">
                            <DateInput control={control} name="muayeneTarih" label="Muayene Tarihi" setValue={setValue} />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="sozlesmeTarih" label="Sözleşme" setValue={setValue} />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="egzosTarih" label="Egzoz Emisyon" setValue={setValue} />
                        </div>
                        <div className="col-span-6">
                            <DateInput control={control} name="vergiTarih" label="Vergi" setValue={setValue} />
                        </div>
                    </div>
                </div>
                <div className="border p-10 mb-10">
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-6">
                            <SelectInput control={control} name="muayeneTarih" label="Araç Sorumlusu" />
                        </div>
                        <div className="col-span-6">
                            <SelectInput control={control} name="sozlesmeTarih" label="Anahtar Kodu" />
                        </div>
                        <div className="col-span-6">
                            <SelectInput control={control} name="egzozEmisyon" label="Yedek Anahtar" />
                        </div>
                    </div>
                </div>
                <div className="border p-10">
                    <Radio.Group>
                        <Radio value={1}>Aktif</Radio>
                        <Radio value={2}>Pasif</Radio>
                        <Radio value={3}>Arşiv</Radio>
                    </Radio.Group>
                </div>
            </div>
        </div>
    )
}

export default GeneralInfo
