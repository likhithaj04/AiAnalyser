import React from 'react'
import home from '../assets/bulb.png'
import { Link } from "react-router-dom";
export default function Home() {
  
  return (
    <>
<div className="w-full h-170 bg-[#0d1533] flex justify-end items-center overflow-hidden relative">

  <div className="absolute inset-0 bg-linear-to-r from-[#151c3b] via-[#151c3b]/90 to-transparent z-10">


  <div className='flex   gap-60'>
         <div style={{backgroundImage:`url(${home})`}}   className="h-200 w-100 bg-cover bg-center bg-no-repeat mt-10  "></div>

    <div>
  <h1 className='text-white font-bold text-9xl mt-60 '>ANALYSER</h1>
 
  </div>
  <div className='mt-60'>
 
  <p className='text-white font-serif mt-7 text-2xl'>
  Check your Resume Ats Score 
  <Link to="/r">
    <button className='border p-1 ms-6 border-blue-300 hover:border-white hover:text-white cursor-pointer bg-blue-300 text-blue-800'>
      Resume Analyser
    </button>
  </Link>
</p>

<p className='text-white font-serif mt-7 text-2xl'>
  Check your Linkedin Profile 
  <Link to="/l">
    <button className='border border-blue-300 hover:border-white hover:text-white cursor-pointer p-1 ms-6 bg-blue-300 text-blue-800'>
      Linkedin Analyser
    </button>
  </Link>
</p>
  </div>

  </div>

  </div>
  


</div>


    </>
  )
}
