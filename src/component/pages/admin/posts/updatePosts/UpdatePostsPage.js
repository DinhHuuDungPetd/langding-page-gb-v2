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

export default function PostsPage({ params }) {
    const { slug } = params;
    const id = parseInt(slug, 10);
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [blogs, setBlogs] = useState([]);
    const [blogsRelated, setblogsRelated] = useState(null);
    const [postJson, setPostJson] = useState(null);
    const [upFile, setUpFile] = useState(null);
    const [titleText, setTitleText] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedBlogIds, setSelectedBlogIds] = useState([]);
    const [previewImage, setPreviewImage] = useState("");
    const editor = createEditor({
        content: '',
        onUpdate: ({ editor }) => {
            setPostHtml(editor.getHTML());
            setPostJson(editor.getJSON());
        },
    });

    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const response = await axios.get(`${baseUrl}/blogs/${id}`);
                const response2 = await axios.get(`${baseUrl}/blogs_related?id_blog=${id}`);
                const response3 = await axios.get(`${baseUrl}/blogs`)
                const filteredBlogs = response3.data.filter(blog => blog.id !== id.toString());

                setBlogs(filteredBlogs);
                setblogsRelated(response2.data[0])

                if (editor) {
                    editor.commands.setContent(response.data.postJson.content);
                    setPostJson(response.data.postJson);
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    setSelectedBlogIds(response2.data[0].related_blog_id || []);
                    setPreviewImage(response.data.images);
                    setTitleText(response.data.titleImage); l
                }
            } catch (error) {
                console.error("Error fetching post data:", error);
            }
        };

        fetchPostData();
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
        const now = new Date();
        const formattedTime = now.toISOString();

        if (!title.trim()) {
            alert("Vui lòng nhập tiêu đề bài viết!");
            return;
        }

        if (!description.trim()) {
            alert("Vui lòng nhập miêu tả bài viết!");
            return;
        }

        if (!postJson || (postJson.content?.length === 0)) {
            alert("Nội dung bài viết không được để trống!");
            return;
        }

        if (!titleText) {
            alert("Vui lòng nhập tiêu đề ảnh!");
            return;
        }
        const processedJson = await processEditorImages(postJson, imageFileMap);

        let uploadedImageUrl = "";

        if (upFile) {
            try {
                uploadedImageUrl = await uploadToCloudinary(upFile);
                console.log("Uploaded URL:", uploadedImageUrl);
            } catch (err) {
                console.error("Upload failed, cancel saving.");
                alert("Image upload failed, please try again.");
                return;
            }
        } else {
            console.log("No image uploaded, using existing image.");
        }

        const blog = {
            id: id,
            title: title,
            titleImage: titleText,
            description: description,
            time: formattedTime,
            images: uploadedImageUrl || previewImage,
            views: 0,
            status: true,
            postJson: processedJson,
        };

        const blog_related = {
            id_blog: id,
            related_blog_id: selectedBlogIds.map(item => ({ id: item.id }))
        };

        try {
            await axios.patch(`${baseUrl}/blogs/${id}`, blog);

            if (selectedBlogIds.length > 0) {
                await axios.put(`${baseUrl}/blogs_related/${blogsRelated.id}`, blog_related);

                for (const related of selectedBlogIds) {
                    const getRes = await axios.get(`${baseUrl}/blogs_related?id_blog=${related.id}`);
                    const existing = getRes.data[0];

                    if (existing) {
                        const currentList = existing.related_blog_id || [];
                        const isExist = currentList.some(item => item.id === id);
                        if (!isExist) {
                            currentList.push({ id: id });
                            await axios.put(`${baseUrl}/blogs_related/${existing.id}`, {
                                ...existing,
                                related_blog_id: currentList
                            });
                        }
                    } else {
                        await axios.post(`${baseUrl}/blogs_related`, {
                            id_blog: related.id,
                            related_blog_id: [{ id: id }]
                        });
                    }
                }
                alert("Cập nhật bài viết thành công!");
                window.location.href = "/admin/posts";
            }

            console.log('Lưu blog và cập nhật liên kết thành công!');
        } catch (error) {
            console.error('Lỗi khi lưu blog:', error);
        }
    };


    return (
        <div className={styles.container}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-primary font-bold">Cập nhật bài viết mới</h1>
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
            <div>
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
            <div>
                <label className="block text-primary font-medium mb-1">
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
            <UpImage previewImage={previewImage} setPreviewImage={setPreviewImage} titleText={titleText} setTitleText={setTitleText} setUpFile={setUpFile} />
            <div className="flex gap-2 mb-10">
                <div className="w-1/2 shadow-md">
                    <EditContent editor={editor} />
                </div>
                <div className="w-1/2 border rounded-md " >
                    <PreviewConten postJson={postJson} />
                </div>
            </div>
            <div className="flex gap-2 mb-10">
                {/* <div className="w-1/2 border rounded-md">
                    <PreviewCode postHtml={postHtml} />
                </div> */}
                {/* <div className="w-1/2 border rounded-md">
                    <PreviewJson postJson={postJson} />
                </div> */}
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

