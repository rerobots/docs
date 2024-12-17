import React from 'react';


interface ImageProps {
    src: string;
    alt: string;
    maxWidth: string;
}

export function Image({ src, alt, maxWidth }: ImageProps)
{
    const style = {
        maxWidth: maxWidth ? maxWidth : '600px',
    };

    return (
        <img src={src} alt={alt} style={style} />
    );
}
