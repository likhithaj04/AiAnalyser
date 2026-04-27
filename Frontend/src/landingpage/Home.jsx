import React from 'react'
import home from '../assets/bulb.png'
import { Link } from "react-router-dom";
import animation from '../assets/animation.webm'
import { GravityStarsBackground } from '../style/GravityStars';

export default function Home() {
  return (
    <div className="w-full h-screen inset-0 bg-linear-to-b from-[#1f2749] via-[#151b3b]/50 to-[#181f3a]  overflow-hidden flex justify-center items-center">
      
      <div className="absolute inset-0 z-0 bg-glinearS-to-b from-[#6c81b9] via-[#151c3b]/50 to-[#1c233f]" />

      <GravityStarsBackground
        className="absolute inset-0 z-10 text-white"
        starsCount={80}
        movementSpeed={0.4}
        glowIntensity={90}
        mouseGravity="attract"
      />

      {/* Layer 3: Content on top of everything */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 gap-4">
        <h1 className="text-8xl text-white zen-font">Lyser Pilot</h1>
        <p className="text-3xl text-white zen-font">
          From analysis to generation — instantly improve your resume and LinkedIn with AI.
        </p>
      </div>

    </div>
  )
}