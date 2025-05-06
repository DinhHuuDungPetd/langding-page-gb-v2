'use client';
import { useState } from 'react';

export default function SettingsForm() {
    const [formData, setFormData] = useState({
        type: 'image',
        title: '',
        description: '',
        file: null,
        phoneNumber: '',
        phoneNumberExtra: '',
        urlAddress: '',
        address: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

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
                <label className="block font-medium">{formData.type === 'image' ? 'Upload Image' : 'Upload Video'}</label>
                <input type="file" name="file" accept={formData.type === 'image' ? 'image/*' : 'video/*'} onChange={handleChange} className="w-full" />
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

            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Save Settings
            </button>
        </form>
    );
}
