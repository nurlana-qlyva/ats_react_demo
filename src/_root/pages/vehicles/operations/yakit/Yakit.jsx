import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Modal, Button, Table, Tabs, message, Checkbox } from 'antd'
import { YakitGetByIdService } from '../../../../../api/service'
import AddModal from './add/AddModal'

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
            // render: (text, record) => <Button onClick={() => setUpdateModal(true)}>{text}</Button>
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
            {/* <Modal
                title="Yakıt Bilgisi Güncelle"
                open={updateModal}
                onCancel={onCloseUpdateModal}
                maskClosable={false}
                footer={updateModalFooter}
                width={1200}
            >
                <Tabs defaultActiveKey="1" items={itemsUpdate} />
            </Modal> */}
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
