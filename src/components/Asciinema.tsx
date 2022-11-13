import React from 'react';
import NextjsScript from 'next/script';


interface AsciinemaProps {
    id: string;
}


export function Asciinema({ id }: AsciinemaProps)
{
    React.useEffect(() => {
        const holder = document.getElementById(`asciicast-${id}-holder`);
        if (holder === null) {
            return;
        }
        const player = document.createElement('script');
        holder.appendChild(player);
        player.id = `asciicast-${id}`;
        player.src = `https://asciinema.org/a/${id}.js`;

        return () => {
            holder.removeChild(player);
        };
    }, [id]);

    return (
        <>
            <div id={`asciicast-${id}-holder`}></div>
        </>
    );
}
