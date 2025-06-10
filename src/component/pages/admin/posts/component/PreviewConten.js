"use client";
import React from "react";
import Image from "next/image";
import styles from "@/component/style/BlogContent.module.css";


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
                className="text-blue-400 underline"
                style={style}
            >
                {content}
            </a>
        );
    }

    return <span style={style}>{content}</span>;
};


export default function PreviewContent({ postJson }) {

    const renderContent = (section, index) => {
        const textAlign = section.attrs?.textAlign || "left";
        const alignStyle = textAlign ? { textAlign } : {};

        switch (section.type) {
            case "heading": {
                const level = section.attrs?.level || 2;
                const contentArray = section.content || [];

                const HeadingTag = `h${Math.min(level, 4)}`;
                const headingClassMap = {
                    1: "text-2xl font-bold mt-8 mb-4",
                    2: "text-xl font-semibold mt-6 mb-3",
                    3: "text-lg font-medium mt-5 mb-2",
                    4: "text-base font-medium mt-4 mb-2",
                };

                return (
                    <HeadingTag
                        key={index}
                        id={contentArray[0]?.text}
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
                    <p key={index} className="mb-4 leading-relaxed " style={alignStyle}>
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

    return (
        <div className={styles.container}>

            <ul className="bg-mint border border-primary text-primary p-4 rounded mb-8 text-md space-y-2">
                {(() => {
                    const numbering = { 2: 0, 3: 0, 4: 0 };

                    return postJson?.content
                        ?.filter((section) => section.type === "heading" && section.content?.[0]?.text)
                        .map((section, index) => {
                            const level = section.attrs?.level || 2;
                            const text = section.content?.[0]?.text || "";
                            const slug = slugify(text);

                            // Reset cấp thấp hơn khi có heading mới
                            if (level === 2) {
                                numbering[2]++;
                                numbering[3] = 0;
                                numbering[4] = 0;
                            } else if (level === 3) {
                                numbering[3]++;
                                numbering[4] = 0;
                            } else if (level === 4) {
                                numbering[4]++;
                            }

                            // Tạo chuỗi chỉ số
                            const numberPrefix =
                                level === 2
                                    ? `${numbering[2]}.`
                                    : level === 3
                                        ? `${numbering[2]}.${numbering[3]}.`
                                        : `${numbering[2]}.${numbering[3]}.${numbering[4]}.`;

                            // Tạo class thụt lề
                            const indentClass = {
                                2: "ml-0",
                                3: "ml-4",
                                4: "ml-8",
                            }[level] || "ml-0";

                            return (
                                <li key={index} className={`${indentClass}`}>
                                    <a
                                        href={`#${text}`}
                                        className="hover:underline block"
                                        style={{
                                            color: "var(--color-primary)",
                                            fontWeight: 500,
                                            fontSize: "1rem",
                                        }}
                                    >
                                        {numberPrefix} {text}
                                    </a>
                                </li>
                            );
                        });
                })()}
            </ul>

            {postJson?.content?.map((section, index) => renderContent(section, index))}
        </div>
    );
}
