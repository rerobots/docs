import React from 'react';
import Head from 'next/head';

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';


export default function App({ Component, pageProps }: AppProps<MarkdocNextJsPageProps>)
{
    const { markdoc } = pageProps;

    return (
        <>
            <Head>
                <title>{markdoc.frontmatter.title}</title>
            </Head>
            <Component {...pageProps} />
        </>
    );
}
