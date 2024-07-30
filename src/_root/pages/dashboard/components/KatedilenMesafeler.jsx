import React, { useState, useEffect, useRef } from "react";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LabelList } from "recharts";
import { Button, Popover, Spin, Typography, Modal, DatePicker, Tour } from "antd";

import http from "../../../../api/http.jsx";
import { MoreOutlined, PrinterOutlined } from "@ant-design/icons";
import { Controller, useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import html2pdf from "html2pdf.js";

const { Text } = Typography;

const monthNames = ["", "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function KatedilenMesafeler(props = {}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExpandedModalVisible, setIsExpandedModalVisible] = useState(false); // Expanded modal visibility state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [baslamaTarihi, setBaslamaTarihi] = useState();
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useFormContext();

  useEffect(() => {
    const yilSecimiValue = watch("yilSecimiAylikKatEdilenMesefeler");
    if (!yilSecimiValue) {
      const currentYear = dayjs().format("YYYY");
      setBaslamaTarihi(currentYear);
    } else if (yilSecimiValue) {
      const yearOnly = yilSecimiValue.format("YYYY");
      setBaslamaTarihi(yearOnly);
    }
  }, [watch("yilSecimiAylikKatEdilenMesefeler")]);

  const fetchData = async () => {
    setIsLoading(true);
    const body = {
      startYear: baslamaTarihi || dayjs().year(),
    };
    try {
      const response = await http.post("Graphs/GetGraphInfoByType?type=9", body);

      // Sort the response by month number
      const sortedResponse = response.data.sort((a, b) => a.ay - b.ay);

      // Transform the data
      const transformedData = sortedResponse.map((item) => ({
        month: monthNames[item.ay],
        km: item.deger,
      }));

      setData(transformedData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (baslamaTarihi) {
      fetchData();
    }
  }, [baslamaTarihi]);

  const downloadPDF = () => {
    const element = document.getElementById("aylik-bakim");
    const opt = {
      margin: 10,
      filename: "aylik_bakim.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const showModal = (content) => {
    setModalContent(content);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible === true) {
      setValue("yilSecimiAylikKatEdilenMesefeler", null);
    }
  }, [isModalVisible]);

  const content1 = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => showModal("Yıl Seç")}>
        Yıl Seç
      </div>
    </div>
  );

  const content = (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      <div style={{ cursor: "pointer" }} onClick={() => setIsExpandedModalVisible(true)}>
        Büyüt
      </div>
      <Popover placement="right" content={content1} trigger="click">
        <div style={{ cursor: "pointer" }}>Süre Seçimi</div>
      </Popover>
      <div style={{ cursor: "pointer" }} onClick={() => setOpen(true)}>
        Bilgi
      </div>
    </div>
  );

  const steps = [
    {
      title: "Bilgi",
      description: (
        <div style={{ overflow: "auto", height: "100%", maxHeight: "400px" }}>
          <p>
            Bu grafik ile aylık bakım maliyetlerini daha kapsamlı bir şekilde analiz etmek ve raporlamak mümkündür. Bu bilgiler, bakım bütçesinin yönetimi, maliyet optimizasyonu ve
            gelecekteki planlama için önemli bir temel oluşturur.
          </p>
        </div>
      ),
      target: () => ref1.current,
    },
  ];

  return (
    <div
      style={{ width: "100%", height: "100%", borderRadius: "5px", backgroundColor: "white", display: "flex", flexDirection: "column", gap: "10px", border: "1px solid #f0f0f0" }}
    >
      <div style={{ padding: "10px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
        <Text
          title={`Aylık Bakım Maliyetleri${baslamaTarihi ? ` (${baslamaTarihi})` : ""}`}
          style={{ fontWeight: "500", fontSize: "17px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "calc(100% - 50px)" }}
        >
          Katedilen Mesafeler
          {baslamaTarihi && ` (${baslamaTarihi})`}
        </Text>
        <Popover placement="bottom" content={content} trigger="click">
          <Button type="text" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "0px 5px", height: "32px", zIndex: 3 }}>
            <MoreOutlined style={{ cursor: "pointer", fontWeight: "500", fontSize: "16px" }} />
          </Button>
        </Popover>
      </div>
      {isLoading ? (
        <Spin />
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", overflow: "auto", height: "100vh", padding: "10px" }}>
          <div style={{ width: "100%", height: "calc(100% - 5px)" }}>
            <ResponsiveContainer ref={ref1} width="100%" height="100%">
              <ScatterChart
                width="100%"
                height="100%"
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid />
                <XAxis type="category" dataKey="month" name="Ay" />
                <YAxis type="number" dataKey="km" name="Maliyet" unit="km" width={80} />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Aylık Araç Bakım Maliyeti" data={data} fill="#8884d8">
                  {/*<LabelList style={{ fill: "white" }} dataKey="km" position="top" />*/}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <Modal title="Tarih Seçimi" centered open={isModalVisible} onOk={handleOk} onCancel={handleCancel} destroyOnClose>
        {modalContent === "Yıl Seç" && (
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <div>Yıl Seç:</div>
            <Controller
              name="yilSecimiAylikKatEdilenMesefeler"
              control={control}
              render={({ field }) => <DatePicker {...field} picker="year" style={{ width: "130px" }} placeholder="Tarih seçiniz" />}
            />
          </div>
        )}
      </Modal>
      {/* Expanded Modal */}
      <Modal
        title={
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "98%" }}>
            <Text
              title={`Aylık Bakım Maliyetleri${baslamaTarihi ? ` (${baslamaTarihi})` : ""}`}
              style={{ fontWeight: "500", fontSize: "17px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "calc(100% - 50px)" }}
            >
              Katedilen Mesafeler
              {baslamaTarihi && ` (${baslamaTarihi})`}
            </Text>
            <PrinterOutlined style={{ cursor: "pointer", fontSize: "20px" }} onClick={downloadPDF} />
          </div>
        }
        centered
        open={isExpandedModalVisible}
        onOk={() => setIsExpandedModalVisible(false)}
        onCancel={() => setIsExpandedModalVisible(false)}
        width="90%"
        destroyOnClose
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "7px", overflow: "auto", height: "calc(100vh - 180px)" }}>
          <ResponsiveContainer id="aylik-bakim" width="100%" height="100%">
            <ScatterChart
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis type="category" dataKey="month" name="Ay" />
              <YAxis type="number" dataKey="km" name="Maliyet" unit="km" width={80} />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Aylık Araç Bakım Maliyeti" data={data} fill="#8884d8">
                <LabelList style={{ fill: "white" }} dataKey="km" position="top" />
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </Modal>
    </div>
  );
}

export default KatedilenMesafeler;
