"use client";
import React, { useRef } from 'react'
import { LinePath } from './ui/skiper-ui/LinePath'
import { useScroll } from "framer-motion";
import Heading from './Heading';
import Card from "@/components/Card"
import CardContainer from './CardContainer';

function ViewProducts() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"] // Animation starts when component enters viewport and ends when it leaves
  });

  return (
    <div ref={containerRef} className="h-[250vh] w-full bg-white">
      <LinePath 
        className="absolute  lg:top-[700px] z-2 hidden lg:block"
        scrollYProgress={scrollYProgress}
      />
       
      <div className='relative lg:top-[100px] flex justify-center items-center'>
        <Heading 
          fontsize1='text-6xl' 
          heading='View Products' 
          subHeading={`Explore the best of nature's bounty`} 
          fontFamily='Dancing Script'  
        />
      </div>
      {/* <CardContainer/> */}
    </div>
  );
}

export default ViewProducts