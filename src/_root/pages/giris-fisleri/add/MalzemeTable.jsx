import { useEffect, useState } from "react";
import { Table } from "antd";
import { MalzemeListGetService } from "../../../../api/service";
import { t } from "i18next";

const MalzemeTable = () => {
  const [data, setData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [selectedRow, setSelectedRow] = useState(null);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: t("malzemeId"),
      dataIndex: "malzemeId",
      key: 1,
    },
    {
      title: t("malzemeKodu"),
      dataIndex: "malzemeKod",
      key: 2,
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
      key: 3,
    },
    {
      title: t("kdvOrani"),
      dataIndex: "kdvOran",
      key: 4,
    },
  ];

  useEffect(() => {
    setLoading(true);
    MalzemeListGetService(tableParams?.pagination.current).then((res) => {
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
    setSelectedRow(selectedRows.length > 0 ? selectedRows[0] : null); // Set selectedRow to the first selected row
    console.log("selectedRows: ", selectedRows);
  };

  return (
    <>
      <Table
        rowSelection={{
          type: "radio",
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
      />
    </>
  );
};

export default MalzemeTable;
