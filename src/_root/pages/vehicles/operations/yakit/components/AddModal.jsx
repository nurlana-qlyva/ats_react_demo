import { Button, Modal, Tabs } from 'antd'
import { useEffect, useState } from 'react'
import GeneralInfo from './GeneralInfo';
import SpecialFields from '../../../../../components/form/SpecialFields';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { YakitHistoryGetService } from '../../../../../../api/service';


const AddModal = ({ ids, data }) => {
    const [openModal, setopenModal] = useState(false);
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
        "aracId": 0,
        "plaka": '',
        "tarih": null,
        "saat": "",
        "alinanKm": 0,
        "miktar": 0,
        "fullDepo": false,
        "ozelKullanim": false,
        "stokKullanimi": false,
        "litreFiyat": 0,
        "tutar": 0,
        "yakitTanki": 0,
        "yakitTipi": 0,
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    const onCloseModal = () => {
        setopenModal(false)
    }

    const onSubmit = handleSubmit((values) => {
        console.log(values)

        const body = {
            "aracId": 0,
            "plaka": values.plaka,
            "tarih": dayjs(values.tarih).format("YYYY-MM-DD"),
            "faturaTarih": dayjs(values.faturaTarih).format("YYYY-MM-DD"),
            "saat": dayjs(values.saat).format("HH:mm:ss"),
            "seferSiraNo": values.seferSiraNo,
            "lokasyonId": values.lokasyon,
            "surucuId": values.surucu,
            "yakitTipId": values.yakitTipi,
            "guzergahId": values.guzergah,
            "istasyonKodId": values.istasyon,
            "firmaId": values.firma,
            "faturaNo": values.faturaNo,
            "aciklama": values.aciklama,
            "sonAlinanKm": values.sonAlinanKm,
            "farkKm": values.farkKm,
            "tuketim": values.tuketim,
            "alinanKm": values.alinanKm,
            "miktar": values.miktar,
            "fullDepo": values.fullDepo,
            "ozelKullanim": values.ozelKullanim,
            "stokKullanimi": values.stokKullanimi,
            "litreFiyat": values.litreFiyat,
            "tutar": values.tutar,
            "yakitTanki": values.yakitTanki,
        }
    })

    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo control={control} setValue={setValue} data={data} />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <SpecialFields form="" control={control} setValue={setValue} fields={fields} setFields={setFields} />,
        }
    ];

    const footer = (
        [
            <Button key="submit" className="btn primary-btn" onClick={onSubmit}>
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onCloseModal}>
                İptal
            </Button>
        ]
    )

    return (
        <>
            <Button className='mb-10 primary-btn' onClick={() => setopenModal(true)}>Yenisini Ekle</Button>
            <Modal
                title="Yeni Yakıt Girişi"
                open={openModal}
                onCancel={onCloseModal}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
        </>
    )
}

export default AddModal
