import { Abbr, AlertBanner, Asciinema } from '../components';

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
