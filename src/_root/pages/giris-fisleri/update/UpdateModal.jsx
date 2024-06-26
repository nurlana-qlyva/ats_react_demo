import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, Modal } from "antd";
import {
  CodeItemValidateService,
  GetMaterialReceiptByIdService,
} from "../../../../api/service";
import GeneralInfo from "../add/GeneralInfo";
import EkBilgiler from "../add/EkBilgiler";
import MalzemeLists from "./MalzemeLists";
import { UpdateMaterialReceiptService } from "../../../../api/services/girisfis_services";

const UpdateModal = ({
  updateModal,
  setUpdateModal,
  id,
  setStatus,
  status,
}) => {
  const [tableData, setTableData] = useState([]);
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [record, setRecord] = useState(true);

  const defaultValues = {
    fisNo: record.fisNo,
    tarih: dayjs(record.tarih),
    saat: dayjs(record.saat, "HH:mm:ss"),
    girisDepoSiraNo: record.girisDepoSiraNo,
    girisDepo: record.girisDepo,
    firmaId: record.firmaId,
    lokasyonId: record.lokasyonId,
    lokasyon: record.lokasyon,
    aracId: record.aracId,
    plaka: record.plaka,
    islemTipiKodId: record.islemTipiKodId,
    islemTipi: record.islemTipi,
    aciklama: record.aciklama,
    toplam_indirim: record.indirimliToplam,
    toplam_araToplam: record.araToplam,
    toplam_kdvToplam: record.kdvToplam,
    toplam_genelToplam: record.genelToplam,
  };

  const methods = useForm({
    defaultValues: defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;

  useEffect(() => {
    GetMaterialReceiptByIdService(id).then((res) => {
      setValue("toplam_araToplam", res?.data?.receipt.araToplam);
      setValue("fisNo", res?.data?.receipt.fisNo);
      setValue("toplam_genelToplam", res?.data?.receipt.genelToplam);
      setValue("girisDepoSiraNo", res?.data?.receipt.girisDepoSiraNo);
      setValue("depo", res?.data?.receipt.girisDepo);
      setValue("toplam_indirim", res?.data?.receipt.indirimliToplam);
      setValue("islemTipiKodId", res?.data?.receipt.islemTipiKodId);
      setValue("islemTipi", res?.data?.receipt.islemTipi);
      setValue("toplam_kdvToplam", res?.data?.receipt.kdvToplam);
      setValue("lokasyonId", res?.data?.receipt.lokasyonId);
      setValue("lokasyon", res?.data?.receipt.lokasyon);
      setValue("plaka", res?.data?.receipt.plaka);
      setValue("aracId", res?.data?.receipt.aracId);
      setValue("firmaId", res?.data?.receipt.firmaId);
      setValue("unvan", res?.data?.receipt.firmaTanim);
      setValue("aciklama", res?.data?.receipt.aciklama);
      setValue("mlzFisId", res?.data?.receipt.mlzFisId);
      setValue("saat", dayjs(res?.data?.receipt.saat, "HH:mm:ss"));
      setValue("tarih", dayjs(res?.data?.receipt.tarih));
      setData(res?.data?.receipt.materialMovements);
      setRecord(res?.data?.receipt);
    });
  }, [id, updateModal]);

  useEffect(() => {
    if (updateModal && watch("fisNo")) {
      const body = {
        tableName: "Fis",
        code: watch("fisNo"),
      };
      CodeItemValidateService(body).then((res) => {
        if (!res.data.status) {
          setIsValid(false);
        }
      });
      setIsValid(true);
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
  const onSubmit = handleSubmit((values) => {
    let materialMovements = [];
    tableData.map((item) => {
      materialMovements.push({
        mlzFisId: values.mlzFisId,
        siraNo: item.siraNo ? item.siraNo : 0,
        mlzAracId: item.mlzAracId || 0,
        tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
        firmaId: values.firmaId || 0,
        malzemeId: item.key,
        birimKodId: item.birimId || 0,
        lokasyonId: item.lokasyonId || 0,
        miktar: item.miktar || 0,
        fiyat: item.fiyat || 0,
        toplam: +item.toplam || 0,
        aciklama: item.aciklama,
        kdvOran: item.kdvOran || 0,
        indirim: item.indirimTutar || 0,
        araToplam: item.araToplam || 0,
        kdvToplam: +values.toplam_kdvToplam || 0,
        girisDepoSiraNo: values.girisDepoSiraNo || 0,
        indirimOran: item.indirimOran || 0,
        isPriceChanged: item.isPriceChanged,
        kdvDahilHaric:
          item.kdvDH === "Dahil" || item.kdvDH === "dahil" ? true : false,
      });
    });

    const body = {
      mlzFisId: values.mlzFisId,
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

    UpdateMaterialReceiptService(body).then((res) => {
      if (res?.data.statusCode === 202) {
        setStatus(true);
        setUpdateModal(false);
        reset(defaultValues);
        setTableData([]);
        setIsSuccess(true);
      }
    });
    setStatus(false);
  });

  const footer = [
    <Button
      key="submit"
      className="btn btn-min primary-btn"
      //   disabled={!isValid}
      onClick={onSubmit}
    >
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        setTableData([]);
        setIsSuccess(true);
        reset(defaultValues);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <Modal
        title="Fiş Giriş Bilgisi Güncelle"
        open={updateModal}
        onCancel={() => setUpdateModal(false)}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <FormProvider {...methods}>
          <form>
            <GeneralInfo isValid={isValid} />
            <MalzemeLists
              setTableData={setTableData}
              tableData={tableData}
              isSuccess={isSuccess}
              setIsSuccess={setIsSuccess}
              data={data}
            />
            <EkBilgiler />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default UpdateModal;
