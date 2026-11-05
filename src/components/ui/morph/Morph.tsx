'use client'

import { interpolate } from "flubber"
import { useEffect, useRef, useState } from "react"
import { shape1, shape2, shape3 } from "./paths"
import { animate, useMotionValue, useTransform, motion } from "framer-motion"

export default function Morph() {
    const [active, setActive] = useState(false)

    return (
       <div >
            <svg width="288" height="593" viewBox="0 0 17288 22593" fill="black" xmlns="http://www.w3.org/2000/svg"
                onClick={() => setActive(!active)}
            >
                <SvgMorph paths={[shape1, shape2, shape3]} />
                <SvgMorph paths={[shape3, shape2, shape1]} />
            </svg>
       </div> 
    )
}

function SvgMorph(props: any) {
    const {
        paths
    } = props

    const [indexOfPath, setIndexOfPath] = useState(0)
    const progress = useMotionValue(0)  
    const getIndex = paths.map((_: any, i: any) => i) //благодаря этому, фигур может быть больше

    const path = useTransform(progress, getIndex, paths, {
        mixer: (a, b) => interpolate(a, b)
    }) //тут уже возвращается фигура в зависимости от progress, тк он выбирает какие тут будут соседние фигуры при переходе

    // const path: any = useRef(null)

    useEffect(() => {
        animate(progress, indexOfPath, {
            duration: 0.2,
            ease: "easeInOut",
            // delay: 0.4,
            onComplete: () => { //метод через который можно менять значение второго аргумента
                if (indexOfPath === paths.length - 1) {
                    setIndexOfPath(1)
                    progress.set(0)
                } else {
                    setIndexOfPath(indexOfPath + 1)
                }  
            }
        })

        // if (!path.current) return
        // const interpolator = interpolate(paths[0], paths[1])
        // const targetPath = interpolator(1)
        // path.current.setAttribute('d', targetPath)
    }, [indexOfPath])
    
    return (
        <motion.path d={path} />
    )
}