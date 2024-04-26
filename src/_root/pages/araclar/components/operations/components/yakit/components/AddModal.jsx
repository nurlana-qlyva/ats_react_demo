import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'
// components
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Calendar } from 'primereact/calendar';
import TextInput from '../../../../../../../components/TextInput';
import SelectBox from '../../../../../../../components/SelectBox';
import { Divider } from 'primereact/divider';
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import CustomTreeTable from '../../../../../../../components/LocationTree';

const AddModal = () => {
    const [visible, setVisible] = useState(false);

    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: "",
            password: "",
            remember: false
        }
    })

    const footerContent = (
        <div className='flex justify-content-end gap-2'>
            <Button label="Kaydet" icon="pi pi-check" onClick={() => setVisible(false)} className="save-btn" />
            <Button label="İptal" icon="pi pi-times" onClick={() => setVisible(false)} autoFocus className='iptal-btn' />
        </div>
    );

    return (
        <div className="card flex">
            <Button label="Ekle" icon="pi pi-plus" onClick={() => setVisible(true)} className='add-btn' />
            <Dialog visible={visible} style={{ width: '70vw' }} onHide={() => setVisible(false)} footer={footerContent}>
                <h2>Yakıt Bilgileri Plaka: <span>[16 EG 1231 [BMW - X6]]</span></h2>
                <CustomTreeTable />
            </Dialog>
        </div>
    )
}

export default AddModal
