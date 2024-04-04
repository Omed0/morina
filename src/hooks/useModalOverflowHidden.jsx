import { useEffect } from 'react';

function useModalOverflowHidden(isModalOpen) {
    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden";
            document.body.style.position = "relative";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.position = "static";
        }

        return () => {
            document.body.style.overflow = "auto";
            document.body.style.position = "static";
        };
    }, [isModalOpen]);
}

export default useModalOverflowHidden;
