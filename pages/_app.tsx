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

    const toggleMenu = () => {
        const sidenav = document.getElementById('navbarSide');
        if (!(sidenav?.classList)) {
            return;
        }
        if (sidenav.classList.contains('navbarSideShow')) {
            sidenav.classList.remove('navbarSideShow');
            sidenav.classList.add('navbarSideHide');
        } else {
            sidenav.classList.add('navbarSideShow');
            sidenav.classList.remove('navbarSideHide');
        }
    };

    const possiblyCollapseMenu = () => {
        const sidenav = document.getElementById('navbarSide');
        if (!(sidenav?.classList)) {
            return;
        }
        if (sidenav.classList.contains('navbarSideShow')) {
            sidenav.classList.remove('navbarSideShow');
            sidenav.classList.add('navbarSideHide');
        }
    };

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
                <div>
                    <button type="button" className="navbarToggle collapsed" aria-expanded="false" onClick={toggleMenu}>
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <span className="brandText"><span className="prefix-re">re</span>robots</span>
                </div>
            </nav>
            <div className="body">
            <nav id="navbarSide" className="navbarSideHide">
                <ul>
                    <li onClick={possiblyCollapseMenu}><Link href="/">FAQ</Link></li>
                    <li onClick={possiblyCollapseMenu}><Link href="/intro">introduction</Link></li>
                    <li onClick={possiblyCollapseMenu}><Link href="/guides">guides</Link></li>
                    <li onClick={possiblyCollapseMenu}><Link href="/workspaces">workspaces</Link></li>
                    <li>hardshare
                        <ul className="innerNavLinks">
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/intro">introduction</Link></li>
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/quickstart">quickstart</Link></li>
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/install">installation</Link></li>
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/tutorials">tutorials</Link></li>
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/filters">filters</Link></li>
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/maint">maintenance</Link></li>
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/help">help</Link></li>
                            <li onClick={possiblyCollapseMenu}><Link href="/hardshare/develop">develop</Link></li>
                        </ul>
                    </li>
                    <li onClick={possiblyCollapseMenu}><Link href="/api-summary">API</Link></li>
                    <li onClick={possiblyCollapseMenu}><Link href="/references">references</Link></li>
                </ul>
            </nav>
            <div id="main-content">
                <Component {...pageProps} />
            </div>
            </div>
            <footer>
                Copyright &copy; 2025 rerobots, Inc.<br />
                <a href="https://rerobots.net/site/terms-of-service">terms of service</a> <a href="https://rerobots.net/contact">contact</a>
                <a href={repoUrl}>source</a>
            </footer>
        </>
    );
}
