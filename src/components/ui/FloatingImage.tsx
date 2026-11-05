'use client'

import gsap from "gsap";
import Image from "next/image";
import { useRef } from "react";

const images = [
    {
        src: '/images/floating/1.jpg',
        w: 200,
        h: 400
    },
    {
        src: '/images/floating/2.jpg',
        w: 200,
        h: 400
    },
    {
        src: '/images/floating/3.jpg',
        w: 300,
        h: 200
    },
    {
        src: '/images/floating/4.jpg',
        w: 200,
        h: 400
    },
    {
        src: '/images/floating/5.jpg',
        w: 200,
        h: 400
    },
    {
        src: '/images/floating/6.jpg',
        w: 200,
        h: 150
    },
    {
        src: '/images/floating/7.jpg',
        w: 150,
        h: 250
    },
    {
        src: '/images/floating/8.jpg',
        w: 400,
        h: 650
    },
    {
        src: '/images/floating/9.jpg',
        w: 300,
        h: 450
    },
]

export default function FloatingImage() {
    const firstEl = useRef(null)
    const secondEl = useRef(null)
    const thirdEl = useRef(null)

    const speed = 0.02
    let xForce = 0
    let yForce = 0
    let requestAnimationFrameId: any = null
    const easing = 0.08

    const onMove = (e: any) => {
        const {
            movementX,
            movementY
        } = e

        xForce += movementX * speed
        yForce += movementY * speed
        
        if (!requestAnimationFrameId) {
            requestAnimationFrameId = requestAnimationFrame(animate) //тут вызов нижней функции animate
        }
    }

    const lerp = (start: number, end: number, amount: number) => start + (end - start) * amount;

    const animate: any = () => {
        xForce = lerp(xForce, 0, easing)
        yForce = lerp(yForce, 0, easing) //это значение начинает уменьшаться, когда xForce перестает меняться

        gsap.set(firstEl.current, {x: `+=${xForce * 0.2}`, y: `+=${yForce * 0.15}`})
        gsap.set(secondEl.current, {x: `+=${xForce * 0.35}`, y: `+=${yForce * 0.25}`})
        gsap.set(thirdEl.current, {x: `+=${xForce * 0.25}`, y: `+=${yForce * 0.15}`})

        if (xForce > 0.01 || yForce > 0.01  ) {
            requestAnimationFrame(animate) //это нужно зацикливания перемещения
        } else {
            cancelAnimationFrame(animate)
            requestAnimationFrameId = null
        }
    }

    return (
        <div onMouseMove={(e) => onMove(e)} className="relative h-screen flex">
            <div ref={firstEl} className="absolute w-screen h-screen">
                {images.map(({ src, w, h }, i) => {
                    if (i >= 3) return 
                    return (
                        <div key={i} className="image">
                            <Image 
                                alt=""
                                src={src}
                                width={w}
                                height={h}
                            />
                        </div>
                    )
                })}
            </div>
            <div ref={secondEl} className="absolute w-screen h-screen">
                {images.map(({ src, w, h }, i) => {
                    if (
                        (i >= 0 && i <= 2) ||
                        (i >= 6)
                    ) return 
                    return (
                        <div key={i} className="image1">
                            <Image 
                                alt=""
                                src={src}
                                width={w}
                                height={h}
                            />
                        </div>
                    )
                })}
            </div>
            <div ref={thirdEl} className="absolute w-screen h-screen">
                {images.map(({ src, w, h }, i) => {
                    if (i <= 5) return 
                    return (
                        <div key={i} className="image2">
                            <Image 
                                alt=""
                                src={src}
                                width={w}
                                height={h}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}