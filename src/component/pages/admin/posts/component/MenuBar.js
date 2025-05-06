import {
    CiTextAlignCenter,
    CiTextAlignLeft,
    CiTextAlignRight,
    CiViewList,
    CiImageOn
} from "react-icons/ci";
import {
    LuHeading1,
    LuHeading2,
    LuHeading3,
    LuHeading4,
    LuHighlighter,
    LuListOrdered,
} from "react-icons/lu";
import { GoItalic } from "react-icons/go";
import { FaStrikethrough, FaUndo, FaRedo } from "react-icons/fa";
import { HiBold } from "react-icons/hi2";
import { BiLink } from "react-icons/bi";

import React from "react";
import { imageFileMap } from "@/component/pages/admin/posts/component/customTiptap/imageFileMap";


export default function MenuBar({ editor }) {

    if (!editor) {
        return null;
    }

    const Options = [
        {
            icon: <FaUndo className="size-4" />,
            onClick: () => editor.chain().focus().undo().run(),
            pressed: false,
        },
        {
            icon: <FaRedo className="size-4" />,
            onClick: () => editor.chain().focus().redo().run(),
            pressed: false,
        },
        {
            icon: <LuHeading1 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            pressed: editor.isActive("heading", { level: 1 }),
        },
        {
            icon: <LuHeading2 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            pressed: editor.isActive("heading", { level: 2 }),
        },
        {
            icon: <LuHeading3 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            pressed: editor.isActive("heading", { level: 3 }),
        },
        {
            icon: <LuHeading4 className="size-4" />,
            onClick: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            pressed: editor.isActive("heading", { level: 4 }),
        },
        {
            icon: <HiBold className="size-4" />,
            onClick: () => editor.chain().focus().toggleBold().run(),
            pressed: editor.isActive("bold"),
        },
        {
            icon: <GoItalic className="size-4" />,
            onClick: () => editor.chain().focus().toggleItalic().run(),
            pressed: editor.isActive("italic"),
        },
        {
            icon: <FaStrikethrough className="size-4" />,
            onClick: () => editor.chain().focus().toggleStrike().run(),
            pressed: editor.isActive("strike"),
        },
        {
            icon: <CiTextAlignLeft className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("left").run(),
            pressed: editor.isActive({ textAlign: "left" }),
        },
        {
            icon: <CiTextAlignCenter className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("center").run(),
            pressed: editor.isActive({ textAlign: "center" }),
        },
        {
            icon: <CiTextAlignRight className="size-4" />,
            onClick: () => editor.chain().focus().setTextAlign("right").run(),
            pressed: editor.isActive({ textAlign: "right" }),
        },
        {
            icon: <CiViewList className="size-4" />,
            onClick: () => editor.chain().focus().toggleBulletList().run(),
            pressed: editor.isActive("bulletList"),
        },
        {
            icon: <LuListOrdered className="size-4" />,
            onClick: () => editor.chain().focus().toggleOrderedList().run(),
            pressed: editor.isActive("orderedList"),
        },
        {
            icon: <LuHighlighter className="size-4" />,
            onClick: () => editor.chain().focus().toggleHighlight().run(),
            pressed: editor.isActive("highlight"),
        },
        {
            icon: <BiLink className="size-4" />,
            onClick: () => {
                const url = window.prompt("Nhập URL:");

                if (url) {
                    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
                }
            },
            pressed: editor.isActive("link"),
        },
        {
            icon: (
                <input
                    type="color"
                    onChange={(e) =>
                        editor.chain().focus().setColor(e.target.value).run()
                    }
                    className="w-6 h-6 border-none p-0 bg-transparent"
                    title="Chọn màu chữ"
                />
            ),
            onClick: () => { },
            pressed: false,
        },
        {
            icon: (
                <>
                    <label htmlFor="image-upload">
                        <CiImageOn className="size-4 cursor-pointer" />
                    </label>
                    <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        hidden
                        onChange={(e) => {
                            const files = e.target.files;
                            if (!files) return;
                            const name = prompt("Nhập Tiêu đề ảnh:");
                            Array.from(files).forEach(file => {
                                const url = URL.createObjectURL(file);
                                imageFileMap.set(url, file); // lưu ảnh blob
                                editor.chain().focus().setImage({
                                    src: url,
                                    alt: name,
                                    title: name
                                }).run();
                            });

                            e.target.value = "";
                        }}
                    />
                </>
            ),
            onClick: () => { },
            pressed: false,
        },
        {
            icon: <span className="text-sm font-semibold">Box</span>,
            onClick: () => {
                editor.chain().focus().insertContent(`<div class="green-box"><p>Nội dung trong ô xanh</p></div>`).run();
            },
            pressed: false,
        },


    ];

    return (
        <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
            {Options.map((option, index) => (
                <button
                    key={index}
                    onClick={option.onClick}
                    className={`p-2 rounded-md hover:bg-slate-200 ${option.pressed ? "bg-slate-200" : ""}`}
                >
                    {option.icon}
                </button>
            ))}
        </div>
    );
}
