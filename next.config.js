const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({
    schemaPath: 'src/markdoc',
})({
    i18n: {
        defaultLocale: 'en-US',
        locales: ['en-US', 'es'],
        localeDetection: true,
    },
    pageExtensions: ['ts', 'tsx', 'md'],
});
