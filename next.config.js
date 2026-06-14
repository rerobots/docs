const withMarkdoc = require('@markdoc/next.js');

module.exports = withMarkdoc({
    schemaPath: 'src/markdoc',
})({
    output: 'export',
    pageExtensions: ['ts', 'tsx', 'md'],
});
