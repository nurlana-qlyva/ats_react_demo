
const ContextMenu = ({ visible}) => {
    if (!visible) return null;

    const style = {
        position: 'absolute',
        left: 0,
        top: '50px',
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        zIndex: 2000,
        padding: 20,
        boxShadow: "0px 0px 10px 1px rgba(0,0,0,.2)"
    };

    return (
        <div style={style} className="context-menu">
            <ul>
                <li>Kilometre Güncelleme Geçmişi</li>
                <li>Güncel Km Düzeltme</li>
                <li>Km Sıfırlama</li>
            </ul>
        </div>
    );
};

export default ContextMenu;
