import { Image } from "@tiptap/extension-image";

const CustomImage = Image.extend({
    addAttributes() {
        return {
            ...Image.config.addAttributes(),
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
