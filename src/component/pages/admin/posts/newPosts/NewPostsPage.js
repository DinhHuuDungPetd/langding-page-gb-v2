"use client";

import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import UpImage from "@/component/pages/admin/posts/component/UpImage";
import TableRelatedPosts from "@/component/pages/admin/posts/component/TableRelatedPosts"
import EditContent from "@/component/pages/admin/posts/component/EditContent"
import PreviewConten from "@/component/pages/admin/posts/component/PreviewConten"
import styles from "@/component/style/BlogContent.module.css";
import { imageFileMap } from "@/component/pages/admin/posts/component/customTiptap/imageFileMap";
import PreviewJson from "@/component/pages/admin/posts/component/PreviewJson"
import PreviewCode from "@/component/pages/admin/posts/component/PreviewCode"
import { createEditor } from '@/component/pages/admin/posts/component/editorConfig';
import CustomSelect from '@/component/CustomSelect'
import FullScreenLoader from "@/component/FullScreenLoader";
import { blogAPI } from "@/hooks/authorizeAxiosInstance";

export default function PostsPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);
    const [postJson, setPostJson] = useState(null);
    const [postHtml, setPostHtml] = useState(null);
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
    const editor = createEditor({
        content: '',
        onUpdate: ({ editor }) => {
            setPostJson(editor.getJSON());
        },
    });
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response1 = await blogAPI.get(`api/v1/Blog?BlogId=0`);
                const response2 = await blogAPI.get(`api/v1/Category?CategoryId=0&BlogId=0`)
                setBlogs(response1.data.data.items);
                setCategorys(response2.data.data.items)
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();
        setLoading(false);
    }, []);
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
        const now = new Date();
        const formattedTime = now.toISOString();
        const idblog = String(Math.floor(Math.random() * 1000000));

        // Validate bắt buộc
        if (!title.trim()) {
            alert("Vui lòng nhập tiêu đề bài viết!");
            setLoading(false);
            return;
        }

        if (!description.trim()) {
            alert("Vui lòng nhập miêu tả bài viết!");
            setLoading(false);
            return;
        }

        if (!postJson || (postJson.content?.length === 0)) {
            alert("Nội dung bài viết không được để trống!");
            setLoading(false);
            return;
        }

        if (!upFile) {
            alert("Vui lòng tải lên ảnh tiêu đề!");
            setLoading(false);
            return;
        }

        if (!titleText.trim()) {
            alert("Vui lòng nhập tiêu đề ảnh chính!");
            setLoading(false);
            return;
        }

        if (!titleTextSideBanner.trim()) {
            alert("Vui lòng nhập tiêu đề ảnh banner bên!");
            setLoading(false);
            return;
        }

        if (!titleTextPromoBanner.trim()) {
            alert("Vui lòng nhập tiêu đề ảnh banner quảng cáo!");
            setLoading(false);
            return;
        }

        if (!selectedCategoryIds || selectedCategoryIds.length === 0) {
            alert("Vui lòng chọn ít nhất một danh mục!");
            setLoading(false);
            return;
        }



        try {
            const processedJson = await processEditorImages(postJson, imageFileMap);

            // Upload hình ảnh
            const [uploadedImageUrl, uploadedSideBannerUrl, uploadedPromoBanner] = await Promise.all([
                uploadToCloudinary(upFile),
                uploadToCloudinary(upFileSideBanner),
                uploadToCloudinary(upFilePromoBanner)
            ]);

            const blog = {
                id: idblog,
                title: title.trim(),
                description: description.trim(),
                time: formattedTime,
                imageTitle: {
                    url: uploadedImageUrl,
                    title: titleText.trim()
                },
                sideBanner: {
                    url: uploadedSideBannerUrl,
                    title: titleTextSideBanner.trim()
                },
                promoBanner: {
                    url: uploadedPromoBanner,
                    title: titleTextPromoBanner.trim()
                },
                views: 0,
                status: true,
                postJson: processedJson,
            };

            const blog_related = {
                id_blog: idblog,
                related_blog_id: selectedBlogIds?.map(item => ({ id: item.id }) || [])
            };

            await axios.post(`${baseUrl}/blogs`, blog);

            // Liên kết blog liên quan

            await axios.post(`${baseUrl}/blogs_related`, blog_related);

            for (const related of selectedBlogIds) {
                const getRes = await axios.get(`${baseUrl}/blogs_related?id_blog=${related.id}`);
                const existing = getRes.data[0];

                if (existing) {
                    const currentList = existing.related_blog_id || [];
                    const isExist = currentList.some(item => item.id === idblog);

                    if (!isExist) {
                        currentList.push({ id: idblog });
                        await axios.put(`${baseUrl}/blogs_related/${existing.id}`, {
                            ...existing,
                            related_blog_id: currentList
                        });
                    }
                } else {
                    await axios.post(`${baseUrl}/blogs_related`, {
                        id_blog: related.id,
                        related_blog_id: [{ id: idblog }]
                    });
                }
            }


            // Gắn blog vào danh mục
            for (const relatedId of selectedCategoryIds) {
                const getRes = await axios.get(`${baseUrl}/categorys/${relatedId}`);
                const existing = getRes.data;

                if (existing) {
                    const currentList = existing.id_bogs || [];
                    const isExist = currentList.some(item => item.id === idblog);

                    if (!isExist) {
                        currentList.push({ id: idblog, priority: "0" });
                        await axios.put(`${baseUrl}/categorys/${relatedId}`, {
                            ...existing,
                            id_bogs: currentList
                        });
                    }
                }
            }

            alert("Thêm bài viết thành công!");
            window.location.href = "/admin/posts";
        } catch (error) {
            console.error("Lỗi khi lưu blog:", error);
            alert("Có lỗi xảy ra khi lưu bài viết.");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className={styles.container}>
            {loading && <FullScreenLoader />}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-primary font-bold">Thêm bài viết mới</h1>
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
                <div className="w-full mb-2">
                    <label className="block text-primary font-medium mb-1">
                        Tiêu đề bài viết:<span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Nhập tiêu đề bài viết ...."
                        className="w-full border bg-gray-50 placeholder-gray-400 border-gray-300 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#38803E]"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>
                <div className="w-full">
                    <CustomSelect categorys={categorys} selectedCategoryIds={selectedCategoryIds} setSelectedCategoryIds={setSelectedCategoryIds} />
                </div>
            </div>
            <div className=" mb-2">
                <label className="block text-primary font-medium mb-1">
                    Miêu tả bài viết:<span className="text-red-500">*</span>
                </label>
                <textarea
                    id="note"
                    placeholder="Nhập miêu tả bài viết ...."
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
                    <PreviewConten postJson={postJson} />
                </div>
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
        console.log("res upload image", res)
        const data = await res.json();
        console.log("res upload image", data)
        if (!res.ok) throw new Error(data.error?.message || "Upload thất bại");

        return data.secure_url;
    } catch (error) {
        console.error("Lỗi upload Cloudinary:", error);
        throw error;
    }
};

