import React from 'react'

function NavigateCards({ title, description,label }) {
  return (
    <div className="nav-item group relative cursor-pointer">
      <div className="nav-panel relative overflow-hidden rounded-[20px] border border-white/8 bg-white/4 p-8 pb-10 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-white/16 hover:bg-white/7 hover:shadow-[0_28px_52px_rgba(0,0,0,0.45)]">
       
        <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.14em] text-blue-200/50">
          {label}
        </p>
        <h2 className="mb-2.5 font-syne text-xl font-bold leading-tight text-slate-100">
          {title}
        </h2>
        <p className="text-sm font-light leading-relaxed text-blue-100/60">
          {description}
        </p>
        <div className="absolute bottom-5 right-5 flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-[13px] text-blue-200/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:border-white/35 group-hover:text-blue-100/90">
          ↗
        </div>
      </div>
    </div>
  );
}
export default NavigateCards
