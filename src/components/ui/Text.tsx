'use client'

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/all"
import { motion } from "framer-motion"

export default function Text() {
    const firstText = useRef(null)
    const secondText = useRef(null)
    const slider = useRef(null)

    let xPercent = 0
    let direction = 1

    useEffect(() => {
        requestAnimationFrame(animation)
        gsap.registerPlugin(ScrollTrigger)

        gsap.from(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: 0.25,
                onUpdate: (e) => {
                    direction = e.direction * -1
                }
            },
            x: "-=100px",
        })
        
    }, [])
    
    const animation = () => {
        if (xPercent <= -100) {
            xPercent = 0
        }
        if (xPercent > 0) {
            xPercent = -100
        }
        gsap.set(firstText.current, { xPercent: xPercent } )
        gsap.set(secondText.current, { xPercent: xPercent } )

        xPercent += 0.15 * direction
        
        requestAnimationFrame(animation)
    }

    return (
  <div>
    <div 
       ref={slider}
       className="flex items-center h-screen text-black text-[128px] w-max whitespace-nowrap"
    >
      <p ref={firstText} className="shrink-0 pr-[30px]">Lorem, ipsum dolor sit amet Teens</p>
      <p ref={secondText} className="shrink-0 pr-[30px]">Lorem, ipsum dolor sit amet Teens</p>
    </div>
    {/* <div className="h-screen"></div> */}
  </div>
)
}