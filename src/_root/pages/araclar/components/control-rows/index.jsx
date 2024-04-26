import { useState } from 'react';
// components
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

const ControlRows = ({ header }) => {
    const [visible, setVisible] = useState(false);

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-check" onClick={() => setVisible(false)} className="save-btn" />
            <Button label="İptal" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <div className="card flex relative">
            {visible && (
                <div className='columns-row'>
                    {header}
                </div>
            )}
            <Button label="" icon="pi pi-align-left" onClick={() => setVisible(!visible)} className='add-btn' />
        </div>
    )
}

export default ControlRows
