import { Abbr, AlertBanner } from '../components';

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
