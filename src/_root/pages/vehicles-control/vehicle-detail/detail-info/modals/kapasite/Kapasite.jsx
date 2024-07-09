import { useEffect, useState } from "react";
import { t } from "i18next";
import dayjs from "dayjs";
import { Checkbox, Table, Popover, Button, Input, Modal } from "antd";
import { MenuOutlined, HomeOutlined } from "@ant-design/icons";
import BreadcrumbComp from "../../../../../../components/breadcrumb/Breadcrumb";
import DragAndDropContext from "../../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetCapacityListByVehicleIdService } from "../../../../../../../api/services/vehicles/vehicles/services";
import AddModal from "./AddModal";
// import UpdateModal from "./UpdateModal";

const Kapasite = ({ visible, onClose, id }) => {
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
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [keys, setKeys] = useState([]);
    const [rows, setRows] = useState([]);

    const baseColumns = [
        {
            title: t("aciklama"),
            dataIndex: "aciklama",
            key: 1,
            render: (text, record) => (
                <Button
                    onClick={() => {
                        setUpdateModal(true);
                    }}
                >
                    {text}
                </Button>
            ),
        },
        {
            title: t("miktar"),
            dataIndex: "miktar",
            key: 2,
        },
        {
            title: t("birim"),
            dataIndex: "birim",
            key: 3,
        },
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

    const defaultCheckedList = columns.map((item) => item.key);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await GetCapacityListByVehicleIdService(
                id,
                search,
                tableParams.pagination.current,
            );
            setLoading(false);
            setDataSource(res?.data.list);
            setTableParams((prevTableParams) => ({
                ...prevTableParams,
                pagination: {
                    ...prevTableParams.pagination,
                    total: res?.data.recordCount,
                },
            }));
        };

        fetchData();
    }, [search, tableParams.pagination.current, status]);

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

    const newColumns = columns.map((col) => ({
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
    if (!localStorage.getItem("selectedRowKeys"))
        localStorage.setItem("selectedRowKeys", JSON.stringify([]));

    const handleRowSelection = (row, selected) => {
        if (selected) {
            if (!keys.includes(row.siraNo)) {
                setKeys((prevKeys) => [...prevKeys, row.siraNo]);
                setRows((prevRows) => [...prevRows, row]);
            }
        } else {
            setKeys((prevKeys) => prevKeys.filter((key) => key !== row.siraNo));
            setRows((prevRows) =>
                prevRows.filter((item) => item.siraNo !== row.siraNo)
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

    const footer = (
        [
            <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
                {t("iptal")}
            </Button>
        ]
    )

    return (
        <>
            <Modal
                title={t("kapasiteBilgiler")}
                open={visible}
                onCancel={onClose}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
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
                            <AddModal setStatus={setStatus} />
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
                            rowKey={(record) => record.surucuId}
                            columns={newColumns}
                            dataSource={dataSource}
                            pagination={{
                                ...tableParams.pagination,
                                showTotal: (total) => (
                                    <p className="text-info">[{total} kayıt]</p>
                                ),
                                locale: {
                                    items_per_page: `/ ${t("sayfa")}`,
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
            </Modal>

        </>
    );
};

export default Kapasite;
