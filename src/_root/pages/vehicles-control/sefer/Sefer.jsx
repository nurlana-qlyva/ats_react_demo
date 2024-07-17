import { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Checkbox, Table, Popover, Button, Input } from "antd";
import {
    MenuOutlined,
    HomeOutlined,
} from "@ant-design/icons";
import DragAndDropContext from '../../../components/drag-drop-table/DragAndDropContext';
import SortableHeaderCell from '../../../components/drag-drop-table/SortableHeaderCell';
import BreadcrumbComp from '../../../components/breadcrumb/Breadcrumb';
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import { GetExpeditionsListService } from "../../../../api/services/vehicles/operations_services";

const breadcrumb = [
    { href: "/", title: <HomeOutlined />, },
    { title: t("seferIslemleri"), },
];

const Sefer = () => {
    const [dataSource, setDataSource] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState(false);
    const [openRowHeader, setOpenRowHeader] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [id, setId] = useState(0);
    const [filterData, setFilterData] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [keys, setKeys] = useState([]);
    const [rows, setRows] = useState([]);

    const baseColumns = [
        {
            title: t("surucu"),
            dataIndex: "surucuIsim1",
            key: 1,
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setUpdateModal(true);
                        setId(record.siraNo);
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: t("seferAdedi"),
            dataIndex: "seferAdedi",
            key: 2,
        },
        {
            title: t("guzergah"),
            dataIndex: "guzergah",
            key: 3,
        },
        {
            title: t("cikisTarih"),
            dataIndex: "cikisTarih",
            key: 4,
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },
        {
            title: t("cikisSaat"),
            dataIndex: "cikisSaat",
            key: 5,
        },
        {
            title: t("varisTarih"),
            dataIndex: "varisTarih",
            key: 6,
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },
        {
            title: t("varisSaat"),
            dataIndex: "varisSaat",
            key: 7,
        },
        {
            title: "cikisKm",
            dataIndex: "cikisKm",
            key: 8,
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },
        {
            title: t("varisKm"),
            dataIndex: "varisKm",
            key: 9,
        },
        {
            title: t("farkKm"),
            dataIndex: "farkKm",
            key: 10,
        },
        {
            title: t("aciklama"),
            dataIndex: "aciklama",
            key: 12,
        },
        // {
        //   title: "",
        //   dataIndex: "delete",
        //   key: 11,
        //   render: (_, record) => (
        //     <Popconfirm
        //       title={t("confirmQuiz")}
        //       cancelText={t("cancel")}
        //       okText={t("ok")}
        //       onConfirm={() => handleDelete(record)}
        //     >
        //       <DeleteOutlined style={{ color: "#dc3545" }} />
        //     </Popconfirm>
        //   ),
        // },
    ];

    const [columns, setColumns] = useState(() =>
        baseColumns.map((column, i) => ({
            ...column,
            key: `${i}`,
            onHeaderCell: () => ({
                id: `${i}`,
            }),
        })),
    );

    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await GetExpeditionsListService(search, tableParams.pagination.current, filterData);
            setLoading(false);
            setDataSource(res?.data.list);
            setTableParams(prevTableParams => ({
                ...prevTableParams,
                pagination: {
                    ...prevTableParams.pagination,
                    total: res?.data.recordCount,
                },
            }));
        };

        fetchData();
    }, [search, tableParams.pagination.current, status, filterData]);

    const handleTableChange = (pagination, filters, sorter) => {
        setLoading(true);
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setDataSource([]);
        }
    };

    const filter = (data) => {
        setLoading(true);
        setStatus(true);
        setFilterData(data);
    };

    const clear = () => {
        setLoading(true);
        setFilterData({});
    };

    const newColumns = columns.map(col => ({
        ...col,
        hidden: !checkedList.includes(col.key),
    }));

    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }));

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

    // get selected rows data
    if (!localStorage.getItem('selectedRowKeys')) localStorage.setItem('selectedRowKeys', JSON.stringify([]));

    const handleRowSelection = (row, selected) => {
        if (selected) {
            if (!keys.includes(row.siraNo)) {
                setKeys(prevKeys => [...prevKeys, row.siraNo]);
                setRows(prevRows => [...prevRows, row]);
            }
        } else {
            setKeys(prevKeys => prevKeys.filter(key => key !== row.siraNo));
            setRows(prevRows => prevRows.filter(item => item.siraNo !== row.siraNo));
        }
    };

    useEffect(() => localStorage.setItem('selectedRowKeys', JSON.stringify(keys)), [keys]);

    useEffect(() => {
        const storedSelectedKeys = JSON.parse(localStorage.getItem('selectedRowKeys'));
        if (storedSelectedKeys.length) {
            setKeys(storedSelectedKeys);
        }
    }, []);

    useEffect(() => {
        const storedSelectedKeys = JSON.parse(localStorage.getItem('selectedRowKeys'));
        if (storedSelectedKeys.length) {
            setSelectedRowKeys(storedSelectedKeys);
        }
    }, [tableParams.pagination.current]);

    return (
        <>
            <div className="content">
                <BreadcrumbComp items={breadcrumb} />
            </div>

            <div className="content">
                <div className="flex justify-between align-center">
                    <div className="flex align-center gap-1">
                        <Popover
                            content={content}
                            placement="bottom"
                            trigger="click"
                            open={openRowHeader}
                            onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}
                        >
                            <Button className="btn primary-btn">
                                <MenuOutlined />
                            </Button>
                        </Popover>
                        <Input
                            placeholder={t("arama")}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <AddModal setStatus={setStatus} />
                        {/* <Filter filter={filter} clearFilters={clear} /> */}
                    </div>
                </div>
            </div>

            <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                setStatus={setStatus}
                status={status}
                id={id}
            />

            <div className="content">
                <DragAndDropContext items={columns} setItems={setColumns}>
                    <Table
                        rowKey={(record) => record.siraNo}
                        columns={newColumns}
                        dataSource={dataSource}
                        pagination={{
                            ...tableParams.pagination,
                            showTotal: (total) => <p className="text-info">[{total} {t("kayit")}]</p>,
                            locale: {
                                items_per_page: `/ ${t('sayfa')}`,
                            },
                        }}
                        loading={loading}
                        size="small"
                        onChange={handleTableChange}
                        rowSelection={{
                            selectedRowKeys: selectedRowKeys,
                            onChange: (selectedKeys) => setSelectedRowKeys(selectedKeys),
                            onSelect: handleRowSelection,
                        }}
                        components={{
                            header: {
                                cell: SortableHeaderCell,
                            },
                        }}
                    />
                </DragAndDropContext>
            </div>
        </>
    );
};

export default Sefer;
