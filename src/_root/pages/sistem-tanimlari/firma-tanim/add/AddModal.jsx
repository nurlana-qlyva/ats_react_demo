import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { CodeItemValidateService } from "../../../../../api/service";
import PersonalFields from "../../../../components/form/PersonalFields";
import GeneralInfo from "./GeneralInfo";
import { AddFirmaService, GetFirmaCodeService } from "../../../../../api/services/firma_services";
import Iletisim from "./Iletisim";

const AddModal = ({ setStatus }) => {
    const [openModal, setopenModal] = useState(false);
    const [isValid, setIsValid] = useState("normal");
    const isFirstRender = useRef(true);

    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: `${t("ozelAlan")} 1`,
            type: 'text'
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: `${t("ozelAlan")} 2`,
            type: 'text'
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: `${t("ozelAlan")} 3`,
            type: 'text'
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: `${t("ozelAlan")} 4`,
            type: 'text'
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: `${t("ozelAlan")} 5`,
            type: 'text'
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: `${t("ozelAlan")} 6`,
            type: 'text'
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: `${t("ozelAlan")} 7`,
            type: 'text'
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: `${t("ozelAlan")} 8`,
            type: 'text'
        },
        {
            label: "ozelAlan9",
            key: "OZELALAN_9",
            value: `${t("ozelAlan")} 9`,
            type: 'select',
            code: 865,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: `${t("ozelAlan")} 10`,
            type: 'select',
            code: 866,
            name2: "ozelAlanKodId10"
        },
        {
            label: "ozelAlan11",
            key: "OZELALAN_11",
            value: `${t("ozelAlan")} 11`,
            type: 'number'
        },
        {
            label: "ozelAlan12",
            key: "OZELALAN_12",
            value: `${t("ozelAlan")} 12`,
            type: 'number'
        },
    ])

    const defaultValues = {};
    const methods = useForm({
        defaultValues: defaultValues,
    });
    const { handleSubmit, reset, setValue, watch } = methods;

    useEffect(() => {
        if (openModal && isFirstRender.current) {
            GetFirmaCodeService().then((res) => setValue("kod", res.data));
        }
    }, [openModal, setValue]);

    useEffect(() => {
        if (watch("kod")) {
            const body = {
                tableName: "FirmaTanimlari",
                code: watch("kod"),
            };
            CodeItemValidateService(body).then((res) => {
                !res.data.status ? setIsValid("success") : setIsValid("error");
            });
        }
    }, [watch("kod")]);


    const onSubmit = handleSubmit((values) => {
        const body = {
            "unvan": values.unvan,
            "kod": values.kod,
            "tel_1": values.tel_1,
            "tel_2": values.tel_2,
            "il": values.il,
            "ilce": values.ilce,
            "vno": values.vno,
            "vd": values.vd,
            "sektor": values.sektor,
            "terminSure": values.terminSure,
            "adres_1": values.adres_1,
            "ilgili_1": values.ilgili_1,
            "adres_2": values.adres_2,
            "ilgili_2": values.ilgili_2,
            "aciklama": values.aciklama,
            "firmaTipiKodId": values.firmaTipiKodId || -1,
            "borc": values.borc || 0,
            "alacak": values.alacak || 0,
            "bakiye": values.bakiye || 0,
            "indirimOran": values.indirimOran || 0,
            "tipServis": values.tipServis,
            "tipDiger": values.tipDiger,
            "tipMusteri": values.tipMusteri,
            "tipSigorta": values.tipSigorta,
            "tipAkaryakitIst": values.tipAkaryakitIst,
            "tipTedarikci": values.tipTedarikci,
            "tipKiralama": values.tipKiralama,
            "aktif": values.aktif,
            "email": values.email,
            "web": values.web,
            "fax": values.fax,
            "gsm": values.gsm
        }


        AddFirmaService(body).then(res => {
            if (res.data.statusCode === 200) {
                setStatus(true)
                reset(defaultValues)
                setopenModal(false)
            }
        })
        setStatus(false)

    })

    const personalProps = {
        form: "Firma",
        fields,
        setFields
    }

    const items = [
        {
            key: '1',
            label: t('genelBilgiler'),
            children: <GeneralInfo isValid={isValid} />,
        },
        {
            key: '2',
            label: t('iletisim'),
            children: <Iletisim />,
        },
        {
            key: '3',
            label: t('ozelAlanlar'),
            children: <PersonalFields personalProps={personalProps} />
        },
    ]

    const footer = [
        <Button
            key="submit"
            className="btn btn-min primary-btn"
            onClick={onSubmit}
        >
            {t("kaydet")}
        </Button>,
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => {
                setopenModal(false);
                reset(defaultValues)
            }}
        >
            {t("iptal")}
        </Button>,
    ];

    return (
        <>
            <Button className="btn primary-btn" onClick={() => setopenModal(true)}
                disabled={isValid === "error"
                    ? true
                    : isValid === "success"
                        ? false
                        : false}
            >
                <PlusOutlined /> {t("ekle")}
            </Button>
            <Modal
                title={t("yeniServisGirisi")}
                open={openModal}
                onCancel={() => setopenModal(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <FormProvider {...methods}>
                    <form>
                        <Tabs defaultActiveKey="1" items={items} />
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}

export default AddModal
