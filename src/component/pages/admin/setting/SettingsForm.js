'use client';
import { useState, useEffect } from 'react';
import UpImage from "@/component/pages/admin/setting/component/UpImage";
import UpVideo from "@/component/pages/admin/setting/component/UpVideo";
import axios from "axios";

export default function SettingsForm() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    const [upFile, setUpFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [titleText, setTitleText] = useState("");

    const [videoFile, setVideoFile] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    const [formData, setFormData] = useState({
        id: "1",
        type: "image",
        title: "",
        description: "",
        urlVideo: "",
        urlImage: "",
        phoneNumber: "",
        phoneNumberExtra: "",
        email: "",
        address: "",
        urlAddress: "",
        facebook: "",
        zalo: "",
        youtube: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            let dataToSend = { ...formData };
    
            if (formData.type === "image" && upFile) {
                const imageUrl = await uploadToCloudinary(upFile, "image");
                dataToSend.urlImage = imageUrl;
            } else if (formData.type === "video" && videoFile) {
                const videoUrl = await uploadToCloudinary(videoFile, "video");
                dataToSend.urlVideo = videoUrl;
            }
    
            await axios.put(`${baseUrl}/settings`, dataToSend);
            alert("Cài đặt đã lưu thành công!");
        } catch (error) {
            console.error("Lỗi khi lưu:", error);
            alert("Lỗi khi lưu cài đặt. Vui lòng thử lại.");
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
            <h2 className="text-xl font-bold">Settings Management</h2>

            <div>
                <label className="block font-medium">Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full border p-2 rounded">
                    <option value="image">Image</option>
                    <option value="video">Video</option>
                </select>
            </div>

            <div>
                <label className="block font-medium">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                {formData.type === 'image' ? (
                    <UpImage
                        previewImage={previewImage}
                        setPreviewImage={setPreviewImage}
                        titleText={titleText}
                        setTitleText={setTitleText}
                        setUpFile={setUpFile}
                    />
                ) : (
                    <UpVideo
                        previewURL={previewURL}
                        setPreviewURL={setPreviewURL}
                        titleText={titleText}
                        setTitleText={setTitleText}
                        setVideoFile={setVideoFile}
                    />
                )}
            </div>

            <div>
                <label className="block font-medium">Phone Number</label>
                <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">Phone Number Extra</label>
                <input type="text" name="phoneNumberExtra" value={formData.phoneNumberExtra} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">URL Address</label>
                <input type="url" name="urlAddress" value={formData.urlAddress} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">Address</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">Facebook</label>
                <input type="url" name="facebook" value={formData.facebook} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">YouTube</label>
                <input type="url" name="youtube" value={formData.youtube} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <div>
                <label className="block font-medium">Zalo</label>
                <input type="url" name="zalo" value={formData.zalo} onChange={handleChange} className="w-full border p-2 rounded" />
            </div>

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Settings
            </button>
        </form>
    );
}

export const uploadToCloudinary = async (file, type = "image") => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "upload"); // Đổi nếu bạn dùng preset khác

    const endpoint = `https://api.cloudinary.com/v1_1/dgfwxibj4/${type}/upload`;

    try {
        const res = await fetch(endpoint, {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.error?.message || "Upload thất bại");

        return data.secure_url;
    } catch (error) {
        console.error("Lỗi upload Cloudinary:", error);
        throw error;
    }
};
