import React from 'react';


interface AbbrProps {
    children: any;
    title: string;
}


export function Abbr({ children, title }: AbbrProps)
{
    return (
        <abbr title={title}>
            {children}
        </abbr>
    );
}
