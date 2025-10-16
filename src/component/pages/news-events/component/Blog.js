"use client";
import React from "react";
import Image from "next/image";
import parse, { domToReact } from 'html-react-parser';
import styles from "@/component/style/BlogContent.module.css";
import { FaUser, FaEye } from "react-icons/fa";
import { SiZalo } from 'react-icons/si';
const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");

const getTextFromNode = (domNode) => {
    let text = '';
    if (!domNode) return text;

    domNode.forEach(node => {
        if (node.type === 'text') {
            text += node.data;
        } else if (node.type === 'tag' && node.children) {
            text += getTextFromNode(node.children);
        }
    });
    return text;
};

export default function Blog({ blog }) {
    if (!blog) return null;

    const renderBodyItem = (item, index) => {
        switch (item.type) {
            case "text":
                if (!item.content || item.content.trim() === "<p> </p>") {
                    return null;
                }

                const options = {
                    replace: (domNode) => {
                        if (domNode.name === 'h2') {
                            const textContent = getTextFromNode(domNode.children);
                            if (textContent) {
                                const slug = slugify(textContent);
                                const headingText = domToReact(domNode.children);
                                return <h2 id={slug}>{headingText}</h2>;
                            }
                        }
                    },
                };

                return (
                    <div key={index}>
                        {parse(item.content, options)}
                    </div>
                );

            case "image":
                return (
                    <figure key={index} className="my-6 text-center">
                        <Image
                            src={item.url || "https://placehold.co/1000x600"}
                            alt={item.caption || "GreenLab image"}
                            width={1000}
                            height={600}
                            // Dùng class 'image' từ CSS module
                            className={styles.image}
                        />
                        {item.caption && (
                            <figcaption className="text-gray-500 italic text-sm mt-2">
                                {item.caption}
                            </figcaption>
                        )}
                    </figure>
                );

            default:
                return null;
        }
    };

    const headings = blog.body
        ?.filter((item) => item.type === "text" && /<h2[\s\S]*?>.*?<\/h2>/i.test(item.content))
        ?.map((item) => {
            const match = item.content.match(/<h2[\s\S]*?>(.*?)<\/h2>/i);
            if (!match) return null;
            const cleanText = match[1].replace(/<[^>]*>/g, "").trim();
            if (!cleanText) return null;
            return {
                text: cleanText,
                slug: slugify(cleanText),
            };
        })
        .filter(Boolean);

    return (
        <div className={`${styles.blogContent} px-4 py-6 max-w-5xl mx-auto`}>
            <div className="flex flex-wrap items-center justify-center md:justify-start text-gray-400 text-sm border-b pb-4 mb-4 px-4 gap-x-4 gap-y-2">
                <div className="flex items-center space-x-2">
                    <FaUser className="text-green-700" size={18} />
                    <span>Tác giả: {blog.author || "Admin"}</span>
                </div>
                <div className="hidden md:block h-4 border-l border-gray-300 mx-2" />
                <div className="flex items-center space-x-2">
                    <FaEye className="text-green-700" size={18} />
                    <span>{blog.totalView || 0}</span>
                </div>
                <div className="hidden md:block h-4 border-l border-gray-300 mx-2" />
                <a href={blog.linkView} className="flex items-center space-x-2">
                    <SiZalo className="text-green-700" size={30} />
                    <span>Truy cập bài viết OA</span>
                </a>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-3 uppercase">

                {blog.title}

            </h1>

            {blog.description && (
                <p className="mb-4 italic text-gray-500 text-base">
                    {blog.description}
                </p>
            )}

            {blog.cover?.photoUrl && (
                <div className="my-6 text-center">
                    <Image
                        src={blog.cover.photoUrl}
                        alt="Cover"
                        width={1000}
                        height={600}
                        className={styles.image}
                    />
                </div>
            )}

            {headings?.length > 0 && (
                <ul className="bg-gray-100 border-l-4 border-green-600 p-4 rounded mb-8 text-sm md:text-base space-y-2">
                    {headings.map((h, i) => (
                        <li key={i}>
                            <a href={`#${h.slug}`} className="hover:underline block font-medium text-gray-700 hover:text-green-700">
                                {i + 1}. {h.text}
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                {blog.body?.map(renderBodyItem)}
            </div>
        </div>
    );
}