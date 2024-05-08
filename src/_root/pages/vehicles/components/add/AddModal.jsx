import { useState } from 'react'
import { Button, Modal, Tabs } from 'antd'
import { PlusOutlined } from "@ant-design/icons"
import GeneralInfo from './components/GeneralInfo';
import { useForm } from 'react-hook-form';
import { formatDate } from '../../../../../utils/format';
import { NewVehicleAddService } from '../../../../../api/service';
import SpecialFields from '../../../../components/form/SpecialFields';

const AddModal = ({ setStatus, data }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const defaultValues = {
        plaka: "",
        aracTipi: null,
        guncelKm: "",
        marka: 0,
        model: 0,
        modelYili: "",
        aracGrup: 0,
        aracCinsi: 0,
        renk: 0,
        lokasyon: 0,
        mulkiyet: "",
        departman: 0,
        surucu: 0,
        yakitTipi: 0,
        muayeneTarih: "",
        sozlesmeTarih: "",
        egzozEmisyon: "",
        vergiTarih: "",
    }

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { control, handleSubmit, reset } = methods


    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo control={control} />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <SpecialFields form="Arac" control={control} data={data} />,
        },
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = handleSubmit(async (value) => {
        const data = {
            "plaka": value.plaka,
            "yil": value.modelYili,
            "markaId": value.marka || 0,
            "modelId": value.model || 0,
            "aracGrubuId": value.aracGrub || 0,
            "aracRenkId": value.renk || 0,
            "lokasyonId": +value.lokasyon,
            "departmanId": value.departman || 0,
            "surucuId": value.surucu || 0,
            "aracTipId": value.aracTipi || 0,
            "guncelKm": value.guncelKm,
            "muayeneTarih": formatDate(value?.muayeneTarih.$d) || "",
            "egzosTarih": formatDate(value?.egzozEmisyon.$d) || "",
            "vergiTarih": formatDate(value?.vergiTarih.$d) || "",
            "sozlesmeTarih": formatDate(value?.sozlesmeTarih.$d) || "",
            "yakitId": value?.yakitTipi || 0,
        }

        NewVehicleAddService(data).then(res => {
            if (res?.data.statusCode === 201) {
                setIsModalOpen(false);
                setStatus(true)
                reset();
            }
        })

        // try {
        //     // setLoadingImages(true);
        //     const token = localStorage.getItem("token");
        //     if (!token) {
        //         throw new Error("Authentication token not found.");
        //     }

        //     const response = await fetch("https://demo.orjin.net:1212/api/Photo/UploadPhoto?refId=1041&refGroup=Arac", {
        //         method: "POST",
        //         headers: {
        //             Authorization: `Bearer ${token}`,
        //         },
        //         body: images,
        //     });

        //     if (!response.ok) {
        //         throw new Error(`Failed to upload images. Status: ${response.status}`);
        //     }

        //     const data = await response.json();
        //     console.log("Upload response:", data);
        //     // setImageUrls([...imageUrls, ...data.imageUrls]); // Assuming API returns an array of image URLs
        //     // message.success("Images uploaded successfully!");
        // } catch (error) {
        //     console.error("Error uploading images:", error.message);
        //     // message.error("Error uploading images. Please try again.");
        // } finally {
        //     // setLoadingImages(false);
        // }
    })

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onChange = (key) => {
        // console.log(key);
    };

    const footer = (
        [
            <Button key="submit" className="btn primary-btn" onClick={handleOk}>
                Kaydet
            </Button>,
            <Button key="back" className="btn cancel-btn" onClick={handleCancel}>
                İptal
            </Button>
        ]
    )

    return (
        <div>
            <Button className="primary-btn" onClick={showModal}><PlusOutlined /> Ekle</Button>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} maskClosable={false} footer={footer} width={1000}>
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
            </Modal>
        </div>
    )
}

export default AddModal
