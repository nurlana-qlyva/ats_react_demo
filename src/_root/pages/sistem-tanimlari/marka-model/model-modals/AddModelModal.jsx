import { Button, Input, Modal } from 'antd';
import { t } from 'i18next';
import { useState } from 'react'
import { AddModelService } from '../../../../../api/services/markamodel_services';

const AddModelModal = ({ isOpen, setIsOpen, setStatus, markaId }) => {
    const [model, setModel] = useState('')
console.log(markaId)
    const onSubmit = () => {
        const body = {
            "markId": +markaId,
            "modelDef": model
        }

        AddModelService(body).then(res => {
            if (res.data.statusCode === 200) {
                setModel('')
                setIsOpen(false)
                setStatus(true)
            }
        })
        setStatus(false)
    }

    const footer = [
        <Button key="submit" className="btn btn-min primary-btn" onClick={onSubmit}>
            {t("kaydet")}
        </Button>,
        <Button
            key="back"
            className="btn btn-min cancel-btn"
            onClick={() => setIsOpen(false)}
        >
            {t("iptal")}
        </Button >,
    ];

    return (
        <Modal
            title={t("yeniModelGirisi")}
            open={isOpen}
            onCancel={() => setIsOpen(false)}
            maskClosable={false}
            footer={footer}
            width={500}
        >
            <label>Model tanımını giriniz</label>
            <Input value={model} onChange={e => setModel(e.target.value)} />
        </Modal>
    )
}

export default AddModelModal
