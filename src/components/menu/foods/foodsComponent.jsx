import { useCallback, useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBannersByLangId } from "@/lib/utils";
import { setSearchModal, setSelectedItem } from "@/redux/features/venueSlice";

import SearchItem from "../search/SearchItem";
import Banner from "@/components/menu/banners/banner";
import useScrollY from "@/hooks/useScrollY";
import ArrowTopScrol from "@/components/ui/ArrowTopScrol";
import CustomDialog from "@/components/ui/CustomDialog";
import FoodModal from "./foodModal";
import FoodDrawer from "./FoodDrawer";
import CustomDrawer from "@/components/ui/CustomDrawer";
import Foods from "./foods";


const FoodsComponent = () => {

  const dispatch = useDispatch();
  const { scrollY } = useScrollY()
  const [isList, setIsList] = useState(true);
  const [isSelectedItem, setIsSelectedItem] = useState(false);

  const { currentVenue, theme, menuBanners, firstMenuLoad: { Categories }, selectedItem, searchItem } =
    useSelector((state) => state.menu);

  const { language } = useSelector((state) => state.language);
  const isModal = theme.ItemOpeningStyle === "POPUP"

  const handleChangeLayout = useCallback(() => {
    setIsList((prev) => !prev);
  }, [isList]);

  // function for selected current item
  const itemSelection = useCallback((item) => {
    dispatch(setSelectedItem(item));
    setIsSelectedItem(true)
  }, [selectedItem]);

  return (
    <Fragment>{/* banner */}
      <CustomDialog
        isOpen={searchItem}
        onClose={() => dispatch(setSearchModal())}
        classClose="top-1"
        className="w-[94%] max-h-96"
        theme={[theme?.IV_ItemBackgroundColor, theme?.IV_ItemTextColor]}
      >
        <SearchItem selectItem={itemSelection} />
      </CustomDialog>

      {getBannersByLangId(menuBanners, language.id, true) && (
        <div dir="ltr" className="w-full flex justify-center items-center p-3 py-6">
          <Banner banners={menuBanners} langId={language?.id} />
        </div>
      )}

      {scrollY > 200 && (
        <div dir="rtl" className="fixed bottom-5 right-1 px-2 z-[20] flex gap-2 items-center max-w-fit">
          <ArrowTopScrol
            ArrowColor={{ BackgroundColor: theme?.MV_CategoryBackgroundColor, color: theme?.MV_CategoryTextColor }}
          />
        </div>
      )}

      {/* list item */}
      {Categories.length > 0 &&
        Categories.map((category, index) => {
          return (
            <Foods
              key={index}
              isList={isList}
              firstRow={index === 0}
              language={language}
              category={category}
              itemSelection={itemSelection}
              setIsList={handleChangeLayout}
              currencyType={currentVenue.currency_type}
            />
          )
        })}

      {!isModal && <CustomDrawer
        isOpen={isSelectedItem}
        onClose={setIsSelectedItem}
        theme={[theme?.IV_ItemBackgroundColor, theme?.IV_ItemTextColor]}
      >
        <FoodDrawer
          theme={theme}
          item={selectedItem}
          language={language}
          key={selectedItem?.id}
          currencyType={currentVenue.currency_type}
        />
      </CustomDrawer>}

      {isModal && <CustomDialog
        classClose="right-2"
        isOpen={isSelectedItem}
        onClose={setIsSelectedItem}
        theme={[theme?.IV_ItemBackgroundColor, theme?.IV_ItemTextColor]}
      >
        <FoodModal
          theme={theme}
          item={selectedItem}
          language={language}
          key={selectedItem?.id}
          currencyType={currentVenue.currency_type}
        />
      </CustomDialog>}
    </Fragment>
  );
};


export default FoodsComponent;
