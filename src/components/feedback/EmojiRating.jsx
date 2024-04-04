import { useCallback } from 'react'
import classes from './feedback.module.css'


export default function EmojiRating({ emojis, setEmojis, textEmoji }) {

    const emojiesIcon = ["😖",
        "😟",
        "😊",
        "😄",
        "🤩"]

    const handleChooseEmojies = useCallback((index) => {
        setEmojis(index)
    }, [emojis])

    return (
        <div className="w-full flex gap-3 py-2 justify-center">
            {emojiesIcon.map((icon, index) =>
                <div
                    key={icon}
                    style={index === emojis ? { transform: 'scale(1.18)' } : {}}
                    onClick={() => handleChooseEmojies(index)}
                >
                    <span
                        className={classes.emojiesIcon}
                        style={index === emojis ? { filter: 'grayscale(0)' } : {}}
                    >
                        {icon}
                    </span>
                    <p className='text-lg'>{textEmoji[index]}</p>
                </div>)}
        </div>
    )
}