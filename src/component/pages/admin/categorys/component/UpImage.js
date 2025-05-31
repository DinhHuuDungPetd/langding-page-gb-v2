import { CiImageOn } from "react-icons/ci";
import Image from "next/image";

export default function UpImage({ previewImage, setPreviewImage, titleText, setTitleText, setUpFile, inputId }) {

    const handleFileUpload = async (file) => {
        setPreviewImage(URL.createObjectURL(file));

        const reader = new FileReader();
        reader.onload = function (e) {
            const base64String = e.target.result.split(',')[1]; // Bỏ phần "data:image/png;base64,"
            setUpFile(base64String);
        };
        reader.readAsDataURL(file); // ⚠️ dùng readAsDataURL để ra base64
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
        document.getElementById(`uploadFileInput-${inputId}`).click();
    };

    return (
        <div className="text-white my-5 rounded-lg w-full  mx-auto">
            <input
                type="file"
                id={`uploadFileInput-${inputId}`}
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="image/*"
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
                    minHeight: "100px",
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    {previewImage ? (
                        <>
                            <Image
                                src={previewImage}
                                alt={titleText || "Preview"}
                                title={titleText}
                                width={500}
                                height={300}
                                className="rounded shadow image"
                            />
                            <div className="mt-4 w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Title cho ảnh"
                                    value={titleText}
                                    onChange={(e) => setTitleText(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full p-2 rounded bg-white text-black"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="text-gray-400">
                                <CiImageOn size={200} />
                            </div>
                            <p className="p-3 text-primary font-medium">
                                Kéo thả file hoặc nhấn vào đây để upload
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
