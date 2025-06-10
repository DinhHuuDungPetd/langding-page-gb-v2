"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import UpImage from "@/component/pages/admin/posts/component/UpImage";
import TableRelatedPosts from "@/component/pages/admin/posts/component/TableRelatedPosts"
import EditContent from "@/component/pages/admin/posts/component/EditContent"
import PreviewConten from "@/component/pages/admin/posts/component/PreviewConten"
import styles from "@/component/style/BlogContent.module.css";
import { imageFileMap } from "@/component/pages/admin/posts/component/customTiptap/imageFileMap";
import { createEditor } from '@/component/pages/admin/posts/component/editorConfig';
import CustomSelect from '@/component/CustomSelect'
import FullScreenLoader from "@/component/FullScreenLoader";
import { dataTestAPI } from "@/hooks/authorizeAxiosInstance";
import { usePermission } from '@/hooks/usePermission';
import { permissions } from '@/hooks/permissions';
export default function PostsPage({ params }) {
    const { slug } = params;
    const id = parseInt(slug, 10);
    const [isClient, setIsClient] = useState(false);
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [postJson, setPostJson] = useState(null);
    const [upFile, setUpFile] = useState(null);
    const [upFileSideBanner, setUpFileSideBanner] = useState(null);
    const [upFilePromoBanner, setUpFilePromoBanner] = useState(null);
    const [titleTextSideBanner, setTitleTextSideBanner] = useState("");
    const [titleTextPromoBanner, setTitleTextPromoBanner] = useState("");
    const [previewSideBanner, setPreviewSideBanner] = useState("");
    const [previewPromoBanner, setPreviewPromoBanner] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [titleText, setTitleText] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedBlogIds, setSelectedBlogIds] = useState([]);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [categorys, setCategorys] = useState([]);

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
            router.push("/unauthorized");
        }
    }, [canEdit, isClient, router]);


    const editor = createEditor({
        content: '',
        onUpdate: ({ editor }) => {
            setPostJson(editor.getJSON());
        },
    });
    const fetchPostData = useCallback(async () => {
        try {
            const response = await dataTestAPI.get(`api/v1/Blog?BlogId=${id}`);
            const response2 = await dataTestAPI.get(`api/v1/Category?CategoryId=0&BlogId=0`)
            const response3 = await dataTestAPI.get(`api/v1/Blog?BlogId=0`);
            const response4 = await dataTestAPI.get(`api/v1/Category?BlogId=${id}`)
            setCategorys(response2.data.data.items)
            setBlogs(response3.data.data.items);
            const relatedCategorys = response4.data.data.items || [];
            setSelectedCategoryIds(relatedCategorys.map(category => category.categoryId))
            if (editor) {
                editor.commands.setContent(response.data.data.items[0].blogPostJson.content);
                setPostJson(response.data.data.items[0].blogPostJson);
                setTitle(response.data.data.items[0].blogTitle);
                setDescription(response.data.data.items[0].blogDescription);

                const relatedBlogs = response.data.data.items[0].blogRelated || [];
                setSelectedBlogIds(relatedBlogs.map(blog => ({ id: blog.blogId })));


                setPreviewImage(response.data.data.items[0].imageTitle.url);
                setTitleText(response.data.data.items[0].imageTitle.title);
                setPreviewSideBanner(response.data.data.items[0].sideBanner.url);
                setPreviewPromoBanner(response.data.data.items[0].promoBanner.url);
                setTitleTextSideBanner(response.data.data.items[0].sideBanner.title);
                setTitleTextPromoBanner(response.data.data.items[0].promoBanner.title);
            }
        } catch (error) {
            console.error("Error fetching post data:", error);
        }
    });
    useEffect(() => {
        fetchPostData();
        setLoading(false);
    }, [id, editor]);
    const processEditorImages = async (editorJson, imageFileMap) => {
        const walk = async (node) => {

            if (node.type === "image" && node.attrs?.src?.startsWith("blob:")) {
                console.log("Đang xử lý ảnh:");
                const file = imageFileMap.get(node.attrs.src);
                if (file) {
                    try {
                        const uploadedUrl = await uploadToCloudinary(file);
                        return {
                            ...node,
                            attrs: {
                                ...node.attrs,
                                src: uploadedUrl,
                            },
                        };
                    } catch (err) {
                        console.error("Lỗi khi upload ảnh:", err);
                    }
                } else {
                    console.log("Không tìm thấy file ảnh");
                }
            }

            if (node.content) {
                const newContent = [];
                for (const child of node.content) {
                    const updatedChild = await walk(child);
                    newContent.push(updatedChild || child);
                }
                return {
                    ...node,
                    content: newContent,
                };
            }

            return node;
        };

        return await walk(editorJson);
    };


    const handleSave = async () => {
        setLoading(true);

        // Validate tiêu đề
        if (!title.trim()) {
            alert("Vui lòng nhập tiêu đề bài viết!");
            setLoading(false);
            return;
        }

        // Validate mô tả
        if (!description.trim()) {
            alert("Vui lòng nhập miêu tả bài viết!");
            setLoading(false);
            return;
        }

        // Validate nội dung
        if (!postJson || !postJson.content || postJson.content.length === 0) {
            alert("Nội dung bài viết không được để trống!");
            setLoading(false);
            return;
        }

        // Validate tiêu đề ảnh chính
        if (!titleText.trim()) {
            alert("Vui lòng nhập tiêu đề ảnh chính!");
            setLoading(false);
            return;
        }

        // Nếu có upload ảnh mới, validate luôn các tiêu đề ảnh kèm theo
        if (upFile || upFileSideBanner || upFilePromoBanner) {
            if (!titleTextSideBanner.trim()) {
                alert("Vui lòng nhập tiêu đề ảnh banner bên!");
                setLoading(false);
                return;
            }

            if (!titleTextPromoBanner.trim()) {
                alert("Vui lòng nhập tiêu đề ảnh quảng cáo!");
                setLoading(false);
                return;
            }
        }

        const processedJson = await processEditorImages(postJson, imageFileMap);

        let uploadedImage = upFile || "";
        let uploadedSideBanner = upFileSideBanner || "";
        let uploadedPromoBanner = upFilePromoBanner || "";

        const blog = {
            blogId: id,
            title: title.trim(),
            description: description.trim(),
            blogImageBase64: uploadedImage,
            blogImageTitle: titleText.trim(),
            sideBannerBase64: uploadedSideBanner,
            sideBannerTitle: titleTextSideBanner.trim(),
            promoBannerBase64: uploadedPromoBanner,
            promoBannerTitle: titleTextPromoBanner.trim(),
            views: 0,
            status: 1,
            postJson: processedJson,
            relatedBlogIds: selectedBlogIds.map(blog => blog.id),
            categoryIds: selectedCategoryIds
        };

        try {
            const response = await dataTestAPI.post(`api/v1/Blog`, blog);
            if (response.status === 200) {
                alert("Cập nhật bài viết thành công!");
                window.location.href = "/admin/posts";
            } else {
                alert("Cập nhật bài viết không thành công");
            }

        } catch (error) {
            console.error("Lỗi khi lưu blog:", error);
            alert("Có lỗi xảy ra khi lưu bài viết.");
        } finally {
            setLoading(false);
        }
    };
    if (!isClient || !canEdit) return null;
    return (
        <div className={styles.container}>
            {loading && <FullScreenLoader />}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-primary font-bold">Cập nhật bài viết</h1>
                <div className="mx-10">
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-primary text-white rounded mx-1 
             hover:bg-green-700 transition duration-200 
             transform active:scale-95 cursor-pointer"
                    >
                        Lưu thông tin bài viết
                    </button>
                </div>
            </div>
            <hr className="mb-5" />
            <div className="flex mb-5 w-full gap-4">
                <div className="w-full">
                    <label className="block text-primary font-medium mb-1">
                        Tiêu đề bài viết:<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề bài viết ...."
                        value={title}
                        className="w-full border bg-gray-50 placeholder-gray-400 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E]"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="w-full">
                    <CustomSelect categorys={categorys} selectedCategoryIds={selectedCategoryIds} setSelectedCategoryIds={setSelectedCategoryIds} />
                </div>
            </div>
            <div>
                <label className="block text-primary font-medium mb-2">
                    Miêu tả bài viết:<span className="text-red-500">*</span>
                </label>
                <textarea
                    id="note"
                    placeholder="Nhập miêu tả bài viết ...."
                    value={description}
                    className="w-full h-[150px] bg-gray-50 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder-gray-400 text-sm"
                    onChange={(event) => setDescription(event.target.value)}
                >
                </textarea>
            </div>
            <div className="mb-5">
                <label className="block text-primary font-medium mb-1">
                    Ảnh tiêu đề:<span className="text-red-500">*</span>
                </label>
                <UpImage previewImage={previewImage} setPreviewImage={setPreviewImage} titleText={titleText} setTitleText={setTitleText} setUpFile={setUpFile} inputId={0} />
            </div>
            <div className="flex gap-6">
                <div className="mb-5 w-full">
                    <label className="block text-primary font-medium mb-1">
                        Ảnh tiêu đề:<span className="text-red-500">*</span>
                    </label>
                    <UpImage previewImage={previewSideBanner} setPreviewImage={setPreviewSideBanner} titleText={titleTextSideBanner} setTitleText={setTitleTextSideBanner} setUpFile={setUpFileSideBanner} inputId={1} />
                </div>
                <div className="mb-5 w-full">
                    <label className="block text-primary font-medium mb-1">
                        Ảnh tiêu đề:<span className="text-red-500">*</span>
                    </label>
                    <UpImage previewImage={previewPromoBanner} setPreviewImage={setPreviewPromoBanner} titleText={titleTextPromoBanner} setTitleText={setTitleTextPromoBanner} setUpFile={setUpFilePromoBanner} inputId={2} />
                </div>
            </div>
            <div className="flex gap-2 mb-10">
                <div className="w-1/2 shadow-md">
                    <EditContent editor={editor} />
                </div>
                <div className="w-1/2 border rounded-md " >
                    {postJson && <PreviewConten postJson={postJson} />}
                </div>
            </div>
            <div className="flex gap-2 mb-10">

            </div>
            <h1 className="text-2xl text-primary font-bold">Bài viết liên quan</h1>
            <TableRelatedPosts blogs={blogs} selectedBlogIds={selectedBlogIds} setSelectedBlogIds={setSelectedBlogIds} />
        </div>
    );
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

