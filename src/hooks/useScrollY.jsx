import { useState, useEffect, useCallback } from 'react';

const useScrollY = () => {
    const [scrollY, setScrollY] = useState(0);

    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        // Add scroll event listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Remove scroll event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]); // Empty dependency array ensures the effect runs only once when the component mounts

    return { scrollY };
};

export default useScrollY;