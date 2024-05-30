import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { withNamespaces } from 'react-i18next'
import { Button, Modal, Tabs } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { NewVehicleAddService } from '../../../../api/service'
import GeneralInfo from './GeneralInfo'
import PersonalFields from '../../../components/form/PersonalFields'

const AddModal = ({ setStatus, t }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: "Özel Alan 1",
            type: 'text'
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: "Özel Alan 2",
            type: 'text'
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: "Özel Alan 3",
            type: 'text'
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: "Özel Alan 4",
            type: 'text'
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: "Özel Alan 5",
            type: 'text'
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: "Özel Alan 6",
            type: 'text'
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: "Özel Alan 7",
            type: 'text'
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: "Özel Alan 8",
            type: 'text'
        },
        {
            label: "ozelAlan9",
            key: "OZELALAN_9",
            value: "Özel Alan 9",
            type: 'select',
            code: 865,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 866,
            name2: "ozelAlanKodId10"
        },
        {
            label: "ozelAlan11",
            key: "OZELALAN_11",
            value: "Özel Alan 11",
            type: 'number'
        },
        {
            label: "ozelAlan12",
            key: "OZELALAN_12",
            value: "Özel Alan 12",
            type: 'number'
        },
    ])

    const defaultValues = {
        plaka: "",
        aracTipId: null,
        guncelKm: "",
        markaId: null,
        modelId: null,
        yil: "",
        aracGrubuId: null,
        aracCinsi: null,
        aracRenkId: null,
        lokasyonId: null,
        mulkiyet: "",
        departmanId: null,
        surucuId: null,
        yakitTipId: null,
        muayeneTarih: "",
        sozlesmeTarih: "",
        egzosTarih: "",
        vergiTarih: "",
        ozelAlan1: "",
        ozelAlan2: "",
        ozelAlan3: "",
        ozelAlan4: "",
        ozelAlan5: "",
        ozelAlan6: "",
        ozelAlan7: "",
        ozelAlan8: "",
        ozelAlanKodId9: null,
        ozelAlanKodId10: null,
        ozelAlan11: null,
        ozelAlan12: null,
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { handleSubmit, reset } = methods


    const handleOk = handleSubmit(async (value) => {
        const kmLog = value.guncelKm ? {
            "plaka": value.plaka,
            "tarih": dayjs(new Date()).format("YYYY-MM-DD"),
            "saat": dayjs(new Date()).format("HH:mm"),
            "yeniKm": value.guncelKm,
            "dorse": false,
            "lokasyonId": value.lokasyonId
        } : null

        const data = {
            "plaka": value.plaka,
            "yil": value.yil || 0,
            "markaId": value.markaId || 0,
            "modelId": value.modelId || 0,
            "aracGrubuId": value.aracGrubuId || 0,
            "aracRenkId": value.aracRenkId || 0,
            "lokasyonId": value.lokasyonId || 0,
            "departmanId": value.departmanId || 0,
            "surucuId": value.surucuId || 0,
            "aracTipId": value.aracTipId || 0,
            "guncelKm": value.guncelKm || 0,
            "muayeneTarih": value.muayeneTarih ? dayjs(value.muayeneTarih).format("YYYY-MM-DD") : null,
            "egzosTarih": value.egzosTarih ? dayjs(value.egzosTarih).format("YYYY-MM-DD") : null,
            "vergiTarih": value.vergiTarih ? dayjs(value.vergiTarih).format("YYYY-MM-DD") : null,
            "sozlesmeTarih": value.sozlesmeTarih ? dayjs(value.sozlesmeTarih).format("YYYY-MM-DD") : null,
            "yakitTipId": value.yakitTipId || 0,
            kmLog: kmLog,
            ozelAlan1: value.ozelAlan1 || "",
            ozelAlan2: value.ozelAlan2 || "",
            ozelAlan3: value.ozelAlan3 || "",
            ozelAlan4: value.ozelAlan4 || "",
            ozelAlan5: value.ozelAlan5 || "",
            ozelAlan6: value.ozelAlan6 || "",
            ozelAlan7: value.ozelAlan7 || "",
            ozelAlan8: value.ozelAlan8 || "",
            ozelAlanKodId9: value.ozelAlanKodId9 || 0,
            ozelAlanKodId10: value.ozelAlanKodId10 || 0,
            ozelAlan11: value.ozelAlan11 || 0,
            ozelAlan12: value.ozelAlan12 || 0,
        }
        NewVehicleAddService(data).then(res => {
            if (res?.data.statusCode === 201) {
                setIsModalOpen(false)
                setStatus(true)
                reset()
            }
        })
    })

    const personalProps = {
        form: "Arac",
        fields,
        setFields
    }

    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <PersonalFields personalProps={personalProps} />
        },
    ]

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={handleOk}>
                Kaydet
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => setIsModalOpen(false)}>
                İptal
            </Button>
        ]
    )

    return (
        <div>
            <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}><PlusOutlined /> {t('ekle')}</Button>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)} maskClosable={false} footer={footer} width={1200}>
                <FormProvider {...methods}>
                    <form>
                        <Tabs defaultActiveKey="1" items={items} />
                    </form>
                </FormProvider>
            </Modal>
        </div>
    )
}

AddModal.propTypes = {
    setStatus: PropTypes.func,
    data: PropTypes.array,
}

export default withNamespaces()(AddModal)
