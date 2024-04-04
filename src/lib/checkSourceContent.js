//this function checks if the image is from google storage or not and for check null or undefined or null string or empty string
export function checkSourceContent(image) {
    const imgSource = /https:\/\/storage\.googleapis\.com\//;
    if (imgSource.test(image)) {
        return true;
    }
    return false;
}
