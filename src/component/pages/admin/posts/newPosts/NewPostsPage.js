"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import { useState } from "react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import MenuBar from "@/component/pages/admin/posts/newPosts/component/MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import TextStyle from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import "@/component/pages/admin/posts/newPosts/styles.scss";

export default function PostsPage() {
    const [postHtml, setPostHtml] = useState("");

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
    });

    const handleSave = () => {
        // if (!editor) return;
        const html = editor.getHTML();
        setPostHtml(html);
        console.log("Saved HTML:", html);
    };

    return (
        <div className="space-y-6">
            <MenuBar editor={editor} />

            <EditorContent editor={editor} />

            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">
                Lưu
            </button>

            {/* Phần hiển thị bài viết đã lưu */}
            {postHtml && (
                <div className="border-t pt-4">
                    <h2 className="">Nội dung đã lưu:</h2>
                    <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: postHtml }}
                    />
                </div>
            )}
        </div>
    );
}
