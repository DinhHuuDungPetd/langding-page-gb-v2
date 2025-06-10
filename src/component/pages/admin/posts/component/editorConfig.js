import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import CustomImage from "@/component/pages/admin/posts/component/customTiptap/CustomImage";
import GreenBox from "@/component/pages/admin/posts/component/GreenBox";
import { imageFileMap } from "@/component/pages/admin/posts/component/customTiptap/imageFileMap";

export const createEditor = ({ content = '', onUpdate }) => {
    return useEditor({
        extensions: [
            StarterKit.configure({
                heading: {},
                bulletList: { HTMLAttributes: { class: 'list-disc ml-3' } },
                orderedList: { HTMLAttributes: { class: 'list-decimal ml-3' } },
                link: false,
            }),
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
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
                class: 'min-h-[156px] border rounded-md bg-slate-50 py-2 px-3 prose max-w-none',
            },
            handleDOMEvents: {
                paste: async (view, event) => {
                    const items = Array.from(event.clipboardData?.items || []);

                    for (const item of items) {
                        if (item.type.startsWith('image/')) {
                            const file = item.getAsFile();
                            if (!file) continue;

                            try {
                                // Tạo URL blob từ file
                                const url = URL.createObjectURL(file);
                                // Lưu file vào imageFileMap
                                imageFileMap.set(url, file);
                                // Lấy tên file làm alt và title
                                const name = file.name || 'Pasted Image';

                                const { state, dispatch } = view;
                                const { from } = state.selection;
                                const imageNode = state.schema.nodes.image.create({
                                    src: url,
                                    alt: name,
                                    title: name,
                                });
                                dispatch(state.tr.insert(from, imageNode));

                                return true;
                            } catch (err) {
                                console.error('❌ Error processing image:', err);
                                alert('Không thể xử lý ảnh, ảnh sẽ không được chèn.');
                            }
                        }
                    }

                    return false;
                },
            },
        },
        onUpdate,
    });
};
