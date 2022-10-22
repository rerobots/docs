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

    const toggleMenu = () => {
        const sidenav = document.getElementById('navbar-collapse-1');
        if (!(sidenav?.classList)) {
            return;
        }
        if (sidenav.classList.contains('navbar-collapse')) {
            sidenav.classList.add('navbar-collapse-show');
            sidenav.classList.remove('navbar-collapse');
        } else {
            sidenav.classList.add('navbar-collapse');
            sidenav.classList.remove('navbar-collapse-show');
        }
    };

    const possiblyCollapseMenu = () => {
        const sidenav = document.getElementById('navbar-collapse-1');
        if (!(sidenav?.classList)) {
            return;
        }
        if (!sidenav.classList.contains('navbar-collapse')) {
            sidenav.classList.add('navbar-collapse');
            sidenav.classList.remove('navbar-collapse-show');
        }
    };

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
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false" onClick={toggleMenu}>
                  <span className="sr-only">Toggle navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                <Link href="/"><a className="navbar-brand" onClick={possiblyCollapseMenu}>
                  <span className="brandText"><span className="prefix-re">re</span>robots</span>
                </a></Link>
              </div>
              <div className="navbar-collapse" id="navbar-collapse-1">
                <ul className="navbar-items">
                <li onClick={possiblyCollapseMenu}><Link href="/intro">introduction</Link></li>
                <li onClick={possiblyCollapseMenu}><Link href="/guides">guides</Link></li>
                <li onClick={possiblyCollapseMenu}><Link href="/workspaces">workspaces</Link></li>
                <li onClick={possiblyCollapseMenu}><Link href="/api-summary">API</Link></li>
                <li onClick={possiblyCollapseMenu}><Link href="/references">references</Link></li>
                </ul>
              </div>
            </nav>
            <div id="main-content">
                <Component {...pageProps} />
            </div>
            <footer>
                Copyright &copy; 2022 rerobots, Inc.<br />
                <a href="https://rerobots.net/site/terms-of-service">terms of service</a> <a href="https://rerobots.net/contact">contact</a>
                <a href={repoUrl}>source</a>
            </footer>
        </>
    );
}
