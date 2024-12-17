import { CodeBlock, Heading, Image, Link } from '../components';

export const link = {
    render: Link,
    attributes: {
        href: {
            type: String,
        },
    },
};

export const fence = {
    render: CodeBlock,
    attributes: {
        content: {
            type: String,
        },
        language: {
            type: String,
        },
    },
};

export const heading = {
    render: Heading,
    attributes: {
        level: {
            type: Number,
            required: true,
            default: 1,
        },
    },
};

export const image = {
    render: Image,
    description: 'Image with shape constraints',
    attributes: {
        src: {
            type: String,
            errorLevel: 'critical',
            required: true,
        },
        alt: {
            type: String,
        },
        maxWidth: {
            type: String,
        },
    },
};
