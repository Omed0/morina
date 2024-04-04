"use client"

import { useCallback } from "react";
import classes from "./feedback.module.css";

export default function InputFeedBack({ inputFeedBack, setInputFeedBack, placeholder, type = 'text', required = false, textRequire = null, submitted }) {

    const handleInput = useCallback((e) => {
        setInputFeedBack(e.target.value);
    }, [inputFeedBack]);

    return (
        <div className={classes.parentInput}>
            <input
                style={{
                    border: required && submitted && !inputFeedBack ? '1px solid red' : '1px solid #ccc'
                }}
                type={type}
                required={required}
                value={inputFeedBack || ''}
                onChange={handleInput}
                className={classes.inputFeedback}
                placeholder={required && submitted && !inputFeedBack ? textRequire : placeholder}
            />
        </div>
    );
}