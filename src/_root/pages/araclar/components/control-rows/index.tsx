import { useState } from 'react';
// components
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ControlRows = () => {
    const [visible, setVisible] = useState<boolean>(false);

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-times" onClick={() => setVisible(false)} className="save-btn" />
            <Button label="İptal" icon="pi pi-check" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <div className="card flex">
            <Button label="" icon="pi pi-align-left" onClick={() => setVisible(true)} className='add-btn' />
            <Dialog visible={visible} style={{ width: '70vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                sutunlar
            </Dialog>
        </div>
    )
}

export default ControlRows
