import { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Modal, Button, Table, Checkbox, Popconfirm, Input, Popover } from 'antd';
import { DeleteOutlined, MenuOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { PlakaContext } from '../../../../../context/plakaSlice';
import { YakitDataDeleteService, YakitGetByIdService } from '../../../../../api/service';
import AddModal from './add/AddModal';
import UpdateModal from './update/UpdateModal';
import { t } from 'i18next';

const Yakit = ({ visible, onClose, ids }) => {
    const [dataSource, setDataSource] = useState([]);
    const [total, setTotal] = useState(null);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1, 
            pageSize: 10,
        },
    });
    const [updateModal, setUpdateModal] = useState(false);
    const [yakitId, setYakitId] = useState(0);

    const { plaka } = useContext(PlakaContext);

    useEffect(() => {
        setLoading(true);
        YakitGetByIdService(ids, tableParams?.pagination.current).then(res => {
            setDataSource(res?.data.fuel_list)
            setTotal({
                avg_consumption: res?.data.avg_consumption,
                avg_cost: res?.data.avg_cost,
                total_cost: res?.data.total_cost,
                total_quantity: res?.data.total_quantity,
            })
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.total_count,
                },
            });
            setLoading(false);
        });
    }, [tableParams.pagination.current, status]);

    const handleDelete = (data) => {
        console.log(data.siraNo)

        YakitDataDeleteService(data.siraNo).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
        setStatus(false);
    };

    const columns = [
        {
            title: t('plaka'),
            dataIndex: 'plaka',
            key: 1,
            render: (text, record) => (
                <Button onClick={() => {
                    setUpdateModal(true);
                    setYakitId(record.siraNo);
                }}>{text}</Button>
            )
        },
        {
            title: t('tarih'),
            dataIndex: 'tarih',
            key: 2,
            render: (text) => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: t('yakitTip'),
            dataIndex: 'yakitTip',
            key: 3,
        },
        {
            title: t('alinanKm'),
            dataIndex: 'sonAlinanKm',
            key: 4,
        },
        {
            title: t('kullanim'),
            dataIndex: 'ozelKullanim',
            key: 5,
            render: (text, record) => <Checkbox checked={record.ozelKullanim} readOnly />
        },
        {
            title: t('miktar'),
            dataIndex: 'miktar',
            key: 6,
            render: (text, record) => (
                <div className=''>
                    <span>{text} </span>
                    <span style={{ fontSize: '14px', color: 'rgb(147 147 147)' }}>{record.birim === "LITRE" && 'lt'}</span>
                </div>
            )
        },
        {
            title: t('tutar'),
            dataIndex: 'tutar',
            key: 7,
        },
        {
            title: 'Ortalama Tüketim',
            dataIndex: 'tuketim',
            key: 8,
            render: (text) => <p>{text} <ArrowUpOutlined style={{ color: 'red' }} /></p>
        },
        {
            title: 'Km Başına Maliyet',
            dataIndex: '',
            key: 9,
        },
        {
            title: 'Full Depo',
            dataIndex: 'fullDepo',
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
            title: t('surucu'),
            dataIndex: 'surucuAdi',
            key: 12,
        },
        {
            title: t('lokasyon'),
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
        },
        {
            title: '',
            dataIndex: 'delete',
            key: 16,
            render: (_, record) => (
                <Popconfirm title="Silmeye emin misiniz?" onConfirm={() => handleDelete(record)}>
                    <DeleteOutlined style={{ color: "#dc3545" }} />
                </Popconfirm>
            ),
        },
    ];

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            console.log(1);
        }
    };

    const footer = [
        <Button key="back" className="btn cancel-btn" onClick={onClose}>
            {t("kapat")}
        </Button>
    ];
    const plakaData = plaka.map(item => item.plaka).join(', ');

    const [openRowHeader, setOpenRowHeader] = useState(false);
    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const options = columns
        // .filter(column => column.dataIndex !== 'delete')
        .map(({ key, title }) => ({
            label: title,
            value: key,
        }))

    const filteredColumns = columns.filter(column => checkedList.includes(column.key));

    const content = (
        <>
            <Checkbox.Group
                value={checkedList}
                options={options}
                onChange={(value) => {
                    if (value.length > 0) {
                        setCheckedList(value);
                    }
                }}
            />
        </>
    );
    return (
        <Modal
            title={`Yakıt Bilgileri Plaka: [${plakaData}]`}
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <div className="flex align-center gap-1 mb-10">
                <Popover
                    content={content}
                    placement="bottom"
                    trigger="click"
                    open={openRowHeader}
                    onOpenChange={newOpen => setOpenRowHeader(newOpen)}
                >
                    <Button className="btn primary-btn"><MenuOutlined /></Button>
                </Popover>
                <Input placeholder={t("arama")} style={{ width: '20%' }} />
                <AddModal setStatus={setStatus} />
            </div>

            <UpdateModal updateModal={updateModal} setUpdateModal={setUpdateModal} id={yakitId} setStatus={setStatus} status={status} />
            <Table
                columns={filteredColumns}
                dataSource={dataSource}
                pagination={{
                    ...tableParams.pagination,
                    showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
                }}
                loading={loading}
                size="small"
                onChange={handleTableChange}
                scroll={{
                    x: 1500,
                }}
            />

            <div className="grid gap-1 mt-10 text-center">
                <div className="col-span-3 p-10 border">
                    <h3 className='text-secondary'>{t("toplamMaliyet")}</h3>
                    <p>{total?.total_cost} TL</p>
                </div>
                <div className="col-span-3 p-10 border">
                    <h3 className='text-secondary'>{t("toplamMiktar")}</h3>
                    <p>{total?.total_quantity}  Lt</p>
                </div>
                <div className="col-span-3 p-10 border">
                    <h3 className='text-secondary'>{t("ortalamaTuketim")} <ArrowUpOutlined style={{ color: 'red' }} /></h3>
                    <p>{(total?.avg_consumption % 100).toFixed(2)} lt/100 km</p>
                </div>
                <div className="col-span-3 p-10 border">
                    <h3 className='text-secondary'>{t("ortalamaMaliyet")}</h3>
                    <p>{total?.avg_cost} TL</p>
                </div>
            </div>
        </Modal>
    );
};

Yakit.propTypes = {
    ids: PropTypes.array,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
};

export default Yakit;
