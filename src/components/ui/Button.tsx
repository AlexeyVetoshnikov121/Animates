'use client'

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function Button(
    props: any
) {
    const {
        isActive, 
        setIsActive
    } = props

    const anim = (variants: any) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            variants
        }
    }

    const offset = {
        enter: {
            top: isActive ? '-100%' : '0',
            transition: {
                duration: 0.5,
                ease: [0.33, 1, 0.68, 1]
            }
        }
    }

    return (
        <div className="fixed top-[25px] right-[25px]
            w-[100px] h-[40px] rounded-[25px] overflow-hidden cursor-pointer select-none "
            onClick={() => setIsActive(!isActive)}
        >
            <motion.div className="relative h-[100%]" {...anim(offset)}>
                <span className={`${!isActive && 'menu'} relative flex justify-center items-center
                    w-[100%] h-[100%] bg-[#c9fd74] uppercase font-semibold`}
                >
                    <PerspectiveText label="Menu" />
                </span>
                <span className={`${isActive && 'menu'} absolute top-[100%] flex justify-center items-center
                    w-[100%] h-[100%] font-semibold bg-black text-white uppercase`}
                >
                    <PerspectiveText label="Close" />
                </span>
            </motion.div>
           
        </div>
    )
}

function PerspectiveText({ label }: { label: string }) {
    return (
        <div>
            <p className="absolute">{label}</p>
            <p>{label}</p>
        </div>
    )
    
}