"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { setLanguage } from "@/redux/features/lang";
import { rtlLang, staticLanguage } from "constant/language";
import { useSelector } from "react-redux";

export default function DisableRightClick_RTL_StatuBar({ theme, id }) {

    const pathname = usePathname();
    const { language } = useSelector((state) => state.language);

    const isFeedback = pathname.includes("/feedback");
    const isRtl = rtlLang.find((lang) => lang === language?.language_code);
    const isMainLanguages = ["en", "ar", "ku"].find((lang) => lang === language?.language_code);

    const checkPage = (pathname) => { // check page path and return theme color 
        switch (pathname) {
            case `/${id}`:
                return theme?.LP_BackgroundColor || "#1d1d1d";
            case `/${id}/menu`:
                return theme?.MV_NavbarBackgroundColor || "#1d1d1d";
            default:
                return "#1d1d1d";
        }
    }

    useLayoutEffect(() => {
        const statusBarColor = checkPage(pathname);
        const metaTags = document.querySelectorAll('meta');
        metaTags.forEach((metaTag) => {
            if (metaTag.name === 'theme-color' || metaTag.name === 'msapplication-navbutton-color' || metaTag.name === 'apple-mobile-web-app-status-bar-style') {
                metaTag.setAttribute('content', statusBarColor);
            }
        });

        // Add missing meta tags if they don't exist
        if (!document.querySelector('meta[name="apple-mobile-web-app-capable"]')) {
            const newMetaTag = document.createElement('meta');
            newMetaTag.name = 'apple-mobile-web-app-capable';
            newMetaTag.content = 'yes';
            document.head.appendChild(newMetaTag);
        }

        // disable right click on page
        const handleContextmenu = (e) => {
            e.preventDefault();
        };
        document.addEventListener("contextmenu", handleContextmenu);

        return () => {
            document.removeEventListener("contextmenu", handleContextmenu);
        };
    }, [pathname, id, theme]);

    useEffect(() => {
        if (isFeedback && !isMainLanguages) {
            setLanguage(staticLanguage[0])
        }
        if (isRtl) {
            document.body.classList.add("rtl");
        } else {
            document.body.classList.remove("rtl");
        }

    }, [language?.id]);

    return null;
}