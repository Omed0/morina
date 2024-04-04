"use client";

import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllData, venueInfo } from "@/lib/axiosConfig";

import Buttons from "@/components/ui/CustomButton";
import Footer from "@/components/layout/footer.jsx";
import { setLanguage } from "@/redux/features/lang";
import Image from "next/image";
import Link from "next/link";
import DisableRightClick_RTL_StatuBar from "@/hooks/DisableRightClick_RTL_StatuBar";
import Banner from "@/components/menu/banners/banner";
import SocialMedia from "@/components/socials/socialMedia";
import { cn } from "@/lib/utils";
import { Feedback } from "@/components/socials/Icons";
import FoodDrawer from "@/components/ui/CustomDrawer";
import { useRouter } from "next/navigation";
import { changeMenu } from "@/redux/features/venueSlice";
import { getMenuName, showMenuListNameByLangId } from "@/lib/itemLanguageHelpers";
import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from "react-icons/io";
import { checkSourceContent } from "@/lib/checkSourceContent";


export default function Index({ params }) {

    const { id } = params;
    const dispatch = useDispatch();
    const router = useRouter();

    const [isMenuListOpen, setIsMenuListOpen] = useState(false);
    const { language } = useSelector((state) => state.language);
    const { landingPage, allMenus, indexBanners, currentVenue, theme, error } =
        useSelector((state) => state.menu);

    const location = { latitude: landingPage?.latitude, longitude: landingPage?.longitude } // get location for map redirection
    //const showListMenu = theme.LandingPageLayout === "MENU_LIST" // check if the menu list is shown or not
    const showListMenu = false

    const changeLanguage = (langID) => {
        dispatch(setLanguage(langID));
        if (!showListMenu || allMenus.length < 2) router.push(`/${id}/menu`);
    };
    const menuClicked = (selectedMenu) => {
        dispatch(changeMenu(selectedMenu));
        router.push(`/${id}/menu`);
    };

    useEffect(() => {
        if (!landingPage) {
            Promise.resolve(dispatch(venueInfo(id)));
        }
    }, [landingPage]);

    // disable right click on page and change status bar color
    DisableRightClick_RTL_StatuBar({ theme, language, id });

    useEffect(() => {
        if (!currentVenue) {
            Promise.resolve(dispatch(fetchAllData(id)));
        }
    }, [currentVenue]);

    if (error) return <h1>Sorry, we couldn't load the page. Please try again later.</h1>;
    if (!landingPage || !id) return null;

    return (
        <Fragment>
            {checkSourceContent(theme?.LP_BG_VIDEO) ? (
                <video className="BG-MEDIA" playsInline autoPlay muted loop>
                    <source src={theme.LP_BG_VIDEO} type="video/mp4" />
                </video>
            ) : checkSourceContent(theme?.LP_BackgroundImage) ? (
                <Image
                    priority
                    width={700}
                    height={700}
                    quality={100}
                    src={theme.LP_BackgroundImage}
                    alt={"background image" + landingPage.username}
                    className="BG-MEDIA"
                />
            ) : null}
            <main className="relative h-full w-full flex flex-col justify-between items-center overflow-x-hidden font-rabar">
                <div className="mt-16 w-full flex flex-col items-center justify-center gap-8">
                    <Link
                        href={`/${id}/feedback`}
                        title="Feedback"
                        className="absolute top-6 left-4 z-50"
                        aria-description="Rate your experience"
                    >
                        <span
                            dir="ltr"
                            aria-description="icon for feedback"
                            className="feedbackIcon flex justify-center items-center absolute top-[4%] left-[4%] cursor-pointer rounded-xl hover:scale-[1.04] transition-all duration-300 ease-in-out hover:filter gap-2 text-lg sm:text-xl"
                        >
                            <Feedback
                                className="size-7"
                                color={theme.LP_SocialMediaIconColor}
                            />
                            <p>Feedback</p>
                        </span>
                    </Link>
                    <Image
                        width={600}
                        height={480}
                        loading="eager"
                        priority={true}
                        alt={landingPage.name}
                        src={landingPage.profile_image}
                        title={landingPage.username + " logo"}
                        sizes="(max-width: 600px) 100vw, 600px"
                        className="object-contain max-w-80 h-44"
                    />
                    <div
                        className={cn("w-3/4 max-w-[560px]", {
                            "mt-6": indexBanners?.length <= 0
                        })}>
                        <Buttons drawerOpen={setIsMenuListOpen} venue={landingPage} changeLanguage={changeLanguage} />
                    </div>
                </div>
                {/* banner */}
                {indexBanners?.length > 0 ? (
                    <div dir="ltr" className="w-full flex justify-center items-center my-4 p-3">
                        <Banner banners={indexBanners} langId={language.id} />
                    </div>
                ) : null}
                <div
                    dir="ltr"
                    className="absolute bottom-0 inset-x-0 w-full flex flex-col justify-center items-center"
                >
                    <SocialMedia
                        socials={landingPage.Social_Links}
                        phone={landingPage.phone}
                        location={location}
                        theme={theme}
                    />
                    <Footer />
                </div>
            </main>

            <FoodDrawer
                hasIndecator={false}
                onClose={setIsMenuListOpen}
                isOpen={isMenuListOpen && showListMenu && allMenus.length > 1}
                theme={[theme?.LP_DrawerBackgroundColor, theme?.LP_DrawerTextColor]}
            >
                <div className="w-full flex flex-col gap-3 py-3 pb-6 px-4 max-h-[75svh] overflow-y-auto">
                    <div className="flex items-center pb-5">
                        <h2 className="mx-auto text-base">{showMenuListNameByLangId(language.id)}</h2>
                        <IoIosClose onClick={() => setIsMenuListOpen(false)} className="size-8" />
                    </div>
                    <ul className="flex flex-col gap-2">
                        {allMenus.map((menu) => (
                            <li
                                key={menu.id}
                                onClick={() => menuClicked(menu)}
                                className="flex justify-between items-center py-4 border-b-[0.5px] font-normal
                                 border-zinc-300/15 last:border-none"
                            >
                                {getMenuName(menu, language.id)}
                                {language.isRtl?.includes(language.language_code) ?
                                    <IoIosArrowBack size={17} /> : <IoIosArrowForward size={17} />}
                            </li>
                        ))}
                    </ul>
                </div>
            </FoodDrawer>

            <style jsx global>
                {`
                    body {
                        background-color: ${theme?.LP_BackgroundColor};
                    }
                    .feedbackIcon,.textFeedback {
                        color: ${theme.LP_SocialMediaIconColor};
                    }
                `}
            </style>
        </Fragment>
    )
}