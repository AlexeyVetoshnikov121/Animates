'use client'

import { useFrame, useLoader, useThree } from "@react-three/fiber"
import { MotionValue, motion, useSpring, useScroll } from "framer-motion"
import { useRef } from "react"
import { Mesh, TextureLoader } from "three"

export default function Earth() {
    const earth = useRef<Mesh | null>(null)
    const { viewport } = useThree()

    const { scrollYProgress } = useScroll()
    const smooth = useSpring(scrollYProgress, {
        stiffness: 300,
        damping: 20,
    })

    const [color, normal, aoMap] = useLoader(TextureLoader, [
        "/earth/color.jpg",
        "/earth/normal-map.jpg",
        "/earth/clouds.jpg",
    ])

    useFrame(() => {
        if (earth.current) {
            earth.current.rotation.y = -1.5 + smooth.get() * 2
        }
    })

    return (
        <group scale={(viewport.width / 9)} >
            <mesh ref={earth} position={[0, 0.1, 0]}>
                <sphereGeometry args={[1, 64, 64]} /> 
                {/* args это гладкость и широховатость */}
                <meshStandardMaterial 
                    map={color} 
                    normalMap={normal} 
                    aoMap={aoMap}
                />
            </mesh>
        </group>
    )
}