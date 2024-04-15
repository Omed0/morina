"use client";

import { useRef, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllData } from "@/lib/axiosConfig";
import dynamic from "next/dynamic";

import DisableRightClick_RTL_StatuBar from "@/hooks/DisableRightClick_RTL_StatuBar";
import CategoriesOnScroll from "@/hooks/CategoriesOnScroll";
import Loading from "@/components/layout/loading";
import { changeMenu } from "@/redux/features/venueSlice";
import { cn } from "@/lib/utils";

import Categories from "@/components/menu/menuAndCategories/categories";
import Menus from "@/components/menu/menuAndCategories/menus";
import Navbar from "@/components/layout/navbar";
import Image from "next/image";
import Footer from "@/components/layout/footer";
import useFetch from "@/hooks/useFetch";


const FoodsComponent = dynamic(() => import('@/components/menu/foods/foodsComponent'),
  {
    ssr: false,
    webpack: () => [require.resolve("@/components/menu/foods/foodsComponent")],
    loading: () => <Loading />
  })

function Menu({ params }) {

  const { id } = params;
  const dispatch = useDispatch();
  // create ref for categories section and debounce function for scroll
  const categoriesRef = useRef(null);
  const debounceRef = useRef(null);

  // get data from redux store
  const { language } = useSelector((state) => state.language);
  const { currentVenue, firstMenuLoad, loading, error, allMenus, theme, activeOnlyCategoriesFixed }
    = useSelector((state) => state.menu);

  // when menu is clicked, filter categories based on menu id
  const menuClicked = useCallback((selectedMenu) => {
    dispatch(changeMenu(selectedMenu));
  }, [firstMenuLoad]);

  // if venue is not in redux store, fetch data from server
  useFetch(currentVenue, fetchAllData, { username: id, langCode: language.language_code, pending: true });
  // disable right click on page and change status bar color and change direction based on language id
  DisableRightClick_RTL_StatuBar({ theme, id });
  // with scroll, change categories position based on section categories in body
  CategoriesOnScroll({ debounceRef, categoriesRef });

  if (loading) return <Loading />
  if (error) return <h1>{error.message}</h1>;
  // if venue is not in redux store, return null
  if (!currentVenue) return null;


  return (
    <Fragment>
      {theme.MV_BG_VIDEO ? (
        <video className="BG-MEDIA" playsInline autoPlay muted loop>
          <source src={theme.MV_BG_VIDEO} type="video/mp4" />
        </video>
      ) : theme?.MV_BackgroundImage ? (
        <Image
          priority
          width={700}
          height={700}
          src={theme?.MV_BackgroundImage}
          alt={"background image" + currentVenue?.username}
          className="BG-MEDIA"
        />
      ) : null}
      <main className="w-full h-auto">
        <Navbar
          className={activeOnlyCategoriesFixed ? "relative" : "fixed top-0 inset-x-0"}
          language={language}
        />
        <header
          about="inner container of the page that contains navbar, menu and categories"
          aria-description="inner container of the page that contains navbar, menu and categories"
          className={cn("w-full z-20 inset-x-0", {
            "sticky top-0": activeOnlyCategoriesFixed,
            "fixed top-[42px]": !activeOnlyCategoriesFixed
          })}
        >
          {allMenus.length > 1 ? (
            <Menus
              clickHandler={menuClicked}
              language={language}
            />
          ) : null}
          <Categories
            categoriesRef={categoriesRef}
            language={language}
          />
        </header>
        <FoodsComponent key={id} />

        <footer className="w-full flex justify-center pb-4">
          <Footer />
        </footer>
      </main>
      {/* image background for body fix faster scroll ios bottom of page be white */}
      <style jsx global>{` 
            body {
                background-color: ${theme?.MV_BackgroundColor};
            }
          `}</style>
    </Fragment>
  );
}

export default Menu;
