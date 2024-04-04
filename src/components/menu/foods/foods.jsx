import { useMemo, Fragment } from "react";
import { useSelector } from "react-redux";

import { getCategoryName, getDescription, getItemName, getItemTypeName, getPriceOnSelectionByLanguage } from "@/lib/itemLanguageHelpers";
import { BlurHashForList } from "@/components/Vedio_Image/BlurHash";
import { checkSourceContent } from "@/lib/checkSourceContent";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";

import { IoIosList } from "react-icons/io";
import { IoGridOutline } from "react-icons/io5";


const Foods = ({ category, firstRow, itemSelection, language, isList, setIsList, currencyType }) => {

  let isShowPriceOptionInCard = false;
  const { AllItems, theme } = useSelector((state) => state.menu);

  // filter items based on category id and check image is exist or not
  const itemFilteredBaseImage = useMemo(() => {
    const itemWithImage = AllItems.filter((item) => item.category_id === category.id && checkSourceContent(item?.image));
    const itemWithoutImage = AllItems.filter((item) => item.category_id === category.id && !checkSourceContent(item?.image));

    return {
      itemWithImage,
      itemWithoutImage
    }
  }, [AllItems, category]);

  // * props list is reversed, when it is true, it will show grid view, otherwise list view
  return (
    <section
      id={`category${category.id}`}
      className="flex flex-col items-center w-full p-2 overflow-x-hidden scrollByCategories"
    >
      <div
        key={category.id}
        id={`#category${category.id}`}
        style={{ color: theme?.MV_CategoryTitleColor }}
        title={"category section " + getCategoryName(category, language.id)}
        className="flex items-center w-full px-1 font-semibold text-lg sm:text-xl md:text-2xl justify-center my-3"
      >
        {firstRow ? (
          <div className="w-full flex items-center justify-between">
            <h2>{getCategoryName(category, language.id)}</h2>
            <span
              onClick={setIsList}
              style={{ color: theme?.MV_ItemViewIconsColor }}
              className="cursor-pointer rounded-xl relative"
            >
              {isList ? <IoIosList size={28} /> : <IoGridOutline size={28} />}
            </span>
          </div>
        ) : (
          <span
            style={{ borderColor: theme?.MV_CategoryTitleColor }}
            className="flex items-center gap-2">
            <hr className="h-[0.5px] min-w-6 border-inherit"></hr>
            {getCategoryName(category, language.id)}
            <hr className="h-[0.5px] min-w-6 border-inherit"></hr>
          </span>
        )}
      </div>

      {
        AllItems.length === 0 ? (
          <h2
            style={{ color: theme.MV_ItemTextColor }}
          >
            No food found, with this category
          </h2>
        ) : (
          <div className="space-y-3 w-full">
            {/* card with image have */}
            <div
              aria-description="items list"
              className={cn("grid gap-4 w-full", {
                "grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4": !isList,
                "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5": isList
              })}
            >
              { //show item have image   
                itemFilteredBaseImage.itemWithImage.map((item, index) => (
                  <div
                    key={index}
                    id="card_img"
                    title={"item " + getItemName(item, language.id)}
                    about="item card, show item details"
                    onClick={() => itemSelection(item)}
                    style={{ backgroundColor: theme?.MV_BGCardColor }}
                    className={cn("flex flex-col rounded-md overflow-hidden shadow shadow-black/25")}
                  >
                    <div className={cn("w-full flex h-full", {
                      "flex-row": !isList,
                      "flex-col-reverse": isList
                    })}>
                      <div className={cn("relative max-h-full w-full flex flex-col justify-between", {
                        "p-1": !isList,
                        "px-1": isList
                      })}>
                        <h3
                          about="item name"
                          className={cn("sm:text-lg md:text-xl", {
                            "line-clamp-1 text-sm": isList,
                            "line-clamp-2 text-base": !isList
                          })}
                          style={{ color: theme?.MV_ItemTextColor }}
                        >
                          {getItemName(item, language.id)}
                        </h3>
                        {!isShowPriceOptionInCard && (isList && item.price > 0 && (
                          <hr className="-mx-2" style={{ borderTop: `0.6px solid ${theme?.MV_BorderLineColor}` }} />
                        ))}
                        {!isList && (
                          <h4
                            style={{ color: theme?.MV_ItemTextColor }}
                            className="min-w-0 text-wrap mt-2 text-sm line-clamp-3 brightness-75"
                          >
                            {getDescription(item, language.id)}
                          </h4>
                        )}
                        {!isShowPriceOptionInCard && (
                          <Fragment>
                            {item.ItemTypes.length === 0 && item.price > 0 ? (
                              <h4
                                about="item price"
                                style={{ color: theme?.MV_PriceColor }}
                                className={cn("sm:text-base lg:text-lg mt-auto", {
                                  "text-sm": !isList,
                                  "text-xs py-[1px] pt-[3px] px-[1px]": isList
                                })}
                              >
                                <span>{formatPrice(item.price, currencyType)}</span>
                              </h4>
                            ) : (
                              <h4
                                about="item price on selections"
                                className="text-xs sm:text-base md:text-lg lg:text-xl"
                                style={{ color: theme?.MV_PriceColor }}
                              >
                                {getPriceOnSelectionByLanguage(language?.id)}
                              </h4>
                            )}
                          </Fragment>
                        )}
                      </div>
                      {/* image item */}
                      <div className={cn("relative w-full h-full aspect-[3/2] overflow-hidden", {
                        "max-w-[46%]": !isList,
                        "w-full rounded-md": isList
                      })}>
                        {
                          checkSourceContent(item?.image) && (
                            <BlurHashForList
                              isList={isList}
                              hash={item?.blurhash}
                              low={item?.image_low}
                              medium={item?.image_medium}
                              name={getItemName(item, language.id)}
                            />
                          )
                        }
                      </div>
                    </div>
                  </div>
                )
                )}
            </div>
            {/* card with no image have */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 w-full max-w-full gap-2">
              { // item with have no image 
                itemFilteredBaseImage.itemWithoutImage.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-full justify-between rounded-lg p-2 shadow gap-1"
                    about="item list without image"
                    onClick={() => itemSelection(item)}
                    style={{
                      border: `1px solid ${theme?.MV_BorderColorInNoImageItem}`,
                      backgroundColor: theme?.MV_BGCardColor,
                    }}
                  >
                    <div className="flex w-full justify-between items-center">
                      <h4 className="text-base sm:text-xl" style={{ color: theme?.MV_ItemTextColor }}>
                        {getItemName(item, language.id)}
                      </h4>
                      {item.ItemTypes.length === 0 ? (
                        <h5 className="text-end text-sm" style={{ color: theme?.MV_PriceColor }}>
                          {formatPrice(item.price, currencyType)}{" "}
                        </h5>
                      ) : (
                        //<h5 className="text-end text-sm" style={{ color: theme?.MV_PriceColor }}>
                        //  {getPriceOnSelectionByLanguage(language.id)}
                        //</h5>
                        null
                      )}
                    </div>
                    {item.ItemTypes.length > 0 && (
                      item.ItemTypes.map((type, index) => {
                        return (
                          <label
                            key={index}
                            className="flex justify-between items-center w-full rounded py-1 px-2"
                            style={{ backgroundColor: theme?.IV_ItemPriceOptionHighlight, color: theme?.IV_ItemPriceOptionTextColor }}
                          >
                            <span className="text-sm mt-[2px]">
                              {getItemTypeName(type, language.id)}
                            </span>
                            <span>
                              {formatPrice(type.price, currencyType)}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                ))}
            </div>
          </div>
        )
      }
    </section >
  );
};

export default Foods;
