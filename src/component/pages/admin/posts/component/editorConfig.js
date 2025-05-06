
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import CustomImage from "@/component/pages/admin/posts/component/customTiptap/CustomImage";
import GreenBox from "@/component/pages/admin/posts/component/GreenBox";
export const createEditor = ({ content = '', onUpdate }) => {
    return useEditor({
        extensions: [
            StarterKit.configure({
                heading: {},
                bulletList: {
                    HTMLAttributes: {
                        class: 'list-disc ml-3',
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: 'list-decimal ml-3',
                    },
                },
                link: false,
            }),
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Color.configure({ types: ['textStyle'] }),
            TextStyle,
            Highlight,
            CustomImage,
            Link.configure({
                openOnClick: false,
                autolink: true,
                linkOnPaste: true,
            }),
            GreenBox,
        ],
        content,
        editorProps: {
            attributes: {
                class:
                    'min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 prose max-w-none',
            },
        },
        onUpdate,
    });
};
