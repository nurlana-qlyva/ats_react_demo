import { useEffect, useState, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Popconfirm, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GeneralInfo from "./GeneralInfo";
import MalzemeLists from "./MalzemeLists";
import EkBilgiler from "./EkBilgiler";
import dayjs from "dayjs";
import {
  CodeItemValidateService,
  GirisFisCodeGetService,
  GirisFisleriAddService,
} from "../../../../api/service";
import { t } from "i18next";

const AddModal = ({ setStatus }) => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const isFirstRender = useRef(true);

  const defaultValues = {
    fisNo: "",
    tarih: dayjs(new Date()),
    saat: dayjs(new Date()),
    girisDepoSiraNo: null,
    girisDepo: "",
    firmaId: null,
    lokasyonId: null,
    lokasyon: "",
    aracId: null,
    plaka: "",
    islemTipiKodId: null,
    islemTipi: "",
    aciklama: "",
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;
  const onSubmit = handleSubmit((values) => {
    let materialMovements = [];
    tableData.map((item) => {
      materialMovements.push({
        mlzAracId: values.aracId || 0,
        tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
        firmaId: values.firmaId || 0,
        malzemeId: item.key,
        birimKodId: item.birimId || 0,
        lokasyonId: item.lokasyonId || 0,
        miktar: item.miktar || 0,
        fiyat: item.fiyat || 0,
        toplam: +item.toplam || 0,
        aciklama: values.aciklama,
        kdvOran: item.kdvOran || 0,
        indirim: item.indirimTutar || 0,
        araToplam: item.araToplam || 0,
        kdvToplam: +values.toplam_kdvToplam || 0,
        girisDepoSiraNo: values.girisDepoSiraNo || 0,
        indirimOran: item.indirimOran || 0,
        isPriceChanged: false,
        kdvDahilHaric: item.kdvDH === "Dahil" || item.kdvDH === "dahil" ? true : false
      });
    });

    const body = {
      fisNo: values.fisNo,
      tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
      saat: dayjs(values.saat).format("HH:mm:ss"),
      girisDepoSiraNo: values.girisDepoSiraNo || 0,
      firmaId: values.firmaId || 0,
      lokasyonId: values.lokasyonId || 0,
      aracId: values.aracId || 0,
      islemTipiKodId: values.islemTipiKodId || 0,
      aciklama: values.aciklama,
      araToplam: values.toplam_araToplam,
      indirimliToplam: values.toplam_indirim,
      kdvToplam: values.toplam_kdvToplam,
      genelToplam: values.toplam_genelToplam,
      materialMovements,
    };

    GirisFisleriAddService(body).then((res) => {
      if (res?.data.statusCode === 200) {
        setStatus(true);
        setIsModalOpen(false);
        reset(defaultValues);
        setTableData([]);
        setIsSuccess(true);
      }
    });
    setStatus(false);
  });

  useEffect(() => {
    if (isOpen && isFirstRender.current) {
      GirisFisCodeGetService().then((res) => setValue("fisNo", res.data));
    }
  }, [isOpen, setValue]);

  useEffect(() => {
    if (isOpen && watch("fisNo")) {
      const body = {
        tableName: "Fis",
        code: watch("fisNo"),
      };
      CodeItemValidateService(body).then((res) => {
        if (!res.data.status) {
          setIsValid(true);
        }
      });
      setIsValid(false);
    }
  }, [watch("fisNo")]);

  useEffect(() => {
    if (tableData.length > 0) {
      const initialTotals = {
        araToplam: 0,
        genelToplam: 0,
        indirimToplam: 0,
        kdvToplam: 0,
      };

      const totals = tableData.reduce((acc, item) => {
        acc.araToplam += +item.araToplam || 0;
        acc.genelToplam += +item.toplam || 0;
        acc.indirimToplam += +item.indirimTutar || 0;
        acc.kdvToplam += +item.kdvTutar || 0;
        return acc;
      }, initialTotals);

      setValue("toplam_araToplam", totals.araToplam.toFixed(2));
      setValue("toplam_genelToplam", totals.genelToplam.toFixed(2));
      setValue("toplam_indirim", totals.indirimToplam.toFixed(2));
      setValue("toplam_kdvToplam", totals.kdvToplam.toFixed(2));
    }
  }, [tableData, setValue]);

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      onClick={onSubmit}
      disabled={!isValid}
    >
      Kaydet
    </Button>,
    <Popconfirm
      title="Bilgileri Kaydetmeden Çıkılsın mı?"
      okText={t("ok")}
      cancelText={t("cancel")}
      onConfirm={() => {
        setIsModalOpen(false);
        reset(defaultValues);
        setTableData([]);
        setIsSuccess(true);
      }}
    >
      <Button className="btn btn-min cancel-btn">{t("iptal")}</Button>
    </Popconfirm>,
  ];

  return (
    <>
      <Button className="btn primary-btn" onClick={() => setIsModalOpen(true)}>
        <PlusOutlined /> Ekle
      </Button>
      <Modal
        title="Fiş Giriş Detayı"
        open={isOpen}
        onCancel={() => setIsModalOpen(false)}
        maskClosable={false}
        footer={footer}
        width={1300}
        closeIcon={null}
        // closable={false}
      >
        <FormProvider {...methods}>
          <form>
            <GeneralInfo isValid={isValid} />
            <MalzemeLists
              setTableData={setTableData}
              tableData={tableData}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
            />
            <EkBilgiler />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddModal;
