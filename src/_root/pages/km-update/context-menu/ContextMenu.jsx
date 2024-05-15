import { Button, Modal } from "antd";
import { useState } from "react";

const ContextMenu = ({ position, rowData }) => {
    const [visible, setVisible] = useState(false)

    const style = {
        position: 'absolute',
        left: position.x - 280,
        top: position.y - 230,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        zIndex: 2000,
        padding: 20,
        boxShadow: "0px 0px 10px 1px rgba(0,0,0,.2)"
    };

    const onClose = () => {

    }

    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    return (
        <div style={style} className="context-menu">
            <Button onClick={() => setVisible(true)}>Kilometre Güncelleme Geçmişi: {rowData?.plaka}</Button>
            <Button>Güncel Km Düzeltme</Button>
            <Button>Km Sıfırlama</Button>
            <Modal
                title="Yakıt Bilgileri Plaka: [16 EG 1231 [BMW - X6]]"
                open={visible}
                onCancel={onClose}
                maskClosable={false}
                footer={footer}
                width={1200}
            >

            </Modal>
        </div>
    );
};

export default ContextMenu;
