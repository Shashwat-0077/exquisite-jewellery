import React from "react";

export default function Quotes(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="21"
            fill="none"
            viewBox="0 0 32 21"
        >
            <g fill="#654527" clipPath="url(#clip0_160_2)">
                <path d="M6.5 20a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"></path>
                <path d="M6.5 21A6.508 6.508 0 010 14.5C0 10.916 2.916 8 6.5 8s6.5 2.916 6.5 6.5S10.084 21 6.5 21zm0-11A4.505 4.505 0 002 14.5C2 16.981 4.019 19 6.5 19s4.5-2.019 4.5-4.5S8.981 10 6.5 10zM23.5 20a5.5 5.5 0 100-11 5.5 5.5 0 000 11z"></path>
                <path d="M23.5 21a6.508 6.508 0 01-6.5-6.5c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5-2.916 6.5-6.5 6.5zm0-11a4.505 4.505 0 00-4.5 4.5c0 2.481 2.019 4.5 4.5 4.5s4.5-2.019 4.5-4.5-2.019-4.5-4.5-4.5zM1 15a1 1 0 01-1-1C0 6.28 6.28 0 14 0a1 1 0 110 2C7.383 2 2 7.383 2 14a1 1 0 01-1 1z"></path>
                <path d="M18 15a1 1 0 01-1-1c0-7.72 6.28-14 14-14a1 1 0 110 2c-6.617 0-12 5.383-12 12a1 1 0 01-1 1z"></path>
            </g>
            <defs>
                <clipPath id="clip0_160_2">
                    <path fill="#fff" d="M0 0H32V21H0z"></path>
                </clipPath>
            </defs>
        </svg>
    );
}
