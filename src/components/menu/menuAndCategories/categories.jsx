import { Link } from "react-scroll";
import { useSelector } from "react-redux";
import { BlurHashForCategories } from "../../Vedio_Image/BlurHash";
import { checkSourceContent } from "@/lib/checkSourceContent";
import { getCategoryName } from "@/lib/itemLanguageHelpers";
import { cn, gotoByScreen } from "@/lib/utils";

const Categories = (props) => {

  const { categoriesRef, language } = props;
  const { theme, firstMenuLoad: { Categories } } = useSelector((state) => state.menu);

  return (
    <section
      style={{ backgroundColor: theme?.MV_CategoryBackgroundColor }}
      about="Categories Section of the page that shows all categories of the venue"
      aria-description="Categories Section of the page that shows all categories of the venue"
      className={cn("flex sm:gap-2 overflow-x-auto snap-mandatory snap-x p-1 pb-0 whitespace-nowrap", {
        "justify-center": Categories.length <= 3,
        "justify-start": Categories.length > 3,
      })}
    >
      {Categories.map((category, index) => {
        return category && category.Items?.length > 0 ? (
          <Link
            className="flex flex-col justify-center max-w-40 px-1 gap-[2px] snap-start cursor-grab"
            title={"categore " + getCategoryName(category, language.id)}
            data-target={`category${category.id.toString()}`}
            to={`#category${category.id}`}
            offset={gotoByScreen()}
            ref={categoriesRef}
            duration={40}
            key={index}
            href="#"
          >
            {checkSourceContent(category.image) ? (
              <BlurHashForCategories
                hash={category?.blurhash}
                low={category?.image_low}
                medium={category?.image}
                name={getCategoryName(category, language.id)}
              />
            ) : (
              <BlurHashForCategories
                hash={category?.blurhash}
                medium={"https://storage.googleapis.com/morina_menu/images/categories/defaultImage.jpg"}
                low={"https://storage.googleapis.com/morina_menu/images/categories/defaultImage.jpg"}
              />
            )}

            <h3
              about="Category Name"
              className="text-sm sm:text-base md:text-lg text-center line-clamp-1 min-w-0 text-wrap whitespace-pre-wrap"
              style={{ color: theme?.MV_CategoryTextColor }}
            >
              {getCategoryName(category, language.id)}
            </h3>
          </Link>
        ) : null;
      })}

    </section >
  );
};

export default Categories;
