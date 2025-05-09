
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
            handleDOMEvents: {
                paste: async (view, event) => {
                    const items = Array.from(event.clipboardData?.items || []);
                    for (const item of items) {
                        if (item.type.indexOf('image') === 0) {
                            const file = item.getAsFile();
                            if (!file) continue;

                            try {
                                const imageUrl = await uploadToCloudinary(file); // ⬅️ hàm upload ảnh
                                view.state.tr.insert(view.state.selection.from, view.state.schema.nodes.image.create({ src: imageUrl }));
                                view.dispatch(view.state.tr);
                            } catch (err) {
                                console.error('Upload image failed:', err);
                            }

                            // Ngăn dán mặc định nếu là ảnh
                            return true;
                        }
                    }

                    return false; // để xử lý các dán khác bình thường
                },
            },

        },
        onUpdate,
    });
};
