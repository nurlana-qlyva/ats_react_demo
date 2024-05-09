import { Modal, Button } from 'antd';
import SelectInput from '../../../../components/form/SelectInput';
import { Controller, useForm } from 'react-hook-form';
import TextInput from '../../../../components/form/TextInput';
import DateInput from '../../../../components/form/DateInput';
import TextArea from 'antd/es/input/TextArea';
import { useEffect, useState } from 'react';
import NumberInput from '../../../../components/form/NumberInput';

const TeknikModal = ({ visible, onClose, id }) => {

    const defaultValues = {

    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset, setValue } = methods

    useEffect(() => {

    }, [id])

    const footer = (
        [
            <Button key="submit" className="btn primary-btn">
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={onClose}>
                İptal
            </Button>
        ]
    )

    return (
        <Modal
            title="Teknik Bilgileri"
            open={visible}
            onCancel={onClose}
            maskClosable={false}
            footer={footer}
            width={1200}
        >
            <div className="grid gap-1 mt-14">
                <div className="col-span-6 border p-10">
                    <h3 className='sub-title'>Motor Bilgileri</h3>
                    <div className="grid gap-1 mt-14">
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Şasi No" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Silindir Hacmi" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Silindir Sayısı" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Max. Hız" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Tork (nm/dd)" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="0-100 Hızlanma" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Motor Gücü (bg)" />
                        </div>
                        <div className="col-span-4">
                            <SelectInput control={control} name="" label="Vites Tipi" name2="" setValue={setValue} />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Çekiş Aksı" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Anahtar Kodu" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Radyo Kodu" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Motor Seri No" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Kapı Adedi" />
                        </div>
                    </div>
                </div>
                <div className="col-span-6 border p-10">
                    <h3 className='sub-title'>Boyutlar</h3>
                    <div className="grid gap-1 mt-14">
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Net Ağırlığı (Kg.)" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Katar Ağırlığı (Kg.)" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="İç Yükseklik" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Yakıt Deposu (Lt.)" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Bagaj Hacmi (Lt.)" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Aks Mesafesi" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Boy" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Genişlik" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Yükseklik" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Ön Lastik/Jant Ebadı" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Basınç" />
                        </div>
                        <div className="col-span-4">
                            <TextInput control={control} name="" label="Arka Lastik/Jant Ebadı" />
                        </div>
                        <div className="col-span-4">
                            <NumberInput control={control} name="" label="Basınç" />
                        </div>
                    </div>
                </div>
                <div className="col-span-12 border p-10">
                    <h3 className='sub-title' style={{border: "none", marginBottom: "0"}}>Açıklama</h3>
                    <Controller
                        name="aciklama"
                        control={control}
                        render={({ field }) => (
                            <TextArea
                                {...field}
                                onChange={(e) => {
                                    field.onChange(e.target.value);
                                }}
                            />
                        )}
                    />
                </div>
            </div>
        </Modal>
    );
};

export default TeknikModal;
