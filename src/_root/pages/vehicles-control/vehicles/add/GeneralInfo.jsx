import PropTypes from 'prop-types'
import { t } from 'i18next'
import TextInput from '../../../../components/form/inputs/TextInput'
import CodeControl from '../../../../components/form/selects/CodeControl'
import NumberInput from '../../../../components/form/inputs/NumberInput'
import Location from '../../../../components/form/tree/Location'
import Marka from '../../../../components/form/selects/Marka'
import Model from '../../../../components/form/selects/Model'
import Driver from '../../../../components/form/selects/Driver'
import MaterialType from '../../../../components/form/selects/MaterialType'
import DateInput from '../../../../components/form/date/DateInput'

const GeneralInfo = ({ isValid }) => {
    const validateStyle = {
        borderColor: isValid === "error" ? "#dc3545" :
            isValid === "success" ? "#23b545" :
                "#000",
    };

    return (
        <>
            <div className="grid gap-1 border">
                <div className="col-span-8 p-10">
                    <div className="grid gap-1">
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("plaka")}</label>
                                <TextInput name="plaka" style={validateStyle} />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("aracTip")}</label>
                                <CodeControl name="aracTip" codeName="aracTipId" id={100} />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("guncelKm")}</label>
                                <NumberInput name="guncelKm" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 p-10">
                    <div className="flex flex-col gap-1">
                        <label>{t("lokasyon")}</label>
                        <Location />
                    </div>
                </div>
            </div>

            <div className="grid gap-1 mt-10">
                <div className="col-span-8 border p-10">
                    <h3 className="sub-title">{t("aracBilgileri")}</h3>
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("marka")}</label>
                                <Marka />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("model")}</label>
                                <Model />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("yil")}</label>
                                <NumberInput name="yil" />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("aracGrup")}</label>
                                <CodeControl name="grup" codeName="aracGrubuId" id={101} />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("aracCinsi")}</label>
                                <CodeControl name="AracCinsi" codeName="AracCinsiKodId" id={107} />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("renk")}</label>
                                <CodeControl name="renk" codeName="aracRenkId" id={111} />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("mulkiyet")} -- ?</label>
                                <TextInput name="mulkiyet" readonly={true} />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("departman")}</label>
                                <CodeControl name="departman" codeName="departmanId" id={200} />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("surucu")}</label>
                                <Driver />
                            </div>
                        </div>
                        <div className="col-span-4">
                            <div className="flex flex-col gap-1">
                                <label>{t("yakitTip")}</label>
                                <MaterialType name="yakitTip" codeName="yakitTipId" type="YAKIT" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-span-4 border p-10">
                    <h3 className="sub-title">{t("yenilenmeTarihleri")}</h3>
                    <div className="grid gap-1 mt-10">
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>{t("muayeneTarihi")}</label>
                                <DateInput name="muayeneTarih" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>{t("sozlesmeTarihi")}</label>
                                <DateInput name="sozlesmeTarih" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>{t("egzozTarihi")}</label>
                                <DateInput name="egzosTarih" />
                            </div>
                        </div>
                        <div className="col-span-6">
                            <div className="flex flex-col gap-1">
                                <label className='text-info'>{t("vergiTarihi")}</label>
                                <DateInput name="vergiTarih" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

GeneralInfo.propTypes = {
    isValid: PropTypes.string,
}

export default GeneralInfo;
