import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Input, Table } from "antd";
import { GetActiveInsuranceListService } from "../../../../../../../api/services/vehicles/operations_services";

const SigortaList = ({ setSigorta, open }) => {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [loading, setLoading] = useState(false);

    const columns = [
        {
            title: t("sigorta"),
            dataIndex: "sigorta",
            key: 1,
        },
        {
            title: t("baslamaTarih"),
            dataIndex: "baslangicTarih",
            key: 2,
            render: text => dayjs(text).format("DD.MM.YYYY")
        },
        {
            title: t("policeNo"),
            dataIndex: "policeNo",
            key: 3,
        },
        {
            title: t("firma"),
            dataIndex: "firma",
            key: 4,
        },
    ];

    useEffect(() => {
        if (!open) {
            setSelectedRowKeys([]);
            setSigorta([]);
        }
    }, [open]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const res = await GetActiveInsuranceListService(
                search,
                tableParams.pagination.current
            );
            setLoading(false);
            setData(res?.data.list);
            setTableParams({
                ...tableParams,
                pagination: {
                    ...tableParams.pagination,
                    total: res?.data.recordCount,
                },
            });
        };
        fetchData();
    }, [search, tableParams.pagination.current]);

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });

        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };

    const rowSelection = {
        type: "radio",
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            setSelectedRowKeys(selectedRowKeys);
            setSigorta(selectedRows);
        },
    };

    return (
        <>
            <Input
                placeholder={t("arama")}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "30%" }}
            />
            <div className="mt-10">
                <Table
                    rowSelection={rowSelection}
                    columns={columns}
                    dataSource={data}
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
                    onChange={handleTableChange}
                    loading={loading}
                    rowKey="siraNo"
                />
            </div>
        </>
    );
};

SigortaList.propTypes = {
    setSigorta: PropTypes.func,
    open: PropTypes.bool,
};

export default SigortaList;
