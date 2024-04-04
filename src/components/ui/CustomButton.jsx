const Buttons = (props) => {

    const language = props?.venue?.Languages
    const theme = props?.venue?.Theme;
    const orderLang = []

    // order language by id and push kurdish and english to the first index of array and then push the rest of languages
    language.forEach(lang => {
        if (lang.id === 60) {
            orderLang[0] = lang
        }
        if (lang.id === 4) {
            orderLang[1] = lang
        }
        if (lang.id !== 60 && lang.id !== 4) {
            orderLang.push(lang)
        }
    })

    // change language
    const handleChangelanguage = (lang) => {
        props.changeLanguage(lang)
        props.drawerOpen(true)
    }

    let hasBackgroundImage = null; // use this to set the background color or border color of the button depending on the theme settings of the venue (background image)
    if (theme?.LP_BackgroundImage || theme?.LP_BG_VIDEO) {
        hasBackgroundImage = {
            backgroundColor: theme?.LP_LanguageButtonColor,
            color: theme?.LP_MenuTextColor,
            border: theme?.LP_LanguageButtonColor == "transparent" ? `1px solid ${theme?.LP_BorderButtonColor}` : `none`,
        };
    } else {
        hasBackgroundImage = {
            borderColor: theme?.LP_BorderButtonColor,
            color: theme?.LP_MenuTextColor,
        };
    }

    return (
        <>
            <div
                className="flex flex-wrap gap-4"
                dir="rtl"
            >
                {/* Render the first button separately */}
                {orderLang[0] && orderLang?.length > 0 && (
                    <button
                        key={orderLang[0]?.id}
                        title={orderLang[0]?.name}
                        about="Language button kurdish"
                        style={hasBackgroundImage}
                        onClick={() => handleChangelanguage(orderLang[0])}
                        className="btn-color text-center w-full transition-all duration-300 ease-linear basis-32 grow rounded-md p-2 font-semibold border border-solid cursor-pointer"
                        content={"click this button to view menu by language kurdish"}
                    >
                        {orderLang[0]?.name}
                    </button>
                )}

                {/* Render the remaining buttons */}
                <div className="flex flex-wrap gap-3 w-full justify-center">
                    {orderLang?.slice(1).map((lang, index) => {
                        return (
                            <button
                                key={index}
                                title={lang?.name}
                                style={hasBackgroundImage}
                                about={"Language button for " + lang?.name}
                                onClick={() => handleChangelanguage(lang)}
                                className="btn-color rounded-md p-1 w-full basis-32 grow text-center cursor-pointer transition-all duration-300 ease-linear border border-solid"
                            >
                                {lang.name}
                            </button>
                        );
                    })}
                </div>
            </div >


            <style jsx>{`
                .btn-color:hover {
                    background-color: ${theme?.LP_HoverButtonColor};
                    color: ${theme?.LP_HoverButtonTextColor};
                }
            `}
            </style>
        </>
    );
};

export default Buttons;