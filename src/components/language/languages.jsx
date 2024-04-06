import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { LanguageIcon } from "../socials/Icons";
import { fetchAllData } from "@/lib/axiosConfig";
import { usePathname } from "next/navigation";
import { setLanguage } from "@/redux/features/lang";

function Language({ language, theme }) {

    const pathname = usePathname();
    const dispatch = useDispatch();

    const refLang = useRef(null);
    const refDropdown = useRef(null);
    const [isOpened, setIsOpened] = useState(false);
    const username = pathname.split("/").filter((param) => param !== "")[0];

    const { language: Lang } = useSelector((state) => state.language);

    const handleClickOutside = (event) => {
        if (refDropdown.current && !refDropdown.current.contains(event.target) && !refLang.current.contains(event.target)) {
            setIsOpened(false)
        }
    }

    const handleGetDataByLang = async (lang) => {
        await dispatch(fetchAllData({ username, langCode: lang["language_code"], pending: false }))
        dispatch(setLanguage(lang));
    };

    useEffect(() => {
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
                        onClick={() => handleGetDataByLang(Lang)}
                        role="menuitem"
                    >
                        {Lang?.name}
                    </li>
                    :
                    language.map((lang, index) => (
                        <li
                            className={cn("relative text-lg px-3 py-1 text-gray-500/80 hover:bg-gray-50 hover:text-gray-700 border-b-[1px] last:border-b-0 border-zinc-300 hover:cursor-pointer", {
                                "text-zinc-700": lang["id"] === Lang?.id
                            })}
                            key={index}
                            title={lang["name"]?.toUpperCase()}
                            onClick={() => {
                                handleGetDataByLang(lang);
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
