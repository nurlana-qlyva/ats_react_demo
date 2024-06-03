import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import PropTypes from 'prop-types'
import { Button, message, Modal, Tabs } from 'antd'
import GeneralInfo from './GeneralInfo'
import PersonalFields from '../../../../../components/form/PersonalFields'
import { uploadPhoto, uploadFile } from '../../../../../../utils/upload'
import PhotoUpload from '../../../../../components/upload/PhotoUpload'
import FileUpload from '../../../../../components/upload/FileUpload'

const UpdateModal = ({ updateModal, setUpdateModal, id }) => {
    // file
    const [filesUrl, setFilesUrl] = useState([])
    const [files, setFiles] = useState([])
    const [loadingFiles, setLoadingFiles] = useState(false)
    // photo
    const [imageUrls, setImageUrls] = useState([])
    const [loadingImages, setLoadingImages] = useState(false)
    const [images, setImages] = useState([])
    const [fields, setFields] = useState([
        {
            label: "ozelAlan1",
            key: "OZELALAN_1",
            value: "Özel Alan 1",
            type: 'text'
        },
        {
            label: "ozelAlan2",
            key: "OZELALAN_2",
            value: "Özel Alan 2",
            type: 'text'
        },
        {
            label: "ozelAlan3",
            key: "OZELALAN_3",
            value: "Özel Alan 3",
            type: 'text'
        },
        {
            label: "ozelAlan4",
            key: "OZELALAN_4",
            value: "Özel Alan 4",
            type: 'text'
        },
        {
            label: "ozelAlan5",
            key: "OZELALAN_5",
            value: "Özel Alan 5",
            type: 'text'
        },
        {
            label: "ozelAlan6",
            key: "OZELALAN_6",
            value: "Özel Alan 6",
            type: 'text'
        },
        {
            label: "ozelAlan7",
            key: "OZELALAN_7",
            value: "Özel Alan 7",
            type: 'text'
        },
        {
            label: "ozelAlan8",
            key: "OZELALAN_8",
            value: "Özel Alan 8",
            type: 'text'
        },
        {
            label: "ozelAlan9",
            key: "OZELALAN_9",
            value: "Özel Alan 9",
            type: 'select',
            code: 867,
            name2: "ozelAlanKodId9"
        },
        {
            label: "ozelAlan10",
            key: "OZELALAN_10",
            value: "Özel Alan 10",
            type: 'select',
            code: 868,
            name2: "ozelAlanKodId10"
        },
        {
            label: "ozelAlan11",
            key: "OZELALAN_11",
            value: "Özel Alan 11",
            type: 'number'
        },
        {
            label: "ozelAlan12",
            key: "OZELALAN_12",
            value: "Özel Alan 12",
            type: 'number'
        },
    ])

    const defaultValues = {}

    const methods = useForm({
        defaultValues: defaultValues
    })

    const { handleSubmit, reset, watch } = methods

    const uploadImages = () => {
        try {
            setLoadingImages(true);
            // const data = uploadPhoto(id, "Yakit", images)
            // setImageUrls([...imageUrls, data.imageUrl]);
        } catch (error) {
            message.error("Resim yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingImages(false);
        }
    }

    const uploadFiles = () => {
        try {
            setLoadingFiles(true);
            // uploadFile(id, "Yakit", files)
        } catch (error) {
            message.error("Dosya yüklenemedi. Yeniden deneyin.");
        } finally {
            setLoadingFiles(false);
        }
    }

    const personalProps = {
        form: "YAKIT",
        fields,
        setFields
    }

    const items = [
        {
            key: '1',
            label: 'Genel Bilgiler',
            children: <GeneralInfo />,
        },
        {
            key: '2',
            label: 'Özel Alanlar',
            children: <PersonalFields personalProps={personalProps} />
        },
        {
            key: '3',
            label: `[${imageUrls.length}] Resimler`,
            children: <PhotoUpload imageUrls={imageUrls} loadingImages={loadingImages} setImages={setImages} />
        },
        {
            key: '4',
            label: `[${filesUrl.length}] Ekli Belgeler`,
            children: <FileUpload filesUrl={filesUrl} loadingFiles={loadingFiles} setFiles={setFiles} />
        }
    ]

    const footer = (
        [
            <Button key="submit" className="btn btn-min primary-btn">
                Güncelle
            </Button>,
            <Button key="back" className="btn btn-min cancel-btn" onClick={() => {
                setUpdateModal(false)
            }}>
                İptal
            </Button>
        ]
    )

    return (
        <>
            <Modal
                title="Yakıt Bilgisi Güncelle"
                open={updateModal}
                onCancel={() => setUpdateModal(false)}
                maskClosable={false}
                footer={footer}
                width={1200}
            >
                <FormProvider {...methods}>
                    <form>
                        <Tabs defaultActiveKey="1" items={items} />
                    </form>
                </FormProvider>
            </Modal>
        </>
    )
}

UpdateModal.propTypes = {
    updateModal: PropTypes.bool,
    setUpdateModal: PropTypes.bool,
}

export default UpdateModal
