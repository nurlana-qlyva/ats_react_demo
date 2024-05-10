
const ContextMenu = ({ visible, x, y }) => {
    if (!visible) return null;

    const style = {
        position: 'absolute',
        left: x,
        top: y,
        border: '1px solid #ccc',
        backgroundColor: '#fff',
        padding: '5px',
    };

    return (
        <div style={style}>
            <div>Option 1</div>
            <div>Option 2</div>
            <div>Option 3</div>
        </div>
    );
};

export default ContextMenu;
