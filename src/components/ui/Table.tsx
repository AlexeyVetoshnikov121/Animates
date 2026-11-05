'use client'

import { useState } from "react";
import Button from "@/components/ui/Button";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "./Nav";

export default function Table() {

    const [isActive, setIsActive] = useState(false)

    const variant = {
        open: {
            width: 400,
            height: 650,
            top: 10,
            right: 10,
            transition: {duration: 0.6, ease: [0.33, 1, 0.68, 1]}
        },
        closed: {
            width: 100,
            height: 40,
            top: 25,
            right: 25,
            transition: {duration: 0.6, delay: 0.25, ease: [0.33, 1, 0.68, 1]}
        }
    }

    return (
        <motion.div 
            className="fixed right-[25px] top-[50px] w-[400px] h-[650px] bg-[#c9fd74] rounded-[25px]"
            variants={variant}
            animate={isActive ? "open" : "closed"}
            initial="closed"
        >
            <Button isActive={isActive} setIsActive={setIsActive} />
            <AnimatePresence mode="wait">
                {isActive && <Nav />}
            </AnimatePresence>
            
        </motion.div>
    )
}