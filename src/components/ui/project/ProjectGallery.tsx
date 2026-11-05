'use client'

import { useEffect, useRef, useState } from "react"
import { gallery } from "./data"
import Modal from "./Modal"
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion"

export default function ProjectGallery() {
    const [modal, setModal] = useState({ active: false, index: 0 })
    const [hover, setHover] = useState(false)

    const isFocus: any = useRef(null)
    const circle: any = useRef(null)
    const modalWindow: any = useRef(null)

    const mouseX = useMotionValue(0) //цель
    const mouseY = useMotionValue(0)

    const modalX = useMotionValue(0)
    const modalY = useMotionValue(0)

    const x = useSpring(mouseX, { stiffness: 500, damping: 40, mass: 0.4 }) //путь
    const y = useSpring(mouseY, { stiffness: 500, damping: 40, mass: 0.4 })

    const x1 = useSpring(modalX, { stiffness: 300, damping: 40, mass: 0.4 })
    const y1 = useSpring(modalY, { stiffness: 300, damping: 40, mass: 0.4 })

    const anim = (variants: any) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            variants
        }
    }

    const scale = {
        initial: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: 0.4
            }
        },
        enter: {
            scale: 1,
            opacity: 1
        },
        exit: {
            scale: 0,
            opacity: 0,
            transition: {
                duration: 0.4
            }
        }
    }

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            if (!circle.current) return

            const circleObj = circle.current.getBoundingClientRect()
            const x = e.pageX - (circleObj.width / 2)
            const y = e.pageY - (circleObj.height / 2)

            const { left, width, height } = modalWindow.current.getBoundingClientRect()
            const x1 = (e.pageX) - (width / 2)
            const y1 = (e.pageY) - (height / 2)

            mouseX.set(x)
            mouseY.set(y)

            modalX.set(x1)
            modalY.set(y1)
        }

        window.addEventListener('mousemove', onMove)
    }, [])

    return (
        <div 
            ref={isFocus} 
            className=" flex flex-col gap-y-[10px] justify-center h-full w-[50%] items-center"
            onMouseOver={() => setHover(true)} 
            onMouseLeave={() => setHover(false)} 
        >
            {gallery.map((el, i) => {
                return (
                    <div 
                        className="project-c flex items-center justify-between text-center w-[100%] h-[20%]
                            border-t-[1px] border-gray-200 
                        " 
                        key={i}
                        onMouseOver={() => setModal({ active: true, index: i })}
                        onMouseLeave={() => setModal({ active: false, index: 0 })}
                    >
                            <h1 className="pl-[20px] text-[62px]">{el.title}</h1>
                            <p className="pr-[20px]">Description</p>
                    </div>
                )
            })}
            <AnimatePresence mode="wait">
                {hover && <Modal ref={modalWindow} current={modal} scale={scale} anim={anim} x={x1} y={y1} />}
            </AnimatePresence>
            <AnimatePresence mode="wait">
                {hover && 
                    <motion.span 
                        ref={circle}
                        className="flex absolute top-0 left-0 justify-center text-white pointer-events-none items-center bg-blue-400 w-[70px] h-[70px] rounded-[50%]" 
                        style={{
                            x,
                            y
                        }}
                        {...anim(scale)}
                    >
                        <Text mouseX={mouseX} mouseY={mouseY} x1={x} y1={y}/>
                    </motion.span>
                }
            </AnimatePresence>
        </div>
    )
}

function Text(props: any) {
    const {
        x1, y1,
        mouseX,
        mouseY
    } = props

    const tx = useTransform([mouseX, x1], ([m, s]: number[]) => (m - s) * 0.1)
    const ty = useTransform([mouseY, y1], ([m, s]: number[]) => (m - s) * 0.1)

    //framer motion автоматически подставляет значения и высчитывает новые, когда меняются значения в первом списке

    return (
        <motion.span
            className="absolute"
            style={{
                x: tx, 
                y: ty
            }}
        >
            View
        </motion.span>
    )
}