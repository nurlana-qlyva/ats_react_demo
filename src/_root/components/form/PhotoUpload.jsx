import { useState, useEffect } from "react"
import PropTypes from 'prop-types'
import { Spin, Upload, message, Image } from "antd"
import { InboxOutlined, UserOutlined } from "@ant-design/icons"
import { PhotoDownloadService } from "../../../api/service"

const PhotoUpload = ({ imageUrls, loadingImages, setImages }) => {
    const [imagesArr, setImagesArr] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const requests = imageUrls.map(img => {
                    const data = {
                        photoId: img.tbResimId,
                        extension: img.rsmUzanti,
                        fileName: img.rsmAd,
                    };
                    return PhotoDownloadService(data)
                });

                const responses = await Promise.all(requests);
                const objectUrls = responses.map(response => URL.createObjectURL(response.data));

                setImagesArr(objectUrls);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        fetchImages();

        return () => {
            imagesArr.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imageUrls]);


    const handleUpload = (file) => {
        const formData = new FormData();
        formData.append("images", file);
        setImages(formData);
    };

    return (
        <div>
            {/* Your loading spinner or message */}
            {loadingImages ? (
                <Spin />
            ) : (
                <div className="flex gap-1">
                    {imagesArr.map((url, i) => {
                        return (
                            <div key={i} className="border p-10 mb-10">
                                <Image
                                    style={{ margin: "10px", height: "150px", width: "150px", objectFit: "cover" }}
                                    src={typeof url === "string" ? url : ""}
                                    fallback={<UserOutlined />}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
            <Upload.Dragger
                accept=".png,.jpg,.jpeg"
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
                <p className="ant-upload-text">Tıklayın veya bu alana resim sürükleyin</p>
                <p className="ant-upload-hint">
                    Tek seferde bir veya birden fazla resim yüklemeyi destekler. Şirket verileri veya diğer yasaklı resimlerin
                    yüklenmesi kesinlikle yasaktır.
                </p>
            </Upload.Dragger>
        </div>
    );
};

PhotoUpload.propTypes ={
    imageUrls: PropTypes.array,
    setImages: PropTypes.func,
    loadingImages: PropTypes.array,
}

export default PhotoUpload;
