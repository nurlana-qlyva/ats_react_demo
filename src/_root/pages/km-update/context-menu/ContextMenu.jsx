import { Button, Modal } from "antd";
import { useEffect, useRef, useState } from "react";
import KmHistory from "./KmHistory"

const ContextMenu = ({ position, rowData }) => {
    const [visible, setVisible] = useState(false)
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


    const footer = (
        [
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                Kapat
            </Button>
        ]
    )

    return (
        <div style={style} className="context-menu" ref={modalRef}>
            <Button onClick={() => setVisible(true)}>Kilometre Güncelleme Geçmişi: {rowData?.plaka}</Button>
            <Button>Güncel Km Düzeltme</Button>
            <Button>Km Sıfırlama</Button>
            <Modal
                title={`Kilometre Güncelleme Geçmişi: ${rowData?.plaka}`}
                open={visible}
                onCancel={onClose}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <div onClick={(e) => e.stopPropagation()}>
                    <KmHistory data={rowData} />
                </div>
            </Modal>
        </div>
    );
};

export default ContextMenu;
