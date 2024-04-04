import { useEffect } from "react";

const CategoriesOnScroll = ({ debounceRef, categoriesRef }) => {
    useEffect(() => {
        const handleScroll = () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }

            debounceRef.current = setTimeout(() => {
                const sections = document.querySelectorAll('.scrollByCategories');
                for (const section of sections) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= window.innerHeight) {
                        const targetId = section.id;
                        const activeCategory = document.querySelector(`[data-target="${targetId}"]`);

                        // Scroll horizontally to the active category
                        const categoriesContainer = categoriesRef.current;
                        activeCategory?.scrollIntoView({
                            behavior: 'smooth',
                            block: 'nearest',
                            inline: 'center',
                            container: categoriesContainer,
                        });
                        break;
                    }
                }
            }, 40); // Adjust the debounce delay (in milliseconds) as needed
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [categoriesRef]);

}

export default CategoriesOnScroll