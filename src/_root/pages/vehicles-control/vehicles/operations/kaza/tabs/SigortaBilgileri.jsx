import { useFormContext } from 'react-hook-form'
import { t } from 'i18next'
import CheckboxInput from '../../../../../../components/form/checkbox/CheckboxInput'
import ReadonlyInput from '../../../../../../components/form/inputs/ReadonlyInput'
import CodeControl from '../../../../../../components/form/selects/CodeControl'

const SigortaBilgileri = () => {
    const { watch } = useFormContext()

    return (
        <>
            <h2><CheckboxInput name="sigortaBilgisiVar" /> {t("sigortaBilgileri")}</h2>
            <div className="grid gap-1 p-20 border mt-10">
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("sigortaPolicesi")}</label>
                        <CodeControl name="banka" codeName="bankaKodId" checked={!watch("sigortaBilgisiVar")} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("policeNo")}</label>
                        <ReadonlyInput name="policeNo" checked={true} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("firma")}</label>
                        <ReadonlyInput name="firma" checked={true} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SigortaBilgileri
