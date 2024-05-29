import { useContext, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import tr_TR from "antd/lib/locale/tr_TR";
import {
  Button,
  Checkbox,
  ConfigProvider,
  DatePicker,
  Input,
  InputNumber,
  message,
  Modal,
  TimePicker,
} from "antd";
import { ArrowUpOutlined } from "@ant-design/icons";
import { PlakaContext } from "../../../../../../context/plakaSlice";
import {
  DetailInfoUpdateService,
  KMValidateService,
  YakitHistoryGetService,
} from "../../../../../../api/service";
import Driver from "../../../../../components/form/Driver";
import FuelType from "../../../../../components/form/FuelType";
import FuelTank from "../../../../../components/form/FuelTank";
import Plaka from "../../../../../components/form/Plaka";

dayjs.locale("tr");

const GeneralInfo = () => {
  const { control, setValue } = useFormContext();
  const { data } = useContext(PlakaContext);

  const [alinanKm, setAlinanKm] = useState(0);
  const [fark, setFark] = useState(0);
  const [miktar, setMiktar] = useState(0);
  const [full, setFull] = useState(false);
  const [tuketim, setTuketim] = useState(0);
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState("normal");
  const [tutar, setTutar] = useState(0);
  const [history, setHistory] = useState(0);
  const [yakitHacmi, setYakitHacmi] = useState(data.yakitHacmi);

  useEffect(() => {
    const frk = alinanKm - data.sonAlinanKm;

    if (frk === 0) {
      setFark(0);
      return;
    }

    if (full) {
      if (frk > 0) {
        const tktm = (miktar / frk).toFixed(2);
        setTuketim(tktm);
      } else {
        setTuketim(0);
      }
    } else {
      if (!data.fullDepo) {
        if (fark > 0) {
          const tktm = (data.miktar / fark).toFixed(2);
          setTuketim(tktm);
        } else {
          setTuketim(0);
        }
      } else {
        if (data.yakitHacmi === 0) {
          console.log(1);
          message.open({
            type: "warning",
            content: "This is a warning message",
          });
        }

        const tktm = (data.yakitHacmi / fark).toFixed(2);
        setTuketim(tktm);
      }
    }
  }, [full, miktar]);

  useEffect(() => {
    setValue("surucuId", data.surucuId);
    setValue("tarih", dayjs(new Date()));
    setValue("saat", dayjs(new Date()));
    setValue("sonAlinanKm", data.sonAlinanKm);
    setValue("litreFiyat", data.litreFiyat);
    setValue("yakitHacmi", data.yakitHacmi);
    setValue("yakitTip", data.yakitTip);
    setValue("yakitTipId", data.yakitTipId);
    setValue("plaka", data.plaka);

    YakitHistoryGetService(data.aracId).then((res) => setHistory(res.data));
  }, [data]);

  const updateDepoHacmi = () => {
    const body = {
      dtyAracId: data.aracId,
      yakitHacmi: yakitHacmi,
    };

    DetailInfoUpdateService(body).then((res) => {
      if (res?.data.statusCode === 202) {
        setOpen(false);
      }
    });
  };

  const handleValidateKm = () => {
    const body = {
      siraNo: 0,
      kmAracId: data.aracId,
      seferSiraNo: 0,
      yakitSiraNo: 0,
      plaka: data.plaka,
      tarih: data.tarih,
      saat: data.saat,
      eskiKm: data.sonAlinanKm,
      yeniKm: alinanKm,
      fark: 0,
      kaynak: "YAKIT",
      dorse: true,
      aciklama: "",
    };
    if (alinanKm) {
      KMValidateService(body).then((res) => {
        if (res?.data.statusCode === 400) {
          setResponse("error");
        } else if (res?.data.statusCode === 200) {
          setResponse("success");
        }
      });
    } else {
      setResponse("normal");
    }
  };

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn">
      Kaydet
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setOpen(false);
        setMiktar(0);
      }}
    >
      İptal
    </Button>,
  ];

  return (
    <>
      <div className="grid gap-1 border p-10 mt-10">
        <div className="col-span-12">
          <div className="grid">
            <div
              className="col-span-2 flex flex-col"
              style={{ textAlign: "center" }}
            >
              <p style={{ fontSize: "14px" }}>
                {dayjs(history[2]?.tarih).format("DD.MM.YYYY")}
              </p>
              <div>
                <img
                  src="/images/kirmizi.svg"
                  alt=""
                  style={{ width: "20%" }}
                />
              </div>
              <p style={{ fontSize: "14px" }}>{history[2]?.alinanKm}</p>
              <p style={{ fontSize: "14px" }}>{history[2]?.miktar} Lt.</p>
              <p style={{ fontSize: "14px" }}>{history[2]?.tuketim} Lt.Km..</p>
            </div>
            <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
              <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
              <p>{history[1]?.farkKm} km</p>
            </div>
            <div
              className="col-span-2 flex flex-col"
              style={{ textAlign: "center" }}
            >
              <p style={{ fontSize: "14px" }}>
                {dayjs(history[1]?.tarih).format("DD.MM.YYYY")}
              </p>
              <div>
                <img
                  src="/images/kirmizi.svg"
                  alt=""
                  style={{ width: "20%" }}
                />
              </div>
              <p style={{ fontSize: "14px" }}>{history[1]?.alinanKm}</p>
              <p style={{ fontSize: "14px" }}>{history[1]?.miktar} Lt.</p>
              <p style={{ fontSize: "14px" }}>{history[1]?.tuketim} Lt.Km..</p>
            </div>
            <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
              <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
              <p>{history[0]?.farkKm} km</p>
            </div>
            <div
              className="col-span-2 flex flex-col"
              style={{ textAlign: "center" }}
            >
              <p style={{ fontSize: "14px" }}>
                {dayjs(history[0]?.tarih).format("DD.MM.YYYY")}
              </p>
              <div>
                <img src="/images/Mor.svg" alt="" style={{ width: "20%" }} />
              </div>
              <p style={{ fontSize: "14px" }}>{history[0]?.alinanKm}</p>
              <p style={{ fontSize: "14px" }}>{history[0]?.miktar} Lt.</p>
              <p style={{ fontSize: "14px" }}>{history[0]?.tuketim} Lt.Km..</p>
            </div>
            <div className="col-span-1 mt-20" style={{ textAlign: "center" }}>
              <img src="/images/yol.svg" alt="" style={{ width: "70%" }} />
              <p>{fark} km</p>
            </div>
            <div className="col-span-2 mt-20" style={{ textAlign: "center" }}>
              <div>
                <img src="/images/Araba.svg" alt="" style={{ width: "40%" }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        maskClosable={false}
        title="Depo Hacmi Girişi"
        footer={footer}
        onCancel={() => setOpen(false)}
      >
        <Input onChange={(e) => setYakitHacmi(e.target.value)} />
      </Modal>
    </>
  );
};

GeneralInfo.propTypes = {
  data: PropTypes.object,
};

export default GeneralInfo;
