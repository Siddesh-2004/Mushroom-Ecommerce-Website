import React from 'react'
import Card from './Card'
import Description from './ui/skiper-ui/Description'

function CardContainer() {
  return (
    <div className='w-full flex justify-center items-center   bg-black relative top-500 '>
      <Card/>
      <Description/>
    </div>
  )
}

export default CardContainer
