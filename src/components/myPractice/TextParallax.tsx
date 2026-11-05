'use client'

import { useScroll, useTransform, motion, useSpring, useMotionValue } from "framer-motion"
import { useEffect, useMemo, useRef } from "react"

export default function TextParallax() {
    const container = useRef(null)
    const parag: any = useRef(null)

    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end start']
    })

    const x1: any = useTransform(scrollYProgress, [0, 1], [0, -550])
    const x2: any = useTransform(scrollYProgress, [0, 1], [-550, 0])
    const x3: any = useTransform(scrollYProgress, [0, 1], [0, -550])

    return (
        <div ref={container} className="flex flex-col w-[100%] text-nowrap">
            <motion.div
                className="min-w-[200%] text-[60px] "
                   style={{
                       x: x1
                   }}
            >
                <p >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, tempore vero reiciendis possimus architecto dolores sint omnis quo eligendi beatae.
                </p>
            </motion.div>
             <motion.div
                className="min-w-[200%] text-[60px] "
                   style={{
                       x: x2
                   }}
            >
                <p >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, tempore vero reiciendis possimus architecto dolores sint omnis quo eligendi beatae.
                </p>
            </motion.div>
            <motion.div
                className="min-w-[200%] text-[60px] "
                   style={{
                       x: x3
                   }}
            >
                <p >
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat, tempore vero reiciendis possimus architecto dolores sint omnis quo eligendi beatae.
                </p>
            </motion.div>
           
            
        </div>
    )
}