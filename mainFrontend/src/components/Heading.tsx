import React from 'react'

function Heading({fontsize1,heading='Mushroots Naturals',subHeading='Nature\'s Bounty, Delivered with Care',fontFamily='anton'}:{fontsize1?:string,heading?:string,subHeading?:string,fontFamily?:string}) {
  return (
    <div className='z-4'>
      <h1 className={`${fontsize1} font-medium   text-center mt-10 text-highlight `} style={{ fontFamily }}>
        {heading}
      </h1>
      <h3 className='text-2xl font-semibold text-center  text-highlight' style={{ fontFamily:'Dancing Script',fontWeight:'400' }}>
        {subHeading}
      </h3>
    </div>
  )
}

export default Heading
