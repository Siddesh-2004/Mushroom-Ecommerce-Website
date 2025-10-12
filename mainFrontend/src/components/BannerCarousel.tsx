import React from 'react'
import { Carousel_003 } from './ui/skiper-ui/Carousel_003'
function CardCarousel() {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_003 images={[
     
        {
          src: "https://res.cloudinary.com/siddesh2004/image/upload/v1753935227/vmxjnwoavmity7sunh94.avif",
          alt: "Illustrations by my fav AarzooAly",
        },
        {
          src:"https://t4.ftcdn.net/jpg/05/67/77/13/360_F_567771356_5ybdLC16lnFVJcdDwAt6KnGD7ZA7AfFI.jpg",
          alt: "Illustrations by my fav AarzooAly",
        },
        {
          src: "https://res.cloudinary.com/siddesh2004/image/upload/v1753935207/j0unsrlauypocqypyebx.avif",
          alt: "Illustrations by my fav AarzooAly",
        },
        {
          src: "https://res.cloudinary.com/siddesh2004/image/upload/v1753935207/j0unsrlauypocqypyebx.avif",
          alt: "Illustrations by my fav AarzooAly",
        }
      ]}  loop={true} autoplay={true} />
    </div>
  )
}


export default CardCarousel
