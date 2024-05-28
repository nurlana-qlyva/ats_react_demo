import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Modal, Button, Table, Tabs, message, Checkbox } from 'antd'
import { YakitGetByIdService } from '../../../../../api/service'
import { upload } from '../../../../../utils/upload'
import AddModal from './add/AddModal'
import GeneralInfo from './update/GeneralInfo'
import PersonalFields from '../../../../components/form/PersonalFields'
import PhotoUpload from '../../../../components/upload/PhotoUpload'
import FileUpload from '../../../../components/upload/FileUpload'

const Yakit = ({ visible, onClose, ids }) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [selectedRow, setSelectedRow] = useState([])
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    })
    const [vehicleIds, setVehicleIds] = useState(0)
    const [updateModal, setUpdateModal] = useState(false)
    // file
    const [filesUrl, setFilesUrl] = useState([])
    const [files, setFiles] = useState([])
    const [loadingFiles, setLoadingFiles] = useState(false)
    // photo
    const [imageUrls, setImageUrls] = useState([])
    const [loadingImages, setLoadingImages] = useState(false)
    const [images, setImages] = useState([])

    const defaultValues = {
        aracId: 0
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    useEffect(() => setVehicleIds(ids), [ids])
    useEffect(() => {
        ids.map(id => {
            return YakitGetByIdService(id, tableParams?.pagination.current).then(res => {
                setDataSource(res?.data.fuel_list)
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total: res?.data.total_count,
                    },
                });
            })
        })

    }, [vehicleIds, tableParams.pagination.current])

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
        // {
        //     title: 'Saat',
        //     dataIndex: 'saat',
        //     key: 3,
        // },
        {
            title: 'Yakıt Tipi',
            dataIndex: 'yakitTip',
            key: 3,
        },
        {
            title: 'Alınan KM.',
            dataIndex: 'alinanKm',
            key: 4,
        },
        {
            title: 'Kullanım',
            dataIndex: 'ozelKullanim',
            key: 5,
            render: (text, record) => <Checkbox checked={record.ozelKullanim} readOnly />
        },
        {
            title: 'Miktar',
            dataIndex: 'miktar',
            key: 6,
            render: (text, record) => <div className=''>
                <span>{text} </span>
                <span style={{ fontSize: '12px', color: 'rgb(147 147 147)' }}>{record.birim === "LITRE" && 'lt'}</span>
            </div>
        },
        {
            title: 'Tutar',
            dataIndex: 'tutar',
            key: 7,
        },
        {
            title: 'Ortalama Tüketim',
            dataIndex: 'tuketim',
            key: 8,
        },
        {
            title: 'Km Başına Maliyet',
            dataIndex: '',
            key: 9,
        },
        {
            title: 'Full Depo',
            dataIndex: 'tuketim',
            key: 10,
            render: (text, record) => <Checkbox checked={record.fullDepo} readOnly />
        },
        {
            title: 'Stoktan Kullanım',
            dataIndex: 'stokKullanimi',
            key: 11,
            render: (text, record) => <Checkbox checked={record.stokKullanimi} readOnly />
        },
        {
            title: 'Sürücü',
            dataIndex: 'surucuAdi',
            key: 12,
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyon',
            key: 13,
        },
        {
            title: 'İstasyon',
            dataIndex: 'istasyon',
            key: 14,
        },
        {
            title: 'Açıklama',
            dataIndex: 'aciklama',
            key: 15,
        }
    ]

    const handleCheckboxChange = (e, record) => {
        if (e.target.checked) {
            setSelectedRow(record)
        }
    }

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            console.log(1)
        }
    }

    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

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
            code: 867,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 868,
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

    const personalProps = {
        form: "",
        fields,
        setFields
    }

    const uploadImages = () => {
        try {
            setLoadingImages(true);
            // const data = upload(id, "Arac", images)
            // setImageUrls([...imageUrls, data.imageUrl]);
        } catch (error) {
            message.error("Resim yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingImages(false);
        }
    }

    const uploadFiles = () => {
        try {
            setLoadingFiles(true);
            // upload(id, "Arac", files)
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
            children: <GeneralInfo />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <PersonalFields personalProps={personalProps} />
        },
        {
            key: '3',
            label: `[${imageUrls.length}] Resimler`,
            children: <PhotoUpload imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />
        },
        {
            key: '4',
            label: `[${filesUrl.length}] Ekli Belgeler`,
            children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />
        },
    ]

    const updateModalFooter = (
        [
            <Button key="submit" className="btn btn-min primary-btn">
                Güncelle
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => setUpdateModal(false)}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title={`Yakıt Bilgileri Plaka: []`}
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <AddModal data={selectedRow} />
            <Modal
                title="Yakıt Bilgisi Güncelle"
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
                maskClosable={false}
                footer={updateModalFooter}
                width={1200}
            >
                <FormProvider {...methods}>
                    <Tabs defaultActiveKey="1" items={itemsUpdate} />
                </FormProvider>
            </Modal>
            <p className="count">[ {tableParams?.pagination.total} kayıt ]</p>
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
    )
}

export default Yakit
