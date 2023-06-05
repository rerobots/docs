import { Abbr, AlertBanner, Asciinema, Image, Vimeo } from '../components';

export const abbr = {
    render: Abbr,
    attributes: {
        title: {
            type: String,
        },
    },
};

export const alert = {
    render: AlertBanner,
};

export const asciinema = {
    render: Asciinema,
    description: 'Renders an Asciinema asciicast',
    attributes: {
        id: {
            type: String,
            errorLevel: 'critical',
            required: true,
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

export const vimeo = {
    render: Vimeo,
    description: 'Embeds a video on Vimeo',
    attributes: {
        id: {
            type: String,
            errorLevel: 'critical',
            required: true,
        },
    },
};
