import { useMotionValue, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useEffectEvent, useRef, useState } from "react";

const images2 = [
    '/images/scale/c2.webp',
    '/images/scale/funny.webp',
    '/images/scale/panda.webp',
    '/images/scale/powell.webp'
]

const imagesFixed = [
    '/images/floating/1.jpg',
    '/images/floating/4.jpg',
    '/images/floating/5.jpg',
    '/images/floating/7.jpg'
]

export default function SmoothImages(props: any) {
    const {
        images
    } = props

    const container: any = useRef(null)
    const sections = useRef<(HTMLDivElement | null)[]>([])
    const layers = useRef<(HTMLDivElement | null)[]>([])


    const x = useMotionValue(0)
    const y = useMotionValue(0)

    useEffect(() => {
        const manageMove = (e: any) => {
            if (!container.current) return 
            const { clientX, clientY } = e
            const { width, height } = container.current.getBoundingClientRect()

            const centerX = clientX - (width / 2)
            const centerY = clientY - (height / 2) + 80
            
            x.set(centerX)
            y.set(centerY)
        }

        window.addEventListener('mousemove', manageMove)

        return () => {
            window.removeEventListener('mousemove', manageMove)
        }
    }, [])

    useEffect(() => {
        const update = () => {

        if (!container.current) return
            const card = container.current.getBoundingClientRect()

            sections.current.forEach((sec, i) => {
                const layer = layers.current[i]

                if (!sec || !layer) return
                const r = sec.getBoundingClientRect()

                const top = Math.max(0, r.top - card.top)
                const bottom = Math.max(0, card.bottom - r.bottom)

                // if (i === 0) {
                //     console.log('Top', r.top)
                //     console.log('Bottom', r.bottom)
                // }

                layer.style.clipPath = `inset(${top}px 0px ${bottom}px 0px)`
            })
        }

        window.addEventListener('scroll', update)
        // window.addEventListener('mousemove', update)
        update()

        return () => {
            window.removeEventListener('scroll', update)
        }
    }, [])
    

    return (
        <div className="images-cont">
            <motion.div className="fixed top-0 left-0 w-[250px] h-[500px] pointer-events-none"
                ref={container}
                 style={{
                        x, y
                    }}
                >
                    {imagesFixed.map((_, i) => {
                        return (
                            <div key={i} className="absolute w-[250px] h-[500px]" ref={el => { layers.current[i] = el }}>
                                <Image 
                                    className="w-[100%] h-[80%]"
                                    alt=""
                                    src={imagesFixed[i]}
                                    width={250}
                                    height={500}
                                />
                            </div>
                        )
                    })}
            </motion.div> 
            <div>
                {images2.map((_, i) => {
                    return (
                        <div className="" key={i} ref={el => { sections.current[i] = el }}> 
                        {/* такой структурой выше я кладу несколько элементов в один реф, в виде списка объектов */}
                            <Image 
                                alt=""
                                src={images2[i]}
                                width={1920}
                                height={900}
                            />
                        </div>
                    )
                })}
            </div>  
              
        </div>
    )
}

