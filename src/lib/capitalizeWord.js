export const textToCapitalized = (text) => {
    // convert the first letter of the all words to uppercase in english
    return text.replace(/\w\S*/g, (w) =>
        w.replace(/^\w/, (c) => c.toUpperCase())
    );
};
