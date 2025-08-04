import React from 'react';
import NextjsLink from 'next/link';


interface LinkProps {
    children: any;
    href: string;
}


export function Link({ children, href }: LinkProps)
{
    if (typeof children === 'string') {
        if (children.startsWith('https://')) {
            children = children.substring(8);
        } else if (children.startsWith('http://')) {
            children = children.substring(7);
        }
    }
    return (
        <>
            {href.startsWith("https://") || href.startsWith("http://") ? (
                <a href={href}>{children}</a>
            ) : (
                <NextjsLink href={href}>{children}</NextjsLink>
            )}
        </>
    );
}
