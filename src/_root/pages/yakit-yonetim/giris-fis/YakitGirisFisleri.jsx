import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { t } from "i18next";
import dayjs from "dayjs";
import { Checkbox, Table, Popover, Button, Input } from "antd";
import { MenuOutlined, HomeOutlined } from "@ant-design/icons";
import { GetFuelEntryReceiptListService } from "../../../../api/services/yakit-yonetimi/services";
import BreadcrumbComp from "../../../components/breadcrumb/Breadcrumb";
import DragAndDropContext from "../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../components/drag-drop-table/SortableHeaderCell";
import AddModal from "./AddModal";
import UpdateModal from "./UpdateModal";

const breadcrumb = [
  { href: "/", title: <HomeOutlined /> },
  { title: t("girisFisleri") },
];

const YakitGirisFisleri = () => {
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [keys, setKeys] = useState([]);
  const [rows, setRows] = useState([]);
  const [filterData, setFilterData] = useState({});
  const [id, setId] = useState(null);
  const [updateModal, setUpdateModal] = useState(false);

  const baseColumns = [
    {
      title: t("fisNo"),
      dataIndex: "fisNo",
      key: 1,
      render: (text, record) => (
        <Button
          onClick={() => {
            setUpdateModal(true);
            setId(record.mlzFisId);
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: t("tarih"),
      dataIndex: "tarih",
      key: 2,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: t("firmaTanimi"),
      dataIndex: "firmaTanim",
      key: 3,
    },
    {
      title: t("plaka"),
      dataIndex: "plaka",
      key: 3,
    },
    {
      title: t("islemTipi"),
      dataIndex: "islemTipi",
      key: 4,
    },
    {
      title: t("girisDeposu"),
      dataIndex: "girisDepo",
      key: 5,
    },
    {
      title: t("cikisDeposu"),
      dataIndex: "cikisDepo",
      key: 6,
    },
    {
      title: t("araToplam"),
      dataIndex: "araToplam",
      key: 7,
    },
    {
      title: t("kdvToplam"),
      dataIndex: "kdvToplam",
      key: 8,
    },
    {
      title: t("genelToplam"),
      dataIndex: "genelToplam",
      key: 9,
    },
    {
      title: t("faturaIrsaliyeNo"),
      dataIndex: "faturaIrsaliyeNo",
      key: 10,
    },
  ];

  const [columns, setColumns] = useState(() =>
    baseColumns.map((column, i) => ({
      ...column,
      key: `${i}`,
      onHeaderCell: () => ({
        id: `${i}`,
      }),
      onCell: () => ({
        id: `${i}`,
      }),
    }))
  );

  const defaultCheckedList = columns.map((item) => item.key);
  const [checkedList, setCheckedList] = useState(defaultCheckedList);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await GetFuelEntryReceiptListService(
        search,
        tableParams.pagination.current,
        filterData
      );
      setLoading(false);
      setDataSource(res?.data.materialList);
      setTableParams((prevTableParams) => ({
        ...prevTableParams,
        pagination: {
          ...prevTableParams.pagination,
          total: res?.data.total_count,
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
            rowKey={(record) => record.mlzFisId}
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

export default YakitGirisFisleri;
