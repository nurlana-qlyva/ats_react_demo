import { Modal, Button, Table } from 'antd';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const DriversModal = ({ visible, onClose, id }) => {
    const [drivers, setDrivers] = useState([])
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const columns = [
        {
            title: 'Tutanak No',
            dataIndex: 'tutanakNo',
            key: 1,
            // render: (text, record) => <Link to={`/detay/${record.aracId}`}>{text}</Link>
        },
        {
            title: 'Teslim Tarihi',
            dataIndex: 'teslimTarihi',
            key: 2,
        },
        {
            title: 'Teslim Saati',
            dataIndex: 'teslimSaati',
            key: 3,
        },
        {
            title: 'Teslim Eden',
            dataIndex: 'teslimEden',
            key: 4,
        },
        {
            title: 'Teslim Alan',
            dataIndex: 'teslimAlan',
            key: 5,
        },
        {
            title: 'Araç Km.',
            dataIndex: 'aracKm',
            key: 6,
        },
        {
            title: 'Açıklama',
            dataIndex: 'aciklama',
            key: 7,
        }
    ];

    const defaultValues = {

    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    useEffect(() => {

    }, [id])

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

    const footer = (
        [
            <Button key="submit" className="btn primary-btn">
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title="Araç Sürücüleri Bilgileri"
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <Table
                columns={columns}
                dataSource={drivers}
                pagination={tableParams.pagination}
                loading={loading}
                size="small"
                onChange={handleTableChange}
            />
        </Modal>
    );
};

export default DriversModal;
