import { useRef } from "react"

const ds = [
    "M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8",
    "M8 8a4 4 0 1 1 8 0c0 1.098 -.564 2.025 -1.159 2.815l-6.841 9.185h8",
    "M8 16a4 4 0 1 0 4 -4",
    "M15 20v-15l-8 11h10",
    "M8 20h4a4 4 0 1 0 0 -8h-4v-8h8" 
]

export default function Gooye() {
    const paths: any = useRef([])
    const circles: any = useRef([])
    const nb0fCircles = 30
    const radius = 2

    return (
        <div className="flex h-screen justify-center items-center">
            <svg width="1056" height="956" viewBox="0 0 1 46" >
                <path d={ds[0]} ref={el => { paths.current[0] = el }} />
                <g>
                    {
                        [...Array(nb0fCircles)].map((_, i) => {
                            return <circle key={i} ref={el => { circles.current[i] = el }} 
                                r={radius} cx={0} cy={0}
                            />
                        })
                    }
                </g>
            </svg>
        </div>
    )
}