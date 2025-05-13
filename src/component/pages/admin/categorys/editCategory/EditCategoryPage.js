"use client"
import TablePosts from "@/component/pages/admin/categorys/component/TablePosts"
import TablePriority from "@/component/pages/admin/categorys/component/TablePriority"
import UpImage from "@/component/pages/admin/categorys/component/UpImage";
import SearchModal from "@/component/pages/admin/categorys/component/SearchModal"
import axios from 'axios';
import { useEffect, useState } from "react";
import FullScreenLoader from "@/component/FullScreenLoader";
export default function CategorysPage({ params }) {
    const id = params.slug;
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [loading, setLoading] = useState(false);
    const [selectedBlogIds, setSelectedBlogIds] = useState([]);
    const [selectedPrioritys, setSelectedPrioritys] = useState([]);
    const [categorys, setCategorys] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [name, setName] = useState("");
    const [searchName, setSearchName] = useState("");
    const [upFileSideBanner, setUpFileSideBanner] = useState(null);
    const [upFilePromoBanner, setUpFilePromoBanner] = useState(null);
    const [titleTextSideBanner, setTitleTextSideBanner] = useState("");
    const [titleTextPromoBanner, setTitleTextPromoBanner] = useState("");
    const [previewSideBanner, setPreviewSideBanner] = useState("");
    const [previewPromoBanner, setPreviewPromoBanner] = useState("");
    const [sort, setSort] = useState(true);
    const getBlogs = async () => {
        try {
            const response = await axios.get(`${baseUrl}/blogs`);
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const getCategorysById = async () => {
        try {
            const response = await axios.get(`${baseUrl}/categorys/${id}`);
            setCategorys(response.data);
            setPreviewSideBanner(response.data.sideBanner.url);
            setPreviewPromoBanner(response.data.promoBanner.url);
            setTitleTextSideBanner(response.data.sideBanner.title);
            setTitleTextPromoBanner(response.data.promoBanner.title);
            setSelectedBlogIds(response.data.id_bogs || []);
            setName(response.data.name)
        } catch (error) {
            console.error('Error fetching categorys:', error);
        }
    };

    useEffect(() => {
        getCategorysById();
        getBlogs()
    }, []);

    const filteredBlogs = blogs.filter(blog => {
        if (!searchName) return blog;
        return blog.title.toLowerCase().includes(searchName?.toLowerCase());
    });

    const handleSave = async () => {
        if (!name.trim()) {
            alert("Vui lòng nhập tiêu đề danh mục.");
            return;
        }

        if (!titleTextSideBanner.trim()) {
            alert("Vui lòng nhập tiêu đề cho side banner.");
            return;
        }

        if (!titleTextPromoBanner.trim()) {
            alert("Vui lòng nhập tiêu đề cho promo banner.");
            return;
        }

        if (!previewSideBanner && !upFileSideBanner) {
            alert("Vui lòng chọn hoặc tải lên side banner.");
            return;
        }

        if (!previewPromoBanner && !upFilePromoBanner) {
            alert("Vui lòng chọn hoặc tải lên promo banner.");
            return;
        }

        if (selectedBlogIds.length === 0) {
            alert("Vui lòng chọn ít nhất một bài viết.");
            return;
        }

        // if (selectedPrioritys.length > 0 && selectedPrioritys.length !== selectedBlogIds.length) {
        //     alert("Số lượng blog được chọn và blog có ưu tiên không khớp.");
        //     return;
        // }

        setLoading(true);
        try {
            const updatedBlogIds = selectedBlogIds.map(blog => {
                const match = selectedPrioritys.find(p => p.id === blog.id);
                return match ? { ...blog, priority: match.priority.toString() } : blog;
            });

            let uploadedSideBannerUrl = "";
            let uploadedPromoBanner = "";

            if (upFileSideBanner && upFilePromoBanner) {
                try {
                    uploadedSideBannerUrl = await uploadToCloudinary(upFileSideBanner);
                    uploadedPromoBanner = await uploadToCloudinary(upFilePromoBanner);
                } catch (err) {
                    console.error("Upload failed, cancel saving.");
                    alert("Tải ảnh lên thất bại. Vui lòng thử lại.");
                    return;
                }
            }

            const updatedCategory = {
                ...categorys,
                name: name.trim(),
                sideBanner: {
                    url: uploadedSideBannerUrl || previewSideBanner,
                    title: titleTextSideBanner.trim()
                },
                promoBanner: {
                    url: uploadedPromoBanner || previewPromoBanner,
                    title: titleTextPromoBanner.trim()
                },
                id_bogs: updatedBlogIds
            };

            await axios.put(`${baseUrl}/categorys/${id}`, updatedCategory);

            alert("Cập nhật danh mục thành công!");
            window.location.href = "/admin/categorys";
        } catch (error) {
            console.error("Lỗi khi lưu thông tin:", error);
            alert("Có lỗi xảy ra khi lưu danh mục.");
        } finally {
            setLoading(false);
        }
    };

    const handleSort = async () => {
        if (sort) {
            const selectedIds = selectedBlogIds.map(item => item.id.toString());
            const selectedBlogs = blogs
                .filter(blog => selectedIds.includes(blog.id.toString()))
                .sort((a, b) => new Date(b.time) - new Date(a.time));
            setBlogs(selectedBlogs);
            setSort(false)
        } else {
            getBlogs()
            setSort(true)
        }

    };

    return (
        <div>
            {loading && <FullScreenLoader />}
            <div className="flex items-center justify-start mb-6 gap-5">
                <h2 className="font-medium text-3xl">Sửa danh mục</h2>
                <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-primary text-white rounded mx-1 
             hover:bg-green-700 transition duration-200 
             transform active:scale-95 cursor-pointer"
                >
                    Lưu thông tin
                </button>
            </div>
            <div className=" w-1/2 m-5">
                <label className="block text-primary font-medium mb-1">
                    Tiêu đề danh mục:<span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    placeholder="Nhập tiêu đề danh mục ...."
                    className="w-full border bg-gray-50 placeholder-gray-400 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E]"
                    onChange={(event) => setName(event.target.value)}
                    value={name}
                />
            </div>
            <div className="flex gap-6">
                <UpImage previewImage={previewSideBanner} setPreviewImage={setPreviewSideBanner} titleText={titleTextSideBanner} setTitleText={setTitleTextSideBanner} setUpFile={setUpFileSideBanner} inputId={1} />
                <UpImage previewImage={previewPromoBanner} setPreviewImage={setPreviewPromoBanner} titleText={titleTextPromoBanner} setTitleText={setTitleTextPromoBanner} setUpFile={setUpFilePromoBanner} inputId={2} />
            </div>
            <div>
                <div className="flex mx-5 gap-6">
                    <button
                        onClick={handleSort}
                        className="px-4 py-2 bg-primary text-white rounded mx-1 
             hover:bg-green-700 transition duration-200 
             transform active:scale-95 cursor-pointer m-5"
                    >
                        Sắp sếp ưu tiên
                    </button>
                    <SearchModal searchName={searchName} setSearchName={setSearchName} />
                </div>

                {sort ?
                    <TablePosts blogs={filteredBlogs} selectedBlogIds={selectedBlogIds} setSelectedBlogIds={setSelectedBlogIds} />
                    :
                    <TablePriority blogs={filteredBlogs} selectedPrioritys={selectedPrioritys} setSelectedPrioritys={setSelectedPrioritys} />
                }


            </div>

        </div>
    )
}
export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "greenlab"); // Đổi theo preset của bạn

    try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dgfwxibj4/image/upload", {
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