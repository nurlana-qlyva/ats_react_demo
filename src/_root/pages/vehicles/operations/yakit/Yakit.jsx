import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import dayjs from 'dayjs'
import { Modal, Button, Table, Checkbox } from 'antd'
import { PlakaContext } from '../../../../../context/plakaSlice'
import { YakitGetByIdService } from '../../../../../api/service'
import AddModal from './add/AddModal'
import UpdateModal from './update/UpdateModal'

const Yakit = ({ visible, onClose, ids }) => {
    const [dataSource, setDataSource] = useState([])
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(false)
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    })
    const [updateModal, setUpdateModal] = useState(false)

    const { plaka } = useContext(PlakaContext)

    useEffect(() => {
        setLoading(true)
        YakitGetByIdService(ids, tableParams?.pagination.current).then(res => {
            setDataSource(res?.data.fuel_list)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            })
            setLoading(false)
        })
    }, [tableParams.pagination.current, status])

    const columns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
            key: 1,
            render: (text) => <Button onClick={() => setUpdateModal(true)}>{text}</Button>
        },
        {
            title: 'Tarih',
            dataIndex: 'tarih',
            key: 2,
            render: (text) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: 'Yakıt Tipi',
            dataIndex: 'yakitTip',
            key: 3,
        },
        {
            title: 'Alınan KM.',
            dataIndex: 'sonAlinanKm',
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
                <span style={{ fontSize: '14px', color: 'rgb(147 147 147)' }}>{record.birim === "LITRE" && 'lt'}</span>
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

    const plakaData = plaka.map(item => item.plaka).join(', ')

    return (
        <Modal
            title={`Yakıt Bilgileri Plaka: [${plakaData}]`}
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <AddModal setStatus={setStatus} />
            <UpdateModal updateModal={updateModal} setUpdateModal={setUpdateModal} />
            {/* <Modal
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

Yakit.propTypes = {
    ids: PropTypes.array,
    onClose: PropTypes.func,
    visible: PropTypes.bool
}

export default Yakit
