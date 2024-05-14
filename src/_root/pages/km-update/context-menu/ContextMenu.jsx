import { Button } from "antd";

const ContextMenu = ({ position, rowData }) => {

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

    return (
        <div style={style} className="context-menu">
            <Button>Kilometre Güncelleme Geçmişi: {rowData?.plaka}</Button>
            <Button>Güncel Km Düzeltme</Button>
            <Button>Km Sıfırlama</Button>
        </div>
    );
};

export default ContextMenu;
