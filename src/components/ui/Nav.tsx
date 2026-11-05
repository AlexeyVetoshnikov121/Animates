import Link from "next/link"
import { FooterLinks, Links } from "../data/data.js"
import { delay, motion } from "framer-motion"

export default function Nav() {

    const anim = (variants: any, custom: any) => {
        return {
            initial: "initial",
            animate: "enter",
            exit: "exit",
            variants,
            custom
        }
    }

    const opacity = {
        initial: {
            opacity: 0,
            rotateX: 90,
            translateY: 40,
            translateX: -20
        },
        enter: (i: any) => {
            return {
                opacity: 1,
                rotateX: 0,
                translateY: 0,
                translateX: 0,
                transition: {
                    duration: 0.45,
                    opacity: { duration: 0.45 }, //тут конкретно для одного свойста, выставлена плавность и скорость быстрее
                    delay: 0.09 * i
                },
            }
        },
        exit: {
            opacity: 0,       
        }
    }

    const slide = {
        initial: {
            opacity: 0,
            y: 40
        },
        enter: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
            },
        },
        exit: {
            opacity: 0      
        }
    }

    return (
        <nav >
            <div className="h-[100%] p-[34px] pt-[100px] leading-[1.3]">
                {Links.map(({ title, href }, i) => {
                    return (
                        <div className="perspective-[150px] perspective-origin-bottom" key={i}> 
                            <motion.div 
                                className="text-[48px]" 
                                {...anim(opacity, i)}
                            >
                                <Link href={href}>
                                    {title}
                                </Link>
                            </motion.div>
                        </div>
                    )
                })}
            </div>
            <div className="grid grid-cols-2 gap-y-[10px] mt-[120px] ml-[40px]">
                {FooterLinks.map(({title, href}, i) => {
                    return (
                        <motion.div 
                            className="flex" key={i}
                            {...anim(slide, 0)}
                        >
                            <Link href={href}>
                                {title}
                            </Link>
                        </motion.div>
                    )
                })}
            </div>
        </nav>
    )
}

//тут основной блок + футер