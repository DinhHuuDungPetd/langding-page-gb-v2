"use client"
import TablePosts from "@/component/pages/admin/categorys/component/TablePosts"
import TablePriority from "@/component/pages/admin/categorys/component/TablePriority"
import UpImage from "@/component/pages/admin/categorys/component/UpImage";
import SearchModal from "@/component/pages/admin/categorys/component/SearchModal"
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import FullScreenLoader from "@/component/FullScreenLoader";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { usePermission } from '@/hooks/usePermission';
import { permissions } from '@/hooks/permissions';

export default function CategorysPage({ params }) {
    const id = params.slug;
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedBlogIds, setSelectedBlogIds] = useState([]);
    const [selectedPrioritys, setSelectedPrioritys] = useState([]);
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

    const router = useRouter();

    const canEdit = usePermission([
        permissions.users.edit,
        permissions.roles.edit,
        permissions.rolesClaims.edit
    ]);

    // Đánh dấu là client-side
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Chuyển hướng nếu không có quyền
    useEffect(() => {
        if (isClient && !canEdit) {
            router.push("/page403");
        }
    }, [canEdit, isClient, router]);

    const getBlogs = async (searchName) => {
        try {
            const response = await dataTestAPI.get(`api/v1/Blog?BlogTitle=${searchName}`);
            setBlogs(response.data.data.items);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };
    const getCategoryBlogs = async () => {
        try {
            const response = await dataTestAPI.get(`api/v1/Blog?CategoryId=${id}`);
            const relatedBlogs = response.data.data.items || [];
            setSelectedBlogIds(relatedBlogs.map(blog => ({ id: blog.blogId })));
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const getCategorysById = async () => {
        try {
            const response = await dataTestAPI.get(`api/v1/Category?CategoryId=${id}`)
            setPreviewSideBanner(response.data.data.items[0].sideBanner.url);
            setPreviewPromoBanner(response.data.data.items[0].promoBanner.url);
            setTitleTextSideBanner(response.data.data.items[0].sideBanner.title);
            setTitleTextPromoBanner(response.data.data.items[0].promoBanner.title);
            setName(response.data.data.items[0].categoryName)
        } catch (error) {
            console.error('Error fetching categorys:', error);
        }
    };

    useEffect(() => {
        getCategorysById();
        getCategoryBlogs();
    }, []);

    useEffect(() => {
        if (!searchName) {
            getBlogs(searchName);
        }
    }, [searchName]);


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

        if (selectedBlogIds.length === 0) {
            alert("Vui lòng chọn ít nhất một bài viết.");
            return;
        }

        setLoading(true);
        try {
            // Tạo object để tra cứu priority từ selectedPrioritys
            const priorityMap = selectedPrioritys.reduce((map, item) => {
                map[item.id] = item.priority;
                return map;
            }, {});

            // Gộp selectedBlogIds và selectedPrioritys
            const mergedCategoryBlogs = selectedBlogIds.map(item => ({
                BlogId: item.id,
                Priority: priorityMap[item.id] !== undefined ? priorityMap[item.id] : 0
            }));

            // Cập nhật categorys
            const categorys = {
                CategoryId: id,
                Title: name,
                Priority: 0,
                sideBannerBase64: upFileSideBanner || "",
                sideBannerTitle: titleTextSideBanner.trim(),
                promoBannerBase64: upFilePromoBanner || "",
                promoBannerTitle: titleTextPromoBanner.trim(),
                status: 1,
                CategoryBlogs: mergedCategoryBlogs
            };

            const response = await dataTestAPI.post(`api/v1/Category`, categorys);
            if (response.status === 200) {
                alert("Cập nhật danh mục  thành công");
                window.location.href = "/admin/categorys";
            } else {
                alert("Cập nhật danh mục  không thành công");
            }
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
                .filter(blog => selectedIds.includes(blog.blogId.toString()))
                .sort((a, b) => new Date(b.time) - new Date(a.time));
            setBlogs(selectedBlogs);
            setSort(false)
        } else {
            getBlogs(searchName)
            setSort(true)
        }

    };
    // Không render nếu chưa sẵn sàng hoặc không có quyền
    if (!isClient || !canEdit) return null;
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
                    <SearchModal
                        searchName={searchName}
                        setSearchName={setSearchName}
                        onSearch={() => getBlogs(searchName)}
                    />
                </div>

                {sort ?
                    <TablePosts blogs={blogs} selectedBlogIds={selectedBlogIds} setSelectedBlogIds={setSelectedBlogIds} />
                    :
                    <TablePriority blogs={blogs} selectedPrioritys={selectedPrioritys} setSelectedPrioritys={setSelectedPrioritys} />
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