import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "@/redux/features/lang";
import { cn } from "@/lib/utils";
import { LanguageIcon } from "../socials/Icons";

function Language({ language, theme }) {
    const dispatch = useDispatch();
    const refLang = useRef(null);
    const refDropdown = useRef(null);
    const [isOpened, setIsOpened] = useState(false);
    const { language: Lang } = useSelector((state) => state.language);

    useEffect(() => {
        const haveActiveLanguage = language?.find((lang) => lang["id"] == Lang?.id);
        if (haveActiveLanguage) {
            setLanguage(haveActiveLanguage);
        } else {
            setLanguage(language[0]);
        }

        const handleClickOutside = (event) => {
            if (refDropdown.current && !refDropdown.current.contains(event.target) && !refLang.current.contains(event.target)) {
                setIsOpened(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [Lang, dispatch, refDropdown]);


    return (
        <div className="flex justify-normal items-center">
            <div
                ref={refLang}
                onClick={() => setIsOpened((prev) => !prev)}
            >
                <LanguageIcon color={theme?.MV_LanguageButtonColor} className="size-7 hover:cursor-pointer" />
            </div>

            <ul
                role="menu"
                ref={refDropdown}
                className={cn("flex-col items-center mx-auto absolute end-10 top-11 z-10 max-w-40 w-fit rounded-md border cursor-pointer border-gray-100 bg-white shadow shadow-zinc-200/65 font-rabar animate-dropdown", {
                    "hidden": !isOpened,
                    "flex": isOpened
                })}
            >
                {language.length < 1 ?
                    <li
                        className="text-xl hover:cursor-pointer"
                        onClick={() => dispatch(setLanguage(Lang))}
                        role="menuitem"
                    >
                        {Lang?.name}
                    </li>
                    :
                    language.map((lang, index) => (
                        <li
                            className={cn("relative text-lg px-3 py-1 text-gray-500 hover:bg-gray-50 hover:text-gray-700 border-b-[1px] last:border-b-0 border-zinc-300 hover:cursor-pointer", {
                                "text-zinc-600": lang["id"] === Lang?.id
                            })}
                            key={index}
                            title={lang["name"]?.toUpperCase()}
                            onClick={() => {
                                dispatch(setLanguage(lang));
                                setIsOpened(false);
                            }}
                            role="menuitem"
                        >
                            {lang["name"]}
                        </li>
                    ))
                }
            </ul>

        </div >
    );
}


export default Language;
