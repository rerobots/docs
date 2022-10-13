import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

import type { AppProps } from 'next/app';
import type { MarkdocNextJsPageProps } from '@markdoc/next.js';

import '../css/main.css';


export default function App({ Component, pageProps }: AppProps<MarkdocNextJsPageProps>)
{
    const { markdoc } = pageProps;

    let title = 'rerobots';
    if (markdoc?.frontmatter?.title) {
        title += ': ' + markdoc.frontmatter.title;
    } else {
        title += '  documentation';
    }

    let repoUrl = 'https://github.com/rerobots/docs';
    if (markdoc?.frontmatter?.srcUrl) {
        repoUrl = markdoc?.frontmatter?.srcUrl;
    } else if (markdoc?.file?.path) {
        repoUrl += '/blob/master/pages' + markdoc.file.path;
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
            </Head>
            <nav className="navbar">
              <div className="navbar-header">
                <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <a className="navbar-brand" href="https://rerobots.net/">
                  <span className="prefix-re">re</span>robots
                </a>
              </div>
              <div className="collapse navbar-collapse" id="navbar-collapse-1">
                <ul className="navbar-items">
                <li><Link href="/">introduction</Link></li>
                <li><Link href="/prelim">preliminaries</Link></li>
                <li><Link href="/guides">guides</Link></li>
                <li><Link href="/workspaces">workspaces</Link></li>
                <li><Link href="/api-summary">API</Link></li>
                <li><Link href="/references">references</Link></li>
                </ul>
              </div>
            </nav>
            <div id="main-content">
                <Component {...pageProps} />
            </div>
            <footer>
              <div>
                Copyright &copy; 2022 rerobots, Inc.<br />
                <a className="footer-left" href={repoUrl}>Edit this page</a>; <a rel="license" href="https://github.com/rerobots/docs" id="commons-license">free, open source</a>.
              </div>
              <div>
                <span id="update-date">updated DATESTAMP</span>
                <a href="https://rerobots.net/site/terms-of-service">terms of service</a> <a href="https://rerobots.net/contact">contact</a>
              </div>
            </footer>
        </>
    );
}
