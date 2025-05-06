// components/extensions/GreenBox.js
import { Node } from '@tiptap/core';

const GreenBox = Node.create({
    name: 'greenBox',

    group: 'block',

    content: 'block+',

    defining: true,

    parseHTML() {
        return [
            {
                tag: 'div.green-box',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', { class: 'green-box bg-primary text-white p-4 rounded-md' }, 0];
    },
});

export default GreenBox;
