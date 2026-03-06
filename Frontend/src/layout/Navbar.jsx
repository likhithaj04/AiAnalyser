import React from 'react'

export default function Navbar() {
  return (
    <div className='md:p-8 p-2 px-4 bg-blue-950 text-amber-50 '>

        <div className='flex justify-end md:gap-9 gap-2'>
                                <a href='/' className='hover:text-indigo-400'>HOME</a>

            <div className='flex md:gap-9 gap-2'>
                <a href='/r' className='hover:text-indigo-400'>Resume Analyser</a>
                <a href='/l' className='hover:text-indigo-400'>Linkedin Analyser</a>
            </div>
              {/* <div className=''>
                <button className='bg-indigo-900 text-amber-50 p-2 py-1 border rounded-xl hover:bg-indigo-400 cursor-pointer hover:text-black'>Login</button>
              </div> */}
        </div>
    </div>
  )
}
