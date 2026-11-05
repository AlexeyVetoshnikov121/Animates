import NavMenu from "@/components/myPractice/NavMenu";
import { AnimatePresence, useScroll, motion, MotionValue, useTransform } from "framer-motion";
import { ScrollTrigger } from "gsap/all";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Mouse from "@/components/myPractice/Mouse";
import { lerp } from "three/src/math/MathUtils.js";
import ScaleImage from "@/components/myPractice/ScaleImage";
import SmoothImages from "@/components/myPractice/SmoothImages";
import TextParallax from "@/components/myPractice/TextParallax";
import CurveText from "@/components/myPractice/CurveText";

const images = [
    "/images/scroll/1.jpg",
    "/images/scroll/3.jpg",
    "/images/scroll/4.jpg",
    "/images/scroll/5.jpg",
    "/images/scroll/6.jpg"
]

export default function Home() {
    const container = useRef(null)
    const target = useRef(null)
    const path: any = useRef(null)

    let progress = 0
    let time = Math.PI / 2
    let reqId: any = null
    let xLine = 0.5

    useEffect(() => {
        setPath(progress)
    }, [])

    const setPath = (progress: number) => {
        const width = window.innerWidth - 765

        if (!path.current) return 
        path.current.setAttribute("d", `M0 50 Q${width * xLine} ${50 + progress} ${width} 50`)
    }
    //тут я уже исп. это значеие x, и получаю дугу, которая подстраивается под структуру.
    
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'end end']
    })

    const x = useTransform(scrollYProgress, [0, 1], [0, -4000])

    const manageMouseMove = (e: any) => {
        const {
            movementY,
            clientX
        } = e
        const { left, width } = path.current.getBoundingClientRect()
        xLine = (clientX - left) / width //тут значение в диапазоне [0, 1]
        progress += movementY //у movementY особенность, когда тянешь снизу вверх, значение отрицательное, а сверху вниз, оно положительное
        setPath(progress)
    }

    const manageMouseEnter = () => {
        if (reqId) {
            window.cancelAnimationFrame(reqId)
            resetAnimate()
        }
    }

    const manageMouseLeave = () => {
        animateOut()
    }

    const animateOut = () => {
        const newPath = progress * Math.sin(time)
        time += 0.2
        setPath(newPath)
        progress = lerp(progress, 0, 0.025) //это значение постоянно уменьшается, если progress не меняется 

        if (Math.abs(progress) > 0.75) {
            reqId = window.requestAnimationFrame(animateOut)
        } else {
            resetAnimate()
        }
    }

    const resetAnimate = () => {
        time = Math.PI / 2
        progress = 0
    }

    return (
        <div >
            <AnimatePresence mode="wait">
                <NavMenu />
            </AnimatePresence>
            <div className="">
                <div className="flex justify-center items-center translate-y-[50px] h-screen">
                    <Image
                        className="w-[80%] h-[90%]"
                        alt=""
                        src={"/images/scroll/1.jpg"}
                        width={1600}
                        height={1000}
                    />
                </div>

                    <motion.div className="sticky top-0 flex gap-x-[40px] h-[80%] pt-[100px]"
                        ref={target}
                        style={{
                            x
                        }}
                    >
                        {images.map((src, i) => {
                            return (
                                <Image 
                                    className="h-[800px] min-w-[60%]"
                                    alt=""
                                    src={src}
                                    width={1000}
                                    height={700}
                                />
                            )
                        })}
                    </motion.div>

                <div ref={container}>
                    <div className="h-screen"></div>
                    <div className="h-screen"></div>
                    <div className="h-screen"></div>
                    <div className="h-screen"></div>
                </div>
                
            </div>
            <div className="flex flex-col justify-center items-center text-center h-screen">
                <div className="relative translate-y-[-120px] top-[100px] w-[60%] ">
                    <div 
                        className="absolute z-1 top-[-80px] flex h-[60px] 
                        w-[100%] hover:h-[150px] hover:top-[-120px]"
                        onMouseMove={(e) => manageMouseMove(e)}
                        onMouseLeave={() => manageMouseLeave()}
                        onMouseEnter={() => manageMouseEnter()}
                    >

                    </div>
                    <svg className="absolute translate-y-[-100px] h-[100px] w-[100%] overflow-visible">
                        <path className="stroke-black stroke-width-[1px] fill-none" ref={path}>
                        </path>
                    </svg>
                </div>
                
                <p className="text-[24px] w-[50%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque necessitatibus eum illum, veritatis repellat adipisci impedit esse asperiores possimus quos quasi nisi non tenetur atque, tempora cum velit consequatur soluta quidem minus vero iure cupiditate cumque. Cum nam amet laudantium voluptates fugit ut aperiam. Voluptatibus deleniti nobis optio, exercitationem debitis aut perspiciatis repudiandae quaerat porro rem modi et praesentium. Vel possimus voluptates accusamus sunt atque exercitationem eveniet ipsam corrupti ullam autem eum quaerat, consequatur in veritatis deleniti sequi rerum dolorem pariatur harum est ut! Nihil, perspiciatis? Cupiditate, sunt laborum nisi est, ipsa vel repellat aspernatur atque ut minus corrupti ea!</p>
            </div>
            <div className="flex justify-center items-center h-[100vh] bg-black">
                <ScaleImage />    
            </div>
            <SmoothImages images={images}/>
            <div className="flex justify-center items-center h-screen">
                <TextParallax />
            </div>   
            <Sticky />
        </div>
    );
}

function Sticky() {
    //реф футер 
    const footer = useRef(null)

    const { scrollYProgress } = useScroll({
        target: footer,
        offset: ['0.5 end', 'end end']
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -300])

    return (
        <div className="relative">
            <motion.div className="flex justify-center items-end h-screen bg-white"
                ref={footer}
                style={{
                    y
                }}
            >
                <CurveText />
            </motion.div>
            <div className="flex justify-center items-end text-white text-[30px] absolute left-0 top-0 h-screen w-full bg-black z-[-1]" >
                Lorem, ipsum dolor!
            </div>
        </div>
        
    )
}