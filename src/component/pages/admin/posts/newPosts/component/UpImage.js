

import { CiImageOn } from "react-icons/ci";
import { MdOutlineCloudUpload } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";

export default function UpImage() {
    const [previewImage, setPreviewImage] = useState("");

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            const arrayBuffer = e.target.result;
            const bytes = new Uint8Array(arrayBuffer);
            // setProduct((prev) => ({ ...prev, image: Array.from(bytes) }));// Lưu byte[]
        };
        reader.readAsArrayBuffer(file); // Đọc file dưới dạng ArrayBuffer
        setPreviewImage(URL.createObjectURL(file)); // Xem trước ảnh
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileUpload(file);
        }
    };
    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleRowClick = () => {
        document.getElementById("uploadFileInput").click();
    };


    return (
        <div className=" text-white p-6 rounded-lg w-full max-w-2/3 mx-auto">
            <input
                type="file"
                id="uploadFileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept='image/*'
            />
            <div
                className="preview-image justify-center text-center p-3"
                onClick={handleRowClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "LightGray",
                    minHeight: "100px"
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    {previewImage ? (
                        <Image
                            src={previewImage}
                            width={500}
                            height={300}
                            className="rounded shadow image"
                        />
                    ) : (
                        <>
                            <div className="text-gray-400">
                                <CiImageOn size={200} />
                            </div>
                            <p className='p-3 text-primary  font-medium'>Kéo thả file hoặc nhấn vào đây để upload</p>
                        </>
                    )}
                </div>
            </div>
        </div>

    );
}
