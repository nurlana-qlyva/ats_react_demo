import { Button, Spin, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { FileDownloadService } from "../../../api/service";

const FileUpload = ({ filesUrl, loadingFiles, setFiles, uploadFiles, setLoadingFiles, setFilesUrl }) => {
    const [filesArr, setFilesArr] = useState([]);

    useEffect(() => {
        setFilesArr(filesUrl)
    }, [filesUrl])


    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append("documents", file);
        setFiles(formData);
    };

    const downloadFile = () => {}

    return (
        <div>
            {/* Your loading spinner or message */}
            {loadingFiles ? (
                <Spin />
            ) : (
                <div className="flex gap-1">
                    {filesArr.map((url, i) => {
                        console.log(url)
                        return (
                            <div key={i} className="mb-10">
                                <Button onClick={downloadFile}>{url.dosyaAd}</Button>
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
                    const isImage = file.type === "image/png" || file.type === "image/jpeg" || file.type === "image/jpg";
                    const isLt2M = file.size / 1024 / 1024 < 2; // Limiting file size to 2MB

                    if (!isImage) {
                        message.error("You can only upload PNG, JPG, or JPEG files!");
                    }

                    if (!isLt2M) {
                        message.error("Image must be smaller than 2MB!");
                    }

                    if (isImage && isLt2M) {
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
        </div>
    );
};

export default FileUpload;
