'use client'

import { useMotionValue, useSpring, motion, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"

export default function Mouse() {
    const circle: any = useRef(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const x = useSpring(mouseX, { stiffness: 120, damping: 20, mass: 0.4 })
    const y = useSpring(mouseY, { stiffness: 120, damping: 20, mass: 0.4 })

    const textX = useTransform([mouseX, x], ([m, s]: any[]) => (m - s) * 0.05)
    const textY = useTransform([mouseY, y], ([m, s]: any[]) => (m - s) * 0.05)

    useEffect(() => {
        const onMove = (e: any) => {
            if (!circle.current) return
            const {
                clientX, 
                clientY
            } = e

            const { width, height } = circle.current.getBoundingClientRect()
            const x1 = clientX - (width / 2)
            const y1 = clientY - (height / 2)

            mouseX.set(x1)
            mouseY.set(y1)
        }   

        window.addEventListener('mousemove', onMove)

        return () => {
            window.removeEventListener('mousemove', onMove)
            
        }
    }, [])

    return (
        <motion.span 
            ref={circle} 
            className="fixed pointer-events-none flex justify-center z-100 items-center text-white w-[60px] h-[60px] bg-red-400 rounded-[50%]" 
            style={{
                x, 
                y
            }}
        >
            <motion.span
                className="text-[12px]"
                style={{
                    x: textX,
                    y: textY
                }}
            >
                Cursor
            </motion.span>
        </motion.span>
    )
}