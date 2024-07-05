import { useEffect, useRef, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Checkbox, Table, Popover, Button, Input } from "antd";
import { MenuOutlined, HomeOutlined } from "@ant-design/icons";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb"
import { GetMaterialListService } from "../../../../api/services/malzeme/malzeme_services";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";

const breadcrumb = [
    { href: "/", title: <HomeOutlined />, },
    { title: t("malzemeTanimlari"), },
];

const Malzemeler = () => {
    const isMounted = useRef(false);

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
    const [data, setData] = useState(false);
    const [filterData, setFilterData] = useState({});
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [keys, setKeys] = useState([]);
    const [rows, setRows] = useState([]);

    const baseColumns = [
        {
            title: t("malzemeId"),
            dataIndex: "malzemeId",
            key: 1,
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setData(record);
                        setUpdateModal(true);
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: t("malzemeKodu"),
            dataIndex: "malzemeKod",
            key: 2,
        },
        {
            title: t("malzemeTanimi"),
            dataIndex: "tanim",
            key: 3,
        },
        {
            title: t("malzemeTipi"),
            dataIndex: "malzemeTipKodText",
            key: 4,
        },
        {
            title: t("stokMiktar"),
            dataIndex: "stokMiktar",
            key: 5,
        },
        {
            title: t("birim"),
            dataIndex: "birim",
            key: 6,
        },
        {
            title: t("fiyat"),
            dataIndex: "fiyat",
            key: 7,
        },
        {
            title: t("tedarikci"),
            dataIndex: "tedarikci",
            key: 8,
        },
        {
            title: t("seriNo"),
            dataIndex: "seriNo",
            key: 9,
        },
        {
            title: t("barkodNo"),
            dataIndex: "barkodNo",
            key: 10,
        },
        {
            title: t("depo"),
            dataIndex: "depo",
            key: 11,
        },
        {
            title: t("bolum"),
            dataIndex: "bolum",
            key: 12,
        },
        {
            title: t("raf"),
            dataIndex: "raf",
            key: 13,
        },
        {
            title: t("kritikMik"),
            dataIndex: "kritikMiktar",
            key: 14,
        },
        {
            title: t("sonAlisTarihi"),
            dataIndex: "sonAlisTarih",
            key: 15,
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },
        {
            title: t("sonAlinanFirma"),
            dataIndex: "sonAlinanFirma",
            key: 16,
        },
        {
            title: t("sonAlinanFiyat"),
            dataIndex: "sonFiyat",
            key: 17,
        },
        {
            title: t("aktif"),
            dataIndex: "aktif",
            key: 18,
            render: (text, record) => (
                <Checkbox checked={record.ozelKullanim} readOnly />
            ),
        },
        {
            title: t("kdvOrani"),
            dataIndex: "kdvOran",
            key: 19,
        },
        {
            title: t("girenMiktar"),
            dataIndex: "girenMiktar",
            key: 20,
        },
        {
            title: t("cikanMiktar"),
            dataIndex: "cikanMiktar",
            key: 21,
        },
        {
            title: t("yedekParca"),
            dataIndex: "yedekParca",
            key: 22,
            render: (text, record) => (
                <Checkbox checked={record.yedekParca} readOnly />
            ),
        },
        {
            title: t("sarfMalz"),
            dataIndex: "sarfMlz",
            key: 23,
            render: (text, record) => <Checkbox checked={record.sarfMlz} readOnly />,
        },
        {
            title: t("demirbas"),
            dataIndex: "demirBas",
            key: 24,
            render: (text, record) => <Checkbox checked={record.demirBas} readOnly />,
        },
        {
            title: t("degistirme"),
            dataIndex: "degistirme",
            key: 25,
            render: (text) => <p className="text-secondary">{text}</p>,
        },
        {
            title: t("olusturma"),
            dataIndex: "olusturma",
            key: 26,
            render: (text) => <p className="text-success">{text}</p>,
        },
        {
            title: t("aciklama"),
            dataIndex: "aciklama",
            key: 27,
        },
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
            const res = await GetMaterialListService(search, tableParams.pagination.current, filterData);
            setLoading(false);
            setDataSource(res?.data.fuel_list);
            setTableParams(prevTableParams => ({
                ...prevTableParams,
                pagination: {
                    ...prevTableParams.pagination,
                    total: res?.data.total_count,
                },
            }));
        };

        if (isMounted.current) {
            fetchData();
        } else {
            isMounted.current = true;
        }
    }, [search, tableParams.pagination.current, status, filterData]);

    useEffect(() => {
        if (isMounted.current) {
            setTableParams(prevParams => ({
                ...prevParams,
                pagination: {
                    ...prevParams.pagination,
                    current: 1,
                },
            }));
        }
    }, [search]);

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
                            placeholder="Arama"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* <AddModal setStatus={setStatus} /> */}
                        {/* <Filter filter={filter} clearFilters={clear} /> */}
                    </div>
                </div>
            </div>

            {/* <UpdateModal
                updateModal={updateModal}
                setUpdateModal={setUpdateModal}
                setStatus={setStatus}
                status={status}
                id={id}
            /> */}

            <div className="content">
                <DragAndDropContext items={columns} setItems={setColumns}>
                    <Table
                        rowKey={(record) => record.malzemeId}
                        columns={newColumns}
                        dataSource={dataSource}
                        pagination={{
                            ...tableParams.pagination,
                            showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
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
    )
}

export default Malzemeler
