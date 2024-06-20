import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Modal, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import GeneralInfo from "./GeneralInfo";
import MalzemeLists from "./MalzemeLists";
import EkBilgiler from "./EkBilgiler";
import dayjs from "dayjs";
import { GirisFisCodeGetService } from "../../../../api/service";

const AddModal = ({ setStatus }) => {
  const [isOpen, setIsModalOpen] = useState(false);
  const [tableData, setTableData] = useState([]);


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

  const { handleSubmit, reset, setValue } = methods;

  const onSubmit = handleSubmit((values) => {
    console.log(values)
    let materialMovements = [];
    tableData.map(item => {
      console.log(item)
      materialMovements.push({
        "siraNo": 0,
        "mlzAracId": item.key,
        "tarih": dayjs(values.tarih).format("YYYY-MM-DD"),
        "firmaId": 0,
        "malzemeId": 0,
        "birimKodId": item.birim,
        "lokasyonId": item.lokasyon,
        "miktar": item.miktar,
        "fiyat": item.fiyat,
        "toplam": +item.toplam,
        "gc": 0,
        "aciklama": values.aciklama,
        "kdvOran": item.kdvOran,
        "indirim": item.indirimTutar,
        "mlzFisId": 0,
        "araToplam": item.araToplam,
        "kdvToplam": +values.toplam_kdvToplam,
        "girisDepoSiraNo": values.girisDepoSiraNo,
        "indirimOran": item.indirimOran,
        "isPriceChanged": false,
        "stoklu": true
      })
    })

    const body = {
      fisNo: values.fisNo,
      tarih: dayjs(values.tarih).format("YYYY-MM-DD"),
      saat: dayjs(values.saat).format("HH:mm:ss"),
      girisDepoSiraNo: values.girisDepoSiraNo,
      firmaId: values.firmaId,
      lokasyonId: values.lokasyonId,
      aracId: values.aracId,
      islemTipiKodId: values.islemTipiKodId,
      aciklama: values.aciklama,
      "araToplam": values.toplam_araToplam,
      "indirimliToplam": values.toplam_indirim,
      "kdvToplam": values.toplam_kdvToplam,
      "genelToplam": values.toplam_genelToplam,
      // materialMovements
    };

    console.log(body)
    
  })

  useEffect(() => {
    GirisFisCodeGetService().then((res) => setValue("fisNo", res.data));
  }, [isOpen]);

  useEffect(() => {
    if (tableData.length > 0) {
      const initialTotals = {
        araToplam: 0,
        genelToplam: 0,
        indirimToplam: 0,
        kdvToplam: 0
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
    <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
      Kaydet
    </Button>,
    <Button
      key="back"
      className="btn btn-min cancel-btn"
      onClick={() => {
        setIsModalOpen(false);
        reset(defaultValues);
      }}
    >
      İptal
    </Button>,
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
      >
        <FormProvider {...methods}>
          <form>
            <GeneralInfo />
            <MalzemeLists setTableData={setTableData} tableData={tableData} />
            <EkBilgiler />
          </form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default AddModal;
