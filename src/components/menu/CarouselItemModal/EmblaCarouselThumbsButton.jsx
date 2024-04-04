import { cn } from '@/lib/utils'
import classes from '@/components/menu/banners/banners.module.css'

export const Thumb = (props) => {
    const { selected, imgSrc, onClick } = props

    return (
        <div
            className={cn(classes.embla_thumbs__slide, {
                [classes.embla_thumbs__slide__selected]: selected,
            })}
        >
            <button
                onClick={onClick}
                className={classes.embla_thumbs__slide__button}
                type="button"
            >
                <img
                    className={classes.embla_thumbs__slide__img}
                    src={imgSrc}
                    alt="thumbnail image"
                />
            </button>
        </div >
    )
}
