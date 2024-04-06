import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useFetch(hasData, url, id, ...args) {
    const dispatch = useDispatch();
    useEffect(() => {
        if (!hasData) {
            Promise.resolve(dispatch(url(id, ...args)));
        }
    }, [hasData, id]);

    return null;
}
