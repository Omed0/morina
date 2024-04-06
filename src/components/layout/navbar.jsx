import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Link } from "react-scroll";
import { cn, gotoByScreen, checkSourceContent } from "@/lib/utils";
import Language from "@/components/language/languages.jsx";
import { getCategoryName } from "@/lib/itemLanguageHelpers";
import { Feedback, Grid } from "../socials/Icons";
import FoodDrawer from "../ui/CustomDrawer";
import { BlurHashForCategories } from "../Vedio_Image/BlurHash";


const Navbar = ({ language, className }) => {
    const { id } = useParams();
    const router = useRouter();

    const [expanded, setExpanded] = useState(false); // for navbar modal
    const { currentVenue, theme, listLanguage, firstMenuLoad: { Categories } } = useSelector((state) => state.menu);

    const goBack = () => {
        router.push(`/${id}`);
    };
    const gotoFeedback = () => {
        router.push(`/${id}/feedback`);
    };

    return (
        <>
            {/* ----- navbar ----- */}
            <nav
                aria-description="in navbar menu, have menu hamburger,language selections,logo and name venue"
                className={cn("w-full flex items-center justify-between p-1 z-[21]", className)}
                style={{ backgroundColor: theme?.MV_NavbarBackgroundColor }}
                about="Navbar Menu"
                dir="ltr"
            >
                <div
                    title="click to go back to home page"
                    className="flex items-center gap-2"
                >
                    <img
                        className="aspect-[3/2] object-contain max-w-14 sm:max-w-16"
                        sizes="(max-width: 767px) 60px, 70px"
                        src={currentVenue?.profile_image}
                        alt={currentVenue?.name}
                        onClick={goBack}
                        loading="eager"
                        height={280}
                        width={320}
                    />
                    <h1
                        title="name of venue "
                        about="name of venue in navbar"
                        className="font-rabar"
                        style={{ color: theme?.MV_NameTextVenue }}
                    >
                        {currentVenue?.name}
                    </h1>
                </div>

                <div className="flex items-center justify-center gap-3 pr-1">
                    <span className="hover:cursor-pointer" onClick={gotoFeedback}>
                        <Feedback className="size-6" color={theme?.MV_LanguageButtonColor} />
                    </span>
                    <Language language={listLanguage} theme={theme} />
                    <button
                        about="navbar modal"
                        title="click to open navbar modal and show all categories in menu selected"
                        className="rounded-full cursor-pointer transition-all duration-300 outline-none border-none"
                        onClick={(e) => {
                            e.stopPropagation();
                            setExpanded(prev => !prev)
                        }}
                    >
                        <Grid className="size-7" color={theme?.MV_LanguageButtonColor} />
                    </button>
                </div>
            </nav>

            {/* ----- navbar modal ---*/}
            <FoodDrawer
                isOpen={expanded}
                onClose={setExpanded}
                theme={[theme?.MV_category_bottom_sheet_background, theme?.MV_category_bottom_sheet_text_color]}
            >
                <div className="grid place-items-center grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 w-full text-center text-inherit min-h-[34vh] max-h-[70svh] overflow-y-auto mt-3 p-2">
                    {Categories.length > 0 && Categories.map((categorie, index) => (
                        <Link
                            className="flex flex-col items-center text-inherit"
                            onClick={() => setExpanded(false)}
                            to={`#category${categorie.id}`}
                            offset={gotoByScreen()}
                            duration={100}
                            smooth={true}
                            delay={400}
                            key={index}
                        >
                            {checkSourceContent(categorie.image) ? (
                                <BlurHashForCategories
                                    hash={categorie?.blurhash}
                                    low={categorie?.image_low}
                                    medium={categorie?.image}
                                    name={getCategoryName(categorie, language.id)}
                                    className="w-36 min-[340px]:w-40 min-[380px]:w-44 h-28"
                                />
                            ) : (
                                <img
                                    className="w-full h-full rounded-2xl aspect-[3/2] object-cover object-center"
                                    src={"https://storage.googleapis.com/morina_menu/images/categories/defaultImage.jpg"}
                                    alt={getCategoryName(categorie, language?.id)}
                                />
                            )}
                            <h3 className="line-clamp-1 text-inherit">
                                {getCategoryName(categorie, language?.id)}
                            </h3>
                        </Link>
                    ))}
                </div>
            </FoodDrawer>
        </>
    );
};

export default Navbar;

