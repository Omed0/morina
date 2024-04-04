"use client"

import { useState, useEffect } from "react";
import StarFeedback from "./StarFeedBack"
import InputFeedBack from "./InputFeedback";
import classes from "./feedback.module.css";
import Language from "../language/languages";
import { feedBack, venueInfo } from "@/lib/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import EmojiRating from "./EmojiRating";
import { toast } from "react-hot-toast";
import { translations } from "@/constant/data-feedback";
import DisableRightClick from "@/hooks/DisableRightClick_RTL_StatuBar";
import { useRouter } from "next/navigation";
import { setLanguage } from "@/redux/features/lang";
import { MdOutlineKeyboardBackspace } from "react-icons/md";



export default function FeedBackParent({ params }) {
    const { id } = params

    const [translation, setTranslation] = useState({})
    const { language } = useSelector((state) => state.language);
    const { landingPage } = useSelector(state => state.menu);
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()

    const [cleanPlace, setCleanPlace] = useState(0);
    const [ratingStaff, setRatingStaff] = useState(0);
    const [ratingForService, setRatingForService] = useState(0);
    const [note, setNote] = useState('');
    const [emoji, setEmoji] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [tableNumber, setTableNumber] = useState(null)

    const MV_LanguageButtonColor = { // dont remove this, this is for language button color pass like a prop for Language component in another page path like object and in here pass same like this
        MV_LanguageButtonColor: "black"
    }

    const goBack = () => {
        router.back() ? router.back() :
            router.push(`/${id}`);
    } // go back to home page

    const staticLanguage = [
        { id: 23, language_code: 'en', name: 'English' },
        { id: 4, language_code: 'ar', name: 'العربية' },
        { id: 60, language_code: 'ku', name: 'کوردی' }
    ] // static language for language component in feedback page only because data is not coming from api 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const haveData = cleanPlace && ratingStaff && ratingForService && Number(emoji);
        if (haveData) {
            try {
                const feedbackData = {
                    service_rating: Number(ratingForService),
                    staff_rating: Number(ratingStaff),
                    hygiene_rating: Number(cleanPlace),
                    feedback_to_the_manager: Number(emoji),
                    phone_number: Number(phoneNumber),
                    table_number: Number(tableNumber),
                    note: note,
                };

                const { feedback, error } = await feedBack(landingPage?.id, feedbackData);
                if (error) {
                    toast.error(translation?.SomethingWentWrong);
                } else {
                    toast.success(translation?.ToastSuccess, {
                        style: {
                            position: 'relative',
                            top: '3rem',
                        },
                    });
                }

            } catch (error) {
                toast.error(translation?.SomethingWentWrong);
            }

            setEmoji(' ');
            setCleanPlace(' ');
            setRatingStaff(' ');
            setRatingForService(' ');
            setTableNumber(' ');
            setPhoneNumber('');
            setNote('');
            router.push(`/${id}`);
        } else {
            toast.error(translation?.ToastInputRequired);
        }
    } // submit feedback form to api

    useEffect(() => {
        if (!Boolean(landingPage)) {
            try {
                Promise.resolve(dispatch(venueInfo(id)));
            }
            catch (err) {
                toast.error("something went wrong please wait until refresh the page" + err.message);
                router.refresh();
            }
        }
        if (language?.id != 23 && language?.id != 4 && language?.id != 60) {
            dispatch(setLanguage(staticLanguage[0]));
        }
        setTranslation(translations[language?.id]);

    }, [language?.id]) // get translation from data file and get venue info about venue from api

    DisableRightClick({ theme: landingPage?.Theme, language })

    return (
        <div className="flex flex-col items-center w-screen min-h-svh">
            <div
                className="sticky top-0 left-0 flex justify-between items-center w-full h-full p-2 text-black text-center mx-auto z-10 border-b-[1px] border-dashed border-[#2b2b2b] bg-slate-50/90"
                about="Navbar for Feedback Page"
                dir="ltr"
            >
                <button
                    title="Go Back to Home Page"
                    onClick={goBack}
                >
                    <MdOutlineKeyboardBackspace className="text-4xl" />
                </button>
                <h1 title={translation?.feedback} className="font-medium mt-1 items-start text-2xl">{translation?.feedback}</h1>
                <Language language={staticLanguage} theme={MV_LanguageButtonColor} error={null} />
            </div>
            <form
                aria-description="Feedback Form for Menu. This form is used to send feedback to the manager of the restaurant."
                about="Feedback Form for Menu. This form is used to send feedback to the manager of the restaurant."
                method="POST"
                className="flex flex-col items-center justify-center rounded-md gap-3 p-2 overflow-y-auto overflow-x-hidden w-full max-w-[600px]"
            >
                <div className={classes.card}>
                    <RequireField
                        data={ratingStaff}
                        textRequire={translation?.TextRequire}
                        submitted={submitted}
                    />
                    <h1 className={classes.NameSectionFeedback}>{translation?.staffRating}</h1>
                    <StarFeedback rating={ratingStaff} setRating={setRatingStaff} />
                </div>
                <div className={classes.card}>
                    <RequireField
                        data={ratingForService}
                        textRequire={translation?.TextRequire}
                        submitted={submitted}
                    />
                    <h1 className={classes.NameSectionFeedback}>{translation?.serviceRating}</h1>
                    <StarFeedback rating={ratingForService} setRating={setRatingForService} />
                </div>
                <div className={classes.card}>
                    <RequireField
                        data={cleanPlace}
                        textRequire={translation?.TextRequire}
                        submitted={submitted}
                    />
                    <h1 className={classes.NameSectionFeedback}>{translation?.hygieneRating}</h1>
                    <StarFeedback rating={cleanPlace} setRating={setCleanPlace} />
                </div>
                <div className={classes.card}>
                    <RequireField
                        data={emoji}
                        textRequire={translation?.TextRequire}
                        submitted={submitted}
                    />
                    <h1 className={classes.NameSectionFeedback}>{translation?.overallExperience}</h1>
                    <EmojiRating
                        emojis={emoji}
                        setEmojis={setEmoji}
                        textEmoji={translation?.EmojiType instanceof Array}
                    />
                </div>
                <div className={classes.card + " " + classes.TableAndPhone}>
                    <div className="w-1/2 flex flex-col basis-40 grow">
                        <h1 className={classes.NameSectionFeedback}>{translation?.phoneInput}</h1>
                        <InputFeedBack
                            placeholder={translation?.optionPhoneInputPlaceholder}
                            setInputFeedBack={setPhoneNumber}
                            inputFeedBack={phoneNumber}
                            type={'number'}
                        />
                    </div>
                    <div className="w-1/2 flex flex-col basis-36 grow">
                        <h1 className={classes.NameSectionFeedback}>{translation?.tablenumber}</h1>
                        <InputFeedBack
                            placeholder={translation?.tablenumberPlaceholder}
                            textRequire={translation?.TextRequire}
                            setInputFeedBack={setTableNumber}
                            inputFeedBack={tableNumber}
                            submitted={submitted}
                            required={false}
                            type={'number'}
                        />
                    </div>
                </div>
                <div className={classes.card + " " + classes.cardInput}>
                    <h1 className={classes.NameSectionFeedback}>{translation?.additionalComment}</h1>
                    <InputFeedBack
                        inputFeedBack={note}
                        setInputFeedBack={setNote}
                        placeholder={translation?.placeholderComment}
                        type={'text'}
                    />
                </div>

                <div className="flex justify-center w-full mb-4 mx-auto font-medium">
                    <button onClick={handleSubmit} className={classes.buttonFeedBack}>{translation?.button}</button>
                </div>
            </form >
        </div >
    )
}


function RequireField({ textRequire, data, submitted }) {
    if (submitted && !data) {
        return (
            <span className="flex justify-center">
                <p className="inline-block text-xl transition-all duration-200 ease-linear text-red-400">{textRequire}</p>
            </span>
        );
    }
    return null;
}