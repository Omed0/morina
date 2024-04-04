import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { usePathname } from 'next/navigation'
import classes from './banners.module.css'
import { cn, getBannersByLangId } from '@/lib/utils'
import Image from 'next/image'

const EmblaCarousel = ({ banners, langId }) => {

  const autoplayOptions = {
    delay: 2400,
    stopOnInteraction: false,
    //stopOnMouseEnter: true,
    rootNode: (emblaRoot) => emblaRoot.parentElement,
  }

  const defaultOptions = {
    loop: true,
    autoplay: true,
    speed: 1000,
    slidesToScroll: 1,
    breakpoints: {
      640: {
        slidesPerPage: 1,
      },
      768: {
        slidesPerPage: 2,
      },
      1024: {
        slidesPerPage: 3,
      },
    },
    draggable: true,
    skipSnaps: true,
    containScroll: "trimSnaps",
  }

  const [emblaRef] = useEmblaCarousel(defaultOptions, [Autoplay(autoplayOptions)])

  const pathname = usePathname();
  const isMenuPage = pathname.includes("menu");

  return (
    <div className={classes.embla}>
      <div className={classes.embla__viewport} ref={emblaRef}>
        <div className={classes.embla__container}>
          {getBannersByLangId(banners, langId, isMenuPage).map((banner, index) => (
            <div className={classes.embla__slide} key={index}>
              <Image
                width={700}
                height={600}
                priority={true}
                src={banner.image}
                title={"banner " + banner.index}
                alt={"banner image " + banner.id}
                className={cn(classes.embla__slide__img, "hover:cursor-grab")}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmblaCarousel