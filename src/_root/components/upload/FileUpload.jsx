import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FileDownloadService } from '../../../api/service'
import { InboxOutlined, FileOutlined } from '@ant-design/icons'
import { Button, message, Spin, Upload } from 'antd'

const FileUpload = ({ filesUrl, loadingFiles, setFiles }) => {
    const [filesArr, setFilesArr] = useState([])

    useEffect(() => {
        setFilesArr(filesUrl)
    }, [filesUrl])

    const handleUpload = (file) => {
        const formData = new FormData()
        formData.append("documents", file)
        setFiles(formData)
    };

    const downloadFile = file => {
        const data = {
            "fileId": file.tbDosyaId,
            "extension": file.dosyaUzanti,
            "fileName": file.dosyaAd
        }

        FileDownloadService(data).then(res => {
            const link = document.createElement("a")
            link.href = window.URL.createObjectURL(res.data)
            link.download = file.dosyaAd
            link.click()
            window.URL.revokeObjectURL(link.href)
        }).catch(err => {
            console.error("Error downloading file:", err)
        });
    }

    return (
        <>
            {loadingFiles ? (
                <Spin />
            ) : (
                <div className="flex gap-1">
                    {filesArr.map((file, i) => {
                        return (
                            <div key={i} className="mb-10">
                                <Button className="file-btn" onClick={() => downloadFile(file)}> <FileOutlined /> {file.dosyaAd}</Button>
                            </div>
                        );
                    })}
                </div>
            )}


            <Upload.Dragger
                accept=".txt,.doc,.docs, .pdf, .xlsx"
                listType="picture"
                className="upload-list-inline"
                beforeUpload={(file) => {
                    const isFile = file.type === "application/doc" || file.type === "application/pdf" || file.type === "application/txt" || file.type === "application/docs" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                    const isLt2M = file.size / 1024 / 1024 < 2;

                    if (!isFile) {
                        message.error("You can only upload DOC, DOCS, TXT, PDF or XLSX files!");
                    }

                    if (!isLt2M) {
                        message.error("File must be smaller than 2MB!");
                    }

                    if (isFile && isLt2M) {
                        handleUpload(file);
                    }
                    handleUpload(file);
                    return false;
                }}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Tıklayın veya bu alana dosya sürükleyin</p>
                <p className="ant-upload-hint">
                    Tek seferde bir veya birden fazla dosya yüklemeyi destekler. Şirket verileri veya diğer yasaklı dosyaların
                    yüklenmesi kesinlikle yasaktır.
                </p>
            </Upload.Dragger>
        </>
    )
}

FileUpload.propTypes = {
    filesUrl: PropTypes.array,
    loadingFiles: PropTypes.bool,
    setFiles: PropTypes.func,
}

export default FileUpload
