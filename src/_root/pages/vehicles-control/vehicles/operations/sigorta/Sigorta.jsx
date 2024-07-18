import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import {
    Modal,
    Button,
    Table,
    Checkbox,
    Popconfirm,
    Input,
    Popover,
} from "antd";
import {
    DeleteOutlined,
    MenuOutlined,
} from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import DragAndDropContext from "../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetInsuranceListByVehicleIdService } from "../../../../../../api/services/vehicles/operations_services";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";
import Content from "../../../../../components/drag-drop-table/DraggableCheckbox";


const Sigorta = ({ visible, onClose, ids }) => {
    const { plaka } = useContext(PlakaContext);
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [id, setId] = useState(0);
    const [search, setSearch] = useState("");
    const [openRowHeader, setOpenRowHeader] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [keys, setKeys] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await GetInsuranceListByVehicleIdService(
                ids,
                search,
                tableParams.pagination.current
            );
            setLoading(false);
            setDataSource(res?.data.list);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.recordCount,
                },
            });
        };
        fetchData();
    }, [search, tableParams.pagination.current, status, ids]);

    const baseColumns = [
        {
            title: t("sigorta"),
            dataIndex: "sigorta",
            key: 1,
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setUpdateModalOpen(true);
                        setId(record.siraNo);
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: t("aktif"),
            dataIndex: "aktif",
            key: 2,
            render: text => <Checkbox checked={text} />
        },
        {
            title: t("baslangicTarih"),
            dataIndex: "baslangicTarih",
            key: 3,
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },
        {
            title: t("bitisTarih"),
            dataIndex: "bitisTarih",
            key: 4,
            render: (text) => dayjs(text).format("DD.MM.YYYY"),
        },
        {
            title: t("policeNo"),
            dataIndex: "policeNo",
            key: 5,
        },
        {
            title: t("tutar"),
            dataIndex: "tutar",
            key: 6,
        },
        {
            title: t("firma"),
            dataIndex: "firma",
            key: 7,
        },
        {
            title: t("acenta"),
            dataIndex: "acenta",
            key: 8,
        },
        {
            title: t("yetkili"),
            dataIndex: "yetkili",
            key: 9,
        },
        {
            title: t("ruhsatBelgeSeriNo"),
            dataIndex: "ruhsatBelgeSeriNo",
            key: 10,
        },
        {
            title: t("aracBedeli"),
            dataIndex: "aracBedeli",
            key: 11,
        },
        {
            title: t("hasarsizlikIndirim"),
            dataIndex: "hasarIndirimi",
            key: 12,
        },
        {
            title: t("varsayilan"),
            dataIndex: "varsayilan",
            key: 13,
            render: text => <Checkbox checked={text} />
        },
        // {
        //   title: "",
        //   dataIndex: "delete",
        //   key: 7,
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
        }))
    );

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

    const footer = [
        <Button key="back" className="btn cancel-btn" onClick={onClose}>
            {t("kapat")}
        </Button>,
    ];

    const plakaData = plaka.map((item) => item.plaka).join(", ");

    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const newColumns = columns.map((col) => ({
        ...col,
        hidden: !checkedList.includes(col.key),
    }));

    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }));

    const moveCheckbox = (fromIndex, toIndex) => {
        const updatedColumns = [...columns];
        const [removed] = updatedColumns.splice(fromIndex, 1);
        updatedColumns.splice(toIndex, 0, removed);

        setColumns(updatedColumns);
        setCheckedList(updatedColumns.map((col) => col.key));
    };

    const content = (
        <Content
            options={options}
            checkedList={checkedList}
            setCheckedList={setCheckedList}
            moveCheckbox={moveCheckbox}
        />
    );

    // get selected rows data
    if (!localStorage.getItem("selectedRowKeys"))
        localStorage.setItem("selectedRowKeys", JSON.stringify([]));

    const handleRowSelection = (row, selected) => {
        if (selected) {
            if (!keys.includes(row.aracId)) {
                setKeys((prevKeys) => [...prevKeys, row.aracId]);
                setRows((prevRows) => [...prevRows, row]);
            }
        } else {
            setKeys((prevKeys) => prevKeys.filter((key) => key !== row.aracId));
            setRows((prevRows) =>
                prevRows.filter((item) => item.aracId !== row.aracId)
            );
        }
    };

    useEffect(
        () => localStorage.setItem("selectedRowKeys", JSON.stringify(keys)),
        [keys]
    );

    useEffect(() => {
        const storedSelectedKeys = JSON.parse(
            localStorage.getItem("selectedRowKeys")
        );
        if (storedSelectedKeys.length) {
            setKeys(storedSelectedKeys);
        }
    }, []);

    useEffect(() => {
        const storedSelectedKeys = JSON.parse(
            localStorage.getItem("selectedRowKeys")
        );
        if (storedSelectedKeys.length) {
            setSelectedRowKeys(storedSelectedKeys);
        }
    }, [tableParams.pagination.current]);

    return (
        <Modal
            title={`${t("sigortaBilgileri")} - ${t("plaka")}: [${plakaData}]`}
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
                    onOpenChange={(newOpen) => setOpenRowHeader(newOpen)}
                >
                    <Button className="btn primary-btn">
                        <MenuOutlined />
                    </Button>
                </Popover>
                <Input
                    placeholder={t("arama")}
                    style={{ width: "20%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <AddModal setStatus={setStatus} />
            </div>

            <UpdateModal
                updateModal={updateModalOpen}
                setUpdateModal={setUpdateModalOpen}
                id={id}
                setStatus={setStatus}
            />

            <DragAndDropContext items={columns} setItems={setColumns}>
                <Table
                    rowKey={(record) => record.siraNo}
                    columns={newColumns}
                    dataSource={dataSource}
                    pagination={{
                        ...tableParams.pagination,
                        showTotal: (total) => (
                            <p className="text-info">
                                [{total} {t("kayit")}]
                            </p>
                        ),
                        locale: {
                            items_per_page: `/ ${t("sayfa")}`,
                        },
                    }}
                    scroll={{
                        x: 1500,
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
                    rowClassName={(record) => (record.aktif ? "active-row" : "")}
                />
            </DragAndDropContext>
        </Modal>
    );
};

Sigorta.propTypes = {
    ids: PropTypes.array,
    onClose: PropTypes.func,
    visible: PropTypes.bool,
};

export default Sigorta;
