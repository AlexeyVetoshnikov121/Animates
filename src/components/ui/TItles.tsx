'use client'

import { useMotionTemplate, useScroll, useTransform, motion, useSpring } from "framer-motion"
import { useRef, useState } from "react"

const titles = [
    {
        title: "FORD",
        speed: 0.13
    },
    {
        title: "UFC",
        speed: 0.16
    },
    {
        title: "LINCOLN",
        speed: 0.92
    },
    {
        title: "ROYAL CORRIBEAN",
        speed: 0.86
    },
    {
        title: "NFT",
        speed: 0.6
    }
]

export default function Titles() {
    const [selected, setSelect] = useState(null)

    return (
        <nav className="absolute top-[3.5%] w-full">
            {titles.map(({title, speed}, index) => {
                return (
                    <Title id={index} title={title} speed={speed} 
                        key={index} selected={selected} setSelect={setSelect}
                    />
                )
            })}
        </nav>
    )
}

function Title(
    { title, speed, selected, setSelect, id }:
    { title: string, speed: number, selected: any, setSelect: any, id: any }
) {
    const parag = useRef(null)

    const { scrollYProgress } = useScroll({
        target: parag,
        offset: ['start end', `${speed} 0.8`]
    })

    //второй параметр в offset стартовая точка в ней означает, что я прибовляю к start точке параграфа 113 px

    const clp = useTransform(scrollYProgress, [0, 1], [100, 0]) //тут объект!
    const clipPath = useSpring(clp, { stiffness: 150, damping: 20 }) 
    const clip = useMotionTemplate`inset(0 ${clipPath}% 0 0)`

    const isActive = selected === id

    const anim = (variants: any) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            variants
        }
    }

    const clipAnimate = {
        enter: {
            clipPath: isActive ? 'inset(0% 0 0%)' : 'inset(50% 0 50%)',
            transition: {
                duration: 0.5
            }
        },
    }

    return (
        <p 
            className="relative border-t-[1px] border-gray-500 last:border-b-[1px] last:border-gray-500"
            onMouseOver={() => setSelect(id)}
            onMouseLeave={() => setSelect(null)}
        >
            <motion.span 
                className="relative text-blue-200 pl-[25%] text-[74px] leading-[1.2] w-screen"
                ref={parag}
                style={{
                    clipPath: clip
                }}
               
            >
                {title}
                
            </motion.span>
            <span 
                className="absolute left-0 pl-[25%] text-white opacity-[0.3] text-[74px] leading-[1.2] "
            >
                {title}
            </span>
            <motion.span 
                className="absolute z-1 left-0 pl-[25%] text-black bg-orange-500 w-full 
                text-[74px] leading-[1.2]"
                {...anim(clipAnimate)}
            >
                {title}
            </motion.span>
        </p>
        
    )
}