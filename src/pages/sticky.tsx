'use client'

import StickyFooter from "@/components/ui/StickyFooter";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion"

export default function Home() {
    const slide = useRef(null)
    const { scrollYProgress } = useScroll({
        target: slide,
        offset: ['start end', 'end start']
    })

    return (
        <div >
            <motion.nav className="relative z-1 top-0 flex justify-center 
                items-center text-[80px] min-h-screen w-full bg-black text-white"
                ref={slide}
                style={{ y: scrollYProgress * -1 }}
            >
                Lorem 
            </motion.nav>
            <StickyFooter />
            <div className="h-screen"></div>
        </div>
    );
}
