import React from 'react';


interface AlertBannerProps {
    children: any;
}


export function AlertBanner({ children }: AlertBannerProps)
{
    return (
        <div>
            {children}
            <style jsx>{`
div {
    text-align: center;
    padding: 0.1em 0.5em;
    color: #444;
    border: 1px;
    border-style: solid;
    border-color: #F00;
    border-radius: 0.5em;
    font-weight: bold;
    background-color: #FEE;
}
            `}</style>
        </div>
    );
}
