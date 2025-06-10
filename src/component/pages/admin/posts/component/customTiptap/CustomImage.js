import { Image } from "@tiptap/extension-image";

const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...this.parent(), // dùng this.parent thay vì Image.config
            title: {
                default: null,
            },
            alt: {
                default: null,
            },
        };
    },
});

export default CustomImage;
