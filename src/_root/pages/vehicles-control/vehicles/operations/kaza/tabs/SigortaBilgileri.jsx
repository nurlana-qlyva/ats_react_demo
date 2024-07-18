import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { t } from 'i18next'
import { Button, Modal } from 'antd'
import CheckboxInput from '../../../../../../components/form/checkbox/CheckboxInput'
import TextInput from '../../../../../../components/form/inputs/TextInput'
import SigortaList from './SigortaList'

const SigortaBilgileri = () => {
    const { watch, setValue } = useFormContext()
    const [open, setOpen] = useState(false);
    const [sigorta, setSigorta] = useState(false);

    const footer = [
        <Button
            key="submit"
            className="btn btn-min primary-btn"
            onClick={() => {
                setValue("sigorta", sigorta[0].sigorta);
                setValue("policeNo", sigorta[0].policeNo);
                setValue("firma", sigorta[0].firma);
                setValue("sigortaKodId", sigorta[0].siraNo);
                setOpen(false);
            }}
        >
            {t("ekle")}
        </Button>,
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => setOpen(false)}
        >
            {t("iptal")}
        </Button>,
    ];

    return (
        <>
            <h2><CheckboxInput name="sigortaBilgisiVar" /> {t("sigortaBilgileri")}</h2>
            <div className="grid gap-1 p-20 border mt-10">
                <div className="col-span-3">
                    <div className="grid gap-1">
                        <div className="col-span-10">
                            <div className="flex flex-col gap-1">
                                <label>{t("sigortaPolicesi")}</label>
                                <TextInput name="sigorta" readonly={true} />
                            </div>
                        </div>
                        <div className="col-span-2 self-end">
                            <Button onClick={() => setOpen(true)} disabled={!watch("sigortaBilgisiVar")}>...</Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("policeNo")}</label>
                        <TextInput name="policeNo" readonly={true} />
                    </div>
                </div>
                <div className="col-span-3">
                    <div className="flex flex-col gap-1">
                        <label>{t("firma")}</label>
                        <TextInput name="firma" readonly={true} />
                    </div>
                </div>
            </div>

            <Modal
                title={t("sigortalar")}
                open={open}
                onCancel={() => setOpen(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <SigortaList setSigorta={setSigorta} open={open} />
            </Modal>
        </>
    )
}

export default SigortaBilgileri
