import * as React from "react"
const SvgComponent = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{
            shapeRendering: "geometricPrecision",
            textRendering: "geometricPrecision",
            imageRendering: "optimizeQuality",
            fillRule: "evenodd",
            clipRule: "evenodd",
        }}
        viewBox="150 100 900 1000"
        {...props} className="w-full h-full" transform="scale(0.5)"
    >
        <path
            fill="#fefffe"
            d="M591.5 139.5c162.485-4.658 
            293.318 56.675 392.5 184 78.52 
            110.894 104.52 233.227 78 367-29.37 
            123.67-97.204 219.837-203.5 288.5-106.377 
            63.91-220.377 
            82.91-342 
            57-125.642-31.18-222.142-101.68-289.5-211.5-59.865-105.047-76.865-216.713-51-335C207.81 
            363.294 279.31 266.794 390.5 200c62.501-35.448 129.501-55.614 201-60.5Zm94 118a613.713 
            613.713 0 0 1 111 8v103c-24.372-.44-48.705.06-73 1.5-29.534 
            6.204-45.7 24.37-48.5 54.5-.5 29.998-.667 59.998-.5 90 39.001-.167 78.001 
            0 117 .5-6.47 39.45-12.803 78.95-19 118.5-32.66 1-65.327 1.333-98 1v295h-131v-295h-107v-120h107c-.167-34.002 
            0-68.002.5-102 .306-36.247 10.64-69.247 31-99 28.719-34.444 65.553-53.11 110.5-56Z"
            style={{
                opacity: 0.996,
            }}
        />
    </svg>
)
export default SvgComponent
