import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Select,
  Table,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { t } from "i18next";
import { Controller, useFormContext } from "react-hook-form";
import TextArea from "antd/lib/input/TextArea";
import Plaka from "../../../components/form/Plaka";
import Location from "../../../components/form/Location";

const MalzemeLists = () => {
  const { control } = useFormContext();
  const [dataSource, setDataSource] = useState([
    {
      key: "0",
      malzemeKod: "MLZ0978",
      malzemeTanim: "Arac",
      miktar: 23,
      birim: "Birim",
      fiyat: 23,
      araToplam: 23,
      kdvOran: 23,
      toplam: 23,
    },
  ]);
  const [count, setCount] = useState(2);
  const [isOpen, setIsModalOpen] = useState(false);
  const [malzemeKod, setMalzemeKod] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 3,
    },
  });
  const [editModal, setEditModal] = useState(false);

  const handleDelete = (key) => {
    const newData = dataSource.filter((item) => item.key !== key);
    setDataSource(newData);
  };
  const defaultColumns = [
    {
      title: t("malzemeKodu"),
      dataIndex: "malzemeKod",
    },
    {
      title: t("malzemeTanimi"),
      dataIndex: "malzemeTanim",
    },
    {
      title: t("miktar"),
      dataIndex: "miktar",
    },
    {
      title: t("birim"),
      dataIndex: "birim",
    },
    {
      title: t("fiyat"),
      dataIndex: "fiyat",
    },
    {
      title: t("araToplam"),
      dataIndex: "araToplam",
    },
    {
      title: t("indirimOrani"),
      dataIndex: "indirimOran",
    },
    {
      title: t("indirimTutari"),
      dataIndex: "indirimTutar",
    },
    {
      title: t("kdvOrani"),
      dataIndex: "kdvOran",
    },
    {
      title: `${t("kdv")} D/H`,
      dataIndex: "kdvDH",
    },
    {
      title: t("kdvTutar"),
      dataIndex: "kdvTutar",
    },
    {
      title: t("toplam"),
      dataIndex: "toplam",
    },
    {
      title: t("plaka"),
      dataIndex: "plaka",
    },
    {
      title: t("lokasyon"),
      dataIndex: "lokasyon",
    },
    {
      title: t("aciklama"),
      dataIndex: "aciklama",
    },
    {
      title: "",
      dataIndex: "delete",
      render: (_, record) => (
        <Popconfirm
          title="Silmeye eminmisiniz?"
          okText={t("ok")}
          cancelText={t("cancel")}
          // onConfirm={() => handleDelete(record)}
        >
          <DeleteOutlined style={{ color: "#dc3545" }} />
        </Popconfirm>
      ),
    },
    {
      title: "",
      dataIndex: "edit",
      render: (_, record) => (
        <Button
          onClick={() => setEditModal(true)}
          style={{ border: "none", color: "#5B548B" }}
        >
          <EditOutlined />
        </Button>
      ),
    },
  ];
  const handleAdd = () => {
    const newData = {
      key: count,
      malzemeKod: malzemeKod,
      malzemeTanim: "Arac",
      miktar: 23,
      birim: "Birim",
      fiyat: 23,
      araToplam: 23,
      kdvOran: 23,
      toplam: 23,
    };
    setDataSource([...dataSource, newData]);
    setCount(count + 1);
    setIsModalOpen(false);
    setMalzemeKod("");
  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    setDataSource(newData);
  };

  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={handleAdd}
    >
      {t("ekle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => setIsModalOpen(false)}
    >
      {t("iptal")}
    </Button>,
  ];

  const editModalFooter = [
    <Button key="submit" className="btn primary-btn km-update">
      Güncelle
    </Button>,
    <Button
      key="back"
      className="btn cancel-btn"
      onClick={() => setEditModal(false)}
    >
      Kapat
    </Button>,
  ];

  return (
    <div className="border p-20 mt-20 relative">
      <Button
        onClick={() => setIsModalOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
          position: "absolute",
          bottom: 10,
          zIndex: 9999,
        }}
      >
        {t("ekle")}
      </Button>
      <Table
        bordered
        dataSource={dataSource}
        columns={columns}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
        scroll={{ x: 1800 }}
      />
      <Modal
        title="Fiş Giriş Detayı"
        open={isOpen}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={500}
      >
        <label>Malzeme Kodu</label>
        <Input
          value={malzemeKod}
          onChange={(e) => setMalzemeKod(e.target.value)}
        />
      </Modal>

      <Modal
        title={"Düzenleme"}
        open={editModal}
        onCancel={() => setEditModal(false)}
        maskClosable={false}
        footer={editModalFooter}
        width={1000}
      >
        <div className="grid gap-1">
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("malzemeTanimi")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("miktar")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("birim")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("fiyat")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("araToplam")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("indirimOrani")} %</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("indirimTutari")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("kdvOrani")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("kdv")} D/H</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    defaultValue="dahil"
                    options={[
                      { value: "dahil", label: <span>Dahil</span> },
                      { value: "hariç", label: <span>Hariç</span> },
                    ]}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("kdvTutar")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("toplam")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => (
                  <InputNumber
                    {...field}
                    className="w-full"
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("plaka")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => <Plaka field={field} />}
              />
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col gap-1">
              <label>{t("lokasyon")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => <Location field={field} />}
              />
            </div>
          </div>
          <div className="col-span-12">
            <div className="flex flex-col gap-1">
              <label>{t("aciklama")}</label>
              <Controller
                name=""
                control={control}
                render={({ field }) => <TextArea field={field} />}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default MalzemeLists;
