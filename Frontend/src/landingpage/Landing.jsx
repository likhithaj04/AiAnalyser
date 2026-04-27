import React from "react";
import Home from "./Home";
import Cards from "./Cards";
import NavigateCards from "./NavigateCards";
import animation from '../assets/animation.webm'
import { GravityStarsBackground } from '../style/GravityStars';

export default function Landing() {

  const navigateCard=[
    {
      title:"Resume Analyser",
      description:"Analyse your resume",
          label: "Analyse",

    },
    {
     title:"LinkedIn Analyser",
     description:"Analyse your Linkedin Profile and enhance",
         label: "Enhance",

    },
    // {
    //   title:"Resume Genartor",
    //   description:"Generate AI customised resume"
    // }
  ]

  const cardData = [
    {
      title: "Resume ATS Analysis",
      description:
        "Evaluate your resume against ATS standards and improve keyword optimization."
    },
    {
      title: "LinkedIn Profile Review",
      description:
        "Analyze your LinkedIn profile strength and enhance visibility to recruiters."
    },
    {
      title: "Performance Score",
      description:
        "Get a detailed scoring system based on formatting, skills, and impact."
    },
    {
      title: "Accuracy Insights",
      description:
        "Smart AI ensures precise feedback tailored to industry standards."
    },
    {
      title: "Trust & Reliability",
      description:
        "Your data is secure and processed with high trust and privacy standards."
    },
    {
      title: "Instant Feedback",
      description:
        "Receive actionable suggestions in seconds to improve your profile."
    }
  ];

  return (
    <>
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar  relative inset-0 bg-linear-to-b from-[#1f2749] via-[#151b3b]/50 to-[#181f3a] z-6 mx-auto justify-center items-center">

      <Home />

     <div className="relative flex min-h-screen flex-col  justify-center overflow-hidden inset-0 bg-linear-to-b from-[#1f2749] via-[#151b3b]/50 to-[#181f3a] z-6 mx-auto items-center px-8 py-12">
  {/* Your GravityStarsBackground here */}
  <GravityStarsBackground className="absolute inset-0 z-10 text-white" starsCount={80} movementSpeed={0.4} glowIntensity={90} mouseGravity="attract" />

  <div className="relative z-20 w-full max-w-170">
    <div className="mb-10 text-center">
      <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-blue-200/60">Career Tools</p>
      <h1 className="font-syne text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-br from-slate-100 to-blue-200/80">
        Where to?
      </h1>
    </div>
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-1">
      {navigateCard.map((card, index) => (
        <NavigateCards key={index} {...card} />
      ))}
    </div>
  </div>
</div>


        <div className="flex flex-1 overflow-y-auto px-8 py-8 h-screen inset-0 bg-linear-to-b from-[#1f2749] via-[#151b3b]/50 to-[#181f3a] z-6 mx-auto justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          {cardData.map((card, index) => (
            <Cards
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
</div>
  <GravityStarsBackground className="absolute inset-0 z-10 text-white" starsCount={80} movementSpeed={0.4} glowIntensity={90} mouseGravity="attract" />

        </div>

      </div>
    </>
  );
}