import dayjs from 'dayjs'
import 'dayjs/locale/tr'
import { Radio } from 'antd'
import NumberInput from "../../../../components/form/inputs/NumberInput"
import CodeControl from '../../../../components/form/selects/CodeControl'
import TextInput from '../../../../components/form/inputs/TextInput'
import CheckboxInput from '../../../../components/form/checkbox/CheckboxInput'
import DateInput from '../../../../components/form/date/DateInput'

dayjs.locale('tr')

const GeneralInfo = () => {
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
                                    <NumberInput name="yil" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="aracGrubuId">Araç Grup</label>
                                    <CodeControl name="grup" codeName="aracGrubuId" id={101} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Araç Cinsi</label>
                                    <CodeControl name="aracCinsi" codeName="aracCinsiKodId" id={107} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="">Mülkiyet</label>
                                    <TextInput name="mulkiyet" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="departmanId">Departman</label>
                                    <CodeControl name="departman" codeName="departmanId" id={200} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Proje -- ?</label>
                                    <TextInput name="" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Masraf Merkezi -- ?</label>
                                    <TextInput name="" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Havuz</label>
                                    <TextInput name="havuzGrup" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Kullanım Amacı -- ?</label>
                                    <TextInput name="" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Durum</label>
                                    <CodeControl name="durum" codeName="durumKodId" id={122} />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Bağlı Araç -- ?</label>
                                    <TextInput name="" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>HGS -- ?</label>
                                    <TextInput name="" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>TTS</label>
                                    <TextInput name="tts" />
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
                                    <NumberInput name="onGorulenMin" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Maks. Yakıt Tüketimi</label>
                                    <NumberInput name="onGorulen" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col gap-1">
                                    <label>Gerçek Yakıt Tüketimi</label>
                                    <NumberInput name="gerceklesen" />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <div className="flex flex-col">
                                    <label htmlFor="uyari">Uyarı</label>
                                    <CheckboxInput name="uyari" />
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
                                    <DateInput name="muayeneTarih" />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="sozlesmeTarih">Sözleşme</label>
                                    <DateInput name="sozlesmeTarih" />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="egzosTarih">Egzoz Emisyon</label>
                                    <DateInput name="egzosTarih" />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="vergiTarih">Vergi</label>
                                    <DateInput name="vergiTarih" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="border p-10 mt-10">
                        <div className="grid gap-1 mt-10">
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label >Araç Sorumlusu -- ?</label>
                                    <TextInput name="" />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>Anahtar Kodu -- ?</label>
                                    <TextInput name="" />
                                </div>
                            </div>
                            <div className="col-span-6">
                                <div className="flex flex-col gap-1">
                                    <label>Yedek Anahtar -- ?</label>
                                    <TextInput name="" />
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
