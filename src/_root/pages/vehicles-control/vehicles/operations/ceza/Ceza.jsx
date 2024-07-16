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
  ArrowUpOutlined,
} from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import DragAndDropContext from "../../../../../components/drag-drop-table/DragAndDropContext";
import SortableHeaderCell from "../../../../../components/drag-drop-table/SortableHeaderCell";
import { GetVehicleFinesListByVehicleIdService } from "../../../../../../api/services/vehicles/ceza/services";
import AddModal from "./add/AddModal";
// import UpdateModal from "./update/UpdateModal";

const Ceza = ({ visible, onClose, ids }) => {
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
      const res = await GetVehicleFinesListByVehicleIdService(
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

  const handleDelete = (data) => {
    // DeleteYakitService(data.siraNo).then((res) => {
    //   if (res?.data.statusCode === 202) {
    //     setStatus(true);
    //   }
    // });
    // setStatus(false);
  };

  const baseColumns = [
    {
      title: t("plaka"),
      dataIndex: "plaka",
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
      title: t("tarih"),
      dataIndex: "tarih",
      key: 2,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: t("saat"),
      dataIndex: "saat",
      key: 3,
    },
    {
      title: t("cezaTuru"),
      dataIndex: "cezaTuru",
      key: 4,
    },
    {
      title: t("cezaTutar"),
      dataIndex: "tutar",
      key: 5,
    },
    {
      title: t("cezaPuan"),
      dataIndex: "cezaPuan",
      key: 6,
    },
    {
      title: t("surucuAdi"),
      dataIndex: "surucuIsim",
      key: 7,
    },
    {
      title: "odemeTarihi",
      dataIndex: "odemeTarih",
      key: 8,
      render: (text) => dayjs(text).format("DD.MM.YYYY"),
    },
    {
      title: t("cezaMaddesi"),
      dataIndex: "cezaMaddesi",
      key: 9,
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
      key: 10,
    },
    {
      title: "",
      dataIndex: "delete",
      key: 11,
      render: (_, record) => (
        <Popconfirm
          title={t("confirmQuiz")}
          cancelText={t("cancel")}
          okText={t("ok")}
          onConfirm={() => handleDelete(record)}
        >
          <DeleteOutlined style={{ color: "#dc3545" }} />
        </Popconfirm>
      ),
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
    <Modal
      title={`${t("cezaBilgileri")} - ${t("plaka")}: [${plakaData}]`}
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

      {/* <UpdateModal
        updateModal={updateModalOpen}
        setUpdateModal={setUpdateModalOpen}
        id={id}
        setStatus={setStatus}
        status={status}
      /> */}

      <DragAndDropContext items={columns} setItems={setColumns}>
        <Table
          //   rowKey={(record) => record.aracId}
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
        />
      </DragAndDropContext>
    </Modal>
  );
};

Ceza.propTypes = {
  ids: PropTypes.array,
  onClose: PropTypes.func,
  visible: PropTypes.bool,
};

export default Ceza;
