import { useEffect, useRef, useState } from "react";

import { getDescription, getItemName, getItemTypeName, getTypesNameByDifferentLangId } from "@/lib/itemLanguageHelpers";
import { cn, checkSourceContent, formatPrice } from '@/lib/utils';
import Sticker from "./Sticker";


const FoodDrawer = ({ item, language, theme, currencyType }) => {

    if (!item) return null;
    const videoRef = useRef(null);
    const [placeholder, setPlaceholder] = useState(false);
    const hasType = item.ItemTypes?.length > 0;
    const hasImage = checkSourceContent(item?.image);

    const handleShowVideo = () => {
        if (item?.video && !isVideo) {
            setIsVideo(true);
        }
    };

    useEffect(() => {
        if (item?.video) {
            videoRef.current?.pause();
            setTimeout(() => {
                videoRef.current?.play();
            }, 2000);
        }
        return () => item?.video && videoRef.current?.pause();
    }, [item]);

    useEffect(() => {
        if (item?.video) {
            document.addEventListener("visibilitychange", () => {
                if (document.hidden) {
                    videoRef.current?.pause();
                } else {
                    videoRef.current?.play();
                }
            });
        }
    }, [videoRef.current]);

    return (
        <div
            about="modal item selected and show details of each item"
            aria-description="modal item selected and show details of item"
            className={cn("w-full p-4 pt-0 max-h-[80svh] max-w-[500px] mx-auto overflow-y-auto", {
                "py-6": !hasImage
            })}
        >
            {/* Modal content */}
            {checkSourceContent(item?.video) ? (
                <video
                    loop
                    muted
                    autoPlay
                    //playsInline //use in ios for disabled full screen video when palyed if it is enable 
                    //webkit-playsinline
                    ref={videoRef}
                    id="video"
                    poster={item?.image_medium}
                    className={cn("w-full max-h-full aspect-[7/5] object-cover object-center")}
                >
                    <source autoFocus src={item?.video} type="video/mp4" />
                </video>
            ) : (
                hasImage ?
                    (<div
                        onClick={handleShowVideo}
                        style={{ backgroundImage: placeholder ? "none" : `url(${item?.image_medium})` }}
                        className="relative max-h-full aspect-[7/5] w-full overflow-hidden bg-cover bg-center bg-no-repeat rounded-lg"
                    >
                        <img
                            src={item?.image}
                            onClick={handleShowVideo}
                            onLoad={() => setPlaceholder(true)}
                            sizes='(max-width: 600px) 100vw, 420px'
                            alt={"item " + item.ItemSpecifications[0]?.name}
                            className={cn("w-full h-full max-h-[90svh] object-cover object-center", {
                                "block": placeholder,
                                "hidden": !placeholder,
                            })}
                        />
                    </div>
                    ) : null
            )}
            <div
                style={{
                    backgroundColor: !hasImage && !hasType ? theme.IV_ItemPriceOptionHighlight : "inherit",
                    color: !hasImage && !hasType ? theme.IV_ItemPriceOptionTextColor : theme.IV_ItemTextColor
                }}
                className={cn("flex w-full justify-between items-center p-2 pb-1 sm:text-lg", {
                    "rounded": !hasImage && !hasType
                })}
            >
                <h2
                    title="item name"
                    about="item name"
                    className="text-inherit"
                >
                    {getItemName(item, language.id)}
                </h2>
                <div className="flex items-center gap-14 text-inherit">
                    {+item.calorie !== 0 && (
                        <h4
                            title="item calorie"
                            className="text-inherit"
                            about="show calories on item you selected"
                        >
                            Kcal : {item.calorie}
                        </h4>
                    )}
                    <h4
                        title="item price"
                        about="item price"
                        className="text-inherit"
                        style={{ color: !hasImage && !hasType && theme?.IV_ItemPriceOptionPriceColor }}
                    >
                        {!hasType
                            ? `${formatPrice(item.price, currencyType)}`
                            : ""}
                    </h4>
                </div>
            </div>
            <div
                title="item description"
                style={{ color: theme?.IV_ItemTextColor }}
                className={cn("p-1 text-xs sm:text-base", {
                    "space-y-2": item?.Stickers?.length > 0,
                })}
            >
                <div className="flex items-center gap-2">
                    {item?.Stickers.length > 0 && (
                        item.Stickers.map((sticker, i) => (
                            <Sticker
                                style={{ backgroundColor: theme?.IV_ItemTextColor }}
                                src={sticker.url}
                                key={i}
                            />
                        ))
                    )}
                </div>
                <h4>{getDescription(item, language.id)}</h4>
            </div>
            {hasType && (
                <div className="px-1 pt-0">
                    <h2 className="mb-1">{getTypesNameByDifferentLangId(language.id)}</h2>
                    <div className="space-y-2">
                        {hasType > 0
                            ? item.ItemTypes.map((type, index) => {
                                return (
                                    <label
                                        className="flex items-center justify-between w-full p-2 last:mb-2 rounded-lg"
                                        style={{ backgroundColor: theme?.IV_ItemPriceOptionHighlight }}
                                        key={index}
                                    >
                                        <span
                                            style={{ color: theme?.IV_ItemPriceOptionTextColor }}
                                        >
                                            &nbsp; {getItemTypeName(type, language.id)} &nbsp;
                                        </span>
                                        <span
                                            style={{ color: theme?.IV_ItemPriceOptionPriceColor }}
                                        >
                                            {formatPrice(type.price, currencyType)}
                                        </span>
                                    </label>
                                );
                            }) : null}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDrawer;