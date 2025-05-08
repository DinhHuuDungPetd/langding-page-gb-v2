import { FaPhotoVideo } from "react-icons/fa";

export default function UpVideo({ setVideoFile, titleText, setTitleText, previewURL, setPreviewURL }) {
    const handleFileUpload = async (file) => {
        setPreviewURL(URL.createObjectURL(file));
        setVideoFile(file);
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
        <div className="text-white p-6 rounded-lg w-full mx-auto">
            <input
                type="file"
                id="uploadFileInput"
                style={{ display: "none" }}
                onChange={handleFileChange}
                accept="video/*"
            />
            <div
                className="preview-video justify-center text-center p-3"
                onClick={handleRowClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{
                    cursor: "pointer",
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "LightGray",
                    minHeight: "200px",
                }}
            >
                <div className="flex flex-col items-center space-y-6">
                    {previewURL ? (
                        <>
                            <video
                                controls
                                src={previewURL}
                                className="w-full max-w-lg rounded shadow"
                            />
                            <div className="mt-4 w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Tiêu đề cho video"
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
                                <FaPhotoVideo size={200} />
                            </div>
                            <p className="p-3 text-primary font-medium">
                                Kéo thả video hoặc nhấn vào đây để upload
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
