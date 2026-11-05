'use client'

import Mouse from "@/components/myPractice/Mouse";
import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {
  
  useEffect(() => {
      (
        async () => {
          const LocomotiveScroll = (await import('locomotive-scroll')).default
          const locomotiveScroll = new LocomotiveScroll()
        }
      )()
 })

  return (
    <div>
      <Mouse />
      <Component {...pageProps} />
      
    </div>
  )
}
