import { Controller, useFormContext } from 'react-hook-form'
import { t } from 'i18next'
import { Checkbox, Input, InputNumber } from 'antd'
import FirmaTip from '../../../../components/form/FirmaTip'
import Location from '../../../../components/form/tree/Location'
import Textarea from '../../../../components/form/inputs/Textarea'

const GeneralInfo = ({ isValid }) => {
    const { control } = useFormContext()

    return (
        <>
            <div className="grid gap-1 border">
                <div className="col-span-8 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("firmaKodu")}</label>
                                <Controller
                                    name="kod"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            style={
                                                isValid === "error"
                                                    ? { borderColor: "#dc3545" }
                                                    : isValid === "success"
                                                        ? { borderColor: "#23b545" }
                                                        : { color: "#000" }
                                            }
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
                                <label>{t("aktif")}</label>
                                <Controller
                                    name="aktif"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("unvan")}</label>
                                <Controller
                                    name="unvan"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className='w-full'
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
                                <label>{t("firmaTip")}</label>
                                <Controller
                                    name="firmaTipiKodId"
                                    control={control}
                                    render={({ field }) => (
                                        <FirmaTip field={field} />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("vergiDairesi")}</label>
                                <Controller
                                    name="vd"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className='w-full'
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
                                <label>{t("vergiNo")}</label>
                                <Controller
                                    name="vno"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className='w-full'
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
                                <label>{t("sektor")}</label>
                                <Controller
                                    name="sektor"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className='w-full'
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
                                <label>{t("terminSuresi")}</label>
                                <Controller
                                    name="terminSure"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            {...field}
                                            className='w-full'
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
                                <label>{t("indirimOran")}</label>
                                <Controller
                                    name="indirimOran"
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
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("lokasyon")}</label>
                                <Location />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("servisFirmasi")}</label>
                                <Controller
                                    name="tipServis"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("sigortaAcentesi")}</label>
                                <Controller
                                    name="tipSigorta"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("tedarikci")}</label>
                                <Controller
                                    name="tipTedarikci"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("akaryakitIstasyonu")}</label>
                                <Controller
                                    name="tipAkaryakitIst"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("musteri")}</label>
                                <Controller
                                    name="tipMusteri"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("aracKiralama")}</label>
                                <Controller
                                    name="tipKiralama"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label>{t("diger")}</label>
                                <Controller
                                    name="tipDiger"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            {...field}
                                            checked={field.value}
                                            onChange={(e) => {
                                                field.onChange(e.target.checked);
                                            }}
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 p-10">
                    <div className="flex flex-col gap-1">
                        <label>{t("aciklama")}</label>
                        <Textarea name="aciklama" />
                    </div>
                </div>
            </div>
        </>
    );
};

export default GeneralInfo;
