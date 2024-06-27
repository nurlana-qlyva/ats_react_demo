import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { DetailInfoGetService } from '../../../../../api/service'
import { Button, ColorPicker, Modal } from 'antd'
import Car from './svg/Car'
import EkspertizTable from './components/EkspertizTable'
import TextArea from 'antd/es/input/TextArea'

dayjs.locale('tr')

const boya = {
    width: "20px",
    height: "20px",
    background: "orangered",
    borderRadius: "4px"
}

const cizik = {
    width: "20px",
    height: "20px",
    background: "#17a2b8",
    borderRadius: "4px"
}

const degisen = {
    width: "20px",
    height: "20px",
    background: "#5b548b",
    borderRadius: "4px"
}

const orjinal = {
    width: "20px",
    height: "20px",
    background: "#6c757d",
    borderRadius: "4px"
}

const Ekspertiz = ({ visible, onClose, id }) => {
    const [status, setStatus] = useState(false)

    const defaultValues = {}

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, setValue } = methods

    useEffect(() => {
        DetailInfoGetService(id).then(res => {
            //     setValue("aciklama", res?.data.aciklama)
            //     setValue("aracCinsi", res?.data.aracCinsi ? res?.data.aracCinsi : "")
            //     setValue("aracSinifi", res?.data.aracSinifi)
            //     setValue("ayaktaYolcuSayisi", res?.data.ayaktaYolcuSayisi)
            //     setValue("belgeSeriNo", res?.data.belgeSeriNo)
            //     setValue("dtyAracId", res?.data.dtyAracId)
            //     setValue("hakMahrumiyet", res?.data.hakMahrumiyet)
            //     setHakMahrumiyetChecked(res?.data.hakMahrumiyet)
            //     setValue("hakMahrumiyetAciklama", res?.data.hakMahrumiyetAciklama)
            //     setValue("hakMahrumiyetDurum", res?.data.hakMahrumiyetDurum)
            //     setValue("hakMahrumiyettarih", res?.data.hakMahrumiyettarih && res?.data.hakMahrumiyettarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.hakMahrumiyettarih) : null)
            //     setValue("hususi", res?.data.hususi)
            //     setValue("il", res?.data.il)
            //     setValue("ilSehirId", res?.data.ilSehirId)
            //     setValue("ilce", res?.data.ilce)
            //     setValue("istiapHaddi", res?.data.istiapHaddi)
            //     setValue("istiapHaddiBirim", res?.data.istiapHaddiBirim)
            //     setValue("istiapHaddiBirimKodId", res?.data.istiapHaddiBirimKodId)
            //     setValue("koltukSayisi", res?.data.koltukSayisi)
            //     setValue("kullanimAmaci", res?.data.kullanimAmaci)
            //     setValue("rAzamiIstiapHaddiBirim", res?.data.rAzamiIstiapHaddiBirim)
            //     setValue("rAzamiIstiapHaddiBirimKodId", res?.data.rAzamiIstiapHaddiBirimKodId)
            //     setValue("rAzamiYuklu", res?.data.rAzamiYuklu)
            //     setValue("azamiYukluAgirligi", res?.data.azamiYukluAgirligi)
            //     setValue("onayNo", res?.data.onayNo)
            //     setValue("resmi", res?.data.resmi)
            //     setValue("romok", res?.data.romok)
            //     setValue("ruhsatSahibi", res?.data.ruhsatSahibi)
            //     setValue("ruhsatSahibiKodId", res?.data.ruhsatSahibiKodId)
            //     setValue("taksiMetre", res?.data.taksiMetre)
            //     setValue("tescilNo", res?.data.tescilNo)
            //     setValue("tescilTarih", res?.data.tescilTarih && res?.data.tescilTarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.tescilTarih) : null)
            //     setValue("ticari", res?.data.ticari)
            //     setValue("ticariAdi", res?.data.ticariAdi)
            //     setValue("tokograf", res?.data.tokograf)
            //     setValue("trafikciktarih", res?.data.trafikciktarih && res?.data.trafikciktarih !== '1970-01-01T00:00:00' ? dayjs(res?.data.trafikciktarih) : null)
            //     setValue("vergiDaire", res?.data.vergiDaire)
            //     setValue("vergiNo", res?.data.vergiNo)
            //     setValue("yolcuNakli", res?.data.yolcuNakli)
            //     setValue("yukNakli", res?.data.yukNakli)
        })
    }, [id, status])

    const onSumbit = handleSubmit((values) => {
        const body = {}

        // DetailInfoUpdateService(body).then(res => {
        //     if (res.data.statusCode === 202) {
        //         setStatus(true)
        //         onClose()
        //     }
        // })
    })

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn" onClick={onSumbit}>
                Kaydet
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={onClose}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title="Ekspertiz Bilgileri"
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1400}
        >
            <div className="grid gap-1">
                <div className="col-span-7">
                    <Car />
                    <div className="grid mt-10">
                        <div className="col-span-3 flex gap-1">
                            <div style={boya}></div>
                            <p>Boyalı</p>
                        </div>
                        <div className="col-span-3 flex gap-1">
                            <div style={cizik}></div>
                            <p>Çizik</p>
                        </div>
                        <div className="col-span-3 flex gap-1">
                            <div style={degisen}></div>
                            <p>Değişen</p>
                        </div>
                        <div className="col-span-3 flex gap-1">
                            <div style={orjinal}></div>
                            <p>Orjinal</p>
                        </div>
                    </div>
                </div>
                <div className="col-span-5">
                    <EkspertizTable />
                </div>
                <div className="col-span-6 mt-20">
                    <label>Ekspertiz Açıklama</label>
                    <TextArea />
                </div>
                <div className="col-span-6 mt-20">
                    <label>Ekspertiz Ek Açıklama</label>
                    <TextArea />
                </div>
            </div>
        </Modal>
    )
}

export default Ekspertiz
