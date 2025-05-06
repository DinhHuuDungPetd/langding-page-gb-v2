"use client";

import { EditorContent } from "@tiptap/react";
import React from "react";
import MenuBar from "@/component/pages/admin/posts/component/MenuBar";
import "@/component/pages/admin/posts/component/styles.scss";
import styles from "@/component/style/BlogContent.module.css";
export default function EditContent({ editor }) {

    return (
        <div className={styles.container}>
            <MenuBar editor={editor} />

            <EditorContent editor={editor} />
        </div>
    );
}
