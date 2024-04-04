import { useState, useEffect, useCallback, useMemo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Thumb } from './EmblaCarouselThumbsButton'
import classes from '../banners/banners.module.css'

const ItemCarousel = ({ slides, activeSlide, setSelectedItem }) => {
    const options = {}
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel(options)
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: 'keepSnaps',
        dragFree: true
    })

    const slide = useMemo(() => {
        return slides.map((categorie) => categorie.Items.map((item) => item))
    }, [slides, activeSlide])


    const onThumbClick = useCallback(
        (index) => {
            slide.map((categorie) => categorie.map((item) => {
                if (item.id === index && item.id !== activeSlide.id) {
                    setSelectedIndex(index)
                    setSelectedItem(item)

                    if (!emblaMainApi || !emblaThumbsApi) return
                    emblaMainApi.scrollTo(index)
                }
            }))

        },
        [emblaMainApi, emblaThumbsApi, activeSlide]
    )

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        setSelectedIndex(emblaMainApi.selectedScrollSnap())
        emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap())
    }, [emblaMainApi, emblaThumbsApi, setSelectedIndex])


    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect)
        emblaMainApi.on('reInit', onSelect)

        return () => {
            emblaMainApi.off('select', onSelect)
            emblaMainApi.off('reInit', onSelect)
        }
    }, [emblaMainApi, onSelect, activeSlide])


    return (
        <div className={classes.embla}>

            <div className={classes.embla__viewport} ref={emblaMainRef}>
                <div className={classes.embla__container}>
                    {slide.map((categorie) => categorie.map((item) => (
                        <div className={classes.embla__slide} key={item.id}>
                            <img
                                className={classes.embla__slide__img}
                                src={item.image}
                                alt={item.name}
                                key={item.id}
                            />
                        </div>
                    ))
                    )}
                </div>
            </div>
            <div className={classes.embla_thumbs}>
                <div className={classes.embla_thumbs__viewport} ref={emblaThumbsRef}>
                    <div className={classes.embla_thumbs__container}>
                        {slide.map((categorie) => categorie.map((item) => (
                            <Thumb
                                onClick={() => onThumbClick(item.id)}
                                selected={item.id === selectedIndex}
                                imgSrc={item.image}
                                key={item.id}
                            />
                        )))}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ItemCarousel
