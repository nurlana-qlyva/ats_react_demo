import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { t } from "i18next";
import { Button, Modal } from "antd";
import { GetMaterialReceiptByIdService } from "../../../../api/service";
import GeneralInfo from "../add/GeneralInfo";
import EkBilgiler from "../add/EkBilgiler";
import MalzemeLists from "./MalzemeLists";

const UpdateModal = ({
  updateModal,
  setUpdateModal,
  id,
  setStatus,
  status,
}) => {
  const [tableData, setTableData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

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
      setValue("aciklama", res?.data?.receipt.aciklama);
      setValue("mlzFisId", res?.data?.receipt.mlzFisId);
      setValue("saat", dayjs(res?.data?.receipt.saat, "HH:mm:ss"));
      setValue("tarih", dayjs(res?.data?.receipt.tarih));
      setTableData(res?.data?.receipt.materialMovements);
    });
  }, [id]);

  const footer = [
    <Button key="submit" className="btn btn-min primary-btn">
      {t("guncelle")}
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setUpdateModal(false);
        setStatus(true);
      }}
    >
      {t("iptal")}
    </Button>,
  ];

  return (
    <>
      <Modal
        title={t("yakitBilgisiGuncelle")}
        open={updateModal}
        onCancel={() => setUpdateModal(false)}
        maskClosable={false}
        footer={footer}
        width={1200}
      >
        <FormProvider {...methods}>
          <form>
            <GeneralInfo />
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

export default UpdateModal;
