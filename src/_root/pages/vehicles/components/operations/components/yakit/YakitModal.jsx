import { Modal, Button, Table, Tabs, message } from 'antd';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SpecialFields from '../../../../../../components/form/SpecialFields';
import GeneralInfo from './components/GeneralInfo';
import FileUpload from '../../../../../../components/form/FileUpload';
import { upload } from '../../../../../../../utils/upload';
import { YakitGetByIdService } from '../../../../../../../api/service';
import GeneralInfoUpdate from './components/GeneralInfoUpdate';



const YakitModal = ({ visible, onClose, ids }) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false);
    const [newModal, setNewModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [filesUrl, setFilesUrl] = useState([]);
    const [files, setFiles] = useState([]);
    const [loadingFiles, setLoadingFiles] = useState(false);
    const [vehicleId, setVehicleId] = useState(0)

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

    const columns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
            key: 1,
            render: (text, record) => <Button onClick={() => setUpdateModal(true)}>{text}</Button>
        },
        {
            title: 'Tarih',
            dataIndex: 'tarih',
            key: 2,
        },
        {
            title: 'Saat',
            dataIndex: 'saat',
            key: 3,
        },
        {
            title: 'Yakıt Tipi',
            dataIndex: 'yktTip',
            key: 4,
        },
        {
            title: 'Miktar',
            dataIndex: 'miktar',
            key: 5,
        },
        {
            title: 'Tutar',
            dataIndex: 'tutar',
            key: 6,
        },
        {
            title: 'Son KM.',
            dataIndex: 'sonKm',
            key: 7,
        },
        {
            title: 'Alınan KM.',
            dataIndex: 'alinanKm',
            key: 8,
        },
        {
            title: 'Fark KM.',
            dataIndex: 'farkKm',
            key: 9,
        },
        {
            title: 'Tüketim',
            dataIndex: 'tuketim',
            key: 10,
        },
        {
            title: 'İstasyon',
            dataIndex: 'istasyon',
            key: 11,
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyon',
            key: 13,
        },
        {
            title: 'Fatura No',
            dataIndex: 'faturaNo',
            key: 14,
        },
        {
            title: 'Sürücü Adı',
            dataIndex: 'surucu',
            key: 15,
        },
        {
            title: 'Açıklama',
            dataIndex: 'aciklama',
            key: 16,
        }
    ];

    const defaultValues = {

    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods
    useEffect(() => setVehicleId(ids), [ids])
    useEffect(() => {
        ids.map(id => {
            return YakitGetByIdService(id, tableParams?.pagination.current).then(res => {
                console.log(res.data)
                setDataSource(res?.data.km_list)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.total_count,
                    },
                });
            })
        })

    }, [vehicleId, tableParams.pagination.current])


    const handleTableChange = (pagination, filters, sorter) => {
        // VehiclesReadForPageService(search, pagination.current).then(res => {
        //     setVehiclesData(res.data.vehicleList)
        // })
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDrivers([]);
        }
    };

    const onCloseAddModal = () => {
        setNewModal(false)
    }

    const onCloseUpdateModal = () => {
        setUpdateModal(false)
    }

    const uploadFiles = async () => {
        try {
            setLoadingFiles(true);
            const data = upload(id, "Arac", files)
        } catch (error) {
            message.error("Dosya yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingFiles(false);
        }
    }

    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo control={control} setValue={setValue} />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <SpecialFields form="" control={control} setValue={setValue} fields={fields} setFields={setFields} />,
        },
        {
            key: '3',
            label: `[${filesUrl.length}] Ekli Belgeler`,
            children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />,
        },
    ];

    const itemsUpdate = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfoUpdate control={control} setValue={setValue} />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <SpecialFields form="" control={control} setValue={setValue} fields={fields} setFields={setFields} />,
        },
        {
            key: '3',
            label: `[${filesUrl.length}] Ekli Belgeler`,
            children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />,
        },
    ];

    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    const addModalFooter = (
        [
            <Button key="submit" className="btn primary-btn">
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onCloseAddModal}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title="Yakıt Bilgileri Plaka: [16 EG 1231 [BMW - X6]]"
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <Button className='mb-10 primary-btn' onClick={() => setNewModal(true)}>Yenisini Ekle</Button>
            <Modal
                title="Yakıt Bilgisi Ekle"
                open={newModal}
                onCancel={onCloseAddModal}
                maskClosable={false}
                footer={addModalFooter}
                width={1200}
            >
                <Tabs defaultActiveKey="1" items={items} />
            </Modal>
            <Modal
                title="Yakıt Bilgisi Güncelle"
                open={newModal}
                onCancel={onCloseUpdateModal}
                maskClosable={false}
                footer={addModalFooter}
                width={1200}
            >
                <Tabs defaultActiveKey="1" items={itemsUpdate} />
            </Modal>
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={tableParams.pagination}
                loading={loading}
                size="small"
                onChange={handleTableChange}
                scroll={{
                    x: 1500,
                }}
            />
        </Modal>
    );
};

export default YakitModal;
