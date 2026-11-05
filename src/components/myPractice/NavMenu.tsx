'use client'

import { useMemo, useState } from "react"
import { AnimatePresence, delay, motion } from 'framer-motion'
import Image from "next/image"

const words = [
    'Home',
    'Shop',
    'Aboutus',
    'LookBook',
    'Contact'
]

const images = [
    '/images/floating/1.jpg',
    '/images/floating/2.jpg',
    '/images/floating/9.jpg',
    '/images/floating/7.jpg',
    '/images/floating/5.jpg',
]

const anim = (variants: any, custom: any) => {
    return {
        initial: "initial",
        animate: "enter",
        exit: "exit",
        variants,
        custom
    }
}


export default function NavMenu() {
    const [active, setActive] = useState(false)
    const [visible, setVisible]: any[] = useState([-1, false])
    const [activeBlock, setActiveBlock] = useState(false)
    
    const rotate = {
        initial: {
            rotate: '0deg',
            top: '',
        },
        enter: {
            rotate: active ? '45deg' : '0deg',
            translateY: active ? 3 : 0,
            transition: {
                duration: 0.6,
                delay: 0.2
            }
        },
        exit: {
            rotate: '0deg',
            top: '',
        },
    }
    const rotateTwo = {
        initial: {
            rotate: '0deg',
            top: '',
        },
        enter: {
            rotate: active ? '-45deg' : '0deg',
            translateY: active ? -4 : 0,
            transition: {
                duration: 0.6,
                delay: 0.2
            }
        },
        exit: {
            rotate: '0deg',
            top: '',
        },
    }
    const height = {
        initial: {
            height: 80
        },
        enter: {
            height: active ? '50vh' : 80,
            transition: {
                duration: 0.8,
                delay: 0.2,
                ease: [0.65, 0, 0.35, 1]
            }
        },
        exit: {
            transition: {
                duration: 0.8,
                delay: 0.1,
                ease: [0.65, 0, 0.35, 1]
            }
        }
    }
    const heightTwo = {
        initial: {
            height: 80
        },
        enter: {
            height: active ? '120vh' : 80,
            transition: {
                duration: 0.8,
                delay: 0.15,
                ease: [0.65, 0, 0.35, 1]
            }
        }
    }
    const opacity = {
        initial: {
            opacity: 0,
            translateY: 0
        },
        enter: {
            opacity: 1,
            translateY: -50,
            transition: {
                duration: 0.6,
                delay: 0.7
            }
        },
        exit: {
            opacity: 0,
            translateY: 50,
            transition: {
                duration: 0.6
            }
        }
    }
    const transition = {
        initial: {
            opacity: 0
        },
        enter: {
            opacity: 1,
            transition: {
                duration: 0.6
            }
        },
        exit: {
            opacity: 0,
            transition: {
                duration: 0.6
            }
        }
    }

    const update = useMemo(() => {
        setTimeout(() => {
             setActiveBlock(false)
            setVisible([-1, false])
        }, 1000)
       
    }, [active])
 
    return (
        <nav>
            <motion.div className="fixed z-2 flex justify-center h-[80px] bg-[#f4f0ea] overflow-hidden"
                {...anim(height, 0)}
            >
                <div 
                    onClick={() => setActive(!active)} 
                    className="z-1 absolute top-[20px] flex justify-center items-center w-[40px] h-[40px]"
                    
                >
                    <motion.span className="absolute bg-black w-[60%] h-[1px] translate-y-[-2px]"
                        {...anim(rotate, 0)}
                    />
                    <motion.span className="absolute translate-y-[5px] bg-black w-[60%] h-[1px] " 
                        {...anim(rotateTwo, 0)}
                    />
                </div>
                <motion.h1 className="absolute translate-x-[20px] top-[40px] uppercase"
                    
                >
                    <span className="absolute translate-y-[-10px]"
                        style={{
                            opacity: active ? 1 : 0,
                            transitionDuration: "0.6s"
                        }}
                    >
                        Close
                    </span>
                    <span className="absolute translate-y-[-10px]"
                        style={{
                            opacity: active ? 0 : 1,
                            transitionDuration: "0.6s"
                        }}
                    >
                        Menu
                    </span>
                </motion.h1>
                <div className="translate-y-[130px] gap-y-[20px] flex flex-col items-start w-screen h-[100%] 
                    ml-[40px] mt-[15px]"
                >
                    <div className="inline-flex w-[60%] flex-wrap text-[102px]"
                        onMouseOver={() => setActiveBlock(true)} 
                        onMouseLeave={() => setActiveBlock(false)}
                    >
                        <AnimatePresence mode="wait">
                            {active && words.map((word, i) => {
                                return (
                                    <Word word={word} i={i} visible={visible} setVisible={setVisible}/>
                                )
                            })}
                        </AnimatePresence>
                    </div>
                    <AnimatePresence mode="wait">
                        {active && 
                            <div className="flex h-[30px] w-[100%] ml-[10px] overflow-hidden">
                                <motion.div 
                                    className="flex justify-between w-[70%] 
                                        uppercase text-[#9f9689] translate-y-[50px]"
                                        {...anim(opacity, 0)}
                                    >
                                    <p>Made by:Studio Lumio</p>
                                    <p>Typography: Google Fonts</p>
                                    <p>Images: Freepik, Envato</p>
                                    <p>Privacy Policy Terms & Conditions</p>
                                </motion.div>
                            </div>
                        }  
                    </AnimatePresence>
                </div>
                <AnimatePresence mode="wait">
                    {activeBlock && visible[0] !== -1 ? 
                        <motion.div className="absolute right-[100px] top-[20px]"
                            {...anim(transition, 0)}
                        >
                            <Image 
                                alt=""
                                src={images[visible[0]]}
                                width={300}
                                height={300}
                            />
                        </motion.div>
                    :  null}  
                 </AnimatePresence>
            </motion.div>
            <motion.div className="fixed z-1 top-0 cont-v flex h-[80px] w-screen"
                {...anim(heightTwo, 0)}
             />
           
        </nav>
    )
}

function Word(props: any) {
    const {
        word,
        i,
        visible,
        setVisible
    } = props

    return (
        <motion.p className="mr-[30px] uppercase leading-[1.2] translate-y-[0px] overflow-hidden"
            onMouseOver={() => setVisible([i, true])}
            onMouseLeave={() => setVisible([-1, false])}
            style={{
                filter: visible[0] !== i && visible[1] ? "blur(4px)" : "blur(0px)",
                opacity: visible[0] !== i && visible[1] ? 0.5 : 1,
            }}
        >
            {word.split('').map((char: any, i: number) => {
                return (
                    <Character char={char} i={i} exitIndex={(word.length - i) * 0.03}/>
                )
            })}
        </motion.p>
    )
}

function Character(props: any) {
    const {
        char, 
        i,
        exitIndex
    } = props
    
    const visibly = {
        initial: {
            opacity: 0,
            translateY: 100,
            transition: {
                duration: 0.6,
            }
        },
        enter: (i: any) => {
            return {
                opacity: 1,
                translateY: 0,
                transition: {
                    duration: 0.6,
                    delay: i,
                    ease: [0.65, 0, 0.35, 1]
                }
            }
        },
       exit: (i: any) => {
            return {
                opacity: 0,
                translateY: 100,
                transition: {
                    duration: 0.4,
                    delay: exitIndex,
                    ease: [0.65, 0, 0.35, 1]
                }
            }
        }
    }

    const transition = 0.4 + i * 0.06

    return (
        <motion.span
            className="inline-block"
                {...anim(visibly, transition)}
            >
                {char}
        </motion.span>
    )
}