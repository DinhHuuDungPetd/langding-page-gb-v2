"use client";

import { useEditor } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import axios from "axios";
import UpImage from "@/component/pages/admin/posts/newPosts/component/UpImage";
import TableRelatedPosts from "@/component/pages/admin/posts/newPosts/component/TableRelatedPosts"
import EditContent from "@/component/pages/admin/posts/newPosts/component/EditContent"
import PreviewConten from "@/component/pages/admin/posts/newPosts/component/PreviewConten"
import styles from "@/component/style/BlogContent.module.css";

import PreviewJson from "@/component/pages/admin/posts/newPosts/component/PreviewJson"
import PreviewCode from "@/component/pages/admin/posts/newPosts/component/PreviewCode"
export default function PostsPage() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    const [postHtml, setPostHtml] = useState("");
    const [postJson, setPostJson] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [selectedBlogIds, setSelectedBlogIds] = useState([]);
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {},
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
                link: false,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Color.configure({ types: ["textStyle"] }),
            TextStyle,
            Highlight,
            Image,

            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
            }),
        ],
        content: "",
        editorProps: {
            attributes: {
                class:
                    "min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 prose max-w-none",
            },
        },
        onUpdate: ({ editor }) => {
            setPostHtml(editor.getHTML());
            setPostJson(editor.getJSON());
        },
    });

    const handleSave = () => {
        const now = new Date();
        const formattedTime = now.toISOString();
        console.log("Title:", title);
        console.log("Description:", description);
        console.log("selectedBlogIds:", selectedBlogIds);
        console.log("Time now:", formattedTime);
        console.log("PostJson:", postJson);
        const data = {
            id: Math.floor(Math.random() * 1000000),
            title: title,
            description: description,
            time: formattedTime,
            images: "/images/news/image.webp",
            views: 0,
            postJson: postJson
        }
        axios.post(`${baseUrl}/blogs`, data)
            .then(response => {
                console.log('Blogs created:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div className={styles.container}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl text-primary font-bold">Thêm bài viết mới</h1>
                <div className="mx-10">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded mx-1">
                        Lưu bản nháp
                    </button>
                    <button onClick={handleSave} className="px-4 py-2 bg-primary text-white rounded mx-1">
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
                    className="w-full h-[150px] bg-gray-50 border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder-gray-400 text-sm"
                    onChange={(event) => setDescription(event.target.value)}
                >
                </textarea>
            </div>
            <UpImage />
            <div className="flex gap-2 mb-10">
                <div className="w-1/2 shadow-md">
                    <EditContent editor={editor} />
                </div>
                <div className="w-1/2 border rounded-md " >
                    <PreviewConten postJson={postJson} />
                </div>
            </div>
            <div className="flex gap-2 mb-10">
                <div className="w-1/2 border rounded-md">
                    <PreviewJson postJson={postJson} />
                </div>
            </div>
            <h1 className="text-2xl text-primary font-bold">Bài viết liên quan</h1>
            <TableRelatedPosts selectedBlogIds={selectedBlogIds} setSelectedBlogIds={setSelectedBlogIds} />
        </div>
    );
}
