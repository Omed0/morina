"use client"

import classes from "./feedback.module.css";


export default function StarFeedback({ rating, setRating }) {

    const handleStarClick = (clickedRating) => {
        setRating(clickedRating);
    }

    return (
        <div className={classes.starRating}>
            {[1, 2, 3, 4, 5].map((value, index) => (
                <Star
                    key={index}
                    selected={value <= rating}
                    onClick={() => handleStarClick(value)}
                />
            ))}
        </div>
    )
}

const Star = ({ selected, onClick }) => (
    <span className={classes.star + ` ${selected ? classes.starSelected : classes.starNotSelected}`} onClick={onClick}>
        ★
    </span>
);
