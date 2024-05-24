import { Button, Input, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import KmHistory from "./KmHistory"
import dayjs from "dayjs";
import { KMEditService, KMResetService } from "../../../../api/service";

const ContextMenu = ({ position, rowData, setStatus }) => {
    const [visible, setVisible] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
    const [yeniKm, setYeniKm] = useState(false)
    const modalRef = useRef()

    const style = {
        position: 'absolute',
        left: position.x,
        top: position.y,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        zIndex: 200,
        padding: 20,
        boxShadow: "0px 0px 10px 1px rgba(0,0,0,.2)"
    };

    const onClose = () => {
        setVisible(false);
    }

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const resetKm = () => {
        const body = {
            kmAracId: rowData.aracId,
            plaka: rowData.plaka,
            tarih: dayjs(rowData.tarih, "DD.MM.YYYY").format("YYYY-MM-DD"),
            saat: rowData.saat,
            kaynak: "SIFIRLAMA",
            seferSiraNo: 0,
            yakitSiraNo: 0,
            aciklama: ""
        }
        KMResetService(body).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
        setIsModalOpen(false);
        setStatus(false)

    }


    useEffect(() => {
        if (visible) {
            document.addEventListener('click', handleOutsideClick);
        } else {
            document.removeEventListener('click', handleOutsideClick);
        }
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [visible]);

    const handleReset = () => {
        setIsModalOpen(true)
    }


    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    const resetFooter = (
        [
            <Button key="submit" className="btn primary-btn km-update" onClick={resetKm}>
                Sıfırla
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    const updateKm = () => {
        const body = {
            kmAracId: rowData.aracId,
            plaka: rowData.plaka,
            tarih: dayjs(rowData.tarih, "DD.MM.YYYY").format("YYYY-MM-DD"),
            saat: rowData.saat,
            kaynak: "DÜZELTME",
            seferSiraNo: 0,
            yakitSiraNo: 0,
            aciklama: "",
            eskiKm: rowData.guncelKm,
            yeniKm: yeniKm
        }

        KMEditService(body).then(res => {
            if (res?.data.statusCode === 202) {
                setStatus(true)
            }
        })
        setIsUpdateModalOpen(false)
        setStatus(false)
    }

    const updateFooter = (
        [
            <Button key="submit" className="btn primary-btn km-update" onClick={updateKm}>
                Düzenle
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )
    return (
        <div style={style} className="context-menu" ref={modalRef}>
            <Button onClick={() => setVisible(true)}>Kilometre Güncelleme Geçmişi: {rowData?.plaka}</Button>
            <Button onClick={() => setIsUpdateModalOpen(true)}>Güncel Km Düzeltme</Button>
            <Button onClick={handleReset}>Km Sıfırlama</Button>
            <Modal
                title={`Kilometre Güncelleme Geçmişi: ${rowData?.plaka}`}
                open={visible}
                onCancel={onClose}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <KmHistory data={rowData} setTable={setStatus} />
                </div>
            </Modal>

            <Modal title="Güncel Km Sıfırlamaya Eminmisiniz?" footer={resetFooter} open={isModalOpen} onCancel={handleCancel}>
            </Modal>

            <Modal title="Güncel Km Düzenle" footer={updateFooter} open={isUpdateModalOpen} onCancel={() => setIsUpdateModalOpen(false)} maskClosable={false} onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap-1" onClick={(e) => e.stopPropagation()}>
                    <div>
                        <label htmlFor="">Güncel Km</label>
                        <Input value={rowData.guncelKm} disabled />
                    </div>
                    <div>
                        <label htmlFor="">Yeni Km</label>
                        <Input onChange={(e) => setYeniKm(e.target.value)}/>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ContextMenu;
