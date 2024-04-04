import { cn } from "@/lib/utils"

function Sticker({ src, className, ...rest }) {
    return (
        <img
            alt="sticker"
            className={cn("size-[22px] rounded", className)}
            src={src}
            {...rest}
        />
    )
}

export default Sticker