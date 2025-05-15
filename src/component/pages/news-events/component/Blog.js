"use client"
import React from "react";
import Image from "next/image";
import styles from "@/component/style/BlogContent.module.css";
import { FaCalendarAlt, FaUser, FaEye } from 'react-icons/fa';

const slugify = (text) =>
    text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");


const renderTextWithMarks = (textObj) => {
    let content = textObj.text;
    const marks = textObj.marks || [];
    let style = {};

    marks.forEach((mark) => {
        switch (mark.type) {
            case "bold":
                content = <strong>{content}</strong>;
                break;
            case "italic":
                content = <em>{content}</em>;
                break;
            case "underline":
                content = <u>{content}</u>;
                break;
            case "strike":
                content = <s>{content}</s>;
                break;
            case "code":
                content = <code>{content}</code>;
                break;
            case "textStyle":
                if (mark.attrs?.color) {
                    style.color = mark.attrs.color;
                }
                break;
        }
    });

    const linkMark = marks.find((m) => m.type === "link");
    if (linkMark) {
        return (
            <a
                href={linkMark.attrs.href}
                target={linkMark.attrs.target || "_blank"}
                rel={linkMark.attrs.rel || "noopener noreferrer"}
                className="text-blue-600 underline"
                style={style}
            >
                {content}
            </a>
        );
    }

    return <span style={style}>{content}</span>;
};

export default function Blog({ blog }) {

    const levelOneItems = blog?.postJson?.content?.filter(section => section.attrs?.level === 2);

    const renderContent = (section, index) => {
        const textAlign = section.attrs?.textAlign || "left";
        const alignStyle = textAlign ? { textAlign } : {};

        switch (section.type) {
            case "heading": {
                const level = section.attrs?.level || 2;
                const contentArray = section.content || [];
                const slug =
                    level === 2 && contentArray[0]?.text
                        ? slugify(contentArray[0].text)
                        : undefined;
                const HeadingTag = `h${Math.min(level, 4)}`;
                const headingClassMap = {
                    1: "text-2xl font-bold mt-8 mb-4",
                    2: "text-xl font-semibold mt-6 mb-3",
                    3: "text-lg font-medium mt-5 mb-2",
                    4: "text-md font-medium mt-4 mb-2",
                };

                return (
                    <HeadingTag
                        key={index}
                        id={slug}
                        className={headingClassMap[level] || ""}
                        style={alignStyle}
                    >
                        {contentArray.map((textObj, i) => (
                            <React.Fragment key={i}>
                                {renderTextWithMarks(textObj)}
                            </React.Fragment>
                        ))}
                    </HeadingTag>
                );
            }

            case "paragraph": {
                const contentArray = section.content;

                const isEmpty =
                    !contentArray ||
                    contentArray.length === 0 ||
                    contentArray.every(
                        (part) =>
                            (part.type === "text" && (!part.text || part.text.trim() === "")) ||
                            part.type === "hardBreak"
                    );

                if (isEmpty) return null;

                return (
                    <p key={index} className="mb-4 leading-relaxed text-sm sm:text-md" style={alignStyle}>
                        {contentArray.map((part, idx) => {
                            if (part.type === "hardBreak") return <br key={idx} />;
                            return (
                                <React.Fragment key={idx}>
                                    {renderTextWithMarks(part)}
                                </React.Fragment>
                            );
                        })}
                    </p>
                );
            }


            case "bulletList": {
                return (
                    <ul key={index} className="list-disc my-4 pl-5">
                        {section.content?.map((item, itemIdx) => (
                            <li key={itemIdx}>
                                {item.content?.map((sub, subIdx) =>
                                    renderContent(sub, `${index}-${itemIdx}-${subIdx}`)
                                )}
                            </li>
                        ))}
                    </ul>
                );
            }

            case "orderedList": {
                return (
                    <ol key={index} className="list-decimal my-4 pl-5">
                        {section.content?.map((item, itemIdx) => (
                            <li key={itemIdx}>
                                {item.content?.map((sub, subIdx) =>
                                    renderContent(sub, `${index}-${itemIdx}-${subIdx}`)
                                )}
                            </li>
                        ))}
                    </ol >
                );
            }

            case "image": {
                return (
                    <div key={index} className="my-6">
                        <Image
                            src={section.attrs?.src}
                            alt={section.attrs?.alt || "Green Lab image"}
                            title={section.attrs?.title || "Green Lab image"}
                            width={1000}
                            height={600}
                            className="rounded shadow"
                        />
                    </div>
                );
            }
            case "greenBox": {
                return (
                    <div key={index} className="green-box bg-primary text-white p-4 rounded-md space-y-4">
                        {section.content?.map((subSection, subIndex) =>
                            renderContent(subSection, `${index}-greenbox-${subIndex}`)
                        )}
                    </div>
                );
            }

            default:
                return null;
        }
    };

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={`${styles.blogContent} px-4 py-6 max-w-5xl mx-auto`}>

            <div className="flex flex-wrap items-center justify-center md:justify-start text-gray-400 text-sm border-b pb-4 mb-4 px-4 gap-x-4 gap-y-2">
                <div className="flex items-center space-x-2">
                    <FaCalendarAlt className="text-green-700" size={20} />
                    <span>Ngày đăng: {formatDate(blog?.time)}</span>
                </div>

                <div className="hidden md:block h-4 border-l border-gray-300 mx-2" />

                <div className="flex items-center space-x-2">
                    <FaUser className="text-green-700" size={20} />
                    <span>Tác giả: admin</span>
                </div>

                <div className="hidden md:block h-4 border-l border-gray-300 mx-2" />

                <div className="flex items-center space-x-2">
                    <FaEye className="text-green-700" size={20} />
                    <span>{blog.views}</span>
                </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-primary mb-3">{blog?.title}</h1>

            <h5 className="mb-4 medium-italic text-sm sm:text-md text-pretty text-gray-500">
                {blog?.description}
            </h5>

            <ul className="bg-mint border border-primary text-primary p-4 rounded mb-8 medium-italic text-sm sm:text-md sm:text-md text-pretty space-y-2">
                {levelOneItems?.map((section, index) => {
                    const text = section.content?.[0]?.text || "";
                    const slug = slugify(text);
                    return (
                        <li key={index}>
                            <a
                                href={`#${slug}`}
                                className="hover:underline"
                                style={{
                                    color: "var(--color-primary)",
                                    fontWeight: 500,
                                    fontStyle: "normal",
                                    fontSize: "1 rem",
                                }}
                            >
                                {text}
                            </a>

                        </li>
                    );
                })}
            </ul>

            {blog.postJson.content?.map((section, index) => renderContent(section, index))}
        </div >
    );
}

