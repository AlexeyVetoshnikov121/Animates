import Image from "next/image";
import { useRef } from "react";

const images = [
    "/images/scale/c2.webp",
    "/images/scale/panda.webp",
]

export default function ScaleImage() {
    const firstImage: any = useRef(null)
    const secondImage: any = useRef(null)
    const container: any = useRef(null)

    let currentX = 0
    let xPercent = 0
    let currentXPercent = 0
    let speed = 0.15
    let reqId: any = null

    const manageMouseMove = (e: any) => {
        if (!firstImage.current || !secondImage.current || !container.current) return
        const { left, right } = container.current.getBoundingClientRect()
        const { clientX } = e

        if (clientX > left) {
            currentX = clientX - left
            xPercent = (currentX / container.current.clientWidth) * 100 //[0, 100] диапозон значений

            if (!reqId) {
                reqId = requestAnimationFrame(animate)
            }
        }
    }

    const animate = () => {
        const deltaXPercent = xPercent - currentXPercent
        currentXPercent = currentXPercent + (deltaXPercent * speed) 

        firstImage.current.style.width = 66.66 - (currentXPercent * 0.33) + '%'
        secondImage.current.style.width = 33.33 + (currentXPercent * 0.33) + '%'

        if (Math.abs(xPercent - currentXPercent) < 0.01) {
            currentXPercent = xPercent   // дотягиваем до цели, чтобы не было остатка

            firstImage.current.style.width = 66.66 - (currentXPercent * 0.33) + '%'
            secondImage.current.style.width = 33.33 + (currentXPercent * 0.33) + '%'
            
            cancelAnimationFrame(reqId)
            reqId = null

            //тут добивать надо так потому, что анимация обрывается резко при остановке мыши из за удаления анимации
        } else {
            reqId = requestAnimationFrame(animate)
        }

    }

    return (
        <div className="h-[50%] flex justify-center w-[60%]"
            onMouseMove={(e: any) => manageMouseMove(e)}
            ref={container}
        >    
            <div className="w-[66.66%]" ref={firstImage}>
                <Image  
                    className="w-[100%] object-cover"
                    alt=""
                    src={images[0]}
                    width={1200}
                    height={700}
                />
            </div>  
                 
            <div className="w-[33.33%]" ref={secondImage}>
                <Image 
                   
                    className="w-[100%] object-cover"
                    alt=""
                    src={images[1]}
                    width={500}
                    height={700}
                />
            </div> 
        </div>
    )
}