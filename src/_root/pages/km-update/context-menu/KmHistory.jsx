import { Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Table } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { KMLogListDeleteService, KMLogListGetByIdService, KMLogListUpdateService, KMLogListValidateService, KMValidateService } from "../../../../api/service";
import { formatDateKm } from "../../../../utils/format";

const KmUpdate = ({ data }) => {
    const [dataSource, setDataSource] = useState([]);
    const [status, setStatus] = useState(false)
    const [updateModal, setUpdateModal] = useState(false)
    const [updateData, setUpdateData] = useState(null)
    const [yeniKm, setYeniKm] = useState(0)
    const [kmStatus, setKmStatus] = useState('black')
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    useEffect(() => {
        KMLogListGetByIdService(data.aracId, tableParams?.pagination.current).then(res => {
            setDataSource(res?.data.km_list)
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            });
        })
    }, [tableParams?.pagination.current, status])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };

    const handleDelete = (data) => {
        const body = {
            "siraNo": data?.siraNo,
            "kmAracId": data?.kmAracId,
            "seferSiraNo": data?.seferSiraNo,
            "yakitSiraNo": data?.yakitSiraNo,
            "plaka": data?.plaka,
            "tarih": data?.tarih,
            "saat": data?.saat,
            "eskiKm": data?.eskiKm,
            "yeniKm": data?.yeniKm,
            "fark": data?.fark,
            "kaynak": data?.kaynak,
            "dorse": data?.dorse,
            "aciklama": data?.aciklama
        }

        KMLogListDeleteService(body).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
        // const newData = dataSource.filter((item) => item.key !== key);
        // setDataSource(newData);
    };

    const handleEdit = () => {
        const body = {
            "siraNo": updateData?.siraNo,
            "kmAracId": updateData?.kmAracId,
            "seferSiraNo": updateData?.seferSiraNo,
            "yakitSiraNo": updateData?.yakitSiraNo,
            "plaka": updateData?.plaka,
            "tarih": updateData?.tarih.split("T")[0],
            "saat": updateData?.saat,
            "eskiKm": updateData?.eskiKm,
            "yeniKm": updateData?.yeniKm,
            "fark": updateData?.fark,
            "kaynak": updateData?.kaynak,
            "dorse": updateData?.dorse,
            "aciklama": updateData?.aciklama
        }

        KMLogListUpdateService(body).then(res => {
            if (res.data.statusCode === 202) {
                setStatus(!status);
                onClose();
            }
        })

    }

    const openUpdateModal = (data) => {
        setUpdateModal(true)
        setUpdateData(data)
    }

    const onClose = () => {
        setUpdateModal(false)
        setUpdateData(null)
        setKmStatus("black")
    }

    const validateKm = (value) => {
        const body = {
            "siraNo": updateData?.siraNo,
            "kmAracId": updateData?.kmAracId,
            "seferSiraNo": updateData?.seferSiraNo,
            "yakitSiraNo": updateData?.yakitSiraNo,
            "plaka": updateData?.plaka,
            "tarih": updateData?.tarih.split("T")[0],
            "saat": updateData?.saat,
            "eskiKm": updateData?.eskiKm,
            "yeniKm": value,
            "fark": updateData?.fark,
            "kaynak": updateData?.kaynak,
            "dorse": updateData?.dorse,
            "aciklama": updateData?.aciklama
        };
        KMLogListValidateService(body).then(res => {
            if (res?.data.statusCode === 400) {
                setKmStatus('red');
            } else if (res?.data.statusCode === 202) {
                setKmStatus('green');
            }
        });
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            validateKm(e.target.value)
        }
    };

    const handleBlur = (e) => {
        validateKm(e.target.value);
    };

    const defaultColumns = [
        {
            title: 'Plaka',
            dataIndex: 'plaka',
        },
        {
            title: 'Lokasyon',
            dataIndex: 'lokasyon',
        },
        {
            title: 'Kaynak',
            dataIndex: 'kaynak',
        },
        {
            title: 'Eski km',
            dataIndex: 'eskiKm',
        },
        {
            title: 'Yeni km',
            dataIndex: 'yeniKm',
        },
        {
            title: 'Fark km',
            dataIndex: 'fark',
        },
        {
            title: 'Tarih',
            dataIndex: 'tarih',
            render: text => text.split("T")[0].split("-").reverse().join(".")
        },
        {
            title: 'Saat',
            dataIndex: 'saat',
        },
        {
            title: '',
            dataIndex: 'delete',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Popconfirm title="Silmeye eminmisiniz?" onConfirm={() => handleDelete(record)}>
                        <DeleteOutlined style={{ color: "#dc3545" }} />
                    </Popconfirm>
                ) : null,
        },
        {
            title: '',
            dataIndex: 'edit',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Button onClick={() => openUpdateModal(record)} style={{ border: "none", color: "#5B548B" }}>
                        <EditOutlined />
                    </Button>
                ) : null,
        },
    ];

    const columns = defaultColumns.map((col) => {
        return {
            ...col,
        };
    });

    const footer = (
        [
            <Button key="submit" className="btn primary-btn km-update" onClick={handleEdit} disabled={kmStatus !== "green"}>
                Güncelle
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    return (
        <div className="history">
            <Table
                rowClassName={() => 'editable-row'}
                pagination={tableParams.pagination}
                dataSource={dataSource}
                columns={columns}
                size="small"
                onChange={handleTableChange}
            />
            <Modal
                title={'Kilometre Güncelleme Geçmişi Düzelt'}
                open={updateModal}
                onCancel={onClose}
                maskClosable={false}
                footer={footer}
                width={500}
            >
                <div className="grid gap-1">
                    <div className="col-span-6">
                        <Input className="w-full" placeholder="Tarih" disabled value={updateData?.tarih.split("T")[0].split("-").reverse().join(".")} />
                    </div>
                    <div className="col-span-6">
                        <Input className="w-full" placeholder="Saat" disabled value={updateData?.saat} />
                    </div>
                    <div className="col-span-6">
                        <Input placeholder="Eski Km" disabled value={updateData?.eskiKm} />
                    </div>
                    <div className="col-span-6">
                        <InputNumber
                            allowClear
                            style={{ borderColor: kmStatus }}
                            placeholder="Yeni Km"
                            className="w-full"
                            value={updateData?.yeniKm}
                            onKeyDown={handleKeyDown}
                            onChange={e => {
                                if (e !== null) {
                                    setUpdateData({ ...updateData, yeniKm: e })
                                } else {
                                    setKmStatus('black')
                                }
                            }}
                            onBlur={handleBlur}
                        />
                    </div>
                    <div className="col-span-6">
                        <Input placeholder="Fark Km" disabled value={updateData?.fark} />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default KmUpdate
