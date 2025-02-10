import React from 'react';


interface HeadingProps {
    children: string;
    level: number;
}

export function Heading({ children, level }: HeadingProps)
{
    const anchor = children.toLowerCase().split(/ +/).join('-')
    const wrappedChildren = (<>
        <span>{children}</span>
        <a href={'#' + anchor} className='permalink' aria-label='permalink'></a>
    </>);
    return React.createElement(
        `h${level}`,
        {'id': anchor},
        wrappedChildren
    );
}
