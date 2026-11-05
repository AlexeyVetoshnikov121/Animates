'use client'

import { useScroll } from "framer-motion"
import { useRef, useEffect } from "react"

export default function CurveText() {
    const container = useRef(null)
    const texts: any = useRef([])
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", "end start"]
    })

    useEffect(() => {
        if (!texts.current) return
        scrollYProgress.on('change', e => {
            texts.current.forEach((text: any, i: number) => {
                text.setAttribute('startOffset', -25 + (i * 30) + (e * 95) + '%')
            })
        }) //e это значение scrollYProgress
    }, [])

    
    return ( 
        <svg ref={container} width="1000" height="500" viewBox="0 0 37600 12157">
            <svg width="38100" height="11101" viewBox="0 0 38100 11101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path id="curve" d="M0 11100.5C14050 11100.5 8850.01 1100.5 18600 0.501953C27850 500.502 23700 11100.5 38100 11100.5" 
                    stroke="black"
                    fill="none"
                />
            </svg>
            <text className="text-[1000px] uppercase">
                {[...Array(3)].map((_, i) => {
                    return <textPath ref={el => { texts.current[i] = el }} href="#curve" startOffset={i * 35 + '%'}>Lorem ipsum dolor sit</textPath>
                })}
            </text>
        </svg>
    )
}


