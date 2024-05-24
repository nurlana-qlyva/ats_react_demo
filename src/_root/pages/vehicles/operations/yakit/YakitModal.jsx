import { Modal, Button, Table, Tabs, message, Checkbox } from 'antd';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import SpecialFields from '../../../../components/form/SpecialFields';
import FileUpload from '../../../../components/form/FileUpload';
import { upload } from '../../../../../utils/upload';
import { YakitGetByIdService, YakitHistoryGetService } from '../../../../../api/service';
import GeneralInfoUpdate from './components/GeneralInfoUpdate';
import AddModal from './components/AddModal';



const YakitModal = ({ visible, onClose, ids }) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false);
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
    const [plaka, setPlaka] = useState("")
    const [selectedRow, setSelectedRow] = useState([]);

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
            title: "",
            key: "selection",
            render: (text, record) => (
                <Checkbox
                    onChange={(e) => handleCheckboxChange(e, record)}
                />
            ),
        },
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
            dataIndex: 'yakitTip',
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
            dataIndex: 'sonAlinanKm',
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
            dataIndex: 'surucuAdi',
            key: 15,
        },
        {
            title: 'Açıklama',
            dataIndex: 'aciklama',
            key: 16,
        }
    ];

    const handleCheckboxChange = (e, record) => {
        if (e.target.checked) {
            setSelectedRow(record);
        }
    };

    const defaultValues = {
        tarih: ''
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods
    useEffect(() => setVehicleId(ids), [ids])
    useEffect(() => {
        ids.map(id => {
            return YakitGetByIdService(id, tableParams?.pagination.current).then(res => {
                setDataSource(res?.data.fuel_list)
                setPlaka(res?.data.plaka)
                setValue('tarih', res?.data.tarih)
                setValue('sonAlinanKm', res?.data.sonAlinanKm)
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

    useEffect(() => {
        YakitHistoryGetService(vehicleId).then(res => console.log(res.data))
    }, [vehicleId])


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
            // setDrivers([]);
        }
    };

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

    const updateModalFooter = (
        [
            <Button key="submit" className="btn primary-btn">
                Güncelle
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onCloseUpdateModal}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title={`Yakıt Bilgileri Plaka: ${plaka}`}
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <AddModal ids={ids} data={selectedRow} />
            <Modal
                title="Yakıt Bilgisi Güncelle"
                open={updateModal}
                onCancel={onCloseUpdateModal}
                maskClosable={false}
                footer={updateModalFooter}
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
