import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';

import 'prismjs';
import 'prismjs/themes/prism.css';
import 'prismjs/components/prism-bash.min';
import 'prismjs/components/prism-http.min';
import 'prismjs/components/prism-json.min';
import 'prismjs/components/prism-python.min';

import '../styles/main.css';


export default function App({ Component, pageProps }: AppProps<MarkdocNextJsPageProps>)
{
    const { markdoc } = pageProps;

    let title: string;
    if (markdoc?.frontmatter?.title) {
        if (markdoc.frontmatter.section) {
            title = `${markdoc.frontmatter.title} | ${markdoc.frontmatter.section} | rerobots`;
        } else {
            title = `${markdoc.frontmatter.title} | rerobots`;
        }
    } else {
        title = 'rerobots documentation';
    }

    let repoUrl = 'https://github.com/rerobots/docs';
    if (markdoc?.frontmatter?.srcUrl) {
        repoUrl = markdoc?.frontmatter?.srcUrl;
    } else if (markdoc?.file?.path) {
        repoUrl += '/blob/main/pages' + markdoc.file.path;
    }

    let ogImage = markdoc?.frontmatter?.image;
    if (!ogImage) {
        ogImage = 'https://docs.rerobots.net/smaller-logo.png';
    } else if (!ogImage.startsWith('http://') && !ogImage.startsWith('https://')) {
        ogImage = 'https://docs.rerobots.net' + (ogImage[0] === '/' ? '' : '/') + ogImage;
    }

    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:type" content="website" />
                <meta property="og:title" content={title} />
                <meta property="og:image" content={ogImage} />
                {(typeof process !== 'undefined') && process?.env?.NEXT_PUBLIC_ANALYTICS_ID && (
                    <script async src="https://analytics.umami.is/script.js" data-website-id={process?.env?.NEXT_PUBLIC_ANALYTICS_ID}></script>
                )}
            </Head>
            <nav className="navbar">
              <div className="navbar-header">
                <Link href="/" className="navbarBrand">
                  <span className="brandText"><span className="prefix-re">re</span>robots</span>
                </Link>
              </div>
            </nav>
            <div className="body">
            <nav className="navbarSide">
                <ul>
                    <li><Link href="/intro">introduction</Link></li>
                    <li><Link href="/guides">guides</Link></li>
                    <li><Link href="/workspaces">workspaces</Link></li>
                    <li>hardshare
                        <ul className="innerNavLinks">
                            <li><Link href="/hardshare/intro">introduction</Link></li>
                            <li><Link href="/hardshare/quickstart">quickstart</Link></li>
                            <li><Link href="/hardshare/install">installation</Link></li>
                            <li><Link href="/hardshare/tutorials">tutorials</Link></li>
                            <li><Link href="/hardshare/maint">maintenance</Link></li>
                            <li><Link href="/hardshare/help">help</Link></li>
                            <li><Link href="/hardshare/develop">develop</Link></li>
                        </ul>
                    </li>
                    <li><Link href="/api-summary">API</Link></li>
                    <li><Link href="/references">references</Link></li>
                </ul>
            </nav>
            <div id="main-content">
                <Component {...pageProps} />
            </div>
            </div>
            <footer>
                Copyright &copy; 2024 rerobots, Inc.<br />
                <a href="https://rerobots.net/site/terms-of-service">terms of service</a> <a href="https://rerobots.net/contact">contact</a>
                <a href={repoUrl}>source</a>
            </footer>
        </>
    );
}
