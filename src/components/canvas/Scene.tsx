'use client'

import { Canvas } from "@react-three/fiber";
import Earth from "./Earth";
import { Environment, OrbitControls, ScrollControls } from "@react-three/drei";
import { useRef } from "react"
import { useScroll, useSpring, useTransform, motion } from "framer-motion";
import Titles from "../ui/TItles";

export default function Scene() {

    const scene = useRef(null)

    return (
        <div 
            className="h-screen"
        >
            <div className="h-screen"></div>
                <div className="relative h-[600px]">
                    <Canvas ref={scene}>
                        <directionalLight
                            intensity={3.2}
                            position={[20, 5, 8]}
                        />
                        <ambientLight intensity={-1.4} />
                        <Environment preset="city" />
                        <Earth  />    
                    </Canvas>
                    <Titles />
                </div>
            <div className="h-screen"></div>
        </div>
    )
}
