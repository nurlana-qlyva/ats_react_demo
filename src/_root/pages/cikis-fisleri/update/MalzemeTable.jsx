import { useEffect, useState } from "react";
import { Input, Table } from "antd";
import {
  MalzemeListGetService,
  MalzemeListSearchService,
} from "../../../../api/service";
import { t } from "i18next";

const MalzemeTable = ({
  setSelectedRows,
  selectedRowKeys,
  setSelectedRowKeys,
  keys,
  rows,
  setKeys,
  setRows,
}) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: t("malzemeKodu"),
      dataIndex: "malzemeKod",
      key: "malzemeKod",
    },
    {
      title: t("malzemeTanimi"),
      dataIndex: "tanim",
      key: "tanim",
    },
    {
      title: t("malzemeTipi"),
      dataIndex: "malzemeTipKodText",
      key: "malzemeTipKodText",
    },
    {
      title: t("birim"),
      dataIndex: "birim",
      key: "birim",
    },
    {
      title: t("marka"),
      dataIndex: "marka",
      key: "marka",
    },
    {
      title: t("model"),
      dataIndex: "model",
      key: "model",
    },
    {
      title: t("malzemeSinif"),
      dataIndex: "malzemeSinif",
      key: "malzemeSinif",
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: "aciklama",
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
  }, []);

  useEffect(() => {
    if (search.length >= 3) {
      MalzemeListSearchService(tableParams?.pagination.current, search).then(
        (res) => {
          setData(res?.data.materialList);
          setTableParams({
            ...tableParams,
            pagination: {
              ...tableParams.pagination,
              total: res?.data.total_count,
            },
          });
          setLoading(false);
        }
      );
    } else {
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
    }
  }, [search, tableParams?.pagination.current]);

  const handleRowSelectionChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleHandleRowSelection = (row, selected) => {
    if (selected) {
      if (!keys.includes(row.malzemeId)) {
        setKeys([...keys, row.malzemeId]);
        setRows([...rows, row]);
      }
    } else {
      const filteredKeys = keys.filter((key) => key !== row.malzemeId);
      const filteredRows = rows.filter(
        (item) => item.malzemeId !== row.malzemeId
      );
      setKeys(filteredKeys);
      setRows(filteredRows);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedRowKeys", JSON.stringify(keys));
  }, [keys]);

  useEffect(() => {
    setSelectedRows(rows);
  }, [rows]);

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

  useEffect(() => {
    const storedSelectedKeys =
      JSON.parse(localStorage.getItem("selectedRowKeys")) || [];
    setSelectedRowKeys(storedSelectedKeys);
  }, [tableParams.pagination.current, localStorage.getItem("selectedRowKeys")]);

  return (
    <>
      <Input
        placeholder={t("arama")}
        onChange={(e) => setSearch(e.target.value)}
        style={{width: "30%"}}
      />
      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: handleRowSelectionChange,
          onSelect: handleHandleRowSelection,
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
        onChange={handleTableChange}
        loading={loading}
        rowKey="malzemeId"
      />
    </>
  );
};

export default MalzemeTable;
