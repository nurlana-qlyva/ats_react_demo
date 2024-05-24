import { useState } from 'react'
import { useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button, Modal, Tabs } from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import GeneralInfo from './components/GeneralInfo'
import SpecialFields from '../../../components/form/SpecialFields'
import { formatDate } from '../../../../utils/format'
import { NewVehicleAddService } from '../../../../api/service'

const AddModal = ({ setStatus, data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        aracTipi: null,
        guncelKm: "",
        marka: null,
        model: null,
        modelYili: "",
        aracGrup: null,
        aracCinsi: null,
        renk: null,
        lokasyon: null,
        mulkiyet: "",
        departman: null,
        surucu: null,
        yakitTipi: null,
        muayeneTarih: "",
        sozlesmeTarih: "",
        egzozEmisyon: "",
        vergiTarih: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods


    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo control={control} setValue={setValue} />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <SpecialFields form="Arac" control={control} data={data} fields={fields} setFields={setFields} />,
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = handleSubmit(async (value) => {
        const data = {
            "plaka": value.plaka,
            "yil": value.modelYili,
            "markaId": value.marka || 0,
            "modelId": value.model || 0,
            "aracGrubuId": value.aracGrub || 0,
            "aracRenkId": value.renk || 0,
            "lokasyonId": +value.lokasyon,
            "departmanId": value.departman || 0,
            "surucuId": value.surucu || 0,
            "aracTipId": value.aracTipi || 0,
            "guncelKm": value.guncelKm,
            "muayeneTarih": formatDate(value?.muayeneTarih.$d) || "",
            "egzosTarih": formatDate(value?.egzozEmisyon.$d) || "",
            "vergiTarih": formatDate(value?.vergiTarih.$d) || "",
            "sozlesmeTarih": formatDate(value?.sozlesmeTarih.$d) || "",
            "yakitTipId": value?.yakitTipi || 0,
        }

        NewVehicleAddService(data).then(res => {
            if (res?.data.statusCode === 201) {
                setIsModalOpen(false);
                setStatus(true)
                reset();
            }
        })
    })

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = () => {
        // console.log(key);
    };

    const footer = (
        [
            <Button key="submit" className="btn primary-btn" onClick={handleOk}>
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={handleCancel}>
                İptal
            </Button>
        ]
    )

    return (
        <div>
            <Button className="primary-btn" onClick={showModal}><PlusOutlined /> Ekle</Button>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false} footer={footer} width={1000}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Modal>
        </div>
    )
}

AddModal.propTypes ={
    setStatus: PropTypes.func,
    data: PropTypes.array,
}

export default AddModal
