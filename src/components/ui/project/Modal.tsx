'use client'

import { motion } from "framer-motion"
import { gallery } from "./data"
import Image from "next/image"

export default function ProjectGallery(props: any) {
    const {
        current,
        scale,
        anim,
        x, 
        y,
        ref
    } = props

    const { active, index } = current

    return (    
        <motion.div 
            ref={ref}
            className="absolute top-0 left-0 pointer-events-none h-[229px] w-[250px] overflow-hidden" 
            {...anim(scale)}
            style={{
                x,
                y
            }}
        >
            <div className="container-box relative flex flex-col justify-center"
                style={{
                    top: index * -100 + '%',
                }}
            >

            {gallery.map((el, i) => {
                const { src } = el
                return (
                    <div key={i} className={`
                        box flex justify-center items-center 
                         py-[32px] 
                        `}
                        style={{
                            backgroundColor: gallery[i].color
                        }}
                    >
                        <Image
                            alt=""
                            src={src}
                            width={220}
                            height={170}
                        >

                        </Image>
                    </div> 
                )
            })}
            </div>
            
        </motion.div>
    )
}
