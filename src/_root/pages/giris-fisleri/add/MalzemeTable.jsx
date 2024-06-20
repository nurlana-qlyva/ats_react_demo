import { useEffect, useState } from "react";
import { Table } from "antd";
import { MalzemeListGetService } from "../../../../api/service";
import { t } from "i18next";

const MalzemeTable = ({ setSelectedRow }) => {
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: t("malzemeId"),
      dataIndex: "malzemeId",
      key: "malzemeId",
    },
    {
      title: t("malzemeKodu"),
      dataIndex: "malzemeKod",
      key: "malzemeKod",
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
      key: "fiyat",
    },
    {
      title: t("kdvOrani"),
      dataIndex: "kdvOran",
      key: "kdvOran",
    },
  ];

  useEffect(() => {
    setLoading(true);
    MalzemeListGetService(tableParams.pagination.current).then((res) => {
      setData(res?.data.materialList);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res?.data.total_count,
        },
      });
      setLoading(false);
    });
  }, [tableParams.pagination.current]);

  const handleRowSelectionChange = (selectedRowKeys, selectedRows) => {
    setSelectedRowKeys(selectedRowKeys.length > 0 ? [selectedRowKeys[0]] : []);
    setSelectedRow(selectedRows.length > 0 ? selectedRows[0] : null);
  };

  return (
    <>
      <Table
        rowSelection={{
          type: "radio",
          selectedRowKeys,
          onChange: handleRowSelectionChange,
        }}
        columns={columns}
        dataSource={data}
        pagination={{
          ...tableParams.pagination,
          showTotal: (total) => <p className="text-info">[{total} kayıt]</p>,
          locale: {
            items_per_page: `/ ${t("sayfa")}`,
          },
        }}
        loading={loading}
        rowKey="malzemeId"
      />
    </>
  );
};

export default MalzemeTable;
