import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Modal, Popconfirm, Table } from "antd";
import { t } from "i18next";

const MalzemeLists = () => {
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
      title: t("kdvOrani"),
      dataIndex: "kdvOran",
    },
    {
      title: t("toplam"),
      dataIndex: "toplam",
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
    setIsModalOpen(false)
    setMalzemeKod("")
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

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn" onClick={handleAdd}>
      {t("ekle")}
    </Button>,
    <Button key="back" className="btn btn-min cancel-btn">
      İptal
    </Button>,
  ];

  return (
    <div>
      <Button
        onClick={() => setIsModalOpen(true)}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        {t("ekle")}
      </Button>
      <Table bordered dataSource={dataSource} columns={columns} />

      <Modal
        title="Fiş Giriş Detayı"
        open={isOpen}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={500}
      >
        <label>Malzeme Kodu</label>
        <Input value={malzemeKod} onChange={(e) => setMalzemeKod(e.target.value)} />
      </Modal>
    </div>
  );
};

export default MalzemeLists;
