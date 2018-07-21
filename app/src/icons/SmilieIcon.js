import React from "react"

const SmilieIcon = props => (
    <svg width={29} height={29} {...props}>
        <title>icon_profile</title>
        <g transform="translate(1 1)" fillRule="nonzero" fill="none">
            <circle stroke="#FFF" strokeWidth={2} cx={13.5} cy={13.5} r={13.5} />
            <circle fill="#FFF" cx={9} cy={10} r={3} />
            <circle fill="#FFF" cx={18} cy={10} r={3} />
            <path
                d="M6 18c4.915 4 9.915 4 15 0"
                stroke="#FFF"
                strokeWidth={2}
                strokeLinecap="round"
            />
        </g>
    </svg>
);

export default SmilieIcon
